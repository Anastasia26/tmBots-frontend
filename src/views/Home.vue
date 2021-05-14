<template>
  <div class="main-wrapper container" ref="containerLoading">
    <section class="banner d-flex align-items-center">
      <div class="row">
        <div class="col-xl-6 col-md-6 col-sm-12 title-section text-left">
          <h3 class="title">{{$t('banner.title')}}</h3>
          <p class="subtitle mt-md-5 mt-sm-3">{{$t('banner.subtitle')}}</p>
          <tmbuttons class="btn-tm home-btn mt-4"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="openRegisterForm"/>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 mt-md-0 mt-sm-5 banner-img-section">
          <img src="../assets/img/dog.png"/>
        </div>
      </div>
      <div class="banner-pattern">
        <img src="../assets/img/wave-line.png"/>
      </div>
    </section>
    <section class="service-advantages">
      <div class="row mb-5 d-flex align-items-center">
        <div class="col-xl-6 col-md-6 col-sm-12 d-flex justify-content-center">
          <img src="../assets/img/home-img1.png"/>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 title-section text-xl-left text-md-left text-sm-center">
          <h3 class="title text-shadow">{{$t('service.fasttext.title')}}</h3>
          <p class="subtitle mt-md-3 mt-sm-3">{{$t('service.fasttext.subtitle')}}.</p>
        </div>
      </div>
      <div class="pattern">
        <img src="../assets/img/wave-line.png"/>
      </div>
      <div class="row mt-10 mb-5 d-flex align-items-center">
        <div class="col-xl-6 col-md-6 col-sm-12 title-section text-xl-right text-md-right text-sm-center">
          <h3 class="title text-shadow">{{$t('service.simple.title')}}</h3>
          <p class="subtitle mt-md-3 mt-sm-3">{{$t('service.simple.subtitle')}}</p>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 d-flex justify-content-center">
          <img src="../assets/img/home-img2.png"/>
        </div>
      </div>
      <div class="pattern">
        <img src="../assets/img/wave-line.png"/>
      </div>
      <div class="row mt-10 mb-5 d-flex align-items-center">
        <div class="col-xl-6 col-md-6 col-sm-12 d-flex justify-content-center">
          <img src="../assets/img/home-img3.png"/>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 title-section text-xl-left text-md-left text-sm-center">
          <h3 class="title text-shadow">{{$t('service.realibility.title')}}</h3>
          <p class="subtitle mt-md-3 mt-sm-3">{{$t('service.realibility.subtitle')}}</p>
        </div>
      </div>
      <div class="pattern">
        <img src="../assets/img/wave-line.png"/>
      </div>
      <div class="row mt-10 mb-5 d-flex align-items-center">
        <div class="col-xl-6 col-md-6 col-sm-12 title-section text-xl-right text-md-right text-sm-center">
          <h3 class="title text-shadow">{{$t('service.reasprice.title')}}</h3>
          <p class="subtitle mt-md-3 mt-sm-3">{{$t('service.reasprice.subtitle')}}</p>
        </div>
        <div class="col-xl-6 col-md-6 col-sm-12 d-flex justify-content-center">
          <img src="../assets/img/home-img4.png"/>
        </div>
      </div>
      <div class="pattern">
        <img src="../assets/img/wave-line.png"/>
      </div>
    </section>
    <section class="cost_section mt-10" v-if="balanceInfo.length !== 0">
      <div class="text-center">
        <h3 class="title">{{$t('price.title')}}</h3>
      </div>
      <div class="home-card-section flex-column mt-5">
        <div class="row">
          <div v-if="alert.message_balanceInfo" :class="'alert ' + alert.type">
            {{alert.message_balanceInfo}}
          </div>
          <div class="card-deck">
            <div class="card mt-md-3 mt-sm-3" v-for="(item, key) in balanceInfo" :key="key">
              <div class="d-flex justify-content-center mt-5">
                <div class="inner-text d-flex justify-content-center align-items-center">
                  <span v-if="item.is_personal">{{item.max_requests}}+</span>
                  <span v-else>{{item.max_requests}}</span>
                </div>
              </div>
              <div class="card-body text-left mt-4">
                <p class="subtitle">{{item.description}}</p>
              </div>
              <div class="card-footer">
                <div class="d-flex justify-content-center mt-4">
                  <button class="light-green-button text-muted" disabled="disabled">
                    {{item.month_price}} {{$t('currency')}}/<br>{{$t('month')}}
                  </button>
                </div>
                <p class="subtitle d-flex justify-content-center mt-2 mb-2">{{$t('alternative')}}</p>
                <div class="d-flex justify-content-center mt-2 mb-2">
                  <button class="light-green-button text-muted" disabled="disabled">
                    {{item.year_price}} {{$t('currency')}}/<br>{{$t('year')}}
                  </button>
                </div>
                <button class="yellow-sales-btn mt-2 d-flex justify-content-center align-items-center"
                        v-if="item.discount"
                        disabled="disabled">
                  <span>-{{item.discount}}%  <span v-if="item.discount_end_date"> до {{item.discount_end_date}}</span></span>
                </button>
                <button class="yellow-sales-btn mt-2 d-flex justify-content-center align-items-center"
                        v-else
                        disabled="disabled"
                        style="visibility: hidden">
                  <span>-{{item.discount}}%  <span v-if="item.discount_end_date"> до {{item.discount_end_date}}</span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-section d-flex justify-content-center">
          <tmbuttons class="btn-tm mt-4"
                     v-bind:bwidth="'353px'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="openRegisterForm"/>
        </div>
      </div>
    </section>
    <Register v-bind:show="displayRegisterForm" v-on:openloginform="openLoginForm" v-on:finishregister="switchFinish($event)" v-on:update:show="displayRegisterForm = $event"/>
    <FinishRegister v-bind:show="displayFinishForm" v-bind:email="currentemail" v-on:update:show="displayFinishForm = $event"/>
    <Login v-bind:show="displayLoginForm" v-on:openRemindpasswordform="openRemindPasswordForm" v-on:update:show="displayLoginForm = $event"/>
    <RemindPasswordForm v-bind:show="displayRemindPasswordForm" v-on:openpasswordform="openPasswordForm" v-on:update:show="displayRemindPasswordForm = $event"/>
  </div>
</template>

<script>
    import Register from '@/components/modals/Register';
    import FinishRegister from "@/components/modals/FinishRegister";
    import Login from "@/components/modals/Login";
    import tmbuttons from "../assets/custom-styles/tmbuttons";
    import RemindPasswordForm from "@/components/modals/RemindPasswordForm";
    import {mapActions, mapState } from 'vuex'
    export default {
        name: "Home",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.home'
        },
        data() {
            return {
                currentemail: '',
                balanceInfo: [],
                displayBasic: false,
                displayBasic2: false,
                displayModal: false,
                displayRegisterForm: false,
                displayLoginForm: false,
                displayFinishForm: false,
                displayCheckForm: false,
                displayRemindPasswordForm: false,
                displayPasswordForm: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false,
                fullPage: true
            }
        },
        computed: {
            ...mapState({
                account: state => state.account,
                alert: state => state.alert,
            }),
        },
        mounted () {
            this.getBalanceInfo().then(response => {
                if (response) {
                    this.balanceInfo = response;
                    this.balanceInfo.sort(function(a,b) {
                        return a.max_requests - b.max_requests;
                    });
                }
            });
        },

        methods: {
            ...mapActions('account', ['logout', 'getBalanceInfo']),
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
            openPasswordForm() {
                this.displayPasswordForm = true;
                this.displayRemindPasswordForm = false;
            },
            switchFinish(email) {
                this.currentemail = email;
                this.displayRegisterForm = false;
                this.displayFinishForm = true;
            },
        },
        components: {RemindPasswordForm, FinishRegister, Login, Register, tmbuttons},
    }
</script>

<style lang="scss" scoped>
    @import "../assets/styles/home.scss";
</style>
