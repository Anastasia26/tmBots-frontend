<template>
  <div class="container-fluid">
    <div class="user-header mt-4 row">
      <div class="col-xl-7 col-lg-6 col-md-6 col-sm-12">
        <h3 class="title pr-4">{{$t('title')}}</h3>
        <b-button-group>
          <tmbuttons class="split-button"
                     v-bind:bwidth="'120px'"
                     v-bind:class="{ active: isActive === 1 }"
                     v-bind:bname="$t('tile_btn')"
                     v-bind:clickhandler="openTilePage"/>
          <tmbuttons class="split-button"
                     v-bind:bwidth="'120px'"
                     v-bind:class="{ active: isActive === 0 }"
                     v-bind:bname="$t('list_btn')"
                     v-bind:clickhandler="openListPage"/>
        </b-button-group>
      </div>
      <div class="col-xl-5 col-lg-6 col-md-6 col-sm-12 d-flex align-items-center">
        <div class="row justify-content-end">
          <div class="col-lg-6 col-md-12 col-sm-12">
            <Dropdown class="mt-lg-0 mt-md-4 mt-sm-4"
                      v-model="selectedItem"
                      :options="actions"
                      optionLabel="name"
                      :placeholder="$t('actions_query_placeholder')"
                      @change="stopQuery">
              <template #value="slotProps">
                <div class="country-item country-item-value" v-if="slotProps.value">
                  <div>{{slotProps.value.name}}</div>
                </div>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{slotProps.option.name}}</div>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-sm-center">
            <tmbuttons class="btn-tm mt-lg-0 mt-md-4 mt-sm-3 create-new-search" v-if="user.requests_count >= user.search_package.max_requests"
                       v-bind:bname="$t('create_new_query_btn')"
                       v-bind:btnicon="'file-earmark-plus'"
                       disabled/>
            <tmbuttons class="btn-tm mt-lg-0 mt-md-4 mt-sm-3 create-new-search" v-else
                       v-bind:bname="$t('create_new_query_btn')"
                       v-bind:btnicon="'file-earmark-plus'"
                       v-bind:clickhandler="createNewSearch"/>
          </div>
        </div>
      </div>
    </div>
    <div class="user-content">
      <TilePage class="active-page" v-if="displayTilePage" v-on:finishquery="finishQuery($event)" v-bind:show="displayTilePage" v-on:update:show="displayTilePage = $event"/>
      <ListPage class="active-page" id="list-page" v-if="displayListPage" v-on:finishquery="finishQuery($event)" v-bind:show="displayListPage" v-on:update:show="displayListPage = $event"/>
    </div>
    <Dialog :visible.sync="displayConfirmation" :style="{width: '350px'}" :modal="true">
      <div class="confirmation-content">
        <div v-if="alert.message_stopSearchStatus" :class="'alert ' + alert.type">
          {{alert.message_stopSearchStatus}}
        </div>
        <span>{{$t('dialog_qa')}}</span>
      </div>
      <template #footer>
        <Button :label="$t('stop_status')" icon="pi pi-check" @click="changeStatus" class="p-button-text"/>
        <Button :label="$t('close_btn')" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" autofocus/>
      </template>
    </Dialog>
    <Toast position="top-right"/>
  </div>
</template>

<script>
    import { mapActions, mapState} from 'vuex';
    import Button from 'primevue/button';
    import Toast from 'primevue/toast';
    import Dialog from 'primevue/dialog';
    import Dropdown from 'primevue/dropdown';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    import TilePage from "./TilePage";
    import ListPage from "./ListPage";
    import router from '../../router/router';
    export default {
        name: "SearchQueryMain",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.main_search_query'
        },
        data() {
            return {
                displayConfirmation: false,
                isActive: 1,
                displayTilePage: true,
                displayListPage: false,
                selectedItem: null,
                position: 'center',
                selectCheckbox: '',
                status: false,
                action: [],
                actions: [
                    {name: this.$i18n.i18next.t('_common:pages.main_search_query.alert_to_stop_query'), value: false},
                    {name: this.$i18n.i18next.t('_common:pages.main_search_query.alert_to_restore_queries'), value: true},
                ],
            }
        },
        mounted() {
            if (localStorage.getItem("active_page") === '1') {
                this.openTilePage();
            }
            if (localStorage.getItem("active_page") === '0') {
                this.openListPage();
            }
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user
            })
        },
        methods: {
            ...mapActions('account', ['stopSearchStatus']),
            showError() {
                this.$toast.add({severity:'error', summary: this.$i18n.i18next.t('_common:pages.main_search_query.err'), life: 4000});
            },
            openConfirmation() {
                this.displayConfirmation = true;
            },
            closeConfirmation() {
                this.displayConfirmation = false;
            },
            finishQuery(event) {
                this.selectedProducts = event;
            },
            openTilePage() {
                this.isActive = 1;
                this.displayTilePage = true;
                this.displayListPage = false;
            },
            openListPage() {
                this.isActive = 0;
                this.displayListPage = true;
                this.displayTilePage = false;
            },
            stopQuery() {
                if (!this.selectedProducts) {
                    this.showError();
                } else {
                    this.openConfirmation();
                }
            },
            changeStatus() {
                this.stopSearchStatus({'data': this.selectedItem.value, 'search_id_list': this.selectedProducts}).then(()=>{
                    localStorage.setItem('active_page', this.isActive);
                })
            },
            createNewSearch() {
                router.push('/new-search-query');
            }
        },
        components: {Button, Dialog, Toast, Dropdown, tmbuttons, ListPage, TilePage}
    }
</script>

<style>
    @import "../../assets/styles/searchpage.scss";
</style>

