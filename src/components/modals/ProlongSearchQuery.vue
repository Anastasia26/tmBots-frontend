<!--<template>-->
<!--  <Dialog :visible.sync="showProlongQuery" :modal="true">-->
<!--      <div class="container form-panel">-->
<!--        <div class="form-header text-center">-->
<!--          <h2>{{$t('prolong_modal_title')}}</h2>-->
<!--        </div>-->
<!--        <div class="row main-form mt-4">-->
<!--            <b-button-group class="search-duration col-lg-6 col-md-6 col-sm-12">-->
<!--              <tmbuttons class="split-button"-->
<!--                         v-bind:bwidth="'120px'"-->
<!--                         v-bind:class="{ active: isDuration === 1 }"-->
<!--                         v-bind:bname="$t('search_duration.month_12')"-->
<!--                         v-bind:clickhandler="openYearInfo"/>-->
<!--              <tmbuttons class="split-button"-->
<!--                         v-bind:bwidth="'120px'"-->
<!--                         v-bind:class="{ active: isDuration === 0 }"-->
<!--                         v-bind:bname="$t('search_duration.month_6')"-->
<!--                         v-bind:clickhandler="openHalfYearInfo"/>-->
<!--            </b-button-group>-->


<!--            <b-button-group class="serach-frequency col-lg-6 col-md-6 col-sm-12">-->
<!--              <tmbuttons class="split-button"-->
<!--                         v-bind:bwidth="'120px'"-->
<!--                         v-bind:class="{ active: isFrequency === 1 }"-->
<!--                         v-bind:bname="$t('frequency_reports.monthly')"-->
<!--                         v-bind:clickhandler="openMonthInfo"/>-->
<!--              <tmbuttons class="split-button"-->
<!--                         v-bind:bwidth="'120px'"-->
<!--                         v-bind:class="{ active: isFrequency === 0 }"-->
<!--                         v-bind:bname="$t('frequency_reports.weekly')"-->
<!--                         v-bind:clickhandler="openWeekInfo"/>-->
<!--            </b-button-group>-->
<!--        </div>-->
<!--        <p class="balance-modal text-center mt-4">{{$t('count_balance')}}: {{balance}}</p>-->
<!--        <div class="d-flex justify-content-center">-->
<!--          <tmbuttons class="btn-tm mt-4"-->
<!--                     v-bind:bwidth="'200px'"-->
<!--                     v-bind:bname="$t('save_modal_button')"-->
<!--                     v-bind:clickhandler="createAndStart"/>-->
<!--        </div>-->

<!--      </div>-->
<!--  </Dialog>-->
<!--</template>-->

<!--<script>-->
<!--    import Dialog from 'primevue/dialog';-->
<!--    import tmbuttons from "../../assets/custom-styles/tmbuttons";-->
<!--    export default {-->
<!--        name: "ProlongSearchQuery",-->
<!--        i18nOptions: {-->
<!--            namespaces: '_common',-->
<!--            keyPrefix: 'pages.create_new_search_query'-->
<!--        },-->
<!--        props: {-->
<!--            show: {-->
<!--                type: Boolean,-->
<!--                required: true,-->
<!--                default: false-->
<!--            },-->
<!--        },-->
<!--        data() {-->
<!--            return {-->
<!--                isDuration: 1,-->
<!--                isFrequency: 1,-->
<!--                balance: 12,-->
<!--            }-->
<!--        },-->
<!--        computed: {-->
<!--            showProlongQuery: {-->
<!--                get: function () {-->
<!--                    return this.show-->
<!--                },-->
<!--                set: function (newValue) {-->
<!--                    this.$emit('update:show', newValue)-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            openYearInfo() {-->
<!--                this.isDuration = 1;-->
<!--                this.monthes_duration = 12;-->
<!--                this.balance = this.monthes_duration;-->
<!--            },-->
<!--            openHalfYearInfo() {-->
<!--                this.isDuration = 0;-->
<!--                this.monthes_duration = 6;-->
<!--                this.balance = this.monthes_duration;-->
<!--            },-->
<!--            openMonthInfo() {-->
<!--                this.isFrequency = 1;-->
<!--                this.report_frequency = 'month';-->
<!--                this.balance = this.monthes_duration;-->
<!--            },-->
<!--            openWeekInfo() {-->
<!--                this.isFrequency = 0;-->
<!--                this.report_frequency = 'week';-->
<!--                this.balance = 52;-->
<!--                if (this.monthes_duration == 6) {-->
<!--                    this.balance = 26;-->
<!--                }-->
<!--            },-->
<!--        },-->
<!--        components: {Dialog, tmbuttons}-->
<!--    }-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--  @import "../../assets/core/_colors.scss";-->
<!--  @import "../../assets/core/_typography.scss";-->

<!--.balance-modal {-->
<!--  font-size: $font-size-small-14;-->
<!--  color: var(&#45;&#45;black-color);-->
<!--}-->
<!--</style>-->
