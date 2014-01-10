/**
 * 中文汉字转拼音
 * topy?cn=汉字 > hàn zì
 * Created by John on 14-1-4.
 */

var pydic = require('./zmj.js');
var http = require('http');
var url = require('url');

exports.topy = function(req, res) {

    var cn = req.query['cn'] ? req.query['cn'] : '';
    var output = req.query['output'] ? req.query['output'] : 'text';
    var callback = req.query['callback'] ? req.query['callback'] : '$$_callback && $$_callback';

    var py = '', s;
    for (var i=0; i < cn.length; i++){
        if (pydic.indexOf(cn.charAt(i)) !=-1 && cn.charCodeAt(i) > 200) {
            s = 1;
            while (pydic.charAt(pydic.indexOf(cn.charAt(i))+s) != ",") {
                py += pydic.charAt(pydic.indexOf(cn.charAt(i)) + s);
                s++;
            }
            py+=" ";
        }
        else {
            py+=cn.charAt(i);
        }
    }

    // 目前支持三种输出格式
    if (output == 'jsonp') {
        res.send(callback + ' && ' + callback + '({"result": "' + py + '"})');
    } else if(output == 'xml') {
        res.send('<?xml version="1.0"?>' + '<result>' + py + '</result>');
    } else if(output == 'json') {
        res.send('{"result": "' + py + '"}');
    } else {
        res.send(py);
    }

}



exports.tojsonp = function(req, res) {

    var target = req.query['target'];
    var callback = req.query['callback'] ? req.query['callback'] : '$$_callback && $$_callback';


//    http.createClient(80, 'api.t.sina.com.cn')
//        .request('GET', '/statuses/public_timeline.json?source=3243248798', {'host': 'api.t.sina.com.cn'})
//        .addListener('response', function(response){
//            var result = ''
//            response.addListener('data',function(data){
//                result += data
//            })
//                .addListener('end',function(){
//                    tweets = JSON.parse(result)
//                })
//        })
//        .end()

//    console.log(http.request('http://yd4p.cfapps.io/topy?cn=%E6%9E%97%E8%B6%85&output=json', function(resp){
//        console.log(resp);
//    }));


//    var r = http.request('http://yd4p.cfapps.io/topy?cn=%E6%9E%97%E8%B6%85&output=json', function(resp){
//        //console.log(resp);
//        resp.on('data', function(data){
//            console.log('data: ' + data);
//        })
//    })
//
//    console.log(r);



//    var opt = {
//        host: 'localhost',
//        port: 13080,
//        path: 'http://yd4p.cfapps.io/topy?cn=%E6%9E%97%E8%B6%85&output=json',
//        method: 'GET'
//    }
//
    var opt = url.parse(target);
    console.log(opt);
    http.get(opt, function(res2){
        res2.on('data', function(data){
            console.log('body : ' + data);
//            res.send(data);
        })
    })
//
//    req2.on('error',function(e){
//        console.log('Error got: '+e.message);
//    });
//    req2.end();

    res.send('');
//    res.send('tojsonp');
}