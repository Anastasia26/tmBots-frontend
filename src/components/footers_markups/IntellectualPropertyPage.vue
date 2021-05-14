<template>
  <div class="container intellectual_prop_section" ref="containerLoading" v-model="footersData">
    <div v-if="alert.message_errorsFooter" :class="'alert ' + alert.type">
      {{alert.message_errorsFooter}}
    </div>
    <div v-html="footersData"></div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "IntellectualPropertyPage",
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
            this.getIntellectualPropInfo().then(response => {
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
            ...mapActions('account', ['getIntellectualPropInfo']),
        }
    }
</script>

<style scoped>

</style>
