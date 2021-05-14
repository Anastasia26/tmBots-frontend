<template>
  <Dialog :visible.sync="showRemindPasswordForm" :modal="true">
    <div class="form">
      <div class="container form-panel">
        <div class="form-header text-center">
          <h2>{{$t('title')}}</h2>
          <p class="mt-3">{{$t('subtitle')}}</p>
        </div>
        <div class="main-form mt-4">
          <div role="group">
            <label for="remindPassword-input-live">{{$t('content.mail_label')}}</label>
            <b-form-input
              id="remindPassword-input-live"
              v-model="remindPasswordForm.email"
              :class="{invalid: ($v.remindPasswordForm.email.$dirty && !$v.remindPasswordForm.email.required) || ($v.remindPasswordForm.email.$dirty && !$v.remindPasswordForm.email.email)}"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="Enter your email"
            ></b-form-input>
            <p v-if="($v.remindPasswordForm.email.$dirty && !$v.remindPasswordForm.email.required) || ($v.remindPasswordForm.email.$dirty && !$v.remindPasswordForm.email.email)"
              class="form-error mt-1">{{$t('content.mail_err')}}
            </p>
          </div>
          <div v-if="alert.message_remindemail" :class="'alert ' + alert.type">{{alert.message_remindemail}}</div>
          <tmbuttons class="btn-tm mt-5" v-if="remindPasswordForm.email.length == 0"
                     disabled
                     v-bind:bname="$t('button')"
                     v-bind:bwidth="'100%'"
                     v-bind:clickhandler="sendEmailtoResetPass">
          </tmbuttons>
          <tmbuttons class="btn-tm mt-5"
                     v-else-if="($v.remindPasswordForm.email.$dirty && !$v.remindPasswordForm.email.required)"
                     disabled
                     v-bind:bname="$t('button')"
                     v-bind:bwidth="'100%'"
                     v-bind:clickhandler="sendEmailtoResetPass">
          </tmbuttons>
          <tmbuttons class="btn-tm mt-5" v-else-if="disabledBtn"
                     disabled
                     v-bind:bname="$t('button')"
                     v-bind:bwidth="'100%'"
                     v-bind:clickhandler="sendEmailtoResetPass">
          </tmbuttons>
          <tmbuttons class="btn-tm mt-5" v-else
                     v-bind:bname="$t('button')"
                     v-bind:bwidth="'100%'"
                     v-bind:clickhandler="sendEmailtoResetPass">
          </tmbuttons>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script>
    import {email, required} from 'vuelidate/lib/validators';
    import {mapState, mapActions} from 'vuex'
    import Dialog from 'primevue/dialog';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";

    export default {
        name: "RemindPasswordForm",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.remind_password'
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
                remindPasswordForm: {
                    email: ''
                },
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
            remindPasswordForm: {
                email: {email, required}
            }
        },

        computed: {
            ...mapState('account', ['status']),
            ...mapState({
                alert: state => state.alert,
            }),

            showRemindPasswordForm: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            }
        },

        methods: {
            ...mapActions('account', ['resetPassword']),
            sendEmailtoResetPass() {
                this.disabledBtn = true;
                this.submitted = true;
                if (this.$v.remindPasswordForm.$invalid) {
                    this.$v.remindPasswordForm.$touch();
                    this.disabledBtn = false;
                    return
                } else {
                    this.resetPassword({email: this.remindPasswordForm.email}).then(() => {
                        this.disabledBtn = false;
                        this.remindPasswordForm = {email: ''};
                        this.$emit('openpasswordform');
                    });
                }
            },

        },

        components: {Dialog, tmbuttons}
    }
</script>
