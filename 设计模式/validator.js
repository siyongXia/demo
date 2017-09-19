/*策略对象*/
const strategies = {
    isNonEmpty(value, errorMsg) {
        return value === '' ?
            errorMsg : void 0
    },
    minLength(value, length, errorMsg) {
        return value.length < length ?
            errorMsg : void 0
    },
    isMoblie(value, errorMsg) {
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
            errorMsg : void 0
    },
    isEmail(value, errorMsg) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
            errorMsg : void 0
    }
}

export default class Validator {
    constructor() {
        this.cache = [] //保存校验规则
    }
    add(dom, rules) {
        for (let rule of rules) {
            let strategyAry = rule.strategy.split(':') //例如['minLength',6]
            let errorMsg = rule.errorMsg //'用户名不能为空'
            this.cache.push(() => {
                let strategy = strategyAry.shift() //用户挑选的strategy
                strategyAry.unshift(dom.value) //把input的value添加进参数列表
                strategyAry.push(errorMsg) //把errorMsg添加进参数列表，[dom.value,6,errorMsg]
                return strategies[strategy].apply(dom, strategyAry)
            })
        }
    }
    start() {
        for (let validatorFunc of this.cache) {
            let errorMsg = validatorFunc()//开始校验，并取得校验后的返回信息
            if (errorMsg) {//r如果有确切返回值，说明校验没有通过
                return errorMsg
            }
        }
    }
}

// 客户端代码实例
// let registerForm = document.querySelector('#registerForm')
import Validator from 'XXXX'
// const validatorFunc = () => {
//     let validator = new Validator()

//     validator.add(registerForm.userName, [{
//         strategy: 'isNonEmpty',
//         errorMsg: '用户名不能为空！'
//     }, {
//         strategy: 'minLength:6',
//         errorMsg: '用户名长度不能小于6位！'
//     }])

//     validator.add(registerForm.passWord, [{
//         strategy: 'isNonEmpty',
//         errorMsg: '密码不能为空！'
//     }, {
//         strategy: 'minLength:6',
//         errorMsg: '密码长度不能小于6位！'
//     }])

//     validator.add(registerForm.phoneNumber, [{
//         strategy: 'isNonEmpty',
//         errorMsg: '手机号码不能为空！'
//     }, {
//         strategy: 'isMoblie',
//         errorMsg: '手机号码格式不正确！'
//     }])

//     validator.add(registerForm.emailAddress, [{
//         strategy: 'isNonEmpty',
//         errorMsg: '邮箱地址不能为空！'
//     }, {
//         strategy: 'isEmail',
//         errorMsg: '邮箱地址格式不正确！'
//     }])
//     let errorMsg = validator.start()
//     return errorMsg
// }
// let errorMsg = validatorFunc()
// if (errorMsg) {
//     alert(errorMsg)
//     return false
// }