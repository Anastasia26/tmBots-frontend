<template>
  <div class="user-info border mt-5">
    <div class="row">
      <div class="col-xl-6 col-md-6 col-sm-12">
        <div class="name">
          <span class="info-title">{{$t('fieldset_name')}}: </span><span v-if="user.legalperson">{{user.legalperson.name}}</span>
        </div>
        <div class="register-address mt-3">
          <span class="info-title">{{$t('fieldset_registeraddress')}}: </span><span v-if="user.legalperson">{{user.legalperson.reg_address}}</span>
        </div>
        <div class="contact-person mt-3">
          <span class="info-title">{{$t('fieldset_contactperson')}}: </span><span v-if="user.legalperson">{{user.legalperson.contact}}</span>
        </div>
      </div>
      <div class="col-xl-6 col-md-6 col-sm-12 mt-lg-0 mt-sm-3">
        <div class="contact-person">
          <span class="info-title">{{$t('codeERDPO')}}: </span><span v-if="user.legalperson">{{user.legalperson.edrpou}}</span>
          <span class="id-client ml-5">ID {{$t('client_id')}}: <span v-if="user">{{user.id}}</span></span>
        </div>
        <div class="address mt-3">
          <span class="info-title">{{$t('fieldset_letteraddress')}}: </span><span v-if="user.mail_address">{{user.mail_address}}</span>
        </div>
        <div class="contact-person mt-3">
          <span class="info-title">{{$t('fieldset_telephone')}}: </span><span v-if="user.phone">{{user.phone}}</span>
        </div>
      </div>
      <tmbuttons class="light-green-button d-flex justify-content-center align-items-center mt-3 ml-3"
                 v-bind:bname="$t('edit_btn')"
                 v-bind:btnicon="'pencil'"
                 v-bind:clickhandler="openJuridicalEditPage"/>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import tmbuttons from "../../../assets/custom-styles/tmbuttons";
    import router from '../../../router/router';
    export default {
        name: "JuridicalUserInfo",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.juridical_edit'
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user
            }),
        },
        methods: {
            openJuridicalEditPage() {
                router.push('/juridical-edit');
            }
        },
        components: {tmbuttons}
    }
</script>
