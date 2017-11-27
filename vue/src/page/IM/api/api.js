import axios from 'axios'
import { Toast } from 'mint-ui';
import * as utils from '../../../utils/util'

var cid = utils.getUrlParam('cid') || '',
jstoken = encodeURIComponent(utils.getAppToken()) || '';

export function getHisRecord(params, cb, errCb) { //拉取历史消息
    axios.get('/talk/history.html',{params:params})
    .then((data)=>{
        var list = data.data.data.list;       
        cb(list);
    })
    .catch((error)=>{
        console.log(error);
    })
}

export function submitOrder(data, cb, errCb) { //提交订单
    data.cid = cid;
    data.jstoken = jstoken;    
    var value = utils.formateParams(data);
    axios({
        url: '/health',
        method: 'post',
        data: value,
        headers:{
            'content-type':'application/json'
        }
    })
    .then((data) => {
        if (parseInt(data.status, 10) === 200) {

        }
    })
    .catch((err) => {
        errCb(err);
    })
}