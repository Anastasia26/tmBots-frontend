<template>
  <div class="container-fluid">
    <div class="user-header mt-4 row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <h3 class="title pr-4">{{$t('title')}}</h3>
        <b-button-group>
          <tmbuttons class="split-button"
                     v-bind:class="{ active: isActive === 1 }"
                     v-bind:bname="$t('juridical_btn')"
                     v-bind:clickhandler="openJuridicalInfo"/>
          <tmbuttons class="split-button"
                     v-bind:class="{ active: isActive === 0 }"
                     v-bind:bname="$t('physical_btn')"
                     v-bind:clickhandler="openPhysicalInfo"/>
        </b-button-group>
      </div>
    </div>
    <div class="user-content" ref="containerLoading">
      <div v-if="alert.message_getAccountInfo" :class="'alert ' + alert.type">
        {{alert.message_getAccountInfo}}
      </div>
      <JuridicalPerson class="active-page" v-if="displayJuridicalInfo" v-bind:show="displayJuridicalInfo" v-on:update:show="displayJuridicalInfo = $event"/>
      <PhysicalPerson class="active-page" v-if="displayPhysicalInfo" v-bind:show="displayPhysicalInfo" v-on:update:show="displayPhysicalInfo = $event"/>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import JuridicalPerson from "./juridical/JuridicalPerson";
    import PhysicalPerson from "./physial/PhysicalPerson";
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    export default {
        name: "UserProfile",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.user_profile_main'
        },
        data() {
            return {
                fullPage: false,
                isActive: 1,
                displayJuridicalInfo: true,
                displayPhysicalInfo: false,
                displayJuridicalEditUserInfo: false,
            }
        },
        computed: {
            activate: {
                get () {
                    return this.$store.state.account.activate
                },
            },
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user
            }),
        },
        methods: {
            openJuridicalInfo() {
                this.isActive = 1;
                this.displayJuridicalInfo = true;
                this.displayPhysicalInfo = false;
            },
            openPhysicalInfo() {
                this.isActive = 0;
                this.displayPhysicalInfo = true;
                this.displayJuridicalInfo = false;
            }
        },
        components: {PhysicalPerson, JuridicalPerson, tmbuttons}
    }
</script>

<style lang="scss">
    @import "../../assets/styles/userpage";
</style>
