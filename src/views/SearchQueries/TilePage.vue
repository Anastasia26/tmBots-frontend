<template>
  <div class="card-section" :visible.sync="showInfo" ref="containerLoading">
    <div class="card-deck row" v-model="searchInfo">
      <div v-if="alert.message_getSearchInfo" :class="'alert ' + alert.type">
        {{alert.message_getSearchInfo}}
      </div>
      <div v-if="searchInfo.length==0">
        <p class="mt-4 col-xl-12 col-lg-12 col-md-12 col-sm-12">{{$t('empty_data')}}</p>
      </div>
      <div v-else class="cards mt-4 col-xl-3 col-lg-4 col-md-4 col-sm-6" v-for="(item, key) in searchInfo" :key="key">
        <div class="row card_header align-items-center">
          <div class="col-lg-3 col-md-3 col-sm-6">
            <span class="tile-info-title">{{item.id}}</span>
          </div>
          <div class="col-lg-9 col-md-9 col-sm-6 d-flex justify-content-md-end justify-content-sm-start">
            <span class="tile-info-title">{{$t('status')}}:</span>
            <div v-if="item.status == true" class="d-flex align-self-center status_color_green ml-2"></div>
            <div v-else class="status_color_red ml-2"></div>
          </div>
        </div>
        <div class="card-body">
          <div v-if="item.keywords_products_search_params">
            <span class="tile-info-title">{{$t('keyword')}}: </span>
            <span v-if="item.keywords_products_search_params.keywords">
                {{ item.keywords_products_search_params.keywords.toString().length > 15
                ? item.keywords_products_search_params.keywords.toString().substr(0, 15) + '...'
                : item.keywords_products_search_params.keywords.join(',') }}
              </span>
            <hr>
            <span class="tile-info-title">{{$t('quantity')}}: </span>
            <span v-if="item.keywords_products_search_params.product_classes">{{ item.keywords_products_search_params.product_classes.join(',') }}</span>
            <hr>
            <span class="tile-info-title">{{$t('mkze')}}: </span>
            <span class="mkze" v-if="item.keywords_products_search_params.img_categories">
                  {{item.keywords_products_search_params.img_categories.length > 20 ?
                 item.keywords_products_search_params.img_categories.join(',') + '...' : item.keywords_products_search_params.img_categories.join(',')}}
              </span>
          </div>
          <div v-if="item.owner_search_params">
            <span class="tile-info-title">{{$t('applicant')}}: </span>
            <span>{{item.owner_search_params.name }}
                <span v-if="item.owner_search_params.address"> - {{item.owner_search_params.address }}</span>
              </span>
            <hr>
            <span class="tile-info-title">{{$t('quantity')}}: </span><span>{{$t('empty_data')}}</span>
            <hr>
            <span class="tile-info-title">{{$t('mkze')}}: </span><span>{{$t('empty_data')}}</span>
          </div>
          <div v-if="item.prod_class_search_params">
            <span class="tile-info-title">{{$t('keyword')}}: </span><span>{{$t('empty_data')}}</span>
            <hr>
            <span class="tile-info-title">{{$t('quantity')}}: </span>
            <span
              v-if="item.prod_class_search_params.product_class">{{ item.prod_class_search_params.product_class }}</span>
            <hr>
            <span class="tile-info-title">{{$t('mkze')}}: </span><span>{{$t('empty_data')}}</span>
          </div>
          <hr>
          <div class="row">
            <div class="col-lg-7 col-md-7 col-sm-12 mt-sm-2">
              <span class="tile-info-title">{{$t('term')}}: </span><span v-if="item.report_registration_end_date"> {{ item.report_registration_end_date }}</span>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-12 mt-sm-2">
              <router-link class="link d-flex justify-content-md-end justify-content-sm-start" to="/balance">
                {{$t('continue')}}
              </router-link>
            </div>
          </div>
          <hr>
          <span class="tile-info-title">{{$t('frequency')}}: </span>
          <span v-if="item.report_frequency == 'day'">{{$t('daily')}}</span>
          <span v-if="item.report_frequency == 'week'">{{$t('weekly')}}</span>
          <span v-if="item.report_frequency == 'month'">{{$t('monthly')}}</span>
          <hr>
          <div class="button-content d-flex justify-content-md-center justify-content-sm-start">
            <router-link class="btn light-green-button d-flex align-items-center" :to="{ path: '/allsearch-report/'+ item.id}">
              {{$t('review')}}
            </router-link>
          </div>
          <hr>
          <div class="row mb-3">
            <div class="col-lg-8 col-md-7 col-sm-12 p-field-checkbox">
              <Checkbox id="chrequest" v-model="keyWordsProperties" @change="changeAction(keyWordsProperties, item.status)" :value="item.id"/>
              <label for="chrequest" class="checkbox-label ml-xl-1">{{$t('choose_query')}}</label>
            </div>
            <div class="col-lg-4 col-md-5 col-sm-12 mt-1">
              <router-link class="link d-flex justify-content-md-end justify-content-sm-start" :to="{ path: '/edit-query/'+ item.id}">
                {{$t('edit')}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Checkbox from 'primevue/checkbox';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    import ProlongSearchQuery from "../../components/modals/ProlongSearchQuery";
    export default {
        name: "TilePage",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.list_page'

        },
        data() {
            return {
                keyWordsProperties: [],
                searchInfo:[]
            }
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
            ...mapState({
                alert: state => state.alert,
            }),
        },
        mounted () {
            let loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.containerLoading,
                canCancel: false,
                onCancel: this.onCancel,
            });
            this.getSearchInfo().then(response => {
                if (response) {
                    this.searchInfo = response;
                    loader.hide();
                }
            });
        },
        methods: {
            ...mapActions('account', ['getSearchInfo']),
            changeAction(status, action) {
                this.$emit('finishquery', status, action[0]);
            }
        },
        components: {ProlongSearchQuery, Checkbox, tmbuttons}
    }
</script>

<style lang="scss" scoped>
  .card-deck .cards {
    margin-left: 15px;
    margin-right: 15px;
  }
  .mkze {
    word-break: break-all;
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
