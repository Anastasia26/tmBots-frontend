<template>
  <div id="app">
    <div class="app-main-layout">
      <div class="d-flex flex-column min-vh-100">
        <Navbar/>
        <div class="container-fluid flex-grow-1" v-if="this.$route.meta.layout">
          <div class="row">
            <div class="col-lg-2 sidebar-layout-menu">
              <SidebarApp v-bind:showicon="true"/>
            </div>
            <div class="col-lg-10 col-md-12 col-sm-12 mt-title-spacing-bottom">
              <main class="app-content flex-grow-0">
                <router-view/>
              </main>
            </div>
          </div>
        </div>
        <div class="container flex-grow-1" v-else>
            <div class="mt-title-spacing-bottom">
              <main class="app-content flex-grow-0">
                <router-view/>
              </main>
            </div>
        </div>
        <Footer class=" flex-grow-0"/>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar";
import SidebarApp from "@/components/SidebarApp";
import Footer from "@/components/Footer";
export default {
  name: 'App',
    i18nOptions: {
        namespaces: '_common',
        keyPrefix: 'index'
    },
    mounted() {
        document.title = this.$i18n.i18next.t('_common:index')
    },
    components: {Navbar, SidebarApp, Footer}
}


</script>

