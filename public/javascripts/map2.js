window.onload = function() {

    var latLng = new soso.maps.LatLng(39.77312294198696, 116.66354370117183);

    var map = new qq.maps.Map(document.getElementById('map'), {
        center: latLng,
        zoom: 13
    });

    // 画圆
    var cirle = new qq.maps.Circle({
        center: latLng,
        radius: 2000,
        map: map
    });


}