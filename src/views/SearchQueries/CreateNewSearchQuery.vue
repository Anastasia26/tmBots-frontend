<template>
  <div class="container-fluid new-search-query">
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             color="green"
    ></loading>
    <div class="components-header mt-4">
      <h3 class="title title-medium">{{$t('title')}}</h3>
    </div>
    <div v-if="alert.message_getCountryList" :class="'alert ' + alert.type">
      {{alert.message_getCountryList}}
    </div>
    <div v-if="alert.message_getOwnersList" :class="'alert ' + alert.type">
      {{alert.message_getOwnersList}}
    </div>
    <div v-if="alert.message_searchquerybykeywords" :class="alert.type">
      {{alert.message_searchquerybykeywords}}
    </div>
    <div v-if="alert.message_searchquerybyowners" :class="'alert ' + alert.type">
      {{alert.message_searchquerybyowners}}
    </div>
    <div v-if="alert.message_searchquerybyclasses" :class="'alert ' + alert.type">
      {{alert.message_searchquerybyclasses}}
    </div>
    <div class="main-content mt-5" ref="containerLoading">
      <div class="section-countries row mt-4" v-if="loadCountry">
        <div class="col-lg-5 col-md-12 col-sm-12">
          <h6>{{$t('choose_country.title')}}</h6>
          <Dropdown v-model="selectedCountries"
                    :options="countries"
                    optionLabel="name"
                    :filter="false"
                    :placeholder="$t('choose_country.placeholder')"
                    :showClear="false"
                    v-on:change="changeCountry"
          >
            <template #value="slotProps">
              <div class="country-item country-item-value" v-if="slotProps.value">
                <div>{{$t('choose_country.country_' + slotProps.value.name)}}</div>
              </div>
              <span v-else>{{slotProps.placeholder}}</span>
            </template>
            <template #option="slotProps">
              <div class="country-item">
                <div>{{$t('choose_country.country_' + slotProps.option.name)}}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="col-lg-7 col-md-12 col-sm-12 mt-md-0 mt-sm-3">
          <h6 class="text-left" style="cursor:pointer">
            <b-icon icon="exclamation-circle" @click="openSearchCriteria" font-scale="1.2" style="color: #B7B6B6"></b-icon>
            {{$t('search_criteria.title')}}
          </h6>
          <div>
            <b-button-group>
              <tmbuttons class="split-button"
                         v-bind:class="{ active: isSearchWord === 1 }"
                         v-bind:bname="$t('search_criteria.keywords_btn')"
                         v-bind:clickhandler="openKeyWordsInfo"/>
              <tmbuttons class="split-button"
                         v-bind:class="{ active: isSearchWord === 0 }"
                         v-bind:bname="$t('search_criteria.owners_btn')"
                         v-bind:clickhandler="openApplicantNameInfo"/>
              <tmbuttons class="split-button"
                         v-bind:class="{ active: isSearchWord === 2 }"
                         v-bind:bname="$t('search_criteria.class_btn')"
                         v-bind:clickhandler="openGoodsClassesInfo"/>
            </b-button-group>
          </div>
        </div>
      </div>
      <div class="section-name-applicant mt-4" v-show="openApplicantName">
        <h6>{{$t('choose_owners_name.title')}}</h6>
        <span class="p-fluid">
          <InputText v-model="selectedNamedApplicant"></InputText>
        </span>
        <div v-if="errors.length">
          <p class='form-error' v-for="error in errors" :key="error.selected_applicant_err">{{error.selected_applicant_err}}</p>
        </div>
      </div>
      <div class="search-word mt-4" v-show="openKeyWordandClasses">
        <h6 style="cursor:pointer">
          <b-icon icon="exclamation-circle" @click="openSearchKeyWords" font-scale="1.2" style="color: #B7B6B6"></b-icon>
          {{$t('choose_keywords.title')}}
        </h6>
        <Chips v-model="keywords" :max="5"
               :placeholder="$t('choose_keywords.placeholder')"
               separator=","
               :addOnBlur="true">
          <template #chip="slotProps">
            <div>
              <span>{{slotProps.value}}</span>
              <b-icon icon="x" v-on:click="removeSearchingWord(slotProps.value)"></b-icon>
            </div>
          </template>
        </Chips>
        <div v-if="errors.length">
          <p class='form-error' v-for="error in errors" :key="error.selected_keywords_err">{{error.selected_keywords_err}}</p>
        </div>
        <div class="checkboxes_section mt-md-0 mt-sm-3">
          <div class="p-field-checkbox">
            <Checkbox id="chooseQuery" name="city" :binary="true" v-model="chooseQuerychecked"/>
            <label for="chooseQuery" class="checkbox-label">{{$t('checkboxes.transliteration')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="stringNumber" name="city" :binary="true" v-model="stringNumberchecked"/>
            <label for="stringNumber" class="checkbox-label">{{$t('checkboxes.verbal_writing_numbers')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="phoneticSimilarity" v-on:change="validateCheckboxes" name="city" :binary="true" v-model="phoneticSimilaritychecked"/>
            <label for="phoneticSimilarity" class="checkbox-label">{{$t('checkboxes.phonetic_similarity')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="specialSymbols" v-on:change="validateSpecialSymbolsCheckboxes" name="city" :binary="true" v-model="specialSymbolschecked"/>
            <label for="specialSymbols" class="checkbox-label">{{$t('checkboxes.special_characters')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="fullTextSearching" v-on:change="validateCheckboxes" name="city" :binary="true" v-model="fullTextSearchingchecked"/>
            <label for="fullTextSearching" class="checkbox-label">{{$t('checkboxes.full_text_search')}}</label>
          </div>
        </div>
      </div>
      <div class="section-one_product-class mt-4" v-if="openOneProductClass">
        <h6>{{$t('class_product.title')}}</h6>
        <MultiSelect v-model="selectedOneProductClass"
                     v-on:change="onChangeOneProduct"
                     :options="prod_class"
                     optionLabel="name"
                     :filter="false"
                     :placeholder="$t('class_product.placeholder')">
          <template #value="slotProps">
            <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.code">
              <div>{{option.code}}
                {{ option.description.length > 30
                ? option.description.substr(0, option.description.lastIndexOf(' ', 30)) + '...'
                : option.description}}
              </div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              {{$t('class_product.placeholder')}}
            </template>
          </template>
          <template #option="slotProps">
            <div class="country-item">
              {{slotProps.option.code}}
              {{ slotProps.option.description.length > 30
              ? slotProps.option.description.substr(0, slotProps.option.description.lastIndexOf(' ', 30)) + '...'
              : slotProps.option.description}}
            </div>
          </template>
        </MultiSelect>
        <div v-if="errors.length">
          <p class='form-error' v-for="error in errors" :key="error.selected_one_class_err">
            {{error.selected_one_class_err}}</p>
        </div>
        <div class="section-classes-items border position-relative mt-4 p-3"
             v-for="(item, idx) in selectProductValue" :key="idx"
             v-bind:class="{ displayClass: isDisplayClassProduct }">
            <div class="item-content ml-3 col-lg-1 col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
              {{item.code}}
            </div>
            <div class="col-lg-11 col-md-10 col-sm-12 d-flex align-items-center mt-md-0 mt-sm-2">
              <p class="subtitle text-justify">{{item.description}}</p>
            </div>
            <button type="button" class="cancel-btn mr-2" v-on:click="deleteClassProductItem(item.code)">X</button>
        </div>
      </div>
      <div class="products-classes section-classes mt-4" v-if="openProductClasses">
        <h6>{{$t('classes_product.title')}}</h6>
        <MultiSelect v-model="selectedClasses"
                     v-on:change="onClassChange"
                     :options="classes"
                     optionLabel="name"
                     :filter="false"
                     :placeholder="$t('classes_product.placeholder')"
                     class="multiselect-custom">
          <template #value="slotProps">
            <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.code">
              <div>{{option.code}}
                {{ option.description.length > 55
                ? option.description.substr(0, option.description.lastIndexOf(' ', 55)) + '...'
                : option.description}}
                <b-icon icon="x" v-on:click="deleteClassItem(option.code)"></b-icon>
              </div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              {{$t('classes_product.placeholder')}}
            </template>
          </template>
          <template #option="slotProps">
            <div class="country-item">
              <div>{{slotProps.option.code}}
                {{ slotProps.option.description.length > 100
                ? slotProps.option.description.substr(0, slotProps.option.description.lastIndexOf(' ', 100)) + '...'
                : slotProps.option.description}}
              </div>
            </div>
          </template>
        </MultiSelect>
        <div v-if="errors.length">
          <p class='form-error' v-for="error in errors" :key="error.selected_classes_err">{{error.selected_classes_err}}</p>
        </div>
        <div class="section-classes-items border position-relative mt-4 p-3"
             v-for="(item, idx) in selectValue"
             :key="idx"
             v-bind:class="{ displayClass: isDisplayClass }">

            <div class="item-content col-lg-1 col-md-2 col-sm-12 ml-3 d-flex justify-content-center align-items-center">
              {{item.code}}
            </div>
            <div class="col-lg-11 col-md-10 col-sm-12 d-flex align-items-center mt-md-0 mt-sm-2">
              <p class="subtitle text-justify">{{item.description}}</p>
            </div>
            <button type="button" class="cancel-btn mr-2" v-on:click="deleteClassItem(item.code)">X</button>

        </div>
      </div>
      <div class="section-viewed-classes mt-4" v-if="openKeyWordandClasses">
        <h6>{{$t('img_classes.title')}}</h6>
        <MultiSelect class="multiselect-custom"
                     v-model="selectedViews"
                     v-on:change="onImgChange"
                     :multiple="true"
                     :options="views"
                     optionLabel="name"
                     :placeholder="$t('img_classes.placeholder')"
                     :filter="false">
          <template #value="slotProps">
            <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.image_code">
              <div>{{option.image_code}} {{option.description}}
                <b-icon icon="x" v-on:click="deleteImgSubItem(option.image_code)"></b-icon>
              </div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              {{$t('img_classes.placeholder')}}
            </template>
          </template>
          <template #option="slotProps">
            <div class="items">
              <div>{{slotProps.option.image_code}} {{slotProps.option.description}}</div>
            </div>
          </template>
        </MultiSelect>
        <div v-if="errors.length">
          <p class='form-error' v-for="error in errors" :key="error.selected_selectedViews_err">{{error.selected_selectedViews_err}}</p>
        </div>
        <div class="section-classes-items border position-relative mt-4 p-3"
             v-for="item in selectedViews"
             :key="item.image_code"
             v-bind:class="{ displayClass: isDisplayImgSubList }">
          <div class="col-12">
            <div class="row">
              <div class="item-content ml-3 col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
                {{item.image_code}}
              </div>
              <div class="d-flex align-items-center col-lg-10 col-md-10 col-sm-12 mt-md-0 mt-sm-2">
                <p class="image_subcategories_fontstyle text-justify">{{item.description}}</p>
              </div>
              <button type="button" class="cancel-btn mr-2" v-on:click="deleteImgSubItem(item.image_code)">X</button>
            </div>
            <div class="section-classes-items position-relative mt-4 p-3"
                 v-for="select_item in selectImgValue[parseInt(item.image_code)]"
                 :key="select_item.image_code"
                 v-bind:class="{ displayClass: isDisplayImgSubList }">
              <div class="col-12">
                <div class="image_subcategories_fontstyle">
                  {{select_item.image_code}} {{select_item.description}}
                </div>
                <b-collapse :id="select_item.image_code" class="mt-3">
                  <a class="link" @click="selectAllImgItem(select_item.image_code)">{{$t('img_classes.choose_all_btn')}}</a>
                  <SelectButton class="mt-4" v-model="subImgList" :options="select_item.sub_list" optionLabel="name" multiple/>
                </b-collapse>
                <div class="mt-4 d-flex align-items-center">
                  <a class="link when-open"
                     v-b-toggle="select_item.image_code">
                    {{$t('img_classes.collapse_class_btn')}}
                    <b-icon icon="chevron-double-up"></b-icon>
                  </a>
                  <a class="link when-closed"
                     v-b-toggle="select_item.image_code">
                    {{$t('img_classes.expand_class_btn')}}
                    <b-icon icon="chevron-double-down"></b-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="alert.message_getSubcategoriesList" :class="alert.type">
          {{alert.message_getSubcategoriesList}}
        </div>
      </div>
      <div class="section-date row">
        <div class="search-duration col-lg-3 col-md-6 col-sm-12 d-flex justify-content-sm-center mt-5">
          <div>
          <h6>{{$t('search_duration.title')}}</h6>
          <b-button-group>
            <tmbuttons class="split-button"
                       v-bind:bwidth="'120px'"
                       v-bind:class="{ active: isDuration === 1 }"
                       v-bind:bname="$t('search_duration.month_12')"
                       v-bind:clickhandler="openYearInfo"/>
            <tmbuttons class="split-button"
                       v-bind:bwidth="'120px'"
                       v-bind:class="{ active: isDuration === 0 }"
                       v-bind:bname="$t('search_duration.month_6')"
                       v-bind:clickhandler="openHalfYearInfo"/>
          </b-button-group>
          </div>
        </div>
        <div class="serach-frequency col-lg-5 col-md-6 col-sm-12 d-flex justify-content-center mt-5">
          <div>
            <h6 class="text-center">{{$t('frequency_reports.title')}}</h6>
            <b-button-group>
              <tmbuttons class="split-button"
                         v-bind:bwidth="'120px'"
                         v-bind:class="{ active: isFrequency === 1 }"
                         v-bind:bname="$t('frequency_reports.monthly')"
                         v-bind:clickhandler="openMonthInfo"/>
              <tmbuttons class="split-button"
                         v-bind:bwidth="'120px'"
                         v-bind:class="{ active: isFrequency === 0 }"
                         v-bind:bname="$t('frequency_reports.weekly')"
                         v-bind:clickhandler="openWeekInfo"/>
              <tmbuttons class="split-button" v-if="!user.search_package.daily_search_forbidden"
                         v-bind:bwidth="'120px'"
                         v-bind:class="{ active: isFrequency === 2 }"
                         v-bind:bname="$t('frequency_reports.daily')"
                         v-bind:clickhandler="openDayInfo"/>
            </b-button-group>
          </div>
        </div>
        <div class="search-days col-lg-4 col-md-6 col-sm-12 mt-5">
          <div class="dropdown-days">
            <h6>{{$t('choose_day.title')}}</h6>
            <Dropdown v-model="selectedDay"
                      v-if="disabledSelectedDay"
                      disabled>
            </Dropdown>
            <Dropdown v-model="selectedDay"
                      v-else
                      :options="days"
                      optionLabel="name"
                      :filter="false"
                      :placeholder="$t('choose_day.placeholder')"
                      :showClear="true">
              <template #value="slotProps">
                <div class="day-item day-item-value" v-if="slotProps.value">
                  <div>{{slotProps.value.name}}</div>
                </div>
                <span v-else>{{slotProps.placeholder}}</span>
              </template>
              <template #option="slotProps">
                <div class="country-item">
                  <div>{{slotProps.option.name}}</div>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="row align-items-end mt-5">
        <div class="col-lg-5 col-md-5 col-md-6">
          <h6 class="balance-info">{{$t('count_balance')}}: {{balance}}</h6>
        </div>
        <div class="col-lg-7 col-md-9 col-md-6">
          <tmbuttons v-if="disabledBtn"
                     disabled
                     class="btn-tm mt-4"
                     v-bind:bwidth="'250px'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="createAndStart"/>
          <tmbuttons v-else
                     class="btn-tm mt-4"
                     v-bind:bwidth="'250px'"
                     v-bind:bname="$t('button')"
                     v-bind:clickhandler="createAndStart"/>
        </div>
      </div>
    </div>
    <SearchCriteriaInfo v-bind:show="displaySearchCriteriaModal" v-on:update:show="displaySearchCriteriaModal = $event"/>
    <SearchKeyWordsInfo v-bind:show="displaySearchKeyWordsModal" v-on:update:show="displaySearchKeyWordsModal = $event"/>
    <Toast position="top-right"/>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Chips from 'primevue/chips';
    import Toast from 'primevue/toast';
    import MultiSelect from 'primevue/multiselect';
    import Checkbox from 'primevue/checkbox';
    import SelectButton from 'primevue/selectbutton';
    import InputText from 'primevue/inputtext';
    import SidebarApp from "../../components/SidebarApp";
    import Dropdown from 'primevue/dropdown';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    import SearchCriteriaInfo from "../../components/modals/SearchCriteriaInfo";
    import SearchKeyWordsInfo from "../../components/modals/SearchKeyWordsInfo";

    export default {
        name: "CreateNewSearchQuery",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.create_new_search_query'
        },
        props: {
            code: Number,
            description: String
        },
        data() {
            return {
                openKeyWordandClasses: true,
                openOneProductClass: false,
                openApplicantName: false,
                openProductClasses: true,
                chooseQuerychecked: false,
                stringNumberchecked: false,
                phoneticSimilaritychecked: false,
                specialSymbolschecked: false,
                fullTextSearchingchecked: false,
                loadCountry: false,
                loadClassList: false,
                loadViewedList: false,
                loadOwnersList: false,
                collapseid: '',
                keywords: [],
                isSearchWord: 1,
                isDuration: 1,
                isFrequency: 1,
                keyWordsProperties: [],
                monthes_duration: 12,
                report_frequency: 'month',
                isDisplayClass: 0,
                isDisplayClassProduct: 0,
                isDisplayImgSubList: 0,
                visible: false,
                selectedCountries: null,
                selectedOneProductClass: null,
                selectedNamedApplicant: null,
                selectedClasses: [],
                selectedViews: [],
                selectedDay: null,
                countries: [],
                prod_class: [],
                classes: [],
                selectValue: [],
                selectProductValue: [],
                modelValue: [],
                views: [],
                selectImgValue: [],
                errors: [],
                days: [
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name0'), dayNumb: 0},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name1'), dayNumb: 1},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name2'), dayNumb: 2},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name3'), dayNumb: 3},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name4'), dayNumb: 4},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name5'), dayNumb: 5},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name6'), dayNumb: 6},
                ],
                balance: 12,
                filteredOwnersName: [],
                displaySearchCriteriaModal: false,
                displaySearchKeyWordsModal: false,
                disabled_checkbox: true,
                disabledBtn: false,
                currentClassCode: 0,
                subImgList: [],
                isLoading:false,
                fullPage: false,
                disabledSelectedDay: false,
            }
        },
        mounted () {
            this.isLoading = true;
            this.getCountryList().then(response => {
                if (response) {
                    this.loadCountry = true;
                    this.loadClassesList = true;
                    this.loadViewedList = true;
                    let country_arr = response;
                    this.selectedCountries = {'name': process.env.DEFAULT_COUNTRY};
                    for (let country of country_arr) {
                        this.countries.push({'name': country});
                    }
                    if (this.loadCountry && this.loadClassesList && this.loadViewedList) {
                        this.isLoading = false;
                    }
                }
            });
            this.getClassesList(process.env.DEFAULT_COUNTRY).then(response => {
                if (response) {
                    this.loadCountry = true;
                    this.loadClassesList = true;
                    this.loadViewedList = true;
                    let class_arr = response;
                    for (let classes_i of class_arr) {
                        this.classes.push({'code':classes_i.class_num, 'description':classes_i.description});
                        this.prod_class.push({'code':classes_i.class_num, 'description':classes_i.description});
                    }
                    if (this.loadCountry && this.loadClassesList && this.loadViewedList) {
                        this.isLoading = false;
                    }
                }
            });
            this.getViewedList(process.env.DEFAULT_COUNTRY).then(response => {
                if (response) {
                    this.loadCountry = true;
                    this.loadClassesList = true;
                    this.loadViewedList = true;
                    this.views = response;
                    if (this.loadCountry && this.loadClassesList && this.loadViewedList) {
                        this.isLoading = false;
                    }
                }
            });
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user
            }),

        },
        methods: {
            ...mapActions('account', ['getClassesList', 'getCountryList', 'getOneProductClass', 'getViewedList', 'getSubcategoriesList', 'createSearchQueryByKeywords', 'createSearchQueryByOwners', 'createSearchQueryByClasses', 'getOwnersList']),
            showSuccess() {
                this.$toast.add({severity:'success', summary: this.$i18n.i18next.t('_common:pages.create_new_search_query.success_create_query'), life: 4000});
            },
            openKeyWordsInfo() {
                this.isSearchWord = 1;
                this.openKeyWordandClasses=true;
                this.openApplicantName = false;
                this.openProductClasses = true;
                this.openOneProductClass = false;
            },
            openApplicantNameInfo() {
                this.isSearchWord = 0;
                this.openApplicantName = true;
                this.openKeyWordandClasses=false;
                this.openProductClasses=false;
                this.openOneProductClass = false;
            },
            openGoodsClassesInfo() {
                this.isSearchWord = 2;
                this.openKeyWordandClasses=false;
                this.openApplicantName = false;
                this.openProductClasses=false;
                this.openOneProductClass = true;
            },
            openYearInfo() {
                this.isDuration = 1;
                this.monthes_duration = 12;
                this.balance = this.monthes_duration;
                if (this.isFrequency == 0) {
                    this.balance = 52;
                }
                if (this.isFrequency == 2) {
                    this.balance = 365;
                }
            },
            openHalfYearInfo() {
                this.isDuration = 0;
                this.monthes_duration = 6;
                this.balance = this.monthes_duration;
                if (this.isFrequency == 0) {
                    this.balance = 26;
                }
                if (this.isFrequency == 2) {
                    this.balance = 183;
                }
            },
            openMonthInfo() {
                this.isFrequency = 1;
                this.report_frequency = 'month';
                this.disabledSelectedDay = false;
                this.balance = this.monthes_duration;
            },
            openWeekInfo() {
                this.isFrequency = 0;
                this.report_frequency = 'week';
                this.balance = 52;
                this.disabledSelectedDay = false;
                if (this.monthes_duration == 6) {
                    this.balance = 26;
                }
            },
            openDayInfo() {
                this.isFrequency = 2;
                this.report_frequency = 'day';
                this.balance = 365;
                this.disabledSelectedDay = true;
                if (this.monthes_duration == 6) {
                    this.balance = 183;
                }
            },
            validateSpecialSymbolsCheckboxes(ev) {
                this.phoneticSimilaritychecked = false;
                this.fullTextSearchingchecked = false;
            },
            validateCheckboxes(ev) {
                this.specialSymbolschecked = false;
            },
            onChangeOneProduct(event) {
                this.selectedOneProductClass = [event.value[event.value.length-1]];
                this.selectProductValue = this.selectedOneProductClass;
                if (this.selectProductValue) {
                    this.isDisplayClassProduct = 1;
                }
            },
            clearLists() {
                this.selectedClasses = [];
                this.selectValue = null;
                this.keywords = [];
                this.prod_class = [];
                this.classes = [];
                this.selectedViews = [];
                this.selectImgValue = [];
                this.selectedNamedApplicant = [];
                this.selectedOneProductClass = null;
                this.selectProductValue = [];
            },
            changeCountry(event) {
                this.clearLists();
                this.getClassesList(event.value.name).then(response => {
                    if (response) {
                        this.loadCountry = true;
                        this.loadClassesList = true;
                        this.loadViewedList = true;
                        let class_arr = response;
                        for (let classes_i of class_arr) {
                            this.classes.push({'code':classes_i.class_num, 'description':classes_i.description});
                            this.prod_class.push({'code':classes_i.class_num, 'description':classes_i.description});
                        }
                        if (this.loadCountry && this.loadClassesList && this.loadViewedList) {
                            this.isLoading = false;
                        }
                    }
                });
                this.getViewedList(event.value.name).then(response => {
                    if (response) {
                        this.loadCountry = true;
                        this.loadClassesList = true;
                        this.loadViewedList = true;
                        this.views = response;
                        if (this.loadCountry && this.loadClassesList && this.loadViewedList) {
                            this.isLoading = false;
                        }
                    }
                });
            },
            onImgChange(event) {
                if (event.value.length > 0) {
                    let image_code = event.value[event.value.length - 1].image_code;
                    let item_arr = [];
                    this.getSubcategoriesList({
                        country_code: this.selectedCountries.name,
                        image_code: image_code
                    }).then(response => {
                        if (response) {
                            for (let resp_category of response) {
                                let image_item = {};
                                image_item.image_code = resp_category.image_code;
                                image_item.description = resp_category.description;
                                image_item.sub_list = [];
                                if (resp_category.imagesubcategories) {
                                    for (let resp_item of resp_category.imagesubcategories) {
                                        image_item.sub_list.push({
                                            name: resp_item.image_code + ' ' + resp_item.description,
                                            item_code: resp_item.image_code,
                                            value: image_code
                                        });
                                    }
                                }
                                item_arr.push(image_item);
                            }
                            this.selectImgValue[parseInt(image_code)] = item_arr;
                            this.selectImgValue.splice(0, 0);
                            if (this.selectImgValue) {
                                this.isDisplayImgSubList = 1;
                            }
                        }
                    });
                }
            },
            onClassChange(event) {
                if (event.value.length > 3) {
                    this.selectedClasses = event.value.slice(0, -1);
                }
                this.selectValue = this.selectedClasses;
                if (this.selectValue) {
                    this.isDisplayClass = 1;
                }
            },
            selectAllImgItem(icode) {
                let selimages = [];
                for (let imgval of this.selectImgValue) {
                    if (imgval) {
                        selimages = imgval.filter(item => item.image_code == icode);
                        for (let subimagelist of selimages){
                            for (let subimages of subimagelist.sub_list) {
                                let checklist = this.subImgList.filter(item => item.item_code == subimages.item_code);
                                if (checklist.length == 0) {
                                    this.subImgList.push(subimages);
                                }
                            }
                        }
                    }
                }
            },
            createAndStart() {
                let owners_name, owners_address = '';
                this.errors = [];
                this.disabledBtn = false;
                if (this.isSearchWord == 1) {
                    if (this.selectedClasses.length == 0) {
                        return this.errors.push({
                            'selected_classes_err': this.$i18n.i18next.t('_common:pages.create_new_search_query.classes_product.err')
                        });
                    }
                    if (this.keywords.length == 0 && this.selectedViews.length == 0) {
                        return this.errors.push({
                            'selected_keywords_err': this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_keywords.err'),
                            'selected_selectedViews_err': this.$i18n.i18next.t('_common:pages.create_new_search_query.img_classes.err')
                        });
                    }

                    let search_query_by_keywords_and_classes = {
                        country: this.selectedCountries.name,
                        search_validity_term: this.monthes_duration,
                        report_frequency: this.report_frequency,
                        search_day: this.selectedDay ? this.selectedDay.dayNumb : null,
                        product_classes: this.selectedClasses ? this.selectedClasses.map(function(elem){return elem.code;}) : [],
                        keywords: this.keywords ? this.keywords : '',
                        img_categories: this.getViewedClassesItems() ? this.getViewedClassesItems() : '',
                        use_transliteration: this.chooseQuerychecked ? 'true' : 'false',
                        use_digits_conversion: this.stringNumberchecked ? 'true' : 'false',
                        use_trigram_search: this.phoneticSimilaritychecked ? 'true' : 'false',
                        use_special_symbols: this.specialSymbolschecked ? 'true' : 'false',
                        use_full_text_search: this.fullTextSearchingchecked ? 'true' : 'false',
                    };
                    if (!this.errors.length) {
                        this.disabledBtn = true;
                        this.isLoading = true;
                        this.createSearchQueryByKeywords(search_query_by_keywords_and_classes).then(() => {
                            this.isLoading = false;
                            this.showSuccess();
                        }, error => {this.isLoading = false; this.disabledBtn = false;});
                    }
                }
                if (this.isSearchWord == 0) {
                    if (!this.selectedNamedApplicant) {
                        return this.errors.push({'selected_applicant_err': this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_owners_name.err')});
                    }

                    if (this.selectedNamedApplicant) {
                        if (this.selectedNamedApplicant.name && this.selectedNamedApplicant.address) {
                            owners_name = this.selectedNamedApplicant.name;
                            owners_address = this.selectedNamedApplicant.address;
                        } else if (this.selectedNamedApplicant[0] && this.selectedNamedApplicant[1] && this.selectedNamedApplicant.length > 0 && Array.isArray(this.selectedNamedApplicant)) {
                            owners_name = this.selectedNamedApplicant[0];
                            owners_address = this.selectedNamedApplicant[1];
                        } else {
                            owners_name = this.selectedNamedApplicant;
                            owners_address = '';
                        }
                    }
                    let search_query_by_owners = {
                        country: this.selectedCountries.name,
                        name: owners_name,
                        address: owners_address,
                        search_validity_term: this.monthes_duration,
                        report_frequency: this.report_frequency,
                        search_day: this.selectedDay ? this.selectedDay.dayNumb : null,
                    };
                    if (!this.errors.length) {
                        this.disabledBtn = true;
                        this.isLoading = true;
                        this.createSearchQueryByOwners(search_query_by_owners).then(() => {
                            this.isLoading = false;
                            this.showSuccess();
                        }, error => {this.isLoading = false; this.disabledBtn = false;});
                    }
                }
                if (this.isSearchWord == 2) {
                    if (!this.selectedOneProductClass) {
                        return this.errors.push({'selected_one_class_err': this.$i18n.i18next.t('_common:pages.create_new_search_query.class_product.err')});
                    }
                    let search_query_by_classes = {
                        country: this.selectedCountries.name,
                        search_validity_term: this.monthes_duration,
                        report_frequency: this.report_frequency,
                        search_day: this.selectedDay ? this.selectedDay.dayNumb : null,
                        product_class: this.selectedOneProductClass[0].code,
                    };
                    if (!this.errors.length) {
                        this.disabledBtn = true;
                        this.isLoading = true;
                        this.createSearchQueryByClasses(search_query_by_classes).then(() => {
                            this.isLoading = false;
                            this.showSuccess();
                        }, error => {this.isLoading = false; this.disabledBtn = false;});
                    }
                }
            },
            deleteClassProductItem(code) {
                this.selectedOneProductClass = this.selectedOneProductClass.filter(item => item.code !== code);
                this.selectProductValue = this.selectedOneProductClass;
            },
            deleteClassItem(code) {
                this.selectedClasses = this.selectedClasses.filter(item => item.code !== code);
                this.selectValue = this.selectedClasses;
            },
            deleteImgSubItem(code) {
                this.selectedViews = this.selectedViews.filter(item => item.image_code !== code);
                this.selectedViews = this.selectedViews.filter(item => item.code !== code);
            },
            removeSearchingWord(index) {
                let values = this.keywords.indexOf(index);
                this.keywords.splice(values, 1);
            },
            openSearchCriteria() {
                this.displaySearchCriteriaModal = true;
            },
            openSearchKeyWords() {
                this.displaySearchKeyWordsModal = true;
            },
            getViewedClassesItems() {
                let subImgSelection = [];
                let selectedCategories = [];
                for (let views_items of this.selectedViews) {
                    subImgSelection = this.subImgList.filter(item => item.value == views_items.image_code);
                    if (subImgSelection.length > 0) {
                        for (let item_img of subImgSelection) {
                            selectedCategories.push(item_img.item_code);
                        }
                    } else {
                        selectedCategories.push(views_items.image_code.toString());
                    }
                }
                return selectedCategories;
            }
        },
        components: {
            SearchKeyWordsInfo,
            SearchCriteriaInfo,
            SelectButton,
            Chips,
            MultiSelect,
            Checkbox,
            Toast,
            InputText,
            SidebarApp,
            Dropdown,
            Loading,
            tmbuttons}
    }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/newAndEditQueries";
</style>
