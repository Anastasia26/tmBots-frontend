const state = {
  type: null,
  message_register: null,
  message_login: null,
  message_remindemail: null,
  message_remindpassword: null,
  message_activation: null,
  message_changepassword: null,
  message_getAccountInfo: null,
  message_SaveUserInfo: null,
  message_searchquerybykeywords: null,
  message_getSubcategoriesList: null,
  message_searchquerybyowners: null,
  message_searchquerybyclasses: null,
  message_stopSearchStatus: null,
  message_balanceInfo: null,
  message_balanceRequestsAmountPDF: null,
  message_searchInfoToEdit: null,
  message_savingQueryByKeywords: null,
  message_savingQueryByOwners: null,
  message_savingQueryByOneClass: null,
  message_sendReportToEmail: null,
  message_getCountryList: null,
  message_getAllSearchQueries: null,
  message_getIdSearchQuery: null,
  message_getSearchInfo: null,
  message_getOwnersList: null,
  message_errorsFooter: null,
};

const actions = {
  success({commit}, message) {
    commit('success', message);
  },
  errorRegister({commit}, message) {
    commit('error_register', message);
  },
  errorLogin({commit}, message) {
    commit('error_login', message);
  },
  errorRemPassword({commit}, message) {
    commit('error_remindpassword', message);
  },
  errorRemEmail({commit}, message) {
    commit('error_remindemail', message);
  },
  errorActivation({commit}, message) {
    commit('error_activation', message);
  },
  errorUserPassword({commit}, message) {
    commit('error_password', message);
  },
  errorAccountInfo({commit}, message) {
    commit('error_AccountInfo', message);
  },
  errorSearchQueryByKeywords({commit}, message) {
    commit('error_searchQueryByKeywords', message);
  },
  errorSubcategoriesList({commit}, message) {
    commit('error_SubcategoriesList', message);
  },
  errorSearchQueryByOwners({commit}, message) {
    commit('error_searchQueryByOwners', message);
  },
  errorSearchQueryByClasses({commit}, message) {
    commit('error_searchQueryByClasses', message);
  },
  errorstopSearchStatus({commit}, message) {
    commit('error_stopSearchStatus', message);
  },
  errorBalanceInfo({commit}, message) {
    commit('error_BalanceInfo', message);
  },
  errorSearchInfoToEdit({commit}, message) {
    commit('error_SearchInfoToEdit', message);
  },
  errorRequestsAmountPDF({commit}, message) {
    commit('error_RequestsAmountPDF', message);
  },
  errorSavingSearchQueryByKeywords({commit}, message) {
    commit('error_SavingSearchQueryByKeywords', message);
  },
  errorSavingSearchQueryByOwners({commit}, message) {
    commit('error_SavingSearchQueryByOwners', message);
  },
  errorSavingSearchQueryByClass({commit}, message) {
    commit('error_SavingSearchQueryByClass', message);
  },
  errorSaveUserInfo({commit}, message) {
    commit('error_SaveUserInfo', message);
  },
  errorsendReportToEmail({commit}, message) {
    commit('error_sendReportToEmail', message);
  },
  errorCountryList({commit}, message) {
    commit('error_CountryList', message);
  },
  errorAllSearchQueries({commit}, message) {
    commit('error_AllSearchQueries', message);
  },
  errorIdSearchQuery({commit}, message) {
    commit('error_IdSearchQuery', message);
  },
  errorSearchInfo({commit}, message) {
    commit('error_SearchInfo', message);
  },
  errorOwnersList({commit}, message) {
    commit('error_OwnersList', message);
  },
  errorsFooter({commit}, message) {
    commit('error_errorsFooter', message);
  },
  clearErrorLogin({commit}) {
    commit('clearLoginErr');
  },
  clearRegister({commit}) {
    commit('clearRegisterErr');
  },
  clearUserPassword({commit}) {
    commit('clearUserPasswordErr');
  },
  clearErrorRemPassword({commit}) {
    commit('clearRemPasswordErr');
  },
  clearAccountInfo({commit}) {
    commit('clearAccountInfoErr');
  },
  clearSearchQueryByKeywords({commit}) {
    commit('clearSearchQueryByKeywordsErr');
  },
  clearSubcategoriesList({commit}) {
    commit('clearSubcategoriesListErr');
  },
  clearSearchQueryByOwners({commit}) {
    commit('clearSearchQueryByOwnersErr');
  },
  clearSearchQueryByClasses({commit}) {
    commit('clearSearchQueryByClassesErr');
  },
  clearstopSearchStatus({commit}) {
    commit('clearstopSearchStatusErr');
  },
  clearBalanceInfo({commit}) {
    commit('clearBalanceInfoErr');
  },
  clearRequestsAmountPDF({commit}) {
    commit('clearRequestsAmountPDFErr');
  },
  clearSearchInfoToEdit({commit}) {
    commit('clearSearchInfoToEditErr');
  },
  clearSavingSearchQueryByKeywords({commit}) {
    commit('clearSavingSearchQueryByKeywordsErr');
  },
  clearSavingSearchQueryByOwners({commit}) {
    commit('clearSavingSearchQueryByOwnersErr');
  },
  clearSavingSearchQueryByClass({commit}) {
    commit('clearSavingSearchQueryByClassErr');
  },
  clearsendReportToEmail({commit}) {
    commit('clearsendReportToEmailErr');
  },
  clearSaveUserInfo({commit}) {
    commit('clearSaveUserInfoErr');
  },
  clearCountryList({commit}) {
    commit('clearCountryListErr');
  },
  clearAllSearchQueries({commit}) {
    commit('clearAllSearchQueriesErr');
  },
  clearIdSearchQuery({commit}) {
    commit('clearIdSearchQueryErr');
  },
  clearSearchInfo({commit}) {
    commit('clearSearchInfoErr');
  },
  clearOwnersList({commit}) {
    commit('clearOwnersListErr');
  },
  clearAllErrors({commit}) {
    commit('clearAllErrors');
  },
};

const mutations = {
  success(state) {
    state.type = 'alert-success';
  },
  error_register(state, message) {
    state.type = 'alert-danger';
    state.message_register = message;
  },
  error_login(state, message) {
    state.type = 'alert-danger';
    state.message_login = message;
  },
  error_remindemail(state, message) {
    state.type = 'alert-danger';
    state.message_remindemail = message;
  },
  error_remindpassword(state, message) {
    state.type = 'alert-danger';
    state.message_remindpassword = message;
  },
  error_activation(state, message) {
    state.type = 'alert-danger';
    state.message_activation = message;
  },
  error_password(state, message) {
    state.type = 'alert-danger';
    state.message_changepassword = message;
  },
  error_AccountInfo(state, message) {
    state.type = 'alert-danger';
    state.message_getAccountInfo = message;
  },
  error_searchQueryByKeywords(state, message) {
    state.type = 'alert-danger';
    state.message_searchquerybykeywords = message;
  },
  error_SubcategoriesList(state, message) {
    state.type = 'alert-danger';
    state.message_getSubcategoriesList = message;
  },
  error_searchQueryByOwners(state, message) {
    state.type = 'alert-danger';
    state.message_searchquerybyowners = message;
  },
  error_searchQueryByClasses(state, message) {
    state.type = 'alert-danger';
    state.message_searchquerybyclasses = message;
  },
  error_stopSearchStatus(state, message) {
    state.type = 'alert-danger';
    state.message_stopSearchStatus = message;
  },
  error_BalanceInfo(state, message) {
    state.type = 'alert-danger';
    state.message_balanceInfo = message;
  },
  error_RequestsAmountPDF(state, message) {
    state.type = 'alert-danger';
    state.message_balanceRequestsAmountPDF = message;
  },
  error_SearchInfoToEdit(state, message) {
    state.type = 'alert-danger';
    state.message_searchInfoToEdit = message;
  },
  error_SavingSearchQueryByKeywords(state, message) {
    state.type = 'alert-danger';
    state.message_savingQueryByKeywords = message;
  },
  error_SavingSearchQueryByOwners(state, message) {
    state.type = 'alert-danger';
    state.message_savingQueryByOwners = message;
  },
  error_SavingSearchQueryByClass(state, message) {
    state.type = 'alert-danger';
    state.message_savingQueryByOneClass = message;
  },
  error_SaveUserInfo(state, message) {
    state.type = 'alert-danger';
    state.message_SaveUserInfo = message;
  },
  error_sendReportToEmail(state, message) {
    state.type = 'alert-danger';
    state.message_sendReportToEmail = message;
  },
  error_CountryList(state, message) {
    state.type = 'alert-danger';
    state.message_getCountryList = message;
  },
  error_AllSearchQueries(state, message) {
    state.type = 'alert-danger';
    state.message_getAllSearchQueries = message;
  },
  error_IdSearchQuery(state, message) {
    state.type = 'alert-danger';
    state.message_getIdSearchQuery = message;
  },
  error_SearchInfo(state, message) {
    state.type = 'alert-danger';
    state.message_getSearchInfo = message;
  },
  error_OwnersList(state, message) {
    state.type = 'alert-danger';
    state.message_getOwnersList = message;
  },
  error_errorsFooter(state, message) {
    state.type = 'alert-danger';
    state.message_errorsFooter = message;
  },
  clearLoginErr(state) {
    state.type = null;
    state.message_login = null;
  },
  clearRegisterErr(state) {
    state.type = null;
    state.message_register = null;
  },
  clearUserPasswordErr(state) {
    state.type = null;
    state.message_changepassword = null;
  },
  clearRemPasswordErr(state) {
    state.type = null;
    state.message_remindpassword = null;
  },
  clearAccountInfoErr(state) {
    state.type = null;
    state.message_getAccountInfo = null;
  },
  clearSearchQueryByKeywordsErr(state) {
    state.type = null;
    state.message_searchquerybykeywords = null;
  },
  clearSearchQueryByOwnersErr(state) {
    state.type = null;
    state.message_searchquerybyowners = null;
  },
  clearSearchQueryByClassesErr(state) {
    state.type = null;
    state.message_searchquerybyclasses = null;
  },
  clearstopSearchStatusErr(state) {
    state.type = null;
    state.message_stopSearchStatus = null;
  },
  clearBalanceInfoErr(state) {
    state.type = null;
    state.message_balanceInfo = null;
  },
  clearRequestsAmountPDFErr(state) {
    state.type = null;
    state.message_balanceRequestsAmountPDF = null;
  },
  clearSearchInfoToEditErr(state) {
    state.type = null;
    state.message_searchInfoToEdit = null;
  },
  clearSavingSearchQueryByKeywordsErr(state) {
    state.type = null;
    state.message_savingQueryByKeywords = null;
  },
  clearSavingSearchQueryByOwnersErr(state) {
    state.type = null;
    state.message_savingQueryByOwners = null;
  },
  clearSavingSearchQueryByClassErr(state) {
    state.type = null;
    state.message_savingQueryByOneClass = null;
  },
  clearsendReportToEmailErr(state) {
    state.type = null;
    state.message_sendReportToEmail = null;
  },
  clearSaveUserInfoErr(state) {
    state.type = null;
    state.message_SaveUserInfo = null;
  },
  clearCountryListErr(state) {
    state.type = null;
    state.message_getCountryList = null;
  },
  clearAllSearchQueriesErr(state) {
    state.type = null;
    state.message_getAllSearchQueries = null;
  },
  clearIdSearchQueryErr(state) {
    state.type = null;
    state.message_getIdSearchQuery = null;
  },
  clearSearchInfoErr(state) {
    state.type = null;
    state.message_getSearchInfo = null;
  },
  clearOwnersListErr(state) {
    state.type = null;
    state.message_getOwnersList = null;
  },
  clearAllErrors(state) {
    state.type = null;
    state.message_getOwnersList = null;
    state.message_getSearchInfo = null;
    state.message_savingQueryByKeywords = null
  },
};

export const alert = {
  namespaced: true,
  state,
  actions,
  mutations
};
