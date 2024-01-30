//バツ押したら全部閉じちゃう　直したい

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const FuneralMap = () => {
  const mapStyles = {
    height: '800px',
    width: '80%',
  };

  const defaultCenter = {
    lat: 35.73215602774991,
    lng: 139.73428388525085,
  };

  const markerData = [
    // ... (同じデータをコピー)
    // ... (以前のコード)
    {
        name: "万世会館",
        url: "http://yukyousai.gaea.jp/saijyou/tiyoda-manseikaikan.html",
        area: "千代田区",
        address: "外神田1-1-7",
        tel: "03-5295-2831",
        detail: "１階 駐車場　２階 　受付ロビー　３階式場（５０名）和室4畳半　４階お清め（初七日など５０名）５階、６階は別料金で借りることができる （宿泊は３階のみ） 法要の利用は５階・６階"
    },
    {
        name: "セレモニーホール",
        url: "http://yukyousai.gaea.jp/saijyou/tyuouku-horu.html",
        area: "中央区",
        address: "勝どき1-13-19",
        tel: "03-5560-0611",
        detail: "式場は８０名、利用料　57,300円。控室１４畳 ２４名、集会室６０名 （１号室２７名・２号室３３名）"
    },
    {
        name: "やすらぎ会館",
        url: "http://yukyousai.gaea.jp/saijyou/minatoku-yasuragikaikan.html",
        area: "港区",
        address: "南青山2-34-1",
        tel: "03-3470-3117",
        detail: "港区やすらぎ会館・椅子席 ５０席・1階式場の告別式は９時～１０時です。2階式場は１１時～１２時　　　午後4時から翌日の午後3時まで 　　69,000円"
    },
    {
        name: "牛込箪笥区民センター",
        url: "http://yukyousai.gaea.jp/saijyou/shinnjyuku-ushigome.html",
        area: "新宿区",
        address: "箪笥町15",
        tel: "03-3260-3677",
        detail: "地下式場 椅子席４０名。和室８畳、収容人員１０名　使用料は、二日 ４２，７００円 (申込時に支払います）"
    },
    {
        name: "落合第一地域センター",
        url: "http://yukyousai.gaea.jp/saijyou/shinjyuku-otiaidaiiti.html",
        area: "新宿区",
        address: "下落合4-6-7",
        tel: "03-3951-9196",
        detail: "地下1F式場72め名　（A=定員36名　B=定員24名）"
    },
    {
        name: "若松地域センター",
        url: "http://yukyousai.gaea.jp/saijyou/shinjyukuku-wakamatu.html",
        area: "新宿区",
        address: "若松町12-6",
        tel: "03-3209-6030",
        detail: "地下ホール 椅子席４０名 （控室４畳半）・　集会室 椅子席４８名 テーブル８台　通夜と 告別式のセットで 26,200円"
    },
    {
        name: "榎木町地域センター",
        url: "http://yukyousai.gaea.jp/saijyou/shinjyukuku-enokityou.html",
        area: "新宿区",
        address: "早稲田町85",
        tel: "03-3202-8585",
        detail: "ホールＡ５４名　ホールＢ ３２名　和室６畳　通夜（午後・夜間）と告別式（午前・午後）で使用する場合は、23,100円"
    },
    {
        name: "氷川東会館",
        url: "http://yukyousai.gaea.jp/saijyou/shibuyaku-hikawahigashi.html",
        area: "渋谷区",
        address: "東2-20-18",
        tel: "03-3400-4438",
        detail: "小規模な葬儀会場　使用料1回 ５，０００円　施設式場 49m2　※施設の都合により使用できない場合がある"
    },
    {
        name: "なぎさ会館",
        url: "http://yukyousai.gaea.jp/saijyou/nagisa-kaikan.html",
        area: "品川区",
        address: "勝島3-1-3",
        tel: "03-5471-2700",
        detail: "式場 ( 定員各 60名)． 和室 ・8畳 30名　利用時間 午後4時～翌日 １５時。利用料金 65,000円　２組の葬儀を行うことができる"
    },
    {
        name: "セレモニー目黒",
        url: "http://yukyousai.gaea.jp/saijyou/seremoni-meguro.html",
        area: "目黒区",
        address: "八雲1-1-9",
        tel: "03-5701-3777",
        detail: "使用料二日 ７２，２００円　式場 ４２名 、洋室３０名、和室６畳、３畳(親族、式師控え室）２式場有ります　全館利用可能"
    },
    {
        name: "平和の森会館",
        url: "http://yukyousai.gaea.jp/saijyou/heiwanomori-kaikan.html",
        area: "大田区",
        address: "平和の森公園2-3",
        tel: "03-3766-4250",
        detail: "全館利用は ９１，８００円  ：　１階集会室（１）・（２）　和室（１）　６１，２００円　：　２階集会室（３）・（４）　和室（２）　３０，６００円                                                                                                                         　：１階集会室（１）、2階集会室（４）、和室（２）　４４，２００円　１階集会室（２）、２階集会室（３）、和室（１）　４７，６００円 \n"
    },
    {
        name: "みどり会館",
        url: "http://yukyousai.gaea.jp/saijyou/midorikaikan.html",
        area: "世田谷区",
        address: "北烏山5-1-5",
        tel: "03-5313-3131",
        detail: "2日 ８万４０００円。１６時３０分～翌日１６時００分。延長＠３，２００円＝ ８７，２００円：ホール ４５名程、清め室３０名程.１階控室は洋室。２階控室は和室。"
    },
    {
        name: "東高野会館",
        url: "http://yukyousai.gaea.jp/saijyou/nerimaku-higashikouyakaikan.html",
        area: "練馬区",
        address: "高野台3-10-3",
        tel: "03-3995-3724",
        detail: "大斎場 ９０名 ～ １５０名 　　 　 ８７，１５０ 円。 初七日 ３１，５００円：小斎場 ４０名 ～ １００名 　　 　 ７６，６５０円。　初七日 ２１，０００円　　別館斎場　８０名 ～ １３０名 　 ７６，６５０円。 　初七日 ２１，０００円"
    },
    {
        name: "大泉橋戸会館",
        url: "http://yukyousai.gaea.jp/saijyou/nerimaku-hashidokaikan.html",
        area: "練馬区",
        address: "大泉町6-24-26",
        tel: "03-3925-1325",
        detail: "斎場・・椅子席 １００名　１０８，１５０円　（控室 和室 ２１帖、２５帖。洋室３０帖）  練馬区指定葬儀場利用料が３万円を上限に助成される"
    },
    {
        name: "寶亀閣斎場",
        url: "http://yukyousai.gaea.jp/saijyou/nerimaku-houkikausaijou.html",
        area: "練馬区",
        address: "石神井台1-2-13",
        tel: "03-3996-0214",
        detail: "第一斎場（大）65席　 136,500円 （区外220,500円 第二斎場(小)31席　 105,000円 （区外136,500円 全館使用 210,000円 （区外315,000円 "
    },
    {
        name: "南池袋斎場",
        url: "http://yukyousai.gaea.jp/saijyou/minamiikebukurosaijou.html",
        area: "豊島区",
        address: "南池袋4-26-2",
        tel: "03-5396-2873",
        detail: "通夜、告別式 二日　５７，６００円 ・式場 （６０名、和室 （２８畳３０名）"
    },
    {
        name: "北区セレモニーホール",
        url: "http://yukyousai.gaea.jp/saijyou/kitakuseremonihoru.html",
        area: "北区",
        address: "浮間1-13-6",
        tel: "03-5392-0021",
        detail: "２階式場 ・ ３階式場 （６０名）及び和室（３０畳） ： ６０，０００円"
    },
    {
        name: "舟渡会館",
        url: "http://yukyousai.gaea.jp/saijyou/funatosaijou.html",
        area: "板橋区",
        address: "舟渡4-14-6",
        tel: "03-3967-6420",
        detail: "板橋区民は二日 ６０，０００円：１階式場 椅子席６０名、２階洋室 ４４席、家族控室 ６畳 宿泊可 ・ 式師控室３畳\n"
    },
    {
        name: "興善寺会館区民斎場",
        url: "http://yukyousai.gaea.jp/saijyou/bunkyouku-saijou.html",
        area: "文京区",
        address: "西方1-15-6",
        tel: "03-5803-1202",
        detail: "１階式場 ６０名　利用料金 二日 ９０，０００円。２階控室 １００名（２１帖、１７帖、ほか）"
    },
    {
        name: "徳雲会館（徳雲院内）",
        url: "http://yukyousai.gaea.jp/saijyou/taitouku-tokuunkaikan.html",
        area: "台東区",
        address: "東上野4-1-4",
        tel: "03-5426-1123",
        detail: "式場は５０名程度、会葬者１５０名以内、和室は家族控室、導師控え室：使用料は、利用者負担分 ２００，０００円。（差額は区が負担します）1階洋室は別途（６万円）"
    },
    {
        name: "千松閣(本性寺内）",
        url: "http://yukyousai.gaea.jp/saijyou/taitouku-sensyoukaku.html",
        area: "台東区",
        address: "清川1-1-2",
        tel: "03-3873-0611",
        detail: "式場は２０名程度、会葬者１００名以内　使用料は、利用者負担分 ８０，０００円"
    },
    {
        name: "臨海斎場",
        url: "http://yukyousai.gaea.jp/saijyou/rinkaisaijou.html",
        area: "大田区東海1-3-1",
        address: "",
        tel: "03-5732-2833",
        detail: "椅子席７０名 （控室 椅子席６４名、立食８０名） 宿泊可能。５区区民　式場料100,000円\n"
    },
    {
        name: "瑞江葬儀所",
        url: "http://yukyousai.gaea.jp/saijyou/mizuetop.htm",
        area: "江戸川区春江町3-26-1",
        address: "江戸川区春江町3-26-1",
        tel: "03-3670-0131",
        detail: "式場はなし"
    },
    {
        name: "府中の森市民聖苑",
        url: "http://yukyousai.gaea.jp/saijyou/huchutop.html",
        area: "府中市浅間町1-3",
        address: "",
        tel: "03-3670-0131",
        detail: " 第一式場・第二式場 ： 椅子席　９０名 二日 ５万円　　通夜 １５時３０分～２１時 　　第三式場　 ： 椅子席１４０名 　二日　１０万円　　第四式場 ： 椅子席 ５０名　二日　３万円"
    },
    {
        name: "南多摩斎場",
        url: "http://yukyousai.gaea.jp/saijyou/minamitamasaijou-top.html",
        area: "町田市上小山田町2147",
        address: "",
        tel: "042-797-7641",
        detail: "第一式場 １０４名 １４０，０００円 （市民外２８０，０００円：第二式場 　３５名 　５０，０００円 （市民外１００，０００円：　第三式場 　８０名 　５０，０００円 （市民外１０万 ・ 　　　　　　祭壇なし"
    },
    {
        name: "八王子市斎場",
        url: "http://yukyousai.gaea.jp/saijyou/hatioujisaijou-top.html",
        area: "八王子市山田町1681-2",
        address: "",
        tel: "0426-64-5707",
        detail: "第一式場・１５０人用 二日 ５万円　　通夜付添いは１万円　　控室 和室６畳：第二式場・　８０人用 二日 ４万円　　通夜付添いは１万円　　控室 和室６畳"
    },
    {
        name: "楢原斎場",
        url: "http://yukyousai.gaea.jp/hatiouji-naraharasaijyou.html",
        area: "八王子市楢原町１５７８－５",
        address: "",
        tel: "042-620-3101",
        detail: "使用料１４０,０００ 円 市民外２８万円 　利用時間は１５時～翌日１３時３０分式 場 ：椅子席８６名 （２室を１室として利用可 最大１７０席）　花祭壇も飾れるが、事前に相談"
    },
    {
        name: "青梅市民斎場",
        url: "http://yukyousai.gaea.jp/saijyou/oumesaijou-top.html",
        area: "青梅市長淵5-698-2",
        address: "",
        tel: "042-822-5200",
        detail: "第１式場 １００，０００円　　椅子席１２２席、会席室、遺族室・僧侶控室：第２式場 ８０，０００円 　 椅子席　９６席、会席室、遺族室、僧侶控室： 第３式場 ６０，０００円　　和室８０人対応(４５畳）会席室は兼用"
    },
    {
        name: "瑞穂斎場",
        url: "http://yukyousai.gaea.jp/saijyou/mizuhosaijou-top.html",
        area: "瑞穂町冨士山栗原新田244",
        address: "",
        tel: "042-557-0064",
        detail: "大式場 １５０人用 二日１００，０００円。　組合外２００，０００円。中式場 　７０人用 二日　８０，０００円。　組合外１６０，０００円。 小式場 　４０人用 二日　６０，０００円。　組合外１２０，０００円。"
    },
    {
        name: "ひので斎場",
        url: "http://yukyousai.gaea.jp/saijyou/hinode-top.html",
        area: "西多摩郡日の出町平井3092",
        address: "",
        tel: "042-597-2131",
        detail: "式場料 二日 １００，０００円　（夜間３万） 組合外２００，０００円 （夜間５万円） 椅子席１００名。式場利用に限り火葬時間は、１１時、１１時３０分が利用できる"
    },
    {
        name: "立川市斎場",
        url: "http://yukyousai.gaea.jp/saijyou/tatikawashisaijou-top.html",
        area: "立川市羽衣町3-20-23",
        address: "",
        tel: "042-524-1998",
        detail: " 式場収容人数は１００名程度。使用料は ： 二日４万円 （２階和室利用１万円） １階洋室５０名収容。２階和室１８畳、宿泊は１０名程度"
    },
    {
        name: "羽村富士見斎場",
        url: "http://yukyousai.gaea.jp/saijyou/hamurashisaijyou.html",
        area: "羽村市富士見平3-3-1",
        address: "",
        tel: "042-555-6269",
        detail: "　（１） 羽村市在住の方が死亡された場合（２） 喪主が羽村市在住の方（３） 羽村市富士見霊園に墓地を所有している方。：使用料二日７０，０００円"
    },
  ];

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const onLoad = (map) => {
    setMap(map);

    const listener = map.addListener('click', () => {
      if (selectedMarkers.length > 0) {
        // 選択されたマーカーがあればInfoWindowを閉じる
        handleInfoWindowClose();
      }
    });

    return () => {
      window.google.maps.event.removeListener(listener);
    };
  };

  useEffect(() => {
    if (isLoaded && map) {
      markerData.forEach((location, i) => {
        geocodeAddress(location, i);
      });
    }
  }, [isLoaded, map]);

  const geocodeAddress = (location, i) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location.address }, (results, status) => {
      if (status === 'OK') {
        const markerLatLng = results[0].geometry.location;
        setMarkers((prevMarkers) => [...prevMarkers, { position: markerLatLng, key: i }]);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarkers((prevSelectedMarkers) => [...prevSelectedMarkers, marker]);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarkers([]);
  };

  return (
    <>
        <h3>地図</h3>
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={12} onLoad={onLoad}>
            {markers.map((marker, i) => (
            <Marker
                key={i}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
            />
            ))}
            {selectedMarkers.map((selectedMarker, i) => (
            <InfoWindow
                key={i}
                position={selectedMarker.position}
                onCloseClick={handleInfoWindowClose}
            >
                <div className="marker-w">
                <div className="marker_name">
                    {markerData[selectedMarker.key].name}
                </div>
                <div className="marker-bt">
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