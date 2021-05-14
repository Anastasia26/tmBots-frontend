<template>
  <div class="container-fluid">
    <div class="mt-4 row">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <h3 class="title pr-4">{{$t('title')}}</h3>
      </div>
    </div>
    <div v-if="alert.message_getAllSearchQueries" :class="'alert ' + alert.type">
      {{alert.message_getAllSearchQueries}}
    </div>
    <div v-if="alert.message_getIdSearchQuery" :class="'alert ' + alert.type">
      {{alert.message_getIdSearchQuery}}
    </div>
    <div class="user-search-content position-relative mt-4">
      <Tree :value="nodes" :loading="treeloader">
        <template #default="slotProps">
            <span style="cursor: pointer;">
                <div class="row mr-0 ml-0">
                    <div class="col-xl-10">
                        <b>{{slotProps.node.number}} {{slotProps.node.label}}</b>
                    </div>
                    <div class="col-xl-2">
                        <span class="id-client" v-if="slotProps.node.id">ID {{slotProps.node.id}}</span>
                    </div>
                </div>
            </span>
        </template>
        <template #text="slotProps">
          <div class="row">
            <div class="info-body col-lg-8 col-md-7 col-sm-12">
              <div class="mt-sm-2">
                <span class="info-title">(220) {{$t('date_application_submission')}}: </span><span>{{slotProps.node.order_day}}</span>
              </div>
              <hr>
              <div class="mt-sm-2">
                <span class="info-title">(151) {{$t('reg_date')}}: </span><span>{{slotProps.node.reg_date}}</span>
              </div>
              <hr>
              <div class="mt-sm-2">
                <span class="info-title">(731) {{$t('applicant_name_address')}}: </span>
                <template v-if="slotProps.node.applicants_list">
                  <div v-for="applicant in slotProps.node.applicants_list">
                    <span>{{applicant.name}} - {{applicant.address}};</span>
                  </div>
                </template>
              </div>
              <hr>
              <div class="mt-sm-2">
                <span class="info-title">(740) {{$t('name_address_representative')}}: </span>
                <template v-if="slotProps.node.address_representative">
                  <div v-for="trusted_people in slotProps.node.address_representative">
                    <span>{{trusted_people.name}} - {{trusted_people.address}};</span>
                  </div>
                </template>
              </div>
              <hr>
              <div class="mt-sm-2">
                <span class="info-title">(750) {{$t('mailing_address')}}: </span><span>{{slotProps.node.letter_address}}</span>
              </div>
              <hr>
              <div class="mt-sm-2">
                <span class="info-title">(531) {{$t('viennese_classification')}}: </span><span>{{slotProps.node.viennese_classification}}</span>
              </div>
              <hr>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-12 text-md-right text-sm-center">
              <p class="info-title font-weight-bold text-md-right text-sm-center">(540) {{$t('sign_image')}}</p>
              <img class="mt-3" :src="slotProps.node.image" style="max-width: 300px">
            </div>
            <div class="mt-sm-2 col-lg-12 col-md-12 col-sm-12">
              <span class="info-title">(511) {{$t('indices_Nice_classification')}}: </span>
              <div class="mt-3 ml-2" v-if="slotProps.node.prod_class">
                <div class="row section-classes-items border position-relative mt-4 p-3"
                     v-for="pr_class in slotProps.node.prod_class">
                  <div class="item-content col-lg-1 col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
                    {{pr_class.class_num}}
                  </div>
                  <div class="col-lg-11 col-md-10 col-sm-12 d-flex align-items-center mt-md-0 mt-sm-2">
                    <p class="subtitle text-justify">{{pr_class.description}}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr>
          </div>
        </template>
      </Tree>
      <Dialog :visible.sync="displayModal" :modal="true">
        <div class="form">
          <div class="container form-panel">
            <div class="form-header text-center">
              <img src="../../../assets/img/check-circle.png">
            </div>
            <div class="main-form mt-5 text-center">
              <h2 class="title">{{$t('dialog_success')}}!</h2>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
    import SearchMainContent from "../SearchMainContent";
    import tmbuttons from "../../../assets/custom-styles/tmbuttons";
    import Tree from 'primevue/tree';
    import Dialog from 'primevue/dialog';
    import { mapActions, mapState } from 'vuex';
    export default {
        name: "AllReportsMain",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.search_results_reports'
        },
        data() {
            return {
                active: 0,
                visible: true,
                selectedKey1: null,
                treeloader: true,
                nodes: [],
                displayModal: false,
                disabledBtn: false
            }
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
            }),
        },
        mounted() {
            this.getIdSearchQuery(this.$route.params.id).then(response => {
                let report_list = [];
                let date_list = [];
                if (response.length == 0) {
                    this.treeloader = false;
                    this.nodes = [{label: this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.'}];
                } else {
                    for (var i = 0; i < response.length; i++) {
                        report_list.push(
                            {
                                key: i + '-' + i,
                                label: '№' + response[i].app_number,
                                children: [
                                    {
                                        date: response[i].date,
                                        order_id: response[i].search_request,
                                        key: i + '-' + i + '-' + i,
                                        order_day: response[i].app_date ? response[i].app_date : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                        reg_date: response[i].reg_date ? response[i].reg_date : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                        applicants_list: response[i].applicants ? response[i].applicants : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                        address_representative: response[i].trusted_people ? response[i].trusted_people : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                        letter_address: response[i].mailing_address ? response[i].mailing_address : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                        viennese_classification: response[i].img_categories ? response[i].img_categories: this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                        type: "text",
                                        prod_class: response[i].classes ? response[i].classes : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                        image: response[i].image ? response[i].image : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.'
                                    },
                                ]
                            });
                    this.treeloader = false;
                    }
                    for (let views_items of report_list) {
                        date_list.push(views_items.children[0].date);
                    }
                    date_list = this.unique(date_list);
                    for (var i = 0; i < date_list.length; i++) {
                        let filtered_data = report_list.filter(item => item.children[0].date == date_list[i]);
                        this.nodes.push(
                            {
                                key: i,
                                label: date_list[i],
                                children: filtered_data
                            }
                        );
                    }
                }
            });
        },

        methods: {
            ...mapActions('account', ['getAllSearchQueries', 'getIdSearchQuery']),
            unique(arr) {
                let result = [];

                for (let str of arr) {
                    if (!result.includes(str)) {
                        result.push(str);
                    }
                }

                return result;
            },
        },
        components: {SearchMainContent, Tree, Dialog, tmbuttons}
    }
</script>

<style lang="scss">
  @import "../../../assets/core/_colors.scss";
  .p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler {
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
    color: #6c757d;
    border: 0 none;
    background: $dark-green-color !important;
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
  }

  .p-tree .p-tree-container .p-treenode .p-treenode-content:focus,
  .p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler:focus {
    box-shadow: 0 0 0 0.2rem transparent;
  }

  .p-tree .p-tree-container .p-treenode .p-treenode-content .p-tree-toggler:enabled:hover {
    background: $dark-green-color;
  }

  .p-treenode-content .pi-chevron-right, .p-treenode-content .pi-chevron-down {
    color: $white-color;
  }

  .item-content {
    background-color: rgba(49, 187, 103, 0.2);
    max-width: 40px;
    height: 40px;
    color: #31BB67;
  }
</style>
