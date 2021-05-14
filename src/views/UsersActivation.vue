<template>
  <div class="container text-center">
    <div v-if='!activate' class="mt-5">
      <div v-if="alert.message_activation" :class="'alert ' + alert.type">
        {{alert.message_activation}}
      </div>
    </div>
    <div v-else class="mt-5">
      <h3 class="title">{{$t('user_activation')}}</h3>
    </div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "UsersActivation",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages'
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                activate: state => state.account.activate
            })
        },
        mounted() {
            this.activation(this.$route.params);
        },
        methods: {
             ...mapActions('account', ['activation']),
        }
    }
</script>
