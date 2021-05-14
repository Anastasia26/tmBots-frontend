<template>
  <div class="form">
    <div class="container form-panel">
      <div class="text-center">
        <h2>{{$t('title')}}</h2>
      </div>
      <div v-if="alert.message_remindpassword" :class="'alert ' + alert.type">{{alert.message_remindpassword}}</div>
      <div class="main-form mt-4">
        <div role="group" class="mt-4">
          <label for="new-input-password">{{$t('new_password')}}</label>
          <b-form-input
            id="new-input-password"
            v-model.trim="newpassword"
            :class="{invalid: ($v.newpassword.$dirty && !$v.newpassword.required) || ($v.newpassword.$dirty && !$v.newpassword.minLength)}"
            aria-describedby="input-live-help input-live-feedback"
            type="password">
          </b-form-input>
          <p v-if="($v.newpassword.$dirty && !$v.newpassword.required) || ($v.newpassword.$dirty && !$v.newpassword.minLength)" class="form-error mt-1">{{$t('new_password_err')}}</p>
        </div>
        <div role="group" class="mt-4">
          <label for="repead-input-password">{{$t('repead_password')}}</label>
          <b-form-input
            id="repead-input-password"
            v-model.trim="renew"
            :class="{invalid: ($v.renew.$dirty && !$v.renew.minLength)}"
            aria-describedby="input-live-help input-live-feedback"
            type="password">
          </b-form-input>
          <div class="form-error mt-1" v-if="!$v.renew.sameAsPassword">{{$t('repead_password_err')}}</div>
        </div>
        <tmbuttons v-if="(newpassword.length == 0 || renew.length == 0)"
                   disabled class="btn-tm mt-5 mb-4"
                   v-bind:bname="$t('button')"
                   v-bind:bwidth="'100%'">
        </tmbuttons>
        <tmbuttons v-else-if="($v.newpassword.$dirty && !$v.newpassword.required) || (!$v.renew.sameAsPassword)"
                   disabled class="btn-tm mt-5 mb-4"
                   v-bind:bwidth="'100%'"
                   v-bind:bname="$t('button')"
                   v-bind:clickhandler="submitUsersChangePassword">
        </tmbuttons>
        <tmbuttons v-else-if="disabledBtn"
                   disabled class="btn-tm mt-5 mb-4"
                   v-bind:bwidth="'100%'"
                   v-bind:bname="$t('button')"
                   v-bind:clickhandler="submitUsersChangePassword">
        </tmbuttons>
        <tmbuttons v-else class="btn-tm mt-5 mb-4"
                   v-bind:bwidth="'100%'"
                   v-bind:bname="$t('button')"
                   v-bind:clickhandler="submitUsersChangePassword">
        </tmbuttons>
      </div>
    </div>
  </div>
</template>

<script>
    import {required, sameAs, minLength} from 'vuelidate/lib/validators'
    import { mapState, mapActions } from 'vuex'
    import tmbuttons from "../assets/custom-styles/tmbuttons"
    export default {
        name: "ChangePasswordForm",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.change_old_pass'
        },
        data() {
            return {
                newpassword: '',
                renew: '',
                displayBasic: false,
                displayBasic2: false,
                displayModal: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false,
                disabledBtn: false,
            }
        },
        validations: {
            newpassword: {required, minLength: minLength(8)},
            renew: {sameAsPassword: sameAs('newpassword')}
        },

        computed: {
            ...mapState('account', ['status']),
            ...mapState({
                alert: state => state.alert,
            }),
        },

        methods: {
            ...mapActions('account', ['changeUsersProfilePassword']),
            submitUsersChangePassword() {
                this.disabledBtn = true;
                let user_pass = {
                    uid: this.$route.params.uid,
                    token: this.$route.params.token,
                    new_password: this.newpassword,
                    re_new_password: this.renew
                };
                this.submitted = true;
                if(this.$v.renew.$invalid || this.$v.newpassword.$invalid) {
                    this.$v.renew.$touch();
                    this.$v.newpassword.$touch();
                    this.disabledBtn = false;
                    return
                } else {
                    this.changeUsersProfilePassword(user_pass).then(resp_user => {
                        this.disabledBtn = false;
                        if (resp_user) {
                            this.email ='';
                            this.password = '';
                        }
                    });
                }
            }
        },

        components: {tmbuttons}
    }
</script>

<style scoped lang="sass">
    @import "../assets/styles/register"
</style>

