window.onload = function() {

    var map = new qq.maps.Map(document.getElementById('map'), {
        maxZoom: 12,
        zoom: 11,
        minZoom: 11
    });

    // 通过控制最大最小缩放级别，来控制地图的缩放速度
    qq.maps.event.addListener(map, 'zoom_changed', function(e){
        setTimeout(function(){
            var opt = {
                minZoom: map.zoom - 1,
                maxZoom: map.zoom + 1
            }
            map.setOptions(opt);
        }, 300);
    });

}