<template>
  <div class="PhysicalEditUserInfo mt-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <span class="user-title pr-4">{{$t('title')}}</span>
      </div>
    </div>
    <div v-if="alert.message_SaveUserInfo" :class="'alert ' + alert.type">{{alert.message_SaveUserInfo}}</div>
    <div class="form row">
      <div class="col-lg-4 col-md-4 col-sm-6">
        <b-form-group id="fieldset-surname" :label="$t('fieldset_surname')" label-for="fieldset-surname">
          <b-form-input id="fieldset-surname"
                        v-if="user.naturalperson"
                        v-model.trim="user.naturalperson.surname"
                        @input="setSurname(user.naturalperson.surname)"
                        :class="{invalid: ($v.surname.$dirty && !$v.surname.minLength)}">
          </b-form-input>
          <p v-if="($v.surname.$dirty && !$v.surname.minLength)" class="form-error mt-1">{{$t('fieldset_surname_err')}}</p>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6">
        <b-form-group id="fieldset-name" :label="$t('fieldset_name')" label-for="fieldset-name">
          <b-form-input id="fieldset-name"
                        v-if="user.naturalperson"
                        v-model.trim="user.naturalperson.name"
                        @input="setName(user.naturalperson.name)"
                        :class="{invalid: ($v.name.$dirty && !$v.name.minLength)}">
          </b-form-input>
          <p v-if="($v.name.$dirty && !$v.name.minLength)" class="form-error mt-1">{{$t('fieldset_name_err')}}</p>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <b-form-group id="fieldset-secondname" :label="$t('fieldset_secondname')" label-for="fieldset-secondname">
          <b-form-input id="fieldset-secondname"
                        v-if="user.naturalperson"
                        v-model.trim="user.naturalperson.last_name"
                        @input="setSecondname(user.naturalperson.last_name)"
                        :class="{invalid: ($v.secondname.$dirty && !$v.secondname.minLength)}">
          </b-form-input>
          <p v-if="($v.secondname.$dirty && !$v.secondname.minLength)" class="form-error mt-1">{{$t('fieldset_secondname_err')}}</p>
        </b-form-group>
      </div>
    </div>
    <div class="form row">
      <div class="col-lg-4 col-md-4 col-sm-12">
        <b-form-group id="fieldset-email" :label="$t('fieldset_email')" label-for="fieldset-email">
          <b-form-input id="fieldset-email"
                        v-if="user"
                        v-model.trim="user.email"
                        @input="setEmail(user.email)"
                        :class="{invalid: ($v.email.$dirty && !$v.email.email)}">
          </b-form-input>
          <p v-if="($v.email.$dirty && !$v.email.email)" class="form-error mt-1">{{$t('fieldset_email_err')}}</p>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <b-form-group id="fieldset-address" :label="$t('fieldset_letteraddress')" label-for="fieldset-address">
          <b-form-input id="fieldset-address" v-model="user.mail_address" trim></b-form-input>
        </b-form-group>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <b-form-group id="fieldset-telephone" :label="$t('fieldset_telephone')" label-for="fieldset-telephone">
          <b-form-input id="fieldset-telephone"
                        v-if="user"
                        v-model.trim="user.phone"
                        @input="setTelephone(user.phone)"
                        :class="{invalid: ($v.telephone.$dirty && !$v.telephone.phoneValid)}">
          </b-form-input>
          <p v-if="($v.telephone.$dirty && !$v.telephone.phoneValid)" class="form-error mt-1">{{$t('fieldset_telephone_err')}}</p>
        </b-form-group>
      </div>
    </div>
    <div class="mr-3 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-center align-items-center">
      <tmbuttons class="exit-btn mr-2"
                 v-bind:bwidth="'120px'"
                 v-bind:bname="$t('cancel_btn')"
                 v-bind:clickhandler="exitPhysicalEdit"/>
      <tmbuttons class="btn-tm"
                 v-if="($v.surname.$dirty && !$v.surname.minLength) || ($v.name.$dirty && !$v.name.minLength) || ($v.secondname.$dirty && !$v.secondname.minLength) || ($v.email.$dirty && !$v.email.email) || ($v.telephone.$dirty && !$v.telephone.phoneValid)"
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
    import { mapActions, mapState } from 'vuex'
    import tmbuttons from "../../../assets/custom-styles/tmbuttons";
    import router from '../../../router/router';
    const phone = helpers.regex('alpha', /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
    export default {
        name: "PhysicalEditUserInfo",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.physical_edit'
        },
        data() {
            return {
                disabledBtn: false,
                surname: '',
                name: '',
                secondname: '',
                email: '',
                address: '',
                telephone: ''
            }
        },
        validations: {
            surname: {
                minLength: minLength(2)
            },
            email: {
                email
            },
            name: {
                minLength: minLength(2)
            },
            secondname: {
                minLength: minLength(2)
            },
            telephone: {
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
            exitPhysicalEdit() {
                router.push('/profile');
            },
            setName(value) {
                this.name = value;
                this.$v.name.$touch();
            },
            setEmail(value) {
                this.email = value;
                this.$v.email.$touch();
            },
            setSurname(value) {
                this.surname = value;
                this.$v.surname.$touch();
            },
            setSecondname(value) {
                this.secondname = value;
                this.$v.secondname.$touch();
            },
            setTelephone(value) {
                this.telephone = value;
                this.$v.telephone.$touch();
            },
            saveUser() {
                this.disabledBtn = true;
                if (this.$v.name.$invalid || this.$v.email.$invalid || this.$v.surname.$invalid || this.$v.secondname.$invalid || this.$v.telephone.$invalid) {
                    this.$v.name.$touch();
                    this.$v.email.$touch();
                    this.$v.surname.$touch();
                    this.$v.secondname.$touch();
                    this.$v.telephone.$touch();
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
        mounted () {
            this.getAccountInfo();
        },
        components: {tmbuttons}
    }
</script>
