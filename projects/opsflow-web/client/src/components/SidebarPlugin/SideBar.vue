<template>
  <div
    class="sidebar"
    :style="sidebarStyle"
    :data-color="backgroundColor"
    :data-image="backgroundImage"
    :data-active-color="activeColor"
  >
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <div class="logo">
        <a class="logo-mini">
          <div class="logo-img">
              <img :src="logo" alt="logo">
          </div>
        </a>
        <a href="" class="simple-text logo-normal">
          {{ title }}
        </a>
      </div>

      <ul class="nav">
        <slot name="links">
          <sidebar-item v-for="(link, index) in sidebarLinks" :key="link.name + index" :link="link">
            <sidebar-item
              v-for="(subLink, index) in link.children"
              :key="subLink.name + index"
              :link="subLink"
            ></sidebar-item>
          </sidebar-item>
        </slot>
      </ul>

      <slot></slot>
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    title: {
      type: String,
      default: 'OpsFlow',
    },
    backgroundColor: {
      type: String,
      default: 'orange',
      validator: value => {
        let acceptedValues = [
          '',
          'blue',
          'azure',
          'green',
          'orange',
          'red',
          'purple',
          'black',
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: value => {
        let acceptedValues = [
          'primary',
          'info',
          'success',
          'warning',
          'danger',
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    logo: {
      type: String,
      default: 'img/logo.svg',
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
      };
    },
  },
  methods: {
    async initScrollBarAsync() {
      await import('../../assets/css/perfect-scrollbar.css');
      const PerfectScroll = await import('perfect-scrollbar');
      PerfectScroll.initialize(this.$refs.sidebarScrollArea);
    },
  },
  mounted() {
    this.initScrollBarAsync();
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>
<style>
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
</style>
