import './polyfills'
// Notifications plugin. Used on Notifications page
// Validation plugin used to validate forms
import VeeValidate from 'vee-validate'
// A plugin file where you could register global components used across the app
import GlobalComponents from './globalComponents'
// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives'
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from './components/SidebarPlugin'
import NotificationPlugin from './components/NotificationPlugin'
// Tabs plugin. Used on Panels page.
import VueTabs from 'vue-nav-tabs'

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)

// asset imports
import './assets/css/base.css'
import './assets/css/bootstrap.css'
import './assets/css/button.css'
import './assets/css/collapse.css'
import './assets/css/date-picker.css'
import './assets/css/demo.css'
import './assets/css/input.css'
import './assets/css/input-number.css'
import './assets/css/light-bootstrap-dashboard.css'
import './assets/css/nucleo_icons.css'
//import './assets/css/light-dashboard.css'
import './assets/css/option.css'
import './assets/css/perfect-scrollbar.css'
import './assets/css/select.css'
import './assets/css/slider.css'
import './assets/css/table.css'
import './assets/css/table-column.css'
import './assets/css/tag.css'
import './assets/css/time-select.css'
import './assets/css/vue-github-buttons.css'
import './assets/css/vue-form-wizard.min.css'
import './assets/sass/light-bootstrap-dashboard.scss'
import 'vue-nav-tabs/themes/vue-tabs.scss'

export default {
  async install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(SideBar)
    Vue.use(NotificationPlugin)
    Vue.use(VueTabs)
    Vue.use(VeeValidate)
  }
}
