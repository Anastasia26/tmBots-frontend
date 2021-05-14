<template>
  <Dialog :visible.sync="showLoginFinish" :modal="true">
    <div class="form">
      <div class="container form-panel">
        <div class="form-header text-center">
          <h2>{{$t('title')}}</h2>
          <p class="mt-3">{{$t('subtitle')}}</p>
        </div>
        <div class="main-form mt-4">
          <div role="group">
            <label for="login-input-live">{{$t('content.mail_label')}}</label>
            <b-form-input
              id="login-input-live"
              v-model="loginForm.email"
              :class="{invalid: ($v.loginForm.email.$dirty && !$v.loginForm.email.required) || ($v.loginForm.email.$dirty && !$v.loginForm.email.email)}"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your email"
            ></b-form-input>
            <p v-if="($v.loginForm.email.$dirty && !$v.loginForm.email.required)"
              class="form-error mt-1">{{$t('content.mail_label')}}
            </p>
            <p v-if="($v.loginForm.email.$dirty && !$v.loginForm.email.email)"
               class="form-error mt-1">{{$t('content.mail_err')}}
            </p>
          </div>
          <div role="group" class="mt-4">
            <label for="login-input-password">{{$t('content.pass_label')}}</label>
            <b-form-input
              id="login-input-password"
              v-model="loginForm.password"
              :class="{invalid: ($v.loginForm.password.$dirty && !$v.loginForm.password.required) || ($v.loginForm.password.$dirty && !$v.loginForm.password.minLength)}"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your password"
              type="password"
              trim>
            </b-form-input>
            <p v-if="($v.loginForm.password.$dirty && !$v.loginForm.password.required)"
              class="form-error mt-1">{{$t('content.pass_label')}}
            </p>
            <p v-if="($v.loginForm.password.$dirty && !$v.loginForm.password.minLength)"
               class="form-error mt-1">{{$t('content.pass_err')}}
            </p>
            <div class="registration-footer text-left mt-3">
              <h6>{{$t('qa')}}<a class="link" v-on:click="openRemindPasswordForm"> {{$t('restore_pass')}}</a></h6>
            </div>
          </div>
          <div v-if="alert.message_login" :class="'alert ' + alert.type">{{alert.message_login}}</div>
          <tmbuttons class="btn-tm mt-5" v-if="(loginForm.email.length == 0 || loginForm.password.length == 0)"
                     disabled
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"/>
          <tmbuttons class="btn-tm mt-5"
                     v-else-if="($v.loginForm.email.$dirty && !$v.loginForm.email.required) || ($v.loginForm.password.$dirty && !$v.loginForm.password.required)"
                     disabled
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="submitLogin"/>
          <tmbuttons class="btn-tm mt-5" v-else-if="disabledBtn"
                     disabled
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="submitLogin"/>

          <tmbuttons v-else class="btn-tm mt-5"
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="submitLogin"/>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators';
    import { mapState, mapActions } from 'vuex'
    import Dialog from 'primevue/dialog';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";

    export default {
        name: "Login",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.login'
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            },
        },
        data() {
            return {
                loginForm: {
                    email: '',
                    password: '',
                },
                disabledBtn: false,
                displayBasic: false,
                displayBasic2: false,
                displayModal: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false
            }
        },
        validations: {
            loginForm: {
                email: {email, required},
                password:{required, minLength: minLength(8)}
            }
        },
        computed: {
            ...mapState('account', ['status']),
            ...mapState({
                alert: state => state.alert,
            }),

            showLoginFinish: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            }
        },

        methods: {
            ...mapActions('account', ['register', 'login', 'getAccountInfo']),

            submitLogin() {
                this.disabledBtn = true;
                if(this.$v.loginForm.$invalid) {
                    this.$v.loginForm.$touch();
                    this.disabledBtn = false;
                    return
                } else {
                    this.login({
                            'is_trial': this.checked,
                            'email': this.loginForm.email,
                            'password': this.loginForm.password
                        },
                    ).then((response) => {
                        this.disabledBtn = false;
                        if (response) {
                            this.$emit('update:show');
                            this.loginForm = {email: '', password: ''};
                        }
                    }).then(()=>{this.getAccountInfo()});
                }
            },
            openRemindPasswordForm() {
                this.$emit('openRemindpasswordform');
            },
        },

        components: {Dialog, tmbuttons}
    }
</script>

<style scoped lang="sass">
    @import "../../assets/styles/register"
</style>
