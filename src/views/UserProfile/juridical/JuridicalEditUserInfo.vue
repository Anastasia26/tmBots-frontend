<template>
  <div class="JuridicalEditUserInfo mt-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <span class="user-title pr-4">{{$t('title')}}</span>
      </div>
    </div>
    <div v-if="alert.message_SaveUserInfo" :class="'alert ' + alert.type">
      {{alert.message_SaveUserInfo}}
    </div>
    <div class="form row">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <b-form-group id="fieldset-name" :label="$t('fieldset_name')" label-for="fieldset-name">
          <b-form-input id="fieldset-name"
                        v-model.trim="user.legalperson.name"
                        @input="setName(user.legalperson.name)"
                        :class="{invalid: ($v.legname.$dirty && !$v.legname.minLength)}">
          </b-form-input>
          <p v-if="($v.legname.$dirty && !$v.legname.minLength)" class="form-error mt-1">{{$t('fieldset_name_err')}}</p>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <b-form-group id="fieldset-registeraddress" :label="$t('fieldset_registeraddress')" label-for="fieldset-registeraddress">
          <b-form-input id="fieldset-registeraddress"
                        v-if="user.legalperson"
                        v-model="user.legalperson.reg_address" trim>
          </b-form-input>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <b-form-group id="codeERDPO" :label="$t('codeERDPO')" label-for="codeERDPO">
          <b-form-input id="codeERDPO"
                        v-if="user.legalperson"
                        v-model="user.legalperson.edrpou" trim>
          </b-form-input>
        </b-form-group>
      </div>
    </div>
    <div class="form row">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <b-form-group id="fieldset-email" :label="$t('fieldset_email')" label-for="fieldset-email">
          <b-form-input id="fieldset-email"
                        v-model.trim="user.email"
                        @input="setEmail(user.email)"
                        :class="{invalid: ($v.email.$dirty && !$v.email.email)}">
          </b-form-input>
          <p v-if="($v.email.$dirty && !$v.email.email)" class="form-error mt-1">{{$t('fieldset_email_err')}}</p>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <b-form-group id="fieldset-letteraddress" :label="$t('fieldset_letteraddress')" label-for="fieldset-letteraddress">
          <b-form-input id="fieldset-letteraddress" v-model="user.mail_address" trim></b-form-input>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <b-form-group id="fieldset-telephone" :label="$t('fieldset_telephone')" label-for="fieldset-telephone">
          <b-form-input id="fieldset-telephone"
                        v-model.trim="user.phone"
                        @input="setTelephone(user.phone)"
                        :class="{invalid: ($v.phone.$dirty && !$v.phone.phoneValid)}">
          </b-form-input>
          <p v-if="($v.phone.$dirty && !$v.phone.phoneValid)" class="form-error mt-1">{{$t('fieldset_telephone_err')}}</p>
        </b-form-group>
      </div>
    </div>
    <div class="form row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <b-form-group id="fieldset-contactperson" :label="$t('fieldset_contactperson')" label-for="fieldset-contactperson">
          <b-form-input id="fieldset-contactperson"
                        v-if="user.legalperson"
                        v-model="user.legalperson.contact" trim>
          </b-form-input>
        </b-form-group>
      </div>
    </div>
    <div class="mr-3 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-center align-items-center">
      <tmbuttons class="exit-btn mr-2"
                 v-bind:bwidth="'120px'"
                 v-bind:bname="$t('cancel_btn')"
                 v-bind:clickhandler="exitJuridicalEdit"/>
      <tmbuttons class="btn-tm"
                 v-if="($v.legname.$dirty && !$v.legname.minLength) || ($v.email.$dirty && !$v.email.email) || ($v.phone.$dirty && !$v.phone.phoneValid)"
                 disabled
                 v-bind:bwidth="'120px'"
                 v-bind:bname="$t('save_btn')"
                 v-bind:clickhandler="saveUser"/>
      <tmbuttons class="btn-tm" v-else-if="disabledBtn"
                 disabled
                 v-bind:bwidth="'120px'"
                 v-bind:bname="$t('save_btn')"
                 v-bind:clickhandler="saveUser"/>
      <tmbuttons class="btn-tm" v-else
                 v-bind:bwidth="'120px'"
                 v-bind:bname="$t('save_btn')"
                 v-bind:clickhandler="saveUser"/>
    </div>
  </div>
</template>

<script>
    import {email, minLength, helpers} from 'vuelidate/lib/validators'
    import {mapActions, mapState} from 'vuex'
    import tmbuttons from "../../../assets/custom-styles/tmbuttons";
    import router from '../../../router/router';
    const phone = helpers.regex('alpha', /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
    export default {
        name: "JuridicalEditUserInfo",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.juridical_edit'
        },
        data() {
            return {
                userInfo: {
                    name: '',
                    letteraddress: '',
                    registeraddress: '',
                    contactperson: '',
                    codeERDPO: '',
                    email: '',
                    phone: ''
                },
                disabledBtn: false,
                legname: '',
                email: '',
                phone: ''
            }
        },
        validations: {
            legname: {
                minLength: minLength(2)
            },
            email: {
                email
            },
            phone: {
                phoneValid:phone
            },
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user
            }),
        },
        methods: {
            ...mapActions('account', ['getAccountInfo', 'saveUserInfo']),
            exitJuridicalEdit() {
                router.push('/profile');
            },
            setName(value) {
                this.legname = value;
                this.$v.legname.$touch();
            },
            setEmail(value) {
                this.email = value;
                this.$v.email.$touch();
            },
            setTelephone(value) {
                this.phone = value;
                this.$v.phone.$touch();
            },
            saveUser() {
                this.disabledBtn = true;
                if (this.$v.legname.$invalid || this.$v.email.$invalid || this.$v.phone.$invalid) {
                    this.$v.legname.$touch();
                    this.$v.email.$touch();
                    this.$v.phone.$touch();
                    this.disabledBtn = false;
                    return
                } else {
                    this.saveUserInfo().then(() => {
                        this.disabledBtn = false;
                        router.push('/profile');
                    });
                }
            }
        },
        mounted() {
            this.getAccountInfo();
        },
        components: {tmbuttons}
    }
</script>
