<template>
  <div class="border mt-4">
    <div class="row">
      <div class="icon-content col-lg-3 col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
        <b-icon class="text-right" icon="lock"></b-icon>
      </div>
      <div class="col-lg-9 col-md-10 col-sm-12 mt-sm-2">
        <span class="info-title">{{$t('pass_title')}}:</span>
        <p>••••••••••••••</p>
      </div>
      <hr>
    </div>
    <div class="button-content d-flex justify-content-start">
      <tmbuttons class="light-green-button mt-3"
                 v-bind:bwidth="'250px'"
                 v-bind:bname="$t('change_pass_button')"
                 v-bind:clickhandler="openChangePassword"/>
    </div>
    <UserChangePassword v-bind:show="displayChangePasswordForm" v-on:finishchange="finishChangePass($event)" v-on:update:show="displayChangePasswordForm = $event"/>
    <Toast position="top-right"/>
  </div>
</template>

<script>
    import Toast from 'primevue/toast';
    import UserChangePassword from "./UserChangePassword";
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    export default {
        name: "UserPassword",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.change_old_pass'
        },
        data() {
            return {
                displayChangePasswordForm: false,
                displayMaximizable: false,
                displayPosition: false,
                position: 'center',
                submitted: false
            }
        },
        methods: {
            showSuccess() {
                this.$toast.add({severity:'success', summary: this.$i18n.i18next.t('_common:pages.change_old_pass.alert_success'), life: 4000});
            },
            openChangePassword() {
                this.displayChangePasswordForm = true;
            },
            finishChangePass() {
                this.displayChangePasswordForm = false;
                this.showSuccess();
            }
        },
        components: {Toast, tmbuttons, UserChangePassword}
    }
</script>
