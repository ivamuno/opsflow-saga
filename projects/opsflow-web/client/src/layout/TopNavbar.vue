<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Dashboard</a>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <form role="search" class="navbar-form navbar-left navbar-search-form">
            <div class="input-group">
              <label for="searchInput"></label>
              <i class="nc-icon nc-zoom-split" style="margin-left: 10px"></i>
              <input id="searchInput" type="text" value="" placeholder="Search..." class="form-control" style="margin-left: 5px">
            </div>
          </form>
        </ul>
        <ul class="navbar-nav ml-auto">
          <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-bell-55"></i>
              <b class="caret"></b>
              <span class="notification">3</span>
            </template>
            <a class="dropdown-item" href="#">N 1</a>
            <a class="dropdown-item" href="#">N 2</a>
            <a class="dropdown-item" href="#">N 3</a>
          </base-dropdown>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-circle-09"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>

</style>
