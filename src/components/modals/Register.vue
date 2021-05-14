<template>
  <Dialog :visible.sync="showModal" :modal="true">
    <form class="form">
      <div class="container form-panel">
        <div class="form-header text-center">
          <h2>{{$t('title')}}</h2>
          <p class="mt-3">{{$t('subtitle')}}</p>
        </div>
        <div class="main-form mt-5">
          <div role="group">
            <label for="register-input-live">{{$t('content.mail_label')}}</label>
            <b-form-input
              type="email"
              id="register-input-live"
              v-model="registerForm.email"
              :class="{invalid: ($v.registerForm.email.$dirty && !$v.registerForm.email.required) || ($v.registerForm.email.$dirty && !$v.registerForm.email.email)}"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your email"
            ></b-form-input>
            <div v-if="($v.registerForm.email.$dirty && !$v.registerForm.email.required)">
              <p class="form-error mt-1">{{$t('content.mail_label')}}</p>
            </div>
            <div v-if="($v.registerForm.email.$dirty && !$v.registerForm.email.email)">
              <p class="form-error mt-1">{{$t('content.mail_err')}}</p>
            </div>
          </div>
          <div role="group" class="mt-3">
            <label for="register-input-password">{{$t('content.pass_label')}}</label>
            <b-form-input
              id="register-input-password"
              v-model="registerForm.password"
              :class="{invalid: ($v.registerForm.password.$dirty && !$v.registerForm.password.required) || ($v.registerForm.password.$dirty && !$v.registerForm.password.minLength)}"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your password"
              type="password"
              trim
            ></b-form-input>
            <div v-if="($v.registerForm.password.$dirty && !$v.registerForm.password.required)">
              <p class="form-error mt-1">{{$t('content.pass_label')}}</p>
            </div>
            <div v-if="($v.registerForm.password.$dirty && !$v.registerForm.password.minLength)">
              <p class="form-error mt-1">{{$t('content.pass_err')}} - {{registerForm.password.length}}</p>
            </div>
          </div>

          <div role="group" class="mt-3">
            <vue-recaptcha
              ref="recaptcha"
              :sitekey="registerForm.sitekey"
              @verify="recaptchaComplete"
              @expired="onCaptchaExpired"
            />
            <div v-if="registerForm.pleaseTickRecaptchaMessage">
              <p class="form-error mt-1">{{registerForm.pleaseTickRecaptchaMessage}}</p>
            </div>
          </div>
          <b-form-checkbox
            id="checkbox-1"
            v-model="checked"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
            class="mt-3">
            <strong>{{$t('test_user')}}</strong>
          </b-form-checkbox>
          <div v-if="alert.message_register" :class="'alert ' + alert.type">{{alert.message_register}}</div>
          <tmbuttons class="btn-tm mt-5" v-if="(registerForm.email.length == 0 || registerForm.password.length == 0)"
                     disabled
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"/>
          <tmbuttons class="btn-tm mt-5"
                     v-else-if="($v.registerForm.email.$dirty && !$v.registerForm.email.required) || ($v.registerForm.password.$dirty && !$v.registerForm.password.required)"
                     disabled
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"/>
          <tmbuttons class="btn-tm mt-5" v-else-if="disabledBtn"
                     disabled
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"/>
          <tmbuttons class="btn-tm mt-5" v-else
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="submitRegister"/>
        </div>
        <div class="registration-footer text-center mt-5">
          <h6>{{$t('qa')}}</h6>
          <a class="link mt-3" v-on:click="openLoginForm"> {{$t('login')}}</a>
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators';
    import VueRecaptcha from 'vue-recaptcha'
    import { mapState, mapActions } from 'vuex'
    import Dialog from 'primevue/dialog';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    export default {
        name: "Register",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.register'
        },
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            },
        },
        data: function () {
            return {
                registerForm: {
                    email: '',
                    password: '',
                    sitekey: process.env.SITEKEY,
                    recaptchaVerified: false,
                    pleaseTickRecaptchaMessage: ''
                },
                checked: 'true',
                disabledBtn: false,
                displayBasic: false,
                displayModal: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false
            }
        },
        validations: {
            registerForm: {
                email: {email, required},
                password:{required, minLength: minLength(8)}
            }
        },
        computed: {
            ...mapState('account', ['status']),
            ...mapState({
                alert: state => state.alert
            }),
            showModal: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            }
        },

        methods: {
            ...mapActions('account', ['register', 'login']),
            onCaptchaExpired () {
                this.$refs.recaptcha.reset()
            },
            recaptchaComplete(response) {
                this.registerForm.recaptchaVerified = true;
            },
            submitRegister() {
                this.disabledBtn = true;
                let user = {
                    is_trial: this.checked,
                    email: this.registerForm.email,
                    password: this.registerForm.password
                };
                this.submitted = true;
                if(this.$v.registerForm.$invalid) {
                    this.$v.registerForm.$touch();
                    this.disabledBtn = false;
                    return
                }
                if (!this.registerForm.recaptchaVerified) {
                    this.registerForm.pleaseTickRecaptchaMessage = this.$i18n.i18next.t('_common:pages.register.content.recaptcha_err');
                    this.disabledBtn = false;
                    return true;
                } else {
                    this.register(user).then(resp_user => {
                        this.disabledBtn = false;
                        if (resp_user) {
                            this.registerForm.email = '';
                            this.registerForm.password = '';
                            this.registerForm.recaptchaVerified = false;
                            this.registerForm.pleaseTickRecaptchaMessage = '';
                            this.$emit('finishregister', resp_user.email);
                        }
                    });
                }
            },
            openLoginForm() {
                this.$emit('openloginform');
            },
        },
        components: {Dialog, tmbuttons, VueRecaptcha}
    }
</script>

<style scoped lang="sass">
    @import "../../assets/styles/register"
</style>
