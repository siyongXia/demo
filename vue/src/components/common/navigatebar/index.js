const NavigateBarComponent = require('./NavigateBar.vue')
const NavigateBar = {
  install: function(Vue) {
    Vue.component('NavigateBar', NavigateBarComponent)
  }
}
module.exports = NavigateBar

