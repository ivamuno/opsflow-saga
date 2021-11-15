<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <side-bar :background-color="sidebarBackground"
              :background-image="sidebarBackgroundImage">
      <mobile-menu></mobile-menu>
      <!-- TODO: <template slot-scope="props" slot="links">-->
      <template slot="links">
        <sidebar-item :style="'margin-top: 20px; margin-bottom: 40px'" :link="{name: 'Dashboard', icon: 'nc-icon nc-chart-pie-35', path: '/admin/overview'}" />

        <sidebar-item :link="{icon: 'nc-icon nc-planet', name: 'AceHub', path: '/platforms/aceHub' }" />
        <sidebar-item :link="{icon: 'nc-icon nc-lock-circle-open', name: 'AceProtect', path: '/platforms/aceProtect' }" />
        <sidebar-item :link="{icon: 'nc-icon nc-atom', name: 'ATOM', path: '/platforms/atom' }" />
        <sidebar-item :link="{icon: 'nc-icon nc-credit-card', name: 'CardEngine' }">
            <sidebar-item :link="{name: 'Create', path: '/platforms/cardEngine/create'}" />
            <sidebar-item :link="{name: 'Express', path: '/platforms/cardEngine/express'}" />
        </sidebar-item>
        <sidebar-item :link="{icon: 'nc-icon nc-chart-pie-36', name: 'SlicePay', path: '/platforms/slicepay' }" />
        <sidebar-item :style="'margin-bottom: 40px'" :link="{icon: 'nc-icon nc-send', name: 'Webhooks', path: '/platforms/webhooks' }" />

        <sidebar-item :link="{name: 'Documentation', icon: 'nc-icon nc-notes', path: '/admin/doc'}" />
        <sidebar-item :style="'margin-bottom: 40px'" :link="{name: 'Developers', icon: 'nc-icon nc-controller-modern'}">
          <sidebar-item :link="{name: 'Components', icon: 'nc-icon nc-app'}">
            <sidebar-item :link="{name: 'Buttons', path: '/components/buttons'}"></sidebar-item>
            <sidebar-item :link="{name: 'Grid System', path: '/components/grid-system'}"></sidebar-item>
            <sidebar-item :link="{name: 'Panels', path: '/components/panels'}"></sidebar-item>
            <sidebar-item :link="{name: 'Sweet Alert', path: '/components/sweet-alert'}"></sidebar-item>
            <sidebar-item :link="{name: 'Notifications', path: '/components/notifications'}"></sidebar-item>
            <sidebar-item :link="{name: 'Icons', path: '/components/icons'}"></sidebar-item>
            <sidebar-item :link="{name: 'Typography', path: '/components/typography'}"></sidebar-item>
          </sidebar-item>
          <sidebar-item :link="{name: 'Forms', icon: 'nc-icon nc-notes'}">
            <sidebar-item :link="{name: 'Regular Forms', path: '/forms/regular'}"></sidebar-item>
            <sidebar-item :link="{name: 'Extended Forms', path: '/forms/extended'}"></sidebar-item>
            <sidebar-item :link="{name: 'Validation Forms', path: '/forms/validation'}"></sidebar-item>
            <sidebar-item :link="{name: 'Wizard', path: '/forms/wizard'}"></sidebar-item>
          </sidebar-item>
          <sidebar-item :link="{name: 'Tables', icon: 'nc-icon nc-paper-2'}">
            <sidebar-item :link="{name: 'Regular Tables', path: '/table-list/regular'}"></sidebar-item>
            <sidebar-item :link="{name: 'Extended Tables', path: '/table-list/extended'}"></sidebar-item>
            <sidebar-item :link="{name: 'Paginated Tables', path: '/table-list/paginated'}"></sidebar-item>
          </sidebar-item>
          <sidebar-item :link="{name: 'Maps', icon: 'nc-icon nc-pin-3'}">
            <sidebar-item :link="{name: 'Google Maps', path: '/maps/google'}"></sidebar-item>
            <sidebar-item :link="{name: 'Full Screen Maps', path: '/maps/full-screen'}"></sidebar-item>
            <sidebar-item :link="{name: 'Vector Maps', path: '/maps/vector-map'}"></sidebar-item>
          </sidebar-item>
          <sidebar-item :link="{name: 'Charts', icon: 'nc-icon nc-chart-bar-32', path: '/admin/charts'}"></sidebar-item>
          <sidebar-item
            :link="{name: 'Calendar', icon: 'nc-icon nc-single-copy-04', path: '/admin/calendar'}"></sidebar-item>
          <sidebar-item :link="{name: 'Pages', icon: 'nc-icon nc-puzzle-10'}">
            <sidebar-item :link="{name: 'User Page', path: '/pages/user'}"></sidebar-item>
            <sidebar-item :link="{name: 'Login Page', path: '/login'}"></sidebar-item>
            <sidebar-item :link="{name: 'Register', path: '/register'}"></sidebar-item>
            <sidebar-item :link="{name: 'Lock Screen Page', path: '/lock'}"></sidebar-item>
          </sidebar-item>
        </sidebar-item>

      </template>
      <ul class="nav nav-bottom">
        <li class="nav-link">
          <a class="switch-trigger centered-row">
            <p>Is Production</p>
            <l-switch :value="envSwitchLiveOn" :color="green"
                      @input="(val) => changeSidebarBackground(val)">
              <i class="fa fa-check" slot="on"></i>
              <i class="fa fa-times" slot="off"></i>
            </l-switch>
          </a>
        </li>
      </ul>
      <!--<user-menu></user-menu>-->
    </side-bar>
    <div class="main-panel">
      <top-navbar :class="{'navbar-fixed': fixedNavbar}"></top-navbar>
      <sidebar-share :color.sync="sidebarBackground"
                     :backgroundImageEnabled.sync="sidebarBackgroundImageEnabled"
                     :fixed-navbar.sync="fixedNavbar"
                     :sidebarMini.sync="sidebarMini"
                     :image.sync="sidebarBackgroundImage">
      </sidebar-share>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './Extra/MobileMenu.vue'
  // import UserMenu from './Extra/UserMenu.vue'

  import SidebarShare from './Extra/SidebarSharePlugin.vue'

  import LSwitch from '../../../components/Switch'

  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu,
      //UserMenu,
      LSwitch,
      SidebarShare
    },
    data () {
      return {
        sidebarBackground: 'orange',
        sidebarBackgroundImage: 'static/img/sidebar-5.jpg',
        sidebarBackgroundImageEnabled: false,
        fixedNavbar: false,
        sidebarMini: false,
        envSwitchLiveOn: false
      }
    },
    methods: {
      changeSidebarBackground (isLive) {
        this.envSwitchLiveOn = isLive;
        this.sidebarBackground = isLive ? 'red' : 'orange';
      },
      toggleSidebar () {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      },
      minimizeSidebar () {
        this.$sidebar.toggleMinimize()
      }
    },
    watch: {
      // TODO: sidebarMini (val) {
      sidebarMini () {
        this.minimizeSidebar()
      },
      sidebarBackgroundImageEnabled (val) {
        if (!val) {
          this.sidebarBackgroundImage = ''
        } else {
          this.sidebarBackgroundImage = 'static/img/sidebar-5.jpg'
        }
      }
    }
  }

</script>
