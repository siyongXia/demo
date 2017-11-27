import axios from 'axios'
import { Toast } from 'mint-ui';
import * as utils from '../../../utils/util'

 var cid = utils.getUrlParam('cid') || '',
     jstoken = encodeURIComponent(utils.getAppToken()) || '';

export function getProductInfo(goods_id,order_id, cb, errCb) { //获取商品信息
    axios.get('/health/detail.html', { params: { goods_id,order_id,cid,jstoken} })
        .then((data) => {
            // console.log(data.data.status)
            if (parseInt(data.data.status, 10) === 200) {
                cb(data.data.data);
            }else {
                if(!order_id) {
                    Toast({
                        message: '商品已下架',
                        position: 'middle',
                        duration: 1000,
                        className: 'c_white'
                    });
                    setTimeout(()=>{
                        window.location.href ='/health/index.html';
                    },1000)
                }
                
            }
        })
        .catch((err) => {
            console.log(1);
            errCb(err);
        });
}

export function submitOrder(data, cb, errCb) { //提交订单
    data.cid = cid;
    data.jstoken = jstoken;    
    var value = utils.formateParams(data);
    axios({
            url: '/health/payready.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {
                if (data.data.status == 400) {
                    Toast({
                        message: data.data.message,
                        position: 'middle',
                        duration: 1000,
                        className: 'c_white'
                    });
                    cb(data.data.data)
                } else {
                    cb(data.data.data)
                }
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function addOrder(data, cb, errCb) { //添加订单
    data.cid = cid;
    data.jstoken = jstoken; 
    var value = utils.formateParams(data);
    axios({
            url: '/health/payready.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data.status, 10) === 200) {
                cb(data.data);
            }else if (parseInt(data.status, 10) === 401){
                Toast({
                    message: '请先完善账号信息',
                    position: 'middle',
                    duration: 1000,
                    className: 'c_white'
                });
                setTimeout(()=>{
                    location.href = '/user/login.html?url='+encodeURIComponent(data.data.url);
                },1000)
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function getPayMethod(cb, errCb) { //获取支付方式
    axios.get('/health/confirmorder.html',{ params: { cid,jstoken} })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {
                if (data.data.status == 400) {                    
                    location.href = '/user/login.html?redirect_url='+encodeURIComponent(location.href);                  
                   
                } else {
                    cb(data.data.data);
                }
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function getOrderList(p,cb, errCb) {
    axios.get('/health/getorderList.html',{ params: { cid,jstoken,p} })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {
                cb(data.data);
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function getOrderDetail(order_id, cb, errCb) {
    axios.get('/health/orderdetail.html', { params: { order_id, cid,jstoken} })
        .then((data) => {
            console.log(data);
            if (parseInt(data.status, 10) === 200) {
                if (data.data.status == 200) {
                    cb(data.data.data);
                } else {                        
                    location.href = '/user/login.html?redirect_url='+encodeURIComponent(location.href)
                }
            }

        })
        .catch((err) => {
            errCb(err);
        })
}

export function cancelOrder(data, cb, errCb) {
    data.cid = cid;
    data.jstoken = jstoken; 
    var value = utils.formateParams(data);
    axios({
            url: '/health/cancelorder.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {
                cb(data.data);
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function getRecommend(goods_id, cb, errCb) {
    axios.get('/health/getrecommend.html', { params: { goods_id ,cid,jstoken} })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {
                cb(data.data.data);
            }
        })
        .catch((err) => {
           cb([]);
        })
}