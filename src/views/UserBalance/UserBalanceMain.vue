<template>
  <div class="mt-4 container-fluid">
    <h3 class="title pr-4">{{$t('title')}}</h3>
    <div class="balance-info row" ref="containerLoading">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="border mt-4">
          <div class="row">
            <div class="icon-content mt-1 col-lg-3 col-md-3 col-sm-3 col-xs-3 d-flex justify-content-center align-items-center">
              <b-icon class="text-right" icon="file-earmark-text"></b-icon>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 mt-sm-2">
              <span class="info-title">{{$t('user_balance')}}</span>
              <p class="balance-number">{{user.balance}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="packages mt-4">
      <div v-if="alert.message_balanceInfo" :class="'alert ' + alert.type">
        {{alert.message_balanceInfo}}
      </div>
      <h6 class="title pr-4">{{$t('batch_replenishment')}}:</h6>
      <div class="card-deck">
        <div class="card col-xl-3 col-lg-4 col-md-4 col-sm-6 mt-2" v-for="(item, key) in balanceInfo" :key="key">
          <div class="card_header align-items-center">
            <span class="balance-number" v-if="item.is_personal">{{item.max_requests}}+ {{$t('searches')}}</span>
            <span class="balance-number" v-else>{{item.max_requests}} {{$t('searches')}}</span>
            <b-icon icon="dot" style="color: #098F2B;"></b-icon>
            <p class="card-info-title" v-if="item.month_price">{{item.month_price}} {{$t('currency')}}/{{$t('month')}}</p>
            <p class="card-info-title" v-if="item.year_price">{{item.year_price}} {{$t('currency')}}/{{$t('year')}}</p>
<!--            <span class="card-info-title">{{item.max_requests * parseInt(item.search_price)}} грн</span>-->
            <p class="card-count-subtitle">({{$t('one_search_cost')}}  {{item.search_price}} {{$t('currency')}}.)</p>
          </div>
          <div class="card-body">
            <span class="tile-info-title">{{$t('usage_example')}}:</span>
            <p class="card-count-subtitle mt-2" v-if="item.description">{{item.description}}</p>
            <p class="card-count-subtitle mt-2" v-else>{{$t('empty_data')}}.</p>
          </div>
          <div class=" d-flex justify-content-center" v-if="!item.is_personal">
            <SelectButton v-model="durationlist[key]" :options="duration" optionLabel="name" />
          </div>
          <div class="card-footer d-flex justify-content-center">
            <ToggleButton v-model="checkedPriceForMonth[key]"
                          @change="changeAction($event, key, item.id, item.month_price, item.is_personal)"
                          :onLabel="$t('selected')" :offLabel="$t('choose')" onIcon="pi pi-check" offIcon="pi pi-check"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-4 col-md-5 col-sm-5">
        <b-icon icon="info-circle" style="color: #098F2B;" aria-hidden="true" v-b-toggle.collapse-1></b-icon>
        <h6 class="card-count-subtitle d-inline pl-2" v-b-toggle.collapse-1>{{$t('cost_quantity')}}</h6>
<!--        <b-collapse id="collapse-1" class="mt-2">-->
<!--          <DataTable :value="balancePrices">-->
<!--            <Column field="code" :header="$t('search_quantity')">-->
<!--              <template #body="slotProps">-->
<!--                {{slotProps.data.count}}-->
<!--              </template>-->
<!--            </Column>-->
<!--            <Column field="name" :header="$t('cost_one_searching')">-->
<!--              <template #body="slotProps">-->
<!--                {{slotProps.data.one_searching}}-->
<!--              </template>-->
<!--            </Column>-->
<!--          </DataTable>-->
<!--        </b-collapse>-->
      </div>
      <div class="col-lg-5 col-md-7 col-sm-7">
        <div class="button-content d-flex justify-content-center">
          <tmbuttons v-if="disabledBtn"
                     disabled
                     class="btn-tm mt-5"
                     v-bind:bwidth="'181px'"
                     v-bind:bname="$t('continue_btn')"
                     v-bind:clickhandler="sendblanceBill"/>
          <tmbuttons v-else
                     class="btn-tm mt-5"
                     v-bind:bwidth="'181px'"
                     v-bind:bname="$t('continue_btn')"
                     v-bind:clickhandler="sendblanceBill"/>
        </div>
      </div>
    </div>
    <Dialog :visible.sync="displayModal" :modal="true">
      <div class="container form-panel">
        <div class="main-form mt-2 text-center">
          <h2 class="title">{{$t('upload_account_to_mail')}}</h2>
        </div>
        <div v-if="alert.message_balanceRequestsAmountPDF" :class="'alert ' + alert.type">
          {{alert.message_balanceRequestsAmountPDF}}
        </div>
        <button type="button"
                v-if="disabledModalsPDFBtn"
                disabled
                class="btn btn-tm mt-5" style="width: 100%"
                v-on:click="downloadPDF">
          <b-icon icon="download"></b-icon>
          {{$t('pdf_download_format')}}
        </button>
        <button type="button"
                v-else
                class="btn btn-tm mt-5" style="width: 100%"
                v-on:click="downloadPDF">
          <b-icon icon="download"></b-icon>
          {{$t('pdf_download_format')}}
        </button>
        <button type="button"
                v-if="disabledEmailModalsBtn"
                disabled
                class="btn btn-tm mt-3" style="width: 100%"
                v-on:click="sendBalanceBill">
          <b-icon icon="envelope"></b-icon>
          {{$t('send_to_mail')}}
        </button>
        <button type="button"
                v-else
                class="btn btn-tm mt-3" style="width: 100%"
                v-on:click="sendBalanceBill">
          <b-icon icon="envelope"></b-icon>
          {{$t('send_to_mail')}}
        </button>
      </div>
    </Dialog>
    <Dialog :visible.sync="displayFinishModal" :modal="true">
      <div class="form">
        <div class="container form-panel">
          <div class="form-header text-center">
            <img src="../../assets/img/check-circle.png">
          </div>
          <div class="main-form mt-5 text-center">
            <h2 class="title" v-if="modalsPDFText">{{$t('success_modalsPDFText')}}!</h2>
            <h2 class="title" v-if="modalsEmailText">{{$t('success_modalsEmailText')}}</h2>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Dialog from 'primevue/dialog';
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import ToggleButton from 'primevue/togglebutton';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    import SelectButton from 'primevue/selectbutton';
    export default {
        name: "UserBalanceMain",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.balance'
        },
        data() {
            return {
                modalsPDFText: false,
                modalsEmailText: false,
                balanceInfo: [],
                searches: [],
                balancePrices: [],
                checkedPriceForMonth: [],
                checkedPriceForYear: [],
                requests_amount: '',
                requests_id: '',
                displayModal: false,
                displayFinishModal: false,
                disabledModalsPDFBtn: false,
                disabledEmailModalsBtn: false,
                disabledBtn: true,
                durationlist: [],
                actionindx: -1,
                duration: [],
                email: process.env.EMAIL,
                is_open_email: false,
            }
        },
        computed: {
            ...mapState({
                user: state => state.account.user,
                alert: state => state.alert,
            }),
        },
        mounted () {
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.containerLoading,
                canCancel: false,
                onCancel: this.onCancel,
            });
            this.duration = [
                {name: this.$i18n.i18next.t('_common:pages.balance.month'), code: 1},
                {name: this.$i18n.i18next.t('_common:pages.balance.year'), code: 12}
            ];
            this.getBalanceInfo().then(response => {
                if (response) {
                    this.balanceInfo = response;
                    // for (let balance_count of response) {
                    //     this.balancePrices.push({count: balance_count.max_requests, one_searching: balance_count.search_price});
                    //     this.balancePrices.push({count: this.balanceInfo[i].max_requests, one_searching: this.balanceInfo[i].search_price});
                    // }
                    for (let i = 0; i < this.balanceInfo.length; i++) {
                        this.durationlist.push({code: 1, name: this.$i18n.i18next.t('_common:pages.balance.month')});
                    }
                    this.balanceInfo.sort(function(a,b) {
                        return a.max_requests - b.max_requests;
                    });
                    loader.hide();
                }
            });
        },
        methods: {
            ...mapActions('account', ['getBalanceInfo', 'downloadRequestsAmountPDF', 'sendRequestsAmountEmail', 'getObjectByUrl']),

            changeAction(e, indx, id, month_price, is_personal ) {
                this.is_open_email = false;
                for (let i = 0; i < this.checkedPriceForMonth.length; i++) {
                    if (i !== indx) {
                        this.checkedPriceForMonth[i] = false;
                    }
                }
                if (this.checkedPriceForMonth.some(elem => (elem))) {
                    this.disabledBtn = false;
                } else {
                    this.disabledBtn = true;
                }
                this.actionindx = indx;
                this.requests_id = id;

                if (is_personal) {
                    this.is_open_email = is_personal;
                }
            },

            sendblanceBill() {
                if (this.is_open_email) {
                    location.href = "mailto:"+this.email;
                } else {
                    this.displayModal = true;
                }
            },
            forceFileDownload(urlToFile) {
                this.getObjectByUrl(urlToFile).then(pdf_file => {
                    if (pdf_file) {
                        const pathArr = urlToFile.split('/');
                        const url = window.URL.createObjectURL(new Blob([pdf_file], { type: 'application/pdf' }));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'bill_' + pathArr[pathArr.length-1]);
                        document.body.appendChild(link);
                        link.click();
                        this.displayModal = false;
                        this.displayFinishModal = true;
                    }
                });
            },
            downloadPDF() {
                this.disabledModalsPDFBtn = true;
                this.downloadRequestsAmountPDF({'requests_id': this.requests_id.toString(), 'requests_amount': this.durationlist[this.actionindx].code.toString()}).then(response => {
                    if (response) {
                        this.modalsPDFText = true;
                        this.modalsEmailText = false;
                        this.disabledModalsPDFBtn = false;
                        this.forceFileDownload(`${process.env.API_URL}${response.url}`);
                    }
                });
            },
            sendBalanceBill() {
                this.disabledEmailModalsBtn = true;
                this.sendRequestsAmountEmail({'requests_id': this.requests_id.toString(), 'requests_amount': this.durationlist[this.actionindx].code.toString()}).then(response => {
                    if (response) {
                        this.modalsPDFText = false;
                        this.modalsEmailText = true;
                        this.displayModal = false;
                        this.disabledEmailModalsBtn = false;
                        this.displayFinishModal = true;
                    }
                });
            }
        },
        components: {tmbuttons, DataTable, Column, ToggleButton, Dialog, SelectButton}
    }
</script>

<style scoped>
  @import "../../assets/core/_colors.scss";

  .balance-number {
    color: var(--dark-green-color);
    font-weight: 600;
  }

  .card .card_header {
    border-bottom: 1px solid var(--light-grey-color);
  }

  .packages .card .card_header, .card-body {
    padding: 20px 0 20px 15px;
  }

  .card-info-title {
    color: var(--subtitle-black-color);
    font-weight: 600;
  }

  .info-title {
    font-size: 15px;
    color: var(--subtitle-black-color);
  }

  .card-count-subtitle {
    font-size: 14px;
    color: var(--subtitle-black-color);
  }

  .coast-info h6 {
    width: 100%;
    border-bottom: 2px solid var(--dark-grey-color);
    line-height: 0.1em;
    margin: 10px 0 20px;
  }

  .coast-info h6 span {
    background: var(--white-color);
    padding: 0 10px;
  }

  :focus {
    outline: -webkit-focus-ring-color auto 0px;
  }

  >>> .p-datatable .p-datatable-thead > tr > th {
    background: transparent;
  }

  .p-togglebutton.p-button {
    background: var(--white-color);
    border: 1px solid var(--dark-green-color);
    color: var(--light-black-color);
    white-space: nowrap;
  }

  .p-button:focus {
    outline: 0 none;
    outline-offset: 0;
    -webkit-box-shadow: 0 0 0 0.2rem transparent;
    box-shadow: 0 0 0 0.2rem transparent;
  }

  .p-togglebutton.p-button.p-highlight {
    background: rgba(49, 187, 103, 0.2);
    border-color: var(--dark-green-color);
    color: var(--dark-green-color);
  }

  >>> .p-togglebutton.p-button.p-highlight .p-button-icon-left, .p-togglebutton.p-button.p-highlight .p-button-icon-right {
    color: var(--dark-green-color);
  }

  .card-footer {
    padding: 0.75rem 1.25rem;
    background-color: transparent;
    border-top: 1px solid transparent;
  }

  @media (min-width: 1200px) {
    .col-xl-3 {
      -ms-flex: 0 0 22%;
      -webkit-box-flex: 0;
      flex: 0 0 22%;
      max-width: 22%;
    }
  }

  @media (min-width: 670px) and (max-width: 767.98px) {
    .col-sm-6 {
      -ms-flex: 0 0 40%;
      -webkit-box-flex: 0;
      flex: 0 0 40%;
      max-width: 40%;
    }
  }
</style>
