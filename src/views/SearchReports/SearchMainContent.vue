<template>
  <div class="user-search-content position-relative mt-4">
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             color="green">
    </loading>
    <div v-if="alert.message_sendReportToEmail" :class="'alert ' + alert.type">
      {{alert.message_sendReportToEmail}}
    </div>
    <Tree :value="nodes" @node-expand="openSearchInfo" :loading="treeloader">
      <template #default="slotProps">
        <span style="cursor: pointer;">
          <div class="row mr-0 ml-0">
            <div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 d-flex align-items-center">
              <b>{{slotProps.node.number}} {{slotProps.node.label}}
                <template v-if="slotProps.node.products_params">
                  <template v-if="slotProps.node.products_params.keywords">
                    {{slotProps.node.products_params.keywords.length > 20 ? slotProps.node.products_params.keywords.substr(0, 20) + '...'
                    : slotProps.node.products_params.keywords}}
                  </template>
                  <template v-if="slotProps.node.products_params.MKTP">
                    {{slotProps.node.products_params.MKTP.length > 12 ?
                    slotProps.node.products_params.MKTP.substr(0, 30) + '...'
                    : slotProps.node.products_params.MKTP}}
                  </template>
                  <template v-if="slotProps.node.products_params.MKZE">
                    {{slotProps.node.products_params.MKZE.length > 12 ?
                    slotProps.node.products_params.MKZE.substr(0, 20) + '...'
                    : slotProps.node.products_params.MKZE}}
                  </template>
                  <template v-if="slotProps.node.products_params.product_class">
                    {{slotProps.node.products_params.product_class.length > 12 ?
                    slotProps.node.products_params.product_class.substr(0, 20) + '...'
                    : slotProps.node.products_params.product_class}}
                  </template>
                  <template v-if="slotProps.node.products_params.owners">
                    {{slotProps.node.products_params.owners.length > 12 ?
                    slotProps.node.products_params.owners.substr(0, 50) + '...'
                    : slotProps.node.products_params.owners}}
                  </template>
                </template>
                {{slotProps.node.Report}}
              </b>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-lg-end justify-content-sm-start">
              <span class="id-client d-flex align-items-center" v-if="slotProps.node.id">ID {{slotProps.node.id}}</span>
              <button type="button" class="btn btn-tm ml-4" v-if="slotProps.node.id" v-on:click="sendToEmail(slotProps.node.id, slotProps.node.repdate)">
                <b-icon icon="envelope"></b-icon>
                {{$t('send_to_email')}}
              </button>
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
              <template v-if="slotProps.node.customer_name">
                <div v-for="applicant in slotProps.node.customer_name">
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
            <span class="info-title">(511) Індекси Ніццької класифікації: </span>
            <div class="mt-3 ml-2" v-if="slotProps.node.prod_desc">
              <div class="row section-classes-items border position-relative mt-4 p-3"
                   v-for="pr_class in slotProps.node.prod_desc">
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
            <img src="../../assets/img/check-circle.png">
          </div>
          <div class="main-form mt-5 text-center">
            <h2 class="title">{{$t('dialog_success')}}!</h2>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>

    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Tree from 'primevue/tree';
    import Dialog from 'primevue/dialog';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "SearchMainContent",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.search_results_reports'
        },
        data() {
            return {
                isLoading: false,
                fullPage: false,
                active: 0,
                visible: true,
                selectedKey1: null,
                treeloader: true,
                nodes: [],
                displayModal: false,
            }
        },
        computed: {
            ...mapState({
                alert: state => state.alert
            })
        },
        mounted () {
            let current_report;
            this.getAllSearchQueries().then(response => {
                if (response) {
                    let allsearch_arr = response;
                    for (let i = 0; i < allsearch_arr.length; i++) {
                        current_report = {
                            keywords: null,
                            MKTP: null,
                            MKZE: null,
                            product_class: null,
                            owners:  null
                        };
                        if (allsearch_arr[i].keywords_products_search_params) {
                            current_report = {
                                keywords: allsearch_arr[i].keywords_products_search_params.keywords ? this.$i18n.i18next.t('_common:pages.search_results_reports.key_words') + ' - ' + allsearch_arr[i].keywords_products_search_params.keywords.join(',') + ';' : '',
                                MKTP: allsearch_arr[i].keywords_products_search_params.product_classes ? this.$i18n.i18next.t('_common:pages.search_results_reports.quantity') + ' - ' + allsearch_arr[i].keywords_products_search_params.product_classes.join(',') + ';' : '',
                                MKZE: allsearch_arr[i].keywords_products_search_params.img_categories ? this.$i18n.i18next.t('_common:pages.search_results_reports.mkze') + ' - ' + allsearch_arr[i].keywords_products_search_params.img_categories.join(',') + ';' : '',
                            };
                        }
                        if (allsearch_arr[i].prod_class_search_params) {
                            current_report = {
                                product_class: allsearch_arr[i].prod_class_search_params.product_class ? allsearch_arr[i].prod_class_search_params.product_class + ';' : '',
                            };
                        }
                        if (allsearch_arr[i].owner_search_params) {
                            current_report = {
                                owners:  allsearch_arr[i].owner_search_params ? this.$i18n.i18next.t('_common:pages.search_results_reports.applicant') + ' - ' + allsearch_arr[i].owner_search_params.name + ' ' + allsearch_arr[i].owner_search_params.address : '',
                            };
                        }
                        this.nodes.push(
                            {
                                key: i,
                                label: '',
                                products_params: current_report,
                                Report: this.$i18n.i18next.t('_common:pages.search_results_reports.search_date') + ': ' + allsearch_arr[i].last_search_performed ? allsearch_arr[i].last_search_performed : '',
                                id: JSON.stringify(allsearch_arr[i].id),
                                repdate: allsearch_arr[i].report_registration_date.toString(),
                                children: [{}]
                            }
                            );
                    }
                    this.treeloader= false;
                }
            });
        },
        methods: {
            ...mapActions('account', ['getAllSearchQueries', 'getIdSearchQuery', 'sendReportToEmail']),
            unique(arr) {
                let result = [];

                for (let str of arr) {
                    if (!result.includes(str)) {
                        result.push(str);
                    }
                }

                return result;
            },
            openSearchInfo(node) {
                if (node.id) {
                    this.treeloader = true;
                    this.getIdSearchQuery(node.id).then(response => {
                        let report_list = [];
                        let date_list = [];
                        if(response.length == 0) {
                            this.treeloader = false;
                            let rep_index = this.findWithAttr(this.nodes, 'id', node.id);
                            this.nodes[rep_index].children =
                                [{label: this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.'}];
                        } else {
                            let rep_index = this.findWithAttr(this.nodes, 'id', node.id);
                            this.nodes[rep_index].children = [];
                            for (let item = 0; item < response.length; item++) {
                                report_list.push(
                                    {
                                        key: item + '-' + item + '-' + rep_index,
                                        label: '№' + response[item].app_number,
                                        children: [
                                            {
                                                date: response[item].date,
                                                order_id: response[item].search_request,
                                                key: item + '-' + item + '-' + item + '-' + rep_index,
                                                order_day: response[item].app_date,
                                                reg_date: response[item].reg_date ? response[item].reg_date : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                                customer_name: response[item].applicants ? response[item].applicants : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                                address_representative: response[item].trusted_people ? response[item].trusted_people : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                                letter_address: response[item].mailing_address ? response[item].mailing_address : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                                viennese_classification: response[item].img_categories,
                                                type: "text",
                                                prod_desc: response[item].classes ? response[item].classes : this.$i18n.i18next.t('_common:pages.search_results_reports.empty_data') + '.',
                                                image: response[item].image ? response[item].image : ''
                                            },
                                        ]
                                    })
                            }
                            for (let views_items of response) {
                                date_list.push(views_items.date);
                            }
                            date_list = this.unique(date_list);
                            for (let i = 0; i < date_list.length; i++) {
                                var filtered_data = report_list.filter(item => item.children[0].date === date_list[i]);
                                this.nodes[rep_index].children.push(
                                    {
                                        key: i + '-' + rep_index,
                                        label: date_list[i],
                                        children: filtered_data
                                    }
                                );
                            }
                            this.treeloader = false;

                        }
                    });
                }
            },
            findWithAttr(array, attr, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][attr] === value) {
                        return i;
                    }
                }
                return -1;
            },
            sendToEmail(id, date) {
                this.isLoading = true;
                this.sendReportToEmail({'request_id': id, 'date': date}).then(response => {
                    if (response) {
                        this.isLoading = false;
                        this.displayModal = true;
                    }
                }, error => {this.isLoading = false});
            }
        },
        components: {tmbuttons, Dialog, Loading, Tree}
    }
</script>

<style lang="scss">
  @import "../../assets/core/_colors.scss";

  .p-tree {
    border: 1px solid transparent;
    padding: 0;
  }

  .p-treenode-content {
    border: 1px solid var(--dark-grey-color);
    background: transparent;
    color: var(--black-color);
    padding: 0.5rem;
    border-radius: 3px;
  }

  .p-treenode-children .p-treenode-content {
    border: 1px solid transparent;
    background: transparent;
    color: var(--black-color);
    padding: 0.5rem;
    border-radius: 3px;
  }

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

  .p-treenode-label {
    width: 100%;
  }

  .btn-tm {
    background-color: $dark-green-color !important;
    border-color: $dark-green-color !important;
    color: $white-color;

    &:hover {
      background-color: $dark-green-color !important;
      border-color: $dark-green-color !important;
      color: $white-color;
    }
  }

  .btn.disabled, .btn:disabled:hover {
    background-color: $dark-green-color !important;
    border-color: $dark-green-color !important;
    opacity: 0.65;
  }

  .item-content {
    background-color: rgba(49, 187, 103, 0.2);
    max-width: 40px;
    height: 40px;
    color: #31BB67;
  }

  @media (max-width: 767px) {
    .user-search-content b, span, p {
      font-size: 14px;
    }
  }
</style>
