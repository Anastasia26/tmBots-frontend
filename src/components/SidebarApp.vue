<template>
  <div class="sidebar-wrapper mt-4 pl-2" v-if="account.loggedIn">
    <div v-bind:class="{ 'show-sidebar-menu-items': !user.is_trial }">
      <router-link to="/search-query" >
        <div class="row justify-content-md-center justify-content-sm-center">
          <div class="col-xl-3 icon-content d-flex justify-content-center align-items-center" v-if="showicon">
            <img src="../assets/img/icons/file-group.png"/>
          </div>
          <div class="col-xl-9 d-flex align-items-center text-lg-left text-md-center text-sm-center mob-item">
            {{$t('create_query')}}
          </div>
        </div>
        <hr>
      </router-link>
      <router-link to="/search-report">
        <div class="row justify-content-md-center justify-content-sm-center">
          <div class="col-xl-3 icon-content d-flex justify-content-center align-items-center" v-if="showicon">
            <img src="../assets/img/icons/file-text-2.png"/>
          </div>
          <div class="col-xl-9 d-flex align-items-center text-lg-left text-md-center text-sm-center mob-item">
            {{$t('all_query')}}
          </div>
        </div>
        <hr>
      </router-link>
      <router-link to="/new-search-query" v-bind:class="{ 'show-sidebar-menu-items': user.requests_count >= user.search_package.max_requests }">
        <div class="row justify-content-md-center justify-content-sm-center">
          <div class="col-xl-3 icon-content d-flex justify-content-center align-items-center" v-if="showicon">
            <img src="../assets/img/icons/file-text.png"/>
          </div>
          <div class="col-xl-9 d-flex align-items-center text-lg-left text-md-center text-sm-center mob-item">
            {{$t('new_query')}}
          </div>
        </div>
        <hr>
      </router-link>
    </div>

    <router-link to="/balance">
      <div class="row justify-content-md-center justify-content-sm-center">
        <div class="col-xl-3 icon-content d-flex justify-content-center align-items-center" v-if="showicon">
          <img src="../assets/img/icons/green-credit-card.png"/>
        </div>
        <div class="col-xl-9 d-flex align-items-center text-lg-left text-md-center text-sm-center mob-item">
          {{$t('balance')}}
        </div>
      </div>
      <hr>
    </router-link>
    <router-link to="/profile">
      <div class="row justify-content-md-center justify-content-sm-center">
        <div class="col-xl-3 icon-content d-flex justify-content-center align-items-center" v-if="showicon">
          <img src="../assets/img/icons/users.png"/>
        </div>
        <div class="col-xl-9 d-flex align-items-center text-lg-left text-md-center text-sm-center mob-item">
          {{$t('user_data')}}
        </div>
      </div>
      <hr>
    </router-link>
  </div>
</template>

<script>
    import {mapState } from 'vuex'
    export default {
        name: "SidebarApp",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.sidebar'
        },
        props: {
            showicon: {
                type: Boolean,
                required: false,
            },
        },
        data() {
            return {
                activeSubmenus: {},
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                user: state => state.account.user,
            }),
        },
    }
</script>

<style lang="scss">
  .sidebar-wrapper{
    a{
      color: var(--subtitle-black-color);
      text-decoration: none;
      background-color: transparent;
      &:hover {
        color: var(--dark-green-color)!important;
        text-decoration: none!important;
        background-color: transparent;
      }
    }
    .show-sidebar-menu-items {
      display: none;
    }
    .router-link-active {
      color: var(--dark-green-color)!important;
    }
  }


  @media (max-width: 991px) {
    .layout-menu-mob {
      display: inline;
      .mob-item {
        padding: 10px;
        font-size: 16px;
        color: white;
      }
      hr {
        display: none;
      }
    }
  }

  @media (max-width: 1247px) {
    .sidebar-wrapper {
      font-size: 12px;
      .icon-content {
        border-radius: 60%;
        max-width: 40px;
        height: 40px;
      }
    }
  }

  @media (min-width: 992px) {
    .layout-menu {
      display: none;
    }

    .layout-menu-mob {
      display: none;
    }
  }

</style>
