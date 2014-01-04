/**
 * 中文汉字转拼音
 * topy?cn=汉字 > hàn zì
 * Created by John on 14-1-4.
 */

var pydic = require('./zmj.js');

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