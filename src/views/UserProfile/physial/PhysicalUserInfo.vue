<template>
  <div class="user-info border mt-4">
    <div class="row">
      <div class="col-xl-3 col-md-6 col-sm-12">
        <div class="surname">
          <span class="info-title">{{$t('fieldset_surname')}}: </span><span v-if="user.naturalperson">{{user.naturalperson.surname}}</span>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 col-sm-12">
        <div class="name">
          <span class="info-title">{{$t('fieldset_name')}}: </span><span v-if="user.naturalperson">{{user.naturalperson.name}}</span>
        </div>
      </div>
      <div class="col-xl-4 col-md-6 col-sm-12">
        <div class="second-name">
          <span class="info-title">{{$t('fieldset_secondname')}}: </span><span v-if="user.naturalperson">{{user.naturalperson.last_name}}</span>
        </div>
      </div>
      <div class="col-xl-2 col-md-6 col-sm-12">
        <span class="id-client">ID {{$t('client_id')}}: <span v-if="user">{{user.id}}</span></span>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-xl-3 col-md-6 col-sm-12">
        <div class="email">
          <span class="info-title">{{$t('fieldset_email')}}: </span><span v-if="user">{{user.email}}</span>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 col-sm-12">
        <div class="mail-address">
          <span class="info-title">{{$t('fieldset_letteraddress')}}: </span><span v-if="user.mail_address">{{user.mail_address}}</span>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 col-sm-12">
        <div class="telephone">
          <span class="info-title">{{$t('fieldset_telephone')}}: </span><span v-if="user.phone">{{user.phone}}</span>
        </div>
      </div>
    </div>
    <tmbuttons class="light-green-button d-flex justify-content-center align-items-center mt-3"
               v-bind:bname="$t('edit_btn')"
               v-bind:btnicon="'pencil'"
               v-bind:clickhandler="openPhysicalEditPage"/>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import tmbuttons from "../../../assets/custom-styles/tmbuttons";
    import router from '../../../router/router';
    export default {
        name: "PhysicalUserInfo",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.physical_edit'
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user
            }),
        },
        methods: {
            openPhysicalEditPage() {
                router.push('/physical-edit');
            }
        },
        components: {tmbuttons}
    }
</script>
