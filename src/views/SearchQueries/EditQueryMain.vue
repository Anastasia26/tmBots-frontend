<template>
  <div class="container-fluid">
    <loading :active.sync="isLoading"
             :can-cancel="true"
             :is-full-page="fullPage"
             color="green">
    </loading>
    <div class="components-header mt-4">
      <h3 class="title title-medium">{{$t('edit_title')}}</h3>
    </div>
    <div v-if="alert.message_getCountryList" :class="'alert ' + alert.type">
      {{alert.message_getCountryList}}
    </div>
    <div v-if="alert.message_getOwnersList" :class="'alert ' + alert.type">
      {{alert.message_getOwnersList}}
    </div>
    <div v-if="alert.message_searchquerybykeywords" :class="'alert ' + alert.type">
      {{alert.message_searchquerybykeywords}}
    </div>
    <div v-if="alert.message_searchquerybyowners" :class="'alert ' + alert.type">
      {{alert.message_searchquerybyowners}}
    </div>
    <div v-if="alert.message_searchquerybyclasses" :class="'alert ' + alert.type">
      {{alert.message_searchquerybyclasses}}
    </div>
    <div v-if="alert.message_searchInfoToEdit" :class="'alert ' + alert.type">
      {{alert.message_searchInfoToEdit}}
    </div>
    <div class="section-countries row mt-4">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h6>{{$t('choose_country.title')}}</h6>
        <Dropdown v-model="selectedCountries"
                  :options="countries"
                  optionLabel="name"
                  :filter="false"
                  :placeholder="$t('choose_country.placeholder')"
                  :showClear="false"
                  v-on:change="changeCountry"
        >
          <template #value="slotProps" v-show="loadCountry">
            <div class="country-item country-item-value" v-if="slotProps.value">
              <div>{{$t('choose_country.country_' + slotProps.value.name)}}</div>
            </div>
          </template>
          <template #option="slotProps">
            <div class="country-item">
              <div>{{$t('choose_country.country_' + slotProps.option.name)}}</div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
    <div class="keywords_products_container" v-if="searchInfo.keywords_products_search_params">
      <div v-if="alert.message_savingQueryByKeywords" :class="'alert ' + alert.type">
        {{alert.message_savingQueryByKeywords}}
      </div>
      <div class="search-word mt-4">
        <h6>{{$t('choose_keywords.title')}}</h6>
        <Chips v-model="default_keywords" :max="5"
               :placeholder="$t('choose_keywords.placeholder')"
               separator=" "
               :addOnBlur="true">
          <template #chip="slotProps" v-show="loadkeyWords">
            <div>
              <span>{{slotProps.value}}</span>
              <b-icon icon="x" v-on:click="removeSearchingWord(slotProps.value)"></b-icon>
            </div>
          </template>
        </Chips>
        <div v-if="errors.length">
          <p class='form-error' v-for="error in errors" :key="error.selected_keywords_err">
            {{error.selected_keywords_err}}</p>
        </div>
        <div class="checkboxes_section mt-md-0 mt-sm-3">
          <div class="p-field-checkbox">
            <Checkbox id="chooseQuery" name="city" v-model="chooseQuerychecked" :binary="true"/>
            <label for="chooseQuery" class="checkbox-label">{{$t('checkboxes.transliteration')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="stringNumber" name="city" v-model="stringNumberchecked" :binary="true"/>
            <label for="stringNumber" class="checkbox-label">{{$t('checkboxes.verbal_writing_numbers')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="phoneticSimilarity" name="city" v-on:change="validateCheckboxes" v-model="phoneticSimilaritychecked" :binary="true"/>
            <label for="phoneticSimilarity" class="checkbox-label">{{$t('checkboxes.phonetic_similarity')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="specialSymbols" name="city" v-on:change="validateSpecialSymbolsCheckboxes" v-model="specialSymbolschecked" :binary="true"/>
            <label for="specialSymbols" class="checkbox-label">{{$t('checkboxes.special_characters')}}</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="fullTextSearching" name="city" v-on:change="validateCheckboxes" v-model="fullTextSearchingchecked" :binary="true"/>
            <label for="fullTextSearching" class="checkbox-label">{{$t('checkboxes.full_text_search')}}</label>
          </div>
        </div>
      </div>
      <div class="products-classes section-classes mt-4">
        <h6>{{$t('classes_product.title')}}</h6>
        <MultiSelect class="multiselect-custom"
                     v-model="selectedClasses"
                     v-on:change="onClassChange"
                     :options="classes"
                     optionLabel="name"
                     :placeholder="$t('classes_product.placeholder')"
                     :filter="false">
          <template #value="slotProps" v-show="loadClassesList">
            <div class="country-item country-item-value" v-for="option of slotProps.value" :key="option.code">
              <div>{{option.code}}
                {{ option.description.length > 30
                ? option.description.substr(0, option.description.lastIndexOf(' ', 30)) + '...'
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
                {{ slotProps.option.description.length > 30
                ? slotProps.option.description.substr(0, slotProps.option.description.lastIndexOf(' ', 30)) + '...'
                : slotProps.option.description}}
              </div>
            </div>
          </template>
        </MultiSelect>
        <div v-if="errors.length">
          <p class='form-error' v-for="error in errors" :key="error.selected_classes_err">
            {{error.selected_classes_err}}</p>
        </div>
        <div class="section-classes-items border position-relative mt-4 p-3"
             v-for="(item, idx) in selectValue"
             :key="idx"
             v-bind:class="{ displayClass: isDisplayClass }">
            <div class="item-content ml-3 col-lg-1 col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
              {{item.code}}
            </div>
            <div class="col-lg-11 col-md-10 col-sm-12 d-flex align-items-center mt-md-0 mt-sm-2">
              <p class="subtitle text-justify">{{item.description}}</p>
            </div>
            <button type="button" class="cancel-btn mr-2" v-on:click="deleteClassItem(item.code)">X</button>
        </div>
      </div>
      <div class="section-viewed-classes mt-4">
        <h6>{{$t('img_classes.title')}}</h6>
        <MultiSelect class="multiselect-custom"
                     v-model="selectedViews"
                     v-on:change="onImgChange"
                     :multiple="false"
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
          <p class='form-error' v-for="error in errors" :key="error.selected_selectedViews_err">
            {{error.selected_selectedViews_err}}
          </p>
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
                  <a class="link when-open" v-b-toggle="select_item.image_code">
                    {{$t('img_classes.collapse_class_btn')}}
                    <b-icon icon="chevron-double-up"></b-icon>
                  </a>
                  <a class="link when-closed" v-b-toggle="select_item.image_code">
                    {{$t('img_classes.expand_class_btn')}}
                    <b-icon icon="chevron-double-down"></b-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="alert.message_getSubcategoriesList" :class="'alert ' + alert.type">
          {{alert.message_getSubcategoriesList}}
        </div>
      </div>
    </div>
    <div class="section-name-applicant mt-4" v-if="searchInfo.owner_search_params">
      <div v-if="alert.message_savingQueryByOwners" :class="'alert ' + alert.type">
        {{alert.message_savingQueryByOwners}}
      </div>
      <h6>{{$t('choose_owners_name.title')}}</h6>
      <span class="p-fluid">
        <InputText v-model="selectedNamedApplicant"></InputText>
      </span>
      <div v-if="errors.length">
        <p class='form-error' v-for="error in errors" :key="error.selected_applicant_err">{{error.selected_applicant_err}}</p>
      </div>
    </div>
    <div class="section-class-prod mt-4" v-if="searchInfo.prod_class_search_params">
      <div v-if="alert.message_savingQueryByOneClass" :class="'alert ' + alert.type">
        {{alert.message_savingQueryByOneClass}}
      </div>
      <div class="section-one_product-class mt-4">
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
             v-for="(item, idx) in selectProductValue"
             :key="idx"
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
    </div>
    <div class="section-date row">
      <div class="search-duration col-lg-3 col-md-6 col-sm-12 mt-5">
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
      <div class="col-lg-4 col-md-6 col-sm-12 mt-5">
        <div class="dropdown-days">
          <h6>{{$t('choose_day.title')}}</h6>
          <Dropdown v-if="disabledSelectedDay"
                    v-model="selectedDay"
                    disabled>
          </Dropdown>
          <Dropdown v-else
                    v-model="selectedDay"
                    :options="days"
                    optionLabel="name"
                    :filter="false"
                    :placeholder="$t('choose_day.placeholder')"
                    :showClear="true">
            <template #value="slotProps">
              <div class="day-item day-item-value" v-if="slotProps.value">
                <div>{{slotProps.value.name}}</div>
              </div>
            </template>
            <template #option="slotProps">
              <div class="day-item">
                <div>{{slotProps.option.name}}</div>
              </div>
            </template>
          </Dropdown>
          <div v-if="errors.length">
            <p class='form-error' v-for="error in errors" :key="error.selected_day_err">{{ error.selected_day_err}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-end mt-5">
      <div class="col-lg-4 col-md-5 col-md-6">
        <h6 class="balance-info">{{$t('count_balance')}}: {{balance}}</h6>
      </div>
      <div class="col-lg-8 col-md-9 col-md-6">
        <tmbuttons v-if="disabledBtn"
                   disabled
                   class="btn-tm mt-4"
                   v-bind:bname="$t('save_button')"
                   v-bind:clickhandler="SaveEditedData"/>
        <tmbuttons v-else
                   class="btn-tm mt-4"
                   v-bind:bname="$t('save_button')"
                   v-bind:clickhandler="SaveEditedData"/>
      </div>
    </div>
    <Toast position="top-right"/>
  </div>
</template>

<script>
    import {store} from '../../store';
    import { mapActions, mapState } from 'vuex'
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import Chips from 'primevue/chips';
    import Toast from 'primevue/toast';
    import MultiSelect from 'primevue/multiselect';
    import InputText from 'primevue/inputtext';
    import Checkbox from 'primevue/checkbox';
    import SelectButton from 'primevue/selectbutton';
    import Dropdown from 'primevue/dropdown';
    import tmbuttons from "../../assets/custom-styles/tmbuttons";
    export default {
        name: "EditQueryMain",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.create_new_search_query'
        },
        data() {
            return {
                searchInfo:[],
                disabledBtn: false,
                isSearchWord: 1,
                isDuration: 1,
                isFrequency: 1,
                collapseid: '',
                default_keywords: [],
                chooseQuerychecked: false,
                stringNumberchecked: false,
                phoneticSimilaritychecked: false,
                specialSymbolschecked: false,
                fullTextSearchingchecked: false,
                keyWordsProperties: [],
                selectedOneProductClass: [],
                selectedNamedApplicant: [],
                prod_class: [],
                selectProductValue: [],
                img_categories:[],
                monthes_duration: 12,
                report_frequency: 'month',
                isDisplayClass: 0,
                isDisplayImgSubList: 0,
                isDisplayClassProduct: 0,
                balance: 12,
                visible: false,
                selectedCountries: null,
                selectedClasses: [],
                selectedViews: [],
                selectedDay: null,
                countries: [],
                classes: [],
                choosed_classes: [],
                selectImgValue: [],
                filteredOwnersName: null,
                selectValue: [],
                modelValue: [],
                subImgList: [],
                views: [],
                errors: [],
                product_classes: [],
                prod_class_search_params: null,
                days: [
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name0'), dayNumb: 0},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name1'), dayNumb: 1},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name2'), dayNumb: 2},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name3'), dayNumb: 3},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name4'), dayNumb: 4},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name5'), dayNumb: 5},
                    {name: this.$i18n.i18next.t('_common:pages.create_new_search_query.choose_day.days.name6'), dayNumb: 6},
                ],
                isLoading:false,
                fullPage: false,
                disabledSelectedDay: false,
            }
        },
        computed: {
            ...mapState({
                alert: state => state.alert,
                user: state => state.account.user,
            })
        },
        async mounted () {
            store.dispatch('alert/clearAllErrors');
            let image_codes = [];
            this.isLoading = true;
            await this.getSearchInfoToEdit(this.$route.params.id).then(response => {
                if (response) {
                    let choose_country = response.country;
                    let choose_day = response.search_day;
                    this.product_classes = response.keywords_products_search_params ? response.keywords_products_search_params.product_classes : '';
                    this.prod_class_search_params = response.prod_class_search_params ? response.prod_class_search_params.product_class : '';
                    this.searchInfo = response;
                    this.selectedDay = this.days.filter(item => item.dayNumb == choose_day)[0];
                    this.selectedCountries = {name : choose_country};
                    this.default_keywords = response.keywords_products_search_params ? response.keywords_products_search_params.keywords : null;
                    this.chooseQuerychecked = response.keywords_products_search_params ? response.keywords_products_search_params.use_transliteration : 'false';
                    this.stringNumberchecked = response.keywords_products_search_params ? response.keywords_products_search_params.use_digits_conversion : 'false';
                    this.phoneticSimilaritychecked = response.keywords_products_search_params ? response.keywords_products_search_params.use_trigram_search : 'false';
                    this.specialSymbolschecked = response.keywords_products_search_params ? response.keywords_products_search_params.use_special_symbols: 'false';
                    this.fullTextSearchingchecked = response.keywords_products_search_params ? response.keywords_products_search_params.use_full_text_search : 'false';
                    this.img_categories = response.keywords_products_search_params ? response.keywords_products_search_params.img_categories : '';
                    this.selectedNamedApplicant = response.owner_search_params ? response.owner_search_params.name + ' ' +  response.owner_search_params.address : '';
                    this.report_frequency = response.report_frequency;
                    this.search_validity_term = response.search_validity_term;
                    switch (this.report_frequency) {
                        case 'week':
                            this.isFrequency = 0;
                            this.disabledSelectedDay = false;
                            break;
                        case 'day':
                            this.isFrequency = 2;
                            this.disabledSelectedDay = true;
                            break;
                        case 'month':
                            this.isFrequency = 1;
                            this.disabledSelectedDay = false;
                            break;
                    }
                    switch (this.search_validity_term) {
                        case 12:
                            this.isDuration = 1;
                            break;
                        case 6:
                            this.isDuration = 0;
                            break;
                    }
                }
            });
            await this.getCountryList().then(response => {
                if (response) {
                    let country_arr = response;
                    for (let country of country_arr) {
                        this.countries.push({'name': country});
                    }
                }
            });
            await this.getClassesList(this.selectedCountries.name).then(response => {
                if (response) {
                    let class_arr = response;
                    for (let classes_i of class_arr) {
                        this.classes.push({'code':classes_i.class_num, 'description':classes_i.description});
                        this.prod_class.push({'code':classes_i.class_num, 'description':classes_i.description});
                    }
                }
            });
            await this.getViewedList(this.selectedCountries.name).then(response => {
                if (response) {
                    this.views = response;
                }
            });
            for (let classes_i of this.product_classes) {
                this.selectedClasses.push(this.classes.filter(item => item.code == classes_i)[0]);
            }
            for (let viewed_cl of this.img_categories) {
                if (parseInt(viewed_cl.charAt(0)) == 0) {
                    image_codes.push(parseInt(viewed_cl.charAt(1)));
                } else {
                    image_codes.push(parseInt(viewed_cl.charAt(0)));
                }
            }
            for (let code of image_codes.filter(this.onlyUnique)) {
                this.selectedViews.push(this.views.filter(item => item.image_code == code)[0]);
            }
            for (let img_item of this.selectedViews) {
                this.onImgChange({value: this.selectedViews, code: img_item.image_code});
            }
            this.selectedOneProductClass = this.prod_class.filter(item => item.code == this.prod_class_search_params);
            this.onClassChange({value: this.selectedClasses});
            this.onChangeOneProduct({value: this.selectedOneProductClass});
            this.isLoading = false;
        },
        methods: {
            ...mapActions('account', ['getSearchInfoToEdit', 'getClassesList', 'getCountryList', 'getViewedList',
                'createSearchQuery', 'getSubcategoriesList', 'getOwnersList', 'saveSearchQueryByKeywords', 'saveSearchQueryByOwners', 'saveSearchQueryByClass'
            ]),
            showSuccess() {
                this.$toast.add({severity:'success', summary: this.$i18n.i18next.t('_common:pages.create_new_search_query.success_saved_query'), life: 4000});
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
                this.disabledSelectedDay = false;
                this.balance = 52;
                if (this.monthes_duration == 6) {
                    this.balance = 26;
                }
            },
            clearLists() {
                this.selectedClasses = [];
                this.selectValue = null;
                this.default_keywords = [];
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
            openDayInfo() {
                this.isFrequency = 2;
                this.report_frequency = 'day';
                this.disabledSelectedDay = true;
                this.balance = 365;
                if (this.monthes_duration == 6) {
                    this.balance = 183;
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
            removeSearchingWord(index) {
                let values = this.default_keywords.indexOf(index);
                this.default_keywords.splice(values, 1);
            },
            deleteClassItem(code) {
                this.selectedClasses = this.selectedClasses.filter(item => item.code !== code);
                this.selectValue = this.selectedClasses;
            },
            deleteClassProductItem(code) {
                this.selectedOneProductClass = this.selectedOneProductClass.filter(item => item.code !== code);
                this.selectProductValue = this.selectedOneProductClass;
            },
            deleteImgSubItem(code) {
                this.selectedViews = this.selectedViews.filter(item => item.image_code !== code);
                this.selectedViews = this.selectedViews.filter(item => item.code !== code);
            },
            validateSpecialSymbolsCheckboxes(ev) {
                this.phoneticSimilaritychecked = false;
                this.fullTextSearchingchecked = false;
            },
            validateCheckboxes(ev) {
                this.specialSymbolschecked = false;
            },
            onImgChange(event) {
                let image_code = event.code?event.code:event.value[event.value.length-1].image_code;
                let item_arr = [], preselected = [];
                this.getSubcategoriesList({country_code: this.selectedCountries.name, image_code: image_code}).then(response => {
                    if (response) {
                        for (let resp_category of response) {
                            let image_item = {};
                            image_item.image_code = resp_category.image_code;
                            image_item.description = resp_category.description;
                            image_item.sub_list = [];
                            if(resp_category.imagesubcategories) {
                                for (let resp_item of resp_category.imagesubcategories) {
                                    image_item.sub_list.push({name: resp_item.image_code + ' ' + resp_item.description, item_code: resp_item.image_code, value: image_code});
                                    for (let img_code of this.img_categories) {
                                        if (img_code.toString() == resp_item.image_code.toString()) {
                                            preselected.push({name: resp_item.image_code + ' ' + resp_item.description, item_code: resp_item.image_code, value: image_code})
                                        }
                                    }
                                }
                            }
                            item_arr.push(image_item);
                        }
                        if (preselected.length > 0) {
                            for (let subitem of preselected) {
                                this.subImgList.push(subitem);
                            }
                        }
                        this.selectImgValue[parseInt(image_code)] = item_arr;
                        this.selectImgValue.splice( 0, 0 );
                        if (this.selectImgValue) {
                            this.isDisplayImgSubList = 1;
                        }
                    }
                });
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
            onChangeOneProduct(event) {
                this.selectedOneProductClass = [event.value[event.value.length-1]];
                this.selectProductValue = this.selectedOneProductClass;
                if (this.selectProductValue) {
                    this.isDisplayClassProduct = 1;
                }
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
            },
            onlyUnique(value, index, self) {
              return self.indexOf(value) === index;
            },
            isObjEmpty(obj) {
                for (let key in obj) {
                    return false;
                }
                return true;
            },
            SaveEditedData() {
                let owners_name, owners_address = '';
                this.errors = [];
                this.disabledBtn = false;
                if (this.searchInfo.keywords_products_search_params) {
                    if (this.isObjEmpty(this.selectedClasses)) {
                        return this.errors.push({
                            'selected_classes_err': this.$i18n.i18next.t('_common:pages.create_new_search_query.classes_product.err')
                        });
                    }
                    if (this.default_keywords.length == 0 && this.isObjEmpty(this.selectedViews)) {
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
                        keywords: this.default_keywords ? this.default_keywords : '',
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
                        this.saveSearchQueryByKeywords({'search_data': search_query_by_keywords_and_classes, 'id': this.$route.params.id}).then(response => {
                            this.isLoading = false;
                            this.showSuccess();
                        }, error => {this.isLoading = false; this.disabledBtn = false;});
                    }
                }
                if (this.searchInfo.owner_search_params) {
                    if (this.isObjEmpty(this.selectedNamedApplicant)) {
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
                        country: this.selectedCountries.id,
                        name: owners_name,
                        address: owners_address,
                        search_validity_term: this.monthes_duration,
                        report_frequency: this.report_frequency,
                        search_day: this.selectedDay ? this.selectedDay.dayNumb : null,
                    };
                    if (!this.errors.length) {
                        this.disabledBtn = true;
                        this.isLoading = true;
                        this.saveSearchQueryByOwners({'search_data': search_query_by_owners, 'id': this.$route.params.id}).then(() => {
                            this.isLoading = false;
                            this.showSuccess();
                        }, error => {this.isLoading = false; this.disabledBtn = false;});
                    }
                }
                if (this.searchInfo.prod_class_search_params) {
                    if (this.isObjEmpty(this.selectedOneProductClass)) {
                        return this.errors.push({'selected_one_class_err': this.$i18n.i18next.t('_common:pages.create_new_search_query.class_product.err')});
                    }
                    let search_query_by_classes = {
                        country: this.selectedCountries.id,
                        search_validity_term: this.monthes_duration,
                        report_frequency: this.report_frequency,
                        search_day: this.selectedDay ? this.selectedDay.dayNumb : null,
                        product_class: this.selectedOneProductClass[0].code,
                    };
                    if (!this.errors.length) {
                        this.disabledBtn = true;
                        this.isLoading = true;
                        this.saveSearchQueryByClass({'search_data': search_query_by_classes, 'id': this.$route.params.id}).then(() => {
                            this.isLoading = false;
                            this.showSuccess();
                        }, error => {this.isLoading = false; this.disabledBtn = false;});
                    }
                }
            }
        },
        components: {Chips, MultiSelect, Checkbox, InputText, Toast, SelectButton, Dropdown, Loading, tmbuttons}
    }
</script>

<style scoped lang="scss">
  @import "../../assets/styles/newAndEditQueries";
</style>
