import VList from './components/list';
import Main from "./components/pollingData/index";
const components = [VList, Main]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default install