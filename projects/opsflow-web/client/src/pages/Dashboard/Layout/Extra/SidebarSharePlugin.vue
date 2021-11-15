<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{show: isOpen}">
      <a data-toggle="dropdown">
        <i class="fa fa-cog fa-2x" @click="toggleDropDown"> </i>
      </a>
      <ul class="dropdown-menu" :class="{show: isOpen}">
        <li class="adjustments-line">
          <a href="#" class="switch-trigger centered-row">
            <p>Background Image</p>
            <l-switch on-text="ON" off-text="OFF" :value="backgroundImageEnabled"
                      @input="(val) => updateValue('backgroundImageEnabled', val)"></l-switch>
          </a>
        </li>
        <li class="adjustments-line">
          <a href="#" class="switch-trigger centered-row">
            <p>Sidebar Mini</p>
            <l-switch on-text="ON" off-text="OFF" :value="sidebarMini"
                      @input="(val) => updateValue('sidebarMini', val)"></l-switch>
          </a>
        </li>
        <!--<li class="adjustments-line">
          <a href="#" class="switch-trigger centered-row">
            <p>Fixed Navbar</p>
            <l-switch on-text="ON" off-text="OFF" :value="fixedNavbar"
                      @input="(val) => updateValue('fixedNavbar', val)"></l-switch>
          </a>
        </li>-->
        <li class="adjustments-line text-center">
          <a class="switch-trigger background-color">
            <p>Filters</p>
            <div class="pull-right centered-row">
            <span v-for="item in sidebarColors" class="badge filter" v-bind:key="item"
                  :class="[`badge-${item.color}`,{active:item.active}]"
                  :data-color="item.color"
                  @click="changeSidebarBackground(item)">

                        </span>
            </div>
            <div class="clearfix"></div>
          </a>
        </li>
        <li class="header-title">Sidebar Images</li>
        <li v-for="image in images"
            :key="image.src"
            :class="{active: image.active}">
          <a class="img-holder switch-trigger dropdown-item">
            <img @click="changeSidebarImage(image)"
                 :src="image.src"
                 alt="..."></a>
        </li>

        <li class="button-container">
          <div class="">
            <a :href="freeUrl" target="_blank"
               class="btn btn-info btn-block btn-fill">Get Free Demo</a>
          </div>
        </li>

        <li class="button-container">
          <div class="">
            <a :href="buyUrl" target="_blank" class="btn btn-danger btn-block btn-fill">Buy for $49</a>
          </div>
        </li>

        <li class="button-container">
          <div class="">
            <a :href="documentationLink" target="_blank" class="btn btn-default btn-block">Documentation</a>
          </div>
        </li>

        <li class="header-title d-flex justify-content-center">Thank you for sharing!</li>

        <li class="button-container">
          <social-sharing :url="shareUrl" inline-template
                          title="Vue Light Bootstrap Dashboard PRO - Premium Bootstrap Admin Template for Vue.js"
                          hashtags="vuejs, dashboard, bootstrap" twitter-user="creativetim">
            <div class="centered-buttons">
              <network network="facebook" class="btn btn-facebook btn-icon">
                <i class="fa fa-fw fa-facebook"></i>
              </network>
              <network network="pinterest" class="btn btn-pinterest btn-icon">
                <i class="fa fa-fw fa-pinterest"></i>
              </network>
              <network network="twitter" class="btn btn-twitter btn-icon">
                <i class="fa fa-fw fa-twitter"></i>
              </network>
            </div>
          </social-sharing>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import SocialSharing from 'vue-social-sharing'
  import VueGitHubButtons from 'vue-github-buttons'
  import '../../../../assets/css/vue-github-buttons.css'
  import { Switch as LSwitch } from '../../../../components'

  Vue.use(SocialSharing)
  Vue.use(VueGitHubButtons, {useCache: true})
  export default {
    components: {
      LSwitch
    },
    props: {
      color: {
        type: String,
        default: 'black'
      },
      image: {
        type: String,
        default: ''
      },
      backgroundImageEnabled: Boolean,
      sidebarMini: Boolean,
      fixedNavbar: Boolean
    },
    data () {
      return {
        documentationLink: 'http://demos.creative-tim.com/vue-light-bootstrap-dashboard-pro/documentation/#/getting-started',
        shareUrl: 'https://www.creative-tim.com/product/vue-light-bootstrap-dashboard-pro',
        buyUrl: 'https://www.creative-tim.com/product/vue-light-bootstrap-dashboard-pro',
        freeUrl: 'https://www.creative-tim.com/product/vue-light-bootstrap-dashboard',
        isOpen: false,
        sidebarColors: [
          {color: 'black', active: true},
          {color: 'azure', active: false},
          {color: 'green', active: false},
          {color: 'blue', active: false},
          {color: 'orange', active: false},
          {color: 'red', active: false},
          {color: 'purple', active: false}
        ],
        images: [
          {src: 'static/img/sidebar-1.jpg', active: false},
          {src: 'static/img/sidebar-3.jpg', active: false},
          {src: 'static/img/sidebar-4.jpg', active: false},
          {src: 'static/img/sidebar-5.jpg', active: true}
        ]
      }
    },
    methods: {
      toggleDropDown () {
        this.isOpen = !this.isOpen
      },
      closeDropDown () {
        this.isOpen = false
      },
      toggleList (list, itemToActivate) {
        list.forEach((listItem) => {
          listItem.active = false
        })
        itemToActivate.active = true
      },
      updateValue (name, val) {
        this.$emit(`update:${name}`, val)
      },
      changeSidebarBackground (item) {
        this.$emit('update:color', item.color)
        this.toggleList(this.sidebarColors, item)
      },
      changeSidebarImage (item) {
        this.$emit('update:image', item.src)
        this.$emit('update:backgroundImageEnabled', true)
        this.toggleList(this.images, item)
      }
    },
    watch: {
      image (val) {
        let img = this.images.find(image => val === image.src)
        if (img && !img.active) {
          this.changeSidebarImage(img)
        }
      }
    }
  }
</script>
<style>
  .centered-row {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .button-container .btn {
    margin-right: 10px;
  }

  .centered-buttons {
    display: flex;
    justify-content: center;
  }
</style>
