<template>
  <div class="container public_offer_section" ref="containerLoading" v-model="footersData">
    <div v-if="alert.message_errorsFooter" :class="'alert ' + alert.type">
      {{alert.message_errorsFooter}}
    </div>
    <div v-html="footersData"></div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "PublicOfferPage",
        data() {
            return {
                footersData: ''
            }
        },
        mounted() {
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.containerLoading,
                canCancel: false,
                onCancel: this.onCancel,
            });
            this.getPublicOfferInfo().then(response => {
                if (response) {
                    this.footersData = response.text;
                    loader.hide();
                }
            }, error => {loader.hide();});

        },
        computed: {
            ...mapState({
                alert: state => state.alert
            })
        },
        methods: {
            ...mapActions('account', ['getPublicOfferInfo']),
        }
    }
</script>

<style scoped>

</style>
