<template>
  <div class="border mt-4">
    <div class="row">
      <div class="icon-content mt-1 col-lg-3 col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
        <b-icon class="text-right" icon="file-earmark-text"></b-icon>
      </div>
      <div class="col-lg-9 col-md-10 col-sm-12 mt-sm-2">
        <span class="info-title">{{$t('title')}}</span>
        <p>{{user.balance}}</p>
      </div>
      <hr>
    </div>
    <div class="button-content d-flex justify-content-start">
      <tmbuttons class="light-green-button mt-3"
                 v-bind:bwidth="'250px'"
                 v-bind:bname="$t('top_up_balance')"
                 v-bind:clickhandler="TopupBalance"/>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import router from '../../router/router';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    export default {
        name: "UserBalanceInfo",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.user_balance'
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user
            }),
        },
        methods: {
            TopupBalance() {
                router.push('/balance');
            }
        },
        components: {tmbuttons}
    }
</script>
