import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.config.productionTip = false

// <v-app> 루트 컴포넌트 그리고 테스트 컴포넌트로 대체될 요소 생성
const app = '<div id="app" data-app="true"><div></div></div>'
document.body.innerHTML += app
