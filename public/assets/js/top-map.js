//GoogleMap機能
var map;
var marker = [];
var infoWindow = [];
    

function initMap() {
    // 地図の作成
    //Mapの初期値をリストの最初の住所に合わせる
    var firstAddress = markerData[0].address; // markerData配列から最初の住所を取得
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: firstAddress }, function (results, status) {
        var mapLatLng = new google.maps.LatLng({lat: 35.681236, lng: 139.767125}); // 初期位置
            map = new google.maps.Map(document.getElementById('funeralMap'), {
                center: mapLatLng, // 地図の中心を指定
                zoom: 9 // 地図のズームを指定
            });
            // マーカー毎の処理
            for (var i = 0; i < markerData.length; i++) {
                geocodeAddress(markerData[i], i); // ジオコーディング関数を呼び出し
            }
    });
}

// 住所からジオコーディングを行い、マーカーを設定
function geocodeAddress(location, i) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location.address }, function (results, status) {
        if (status === 'OK') {
            var markerLatLng = results[0].geometry.location;
            marker[i] = new google.maps.Marker({
                position: markerLatLng, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
            });

            infoWindow[i] = new google.maps.InfoWindow({
                content: `<div class="marker-w">
                            <div class="marker_name">
                            ${location.name ? location.name : ''}
                            </div>
                            <div class="marker-bt">
                                <div class="marker_area">
                                ${location.area ? location.area : ''}
                                </div>
                                <div class="marker_thumbnail">
                                <img src="${location.thumbnail ? location.thumbnail : ''}" alt="${location.name ? location.name : ''}">
                                </div>
                                <div class="marker_address">
                                <i class="ph-fill ph-map-pin marker_address--icon"></i>
                                ${location.address ? location.address : ''}
                                </div>
                                <div class="marker_detail">
                                ${location.detail ? location.detail : ''}
                                </div>
                                <div class="btn-w"><a target="_blank" rel="noopener" href="${location.url ? location.url : ''}" class="btn-w-text">式場の詳細を見る ></a></div>
                            </div>
                        </div>` // 吹き出しに表示する内容
            });

            markerEvent(i); // マーカーにクリックイベントを追加
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// マーカーにクリックイベントを追加
function markerEvent(i) {
    marker[i].addListener('click', function() { // マーカーをクリックしたとき
        infoWindow[i].open(map, marker[i]); // 吹き出しの表示
    });
}