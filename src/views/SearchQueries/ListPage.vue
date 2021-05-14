<template>
  <div class="mt-4" :visible.sync="showInfo">
    <DataTable :value="products" class="p-datatable-responsive-demo"
               :loading="loading"
               :paginator="true"
               :rows="10"
               :rowHover="true"
               :selection.sync="selectedproducts"
               :resizableColumns="true"
               columnResizeMode="expand"
               :scrollable="true"
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
               :rowsPerPageOptions="[5,10,25]"
               currentPageReportTemplate="Показано {last} записів">
      <template #empty>
        {{$t('empty_data')}}
      </template>
      <template #loading>
        {{$t('loading_data')}}
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3em">
      </Column>
      <Column field="code" headerStyle="width: 5%" header="№">
        <template #body="slotProps">
          <span class="p-column-title">№</span>
          {{slotProps.data.number}}
        </template>
      </Column>
      <Column field="status" headerStyle="width: 5%" :header="$t('status')">
        <template #body="slotProps">
          <div v-if="slotProps.data.status == true" class="status_color_green mr-2"></div>
          <div v-else class="status_color_red mr-2"></div>
        </template>
      </Column>
      <Column field="keyword" headerStyle="width: 20%" :header="$t('keyword')">
        <template #body="slotProps">
          {{slotProps.data.keywords}}
        </template>
      </Column>
      <Column field="quantity" :header="$t('quantity')">
        <template #body="slotProps">
          {{slotProps.data.MKTP}}
          {{slotProps.data.MKTP_class}}
        </template>
      </Column>
      <Column field="mkze" :header="$t('mkze')">
        <template #body="slotProps">
          {{slotProps.data.MKZE}}
        </template>
      </Column>
      <Column field="applicant" :header="$t('applicant')">
        <template #body="slotProps">
          {{slotProps.data.owners}}
        </template>
      </Column>
      <Column field="term" :header="$t('term')">
        <template #body="slotProps">
          <p>{{slotProps.data.termdate}}</p>
          <router-link class="link" to="/balance">
            {{slotProps.data.term}}
          </router-link>
        </template>
      </Column>
      <Column field="frequency" :header="$t('frequency')">
        <template #body="slotProps">
          <span v-if="slotProps.data.frequency == 'day'">{{$t('daily')}}</span>
          <span v-if="slotProps.data.frequency == 'week'">{{$t('weekly')}}</span>
          <span v-if="slotProps.data.frequency == 'month'">{{$t('monthly')}}</span>
        </template>
      </Column>
      <Column field="reports" :header="$t('reports')">
        <template #body="slotProps">
          <router-link class='link' :to="{ path: '/allsearch-report/'+ slotProps.data.number}">
            {{slotProps.data.reports}}
          </router-link>
        </template>
      </Column>
      <Column field="edit" :header="$t('edit')">
        <template #body="slotProps">
          <router-link class="link d-flex justify-content-center" :to="{ path: '/edit-query/'+ slotProps.data.number}">
            <img :src="require(`../../assets/img${slotProps.data.edit}`)"/>
          </router-link>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    export default {
        name: "ListPage",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.list_page'
        },
        data() {
            return {
                selectedproducts: [],
                loading:true,
                searchInfo:[],
                products: []
            }
        },
        mounted() {
            this.getSearchInfo().then(response => {
                if (response) {
                    let search_arr = response;
                    for (let query_i of search_arr) {
                        this.products.push(
                            {
                                number: query_i.id,
                                status: query_i.status,
                                keywords: query_i.keywords_products_search_params ? query_i.keywords_products_search_params.keywords.join(',') : '',
                                MKTP: query_i.keywords_products_search_params ? query_i.keywords_products_search_params.product_classes.join(',') : '',
                                MKTP_class: query_i.prod_class_search_params ? query_i.prod_class_search_params.product_class : '',
                                MKZE: query_i.keywords_products_search_params ? query_i.keywords_products_search_params.img_categories.join(',') : '',
                                owners: query_i.owner_search_params ? query_i.owner_search_params.name + " " + query_i.owner_search_params.address : '',
                                termdate: query_i.report_registration_end_date,
                                term: this.$i18n.i18next.t('_common:pages.list_page.continue'),
                                frequency: query_i.report_frequency,
                                reports: this.$i18n.i18next.t('_common:pages.list_page.review'),
                                edit: '/edit-img.png'
                            });
                    }
                    this.loading = false;
                }
            });
        },
        computed: {
            showInfo: {
                get: function () {
                    return this.show
                },
                set: function (newValue) {
                    this.$emit('update:show', newValue)
                }
            },
        },
        watch:{
            selectedproducts (val) {
                this.changeAction(val);
            }
        },
        methods: {
            ...mapActions('account', ['getSearchInfo']),
            changeAction() {
                let number_list = [];
                for(let cheked_numb of this.selectedproducts) {
                    number_list.push(cheked_numb.number);
                }
              this.$emit('finishquery', number_list);
            }
        },
        components: {DataTable, Column},
    }
</script>

<style lang="scss">
  .p-datatable-responsive-demo .p-dropdown {
    background: var(--light-green-color);
    border: 1px solid var(--light-green-color);
  }

  .p-datatable-responsive-demo .p-dropdown span {
    color: var(--dark-green-color);
  }

  .p-paginator.p-component.p-paginator-bottom {
    display: flex;
    justify-content: flex-start;
    -webkit-box-pack: start;
  }

  .p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
    display: none;
  }

  @media screen and (max-width: 40em) {
    /deep/ .p-datatable {
      &.p-datatable-responsive-demo {
        .p-datatable-thead > tr > th,
        .p-datatable-tfoot > tr > td {
          display: none !important;
        }

        .p-datatable-tbody > tr > td {
          text-align: left;
          display: block;
          border: 0 none !important;
          width: 100% !important;
          float: left;
          clear: left;

          .p-column-title {
            padding: .4rem;
            min-width: 30%;
            display: inline-block;
            margin: -.4em 1em -.4em -.4rem;
            font-weight: bold;
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .p-datatable-responsive-demo {
      font-size: 12px;
    }

  }
</style>
