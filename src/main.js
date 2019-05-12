import VueCurvedScreen from './CurvedScreen.vue'

export default VueCurvedScreen

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('VueCurvedScreen', VueCurvedScreen)
}
