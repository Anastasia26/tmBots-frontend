<template>
  <Dialog :visible.sync="showChangePassword" :modal="true">
    <div class="form">
      <div class="container form-panel">
        <div class="text-center">
          <h2>{{$t('title')}}</h2>
        </div>
        <div class="main-form mt-4">
          <div role="group" class="mt-4">
            <b-form-group id="old-input-password" :label="$t('old_password')" label-for="old-input-password">
            <b-form-input
              id="old-input-password"
              v-model.trim="oldpass"
              @input="setPass(oldpass)"
              :class="{invalid: ($v.oldpass.$dirty && !$v.oldpass.minLength)}"
              aria-describedby="input-live-help input-live-feedback"
              type="password">
            </b-form-input>
            <p v-if="($v.oldpass.$dirty && !$v.oldpass.required) || ($v.oldpass.$dirty && !$v.oldpass.minLength)" class="form-error mt-1">{{$t('old_password_err')}}</p>
            </b-form-group>
          </div>
          <div v-if="alert.message_changepassword" :class="'alert ' + alert.type">{{alert.message_changepassword}}</div>
          <div role="group" class="mt-4">
            <b-form-group id="new-input-password" :label="$t('new_password')" label-for="new-input-password">
            <b-form-input
              id="new-input-password"
              v-model.trim="newpassword"
              :class="{invalid: ($v.newpassword.$dirty && !$v.newpassword.minLength)}"
              aria-describedby="input-live-help input-live-feedback"
              type="password">
            </b-form-input>
            <p v-if="($v.newpassword.$dirty && !$v.newpassword.required) || ($v.newpassword.$dirty && !$v.newpassword.minLength)" class="form-error mt-1">{{$t('new_password_err')}}</p>
            </b-form-group>
          </div>
          <div role="group" class="mt-4">
            <b-form-group id="repead-input-password" :label="$t('repead_password')" label-for="repead-input-password">
            <b-form-input
              id="repead-input-password"
              v-model.trim="renew"
              :class="{invalid: ($v.renew.$dirty && !$v.renew.minLength)}"
              aria-describedby="input-live-help input-live-feedback"
              type="password">
            </b-form-input>
            <div class="form-error mt-1" v-if="!$v.renew.sameAsPassword">{{$t('repead_password_err')}}</div>
            </b-form-group>
          </div>
          <tmbuttons v-if="(oldpass.length == 0 || newpassword.length == 0 || renew.length == 0)"
                     disabled class="btn-tm mt-5"
                     v-bind:bname="$t('button')"
                     v-bind:bwidth="'100%'">
          </tmbuttons>
          <tmbuttons v-else-if="($v.oldpass.$dirty && !$v.oldpass.required) || ($v.newpassword.$dirty && !$v.newpassword.required) || (!$v.renew.sameAsPassword)"
                     disabled class="btn-tm mt-5"
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="submitChangePassword">
          </tmbuttons>
          <tmbuttons v-else-if="disabledBtn"
                     disabled class="btn-tm mt-5"
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="submitChangePassword">
          </tmbuttons>
          <tmbuttons v-else class="btn-tm mt-5"
                     v-bind:bwidth="'100%'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="submitChangePassword">
          </tmbuttons>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
    import {required, sameAs, minLength} from 'vuelidate/lib/validators';
    import { mapActions, mapState } from 'vuex'
    import Dialog from 'primevue/dialog';
    import tmbuttons from "../../assets/custom-styles/tmbuttons"
    export default {
        name: "UserChangePassword",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.change_old_pass'
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
                messages: [],
                oldpass: '',
                newpassword: '',
                renew: '',
                disabledBtn: false,
                displayModal: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false
            }
        },
        validations: {
            oldpass:{required, minLength: minLength(8)},
            newpassword:{required, minLength: minLength(8)},
            renew: {sameAsPassword: sameAs('newpassword')}
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
            }),
            showChangePassword: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            }
        },
        methods: {
            ...mapActions('account', ['changeProfilePassword']),
            setPass(value) {
                this.oldpass = value;
                this.$v.oldpass.$touch();
            },
            clearModalForm() {
                this.oldpass = '';
                this.newpassword = '';
                this.renew = '';
                this.$emit('finishchange');
            },
            submitChangePassword() {
                this.disabledBtn = true;
                let user_pass = {
                    current_password: this.oldpass,
                    new_password: this.newpassword,
                    re_new_password: this.renew
                };
                if(this.$v.oldpass.$invalid || this.$v.renew.$invalid || this.$v.newpassword.$invalid) {
                    this.$v.oldpass.$touch();
                    this.$v.renew.$touch();
                    this.$v.newpassword.$touch();
                    this.disabledBtn = false;
                } else {
                     this.changeProfilePassword(user_pass).then(
                         pass => {this.clearModalForm()},
                         error => {
                             this.disabledBtn = false;
                         }
                     );
                }
            }
        },
        components: {Dialog, tmbuttons}
    }
</script>

