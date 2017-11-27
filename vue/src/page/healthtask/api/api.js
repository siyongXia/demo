import axios from 'axios'
import {Toast} from 'mint-ui';
import * as utils from '../../../utils/util'

var cid = utils.getUrlParam('cid') || '',
    jstoken = encodeURIComponent(utils.getAppToken());
    // code = utils.getUrlParam('code') || '';

    

export function getData(cb, errCb) { //获取任务信息    
    var value = utils.formateParams({cid});
    axios({
        url:'/healthplan/index.html',
        method: 'post',
        data: value
    })
    .then((data) => {
        if (parseInt(data.status, 10) === 200) {
            cb(data.data.data);
        }
    })
    .catch((err) => {
        errCb(err);
    });
}

export function signIn(cb, errCb) { //获取任务信息
    var value = utils.formateParams({cid});
    axios({
        url:'/healthplan/signin.html',
        method: 'post',
        data: value
    })
    .then((data) => {
        if (parseInt(data.status, 10) === 200) {
            cb(data.data.data);
        }
    })
    .catch((err) => {
        errCb(err);
    });
}

export function delTask(data,cb, errCb) { //删除任务
    data.cid = cid;
	var value = utils.formateParams(data);
   	axios({
            url: '/healthplan/deltask.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {                
                cb(data.data)               
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function getSettings(data,cb, errCb) { //获取设置
    data.cid = cid;
	var value = utils.formateParams(data);
   	axios({
            url: '/healthplan/gettasknotice.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {                
                cb(data.data)               
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function getHealthTask(data,cb, errCb) { //获取健康任务详情
    data.cid = cid;
	var value = utils.formateParams(data);
   	axios({
            url: '/healthplan/healthtask.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {                
                cb(data.data)               
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function getTodayTask(data,cb, errCb) { //获取今日任务详情
    data.cid = cid;
	var value = utils.formateParams(data);
   	axios({
            url: '/healthplan/todaytask.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {                
                cb(data.data)               
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function completeTask(data,cb, errCb) { //获取今日任务详情
    data.cid = cid;
	var value = utils.formateParams(data);
   	axios({
            url: '/healthplan/completetask.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {                
                cb(data.data)               
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function saveNotive(data,cb, errCb) { //修改/添加设置
    data.cid = cid;
	var value = utils.formateParams(data);
   	axios({
            url: '/healthplan/savenotice.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {                
                cb(data.data)               
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function addTask(data,cb, errCb) { //添加任务
    data.cid = cid;
    var value = utils.formateParams(data);
    axios({
            url: '/healthplan/addtask.html',
            method: 'post',
            data: value
        })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {                
                cb(data.data)               
            }
        })
        .catch((err) => {
            errCb(err);
        })
}

export function isSigned(options, cb, errCb) { //获取商品信息
    axios.get('/health/detail.html', { params: { goods_id: options,cid} })
        .then((data) => {
            if (parseInt(data.status, 10) === 200) {
                cb(data.data.data);
            }
        })
        .catch((err) => {
            errCb(err);
        });
}