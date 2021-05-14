<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container-fluid">
        <div class="logo-section position-relative" v-if="account.loggedIn">
          <img src="../assets/img/search.png">
          <router-link to="/search-query">
            <b-navbar-brand>TMbots</b-navbar-brand>
          </router-link>
        </div>
        <div class="logo-section position-relative" v-else>
          <img src="../assets/img/search.png">
          <router-link to="/">
            <b-navbar-brand>TMbots</b-navbar-brand>
          </router-link>
        </div>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <SidebarApp class="layout-menu-mob"/>
            <span class="dropdowns-title">{{$t('lang')}}: </span>
            <Dropdown v-model="selectedLanguage" @change="toggleLanguage" :options="languages" optionLabel="name">
              <template #value="slotProps">
                <div class="country-item country-item-value" v-if="slotProps.value">
                  <div class="nav-country d-inline">{{slotProps.value.name}}</div>
                  <b-icon icon="caret-down-fill"></b-icon>
                </div>
                <span v-else>{{slotProps.placeholder}}</span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <img :src="require(`../assets/img/flags${slotProps.option.img}`)"
                       :class="'flag flag-' + slotProps.option.code.toLowerCase()"/>
                  <div>{{slotProps.option.name}}</div>
                </div>
              </template>
            </Dropdown>
            <span v-if="!account.loggedIn" @click="openLoginForm">{{$t('content.login')}}</span>
            <span v-if="!account.loggedIn" class="nav-devider" href="">|</span>
            <span v-if="!account.loggedIn" @click="openRegisterForm">{{$t('content.register')}}</span>
            <b-nav-item-dropdown right v-if="account.loggedIn">
              <template v-slot:button-content>
                <img src="../assets/img/user.png">
                {{$t('content.cabinet')}}
              </template>
              <b-dropdown-item @click="userlogout">{{$t('content.exit')}}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <div class="test_user d-flex justify-content-center" v-if="account.loggedIn && user.is_trial">
      <p class="p-1" v-if="user.trial_acc_end_date.length == 0">{{$t('no_test_user')}}</p>
      <p class="p-1" v-else>{{$t('test_user')}} {{new Date(user.trial_acc_end_date) | dateFormat('DD.MM.YYYY')}}</p>
    </div>

    <Register v-bind:show="displayRegisterForm" v-on:openloginform="openLoginForm" v-on:finishregister="switchFinish($event)" v-on:update:show="displayRegisterForm = $event"/>
    <FinishRegister v-bind:show="displayFinishForm" v-bind:email="currentemail" v-on:update:show="displayFinishForm = $event"/>
    <Login v-bind:show="displayLoginForm" v-on:openRemindpasswordform="openRemindPasswordForm" v-on:update:show="displayLoginForm = $event"/>
    <RemindPasswordForm v-bind:show="displayRemindPasswordForm" v-on:openpasswordform="finishResetPassword($event)" v-on:update:show="displayRemindPasswordForm = $event"/>
    <FinishResetPass v-bind:show="displayResetPassFinishForm" v-on:update:show="displayResetPassFinishForm = $event"/>
  </div>
</template>

<script>
    import {mapActions, mapState } from 'vuex'
    import Dropdown from 'primevue/dropdown';
    import Register from '@/components/modals/Register';
    import FinishRegister from "@/components/modals/FinishRegister";
    import Login from "@/components/modals/Login";
    import RemindPasswordForm from "@/components/modals/RemindPasswordForm";
    import SidebarApp from "./SidebarApp";
    import FinishResetPass from "./modals/FinishResetPass";

    export default {
        name: "Navbar",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.navbar'
        },
        data() {
            return {
                selectedLanguage: {name: 'Українська', code: 'ua'},
                languages: [
                    {name: 'Українська', img: '/ukraine.png', code: 'ua'},
                    {name: 'Росiйська', img: '/russia.png', code: 'ru'},
                    {name: 'Польська', img: '/poland.png', code: 'pl'}
                ],
                currentemail: '',
                displayBasic: false,
                displayBasic2: false,
                displayModal: false,
                displayRegisterForm: false,
                displayFinishForm: false,
                displayResetPassFinishForm: false,
                displayLoginForm: false,
                displayCheckForm: false,
                displayRemindPasswordForm: false,
                displayPasswordForm: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false,
            }
        },
        mounted() {
            if (localStorage.getItem("current_lang") === 'ua') {
                this.selectedLanguage = {name: 'Українська', code: 'ua'};
                this.languages = [
                    {name: 'Українська', img: '/ukraine.png', code: 'ua'},
                    {name: 'Росiйська', img: '/russia.png', code: 'ru'},
                    {name: 'Польська', img: '/poland.png', code: 'pl'}
                ];
                this.$i18n.i18next.changeLanguage(this.selectedLanguage.code);
            }
            if (localStorage.getItem("current_lang") === 'ru') {
                this.selectedLanguage = {name: 'Русский', code: 'ru'};
                this.languages = [
                    {name: 'Украинский', img: '/ukraine.png', code: 'ua'},
                    {name: 'Русский', img: '/russia.png', code: 'ru'},
                    {name: 'Польська', img: '/poland.png', code: 'pl'}
                ];
                this.$i18n.i18next.changeLanguage(this.selectedLanguage.code);
            }
            if (localStorage.getItem("current_lang") === 'pl') {
                this.selectedLanguage = {name: 'Polskie', code: 'pl'};
                this.languages = [
                    {name: 'Ukraiński', img: '/ukraine.png', code: 'ua'},
                    {name: 'Rosyjski', img: '/russia.png', code: 'ru'},
                    {name: 'Polskie', img: '/poland.png', code: 'pl'}
                ];
                this.$i18n.i18next.changeLanguage(this.selectedLanguage.code);
            }

            if(localStorage.getItem("access") && localStorage.getItem("refresh")) {
                let loader = this.$loading.show({
                    container: this.fullPage ? null : this.$refs.containerLoading,
                    canCancel: false,
                    onCancel: this.onCancel,
                });
                this.getAccountInfo().then((response) => {
                    if (response) {
                        loader.hide();
                    }
                });
            }
        },

        computed: {
            ...mapState({
                account: state => state.account,
                user: state => state.account.user,
            }),
        },
        methods: {
            ...mapActions('account', ['logout', 'getAccountInfo']),

            openRegisterForm() {
                this.displayRegisterForm = true;
            },
            openLoginForm() {
                this.displayLoginForm = true;
                this.displayRegisterForm = false;
            },
            openRemindPasswordForm() {
                this.displayRemindPasswordForm = true;
                this.displayLoginForm = false;
            },
            finishResetPassword() {
                this.displayRemindPasswordForm = false;
                this.displayResetPassFinishForm = true;
            },
            switchFinish(email) {
                this.currentemail = email;
                this.displayRegisterForm = false;
                this.displayFinishForm = true;
            },
            userlogout() {
                this.logout();
            },
            toggleLanguage(event) {
                this.$i18n.i18next.changeLanguage(this.selectedLanguage.code);
                localStorage.setItem('current_lang', this.selectedLanguage.code);
                if (this.selectedLanguage.code === 'ua') {
                    this.selectedLanguage = {name: 'Українська'};
                    window.location.reload();
                }
                if (this.selectedLanguage.code === 'ru') {
                    this.selectedLanguage = {name: 'Русский'};
                    window.location.reload();
                }
                if (this.selectedLanguage.code === 'pl') {
                    this.selectedLanguage = {name: 'Polskie'};
                    window.location.reload();
                }
            },
        },
        components: {FinishResetPass, SidebarApp, RemindPasswordForm, Login, FinishRegister, Register, Dropdown}
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/navbar.scss";
</style>
