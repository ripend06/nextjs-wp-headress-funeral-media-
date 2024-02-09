//GoogleMapコンポーネント

import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

//updatedMapPostsData受け取って、地図を表示する関数
function FuneralMap ({ updatedMapPostsData }) {
//console.log('updatedMapPostsData-child:', updatedMapPostsData);

  //Mapサイズ
  const mapStyles = {
    height: '800px',
    width: '80%',
  };

  //Map初期位置 経緯度
  const defaultCenter = {
    lat: 35.73215602774991,
    lng: 139.73428388525085,
  };


    // markerData配列データを作成。マーカーデータの初期化を useMemo で行う
    const markerData = useMemo(() => {
      if (updatedMapPostsData) {
        return updatedMapPostsData.map((post) => {
            const featuredMedia = post._embedded && post._embedded['wp:featuredmedia']; //post._embedded が存在し、かつその中に wp:featuredmedia プロパティが存在すれば、その値を featuredMedia に格納する

            return {
                name: post.title.rendered,
                url: post.link,
                area: post.acf.address.address_city,
                address: `${post.acf.address.address_prefecture}${post.acf.address.address_city}${post.acf.address.address_1}${post.acf.address.address_2}`,
                detail: post.acf.feature_text,
                image: featuredMedia ? (featuredMedia[0] ? featuredMedia[0].source_url : null) : null, //三項演算子。featuredMediaが存在し、featuredMedia[0]が存在したら、featuredMedia[0].source_urlを取得
            };
          });
        }
        return []; // updatedMapPostsData が null の場合は空の配列を返す
      }, [updatedMapPostsData]);

  //console.log('markerData', markerData);


  const [map, setMap] = useState(null); //mapの状態管理
  const [markers, setMarkers] = useState([]);//markerの状態管理
  const [selectedMarkers, setSelectedMarkers] = useState([]);//markerがクリックされたときの状態管理

  // Google Maps API の読み込み状態を `isLoaded` として取得。　useJsApiLoaderフック使用
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  // マップが読み込まれたときの処理を定義
  const onLoad = (map) => {
    // マップの参照を更新
    setMap(map);

    // マップにクリックイベントリスナーを追加。マップがクリックされたらの処理を登録
    const listener = map.addListener('click', () => {
      // 選択されたマーカーがあればInfoWindowを閉じる
      if (selectedMarkers.length > 0) {
        handleInfoWindowClose();
      }
    });

    // コンポーネントがアンマウントされたときにイベントリスナーを削除する関数を返す。モリリークを防ぎ、不要な処理を回避。
    return () => {
      window.google.maps.event.removeListener(listener);
    };
  };

  // コンポーネントがマウントされた時、`isLoaded` と `map` が変更されたときに実行。　←useEffectフックで実現可能
  useEffect(() => {
    // Google Maps APIがロードされており、マップが存在する場合
    if (isLoaded && map) {
      // マーカーデータを元に各住所をジオコーディングし、マーカーを設定。locationにはmarkerDataが入ってる
      markerData.forEach((location, i) => {
        geocodeAddress(location, i);
      });
    }
  }, [isLoaded, map, markerData]);

  // 住所をジオコーディングして、マーカーを設定する関数
  const geocodeAddress = (location, i) => {
    // Google Maps ジオコーダーのインスタンスを作成
    const geocoder = new window.google.maps.Geocoder();
    // 住所を元にジオコーディングを実行
    geocoder.geocode({ address: location.address }, (results, status) => {
      // ジオコーディングが成功した場合
      if (status === 'OK') {
        // マーカーの位置情報を取得し、マーカーを設定
        const markerLatLng = results[0].geometry.location;//マーカーの緯度経度情報を取得
        setMarkers((prevMarkers) => [...prevMarkers, { position: markerLatLng, key: i }]);//新しいマーカーを前のマーカーのリストに追加
      } else {
        // ジオコーディングが失敗した場合、コンソールにエラーメッセージを表示
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  // マーカーがクリックされたときの処理
  const handleMarkerClick = (marker) => {
    // 選択されたマーカーを更新
    setSelectedMarkers((prevSelectedMarkers) => [...prevSelectedMarkers, marker]);//前回の選択されたマーカーの配列 (prevSelectedMarkers) を取得し、新しいマーカー (marker) をその配列に追加
  };

  // InfoWindowを閉じる処理
  const handleInfoWindowClose = (key) => {
    // 選択されたマーカーから指定されたkeyのマーカーを除外して更新
    setSelectedMarkers((prevSelectedMarkers) =>
      prevSelectedMarkers.filter((marker) => marker.key !== key)//前回の選択されたマーカーの配列 (prevSelectedMarkers) を取得し、指定された key に対応するマーカーを除外して新しい配列を生成します。指定された key に一致しないマーカーのみをフィルタリングして新しい配列を生成。
    );
  };

  return (
    <>
        <h3>地図</h3>
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={12} onLoad={onLoad}>
            {/* マーカーを表示 */}
            {markers.map((marker, i) => (
            <Marker
                key={i}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
            />
            ))}
            {/* 選択されたマーカーに対応するInfoWindowを表示 */}
            {selectedMarkers.map((selectedMarker, i) => (
            <InfoWindow
                key={i}
                position={selectedMarker.position}
                onClick={() => handleInfoWindowClose(selectedMarker.key)}
            >
                <div className="marker-w">
                <div className="marker_name">
                    {markerData[selectedMarker.key].name}
                </div>
                <div className="marker-bt">
                    <div class="marker_name">
                    <img src={markerData[selectedMarker.key].image}></img>
                    </div>
                    <div class="marker_area">
                    {markerData[selectedMarker.key].area}
                    </div>
                    <div class="marker_address">
                    {/* <svg style="fill:#aeb5bd" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        {/* <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}{/*
                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg> */}
                    {markerData[selectedMarker.key].address}
                    </div>
                    <div class="marker_tel">
                    {/*<svg style="fill:#aeb5bd" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        {/* <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}{/*
                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>*/}
                    {markerData[selectedMarker.key].tel}
                    </div>
                    <div class="marker_detail">
                    {markerData[selectedMarker.key].detail}
                    </div>
                    <div className="btn-w">
                    <a
                        target="_blank"
                        rel="noopener"
                        href={markerData[selectedMarker.key].url}
                        className="btn-w-text"
                    >
                        式場の詳細を見る
                    </a>
                    </div>
                </div>
                </div>
            </InfoWindow>
            ))}
        </GoogleMap>
        </LoadScript>
    </>
  );
};

export default FuneralMap;

