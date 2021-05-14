import {authorizationService} from '../services';
import {userService} from '../services';
import {footerService} from '../services';
import router from '../router/router';

const user_access = localStorage.getItem('access');
const user_refresh = localStorage.getItem('refresh');

const state = {
  loggedIn: (user_access && user_refresh) ? true : false,
  activate: false,
  user: {
    is_trial: false,
    id: '',
    email: '',
    is_active: '',
    trial_acc_end_date: '',
    date_joined: '',
    mail_address: '',
    phone: '',
    requests_count: 0,
    balance: 0,
    legalperson: {
      name: '',
      edrpou: '',
      contact: '',
      contactperson: '',
      reg_address: ''
    },
    naturalperson: {
      name: '',
      last_name: '',
      surname: ''
    },
    search_package: {
      max_requests: 0,
      daily_search_forbidden: false
    },
  },
};

export const actions = {
  login({dispatch, commit}, user_data) {
    return authorizationService.login(user_data)
      .then(
        user => {
          commit('loginSuccess', user);
          dispatch('alert/clearErrorLogin', user, {root: true});
          router.push('/profile');
          return user;
        },
        error => {
          commit('loginFailure', error);
          dispatch('alert/errorLogin', error, {root: true});
        }
      );
  },
  logout({commit}) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    commit('logout');
    router.push('/');
  },
  register({dispatch, commit}, user) {
    commit('registerRequest', user);
    return authorizationService.register(user)
      .then(
        user => {
          commit('registerSuccess', user);
          dispatch('alert/clearRegister', user, {root: true});
          return user;
        },
        error => {
          commit('registerFailure', error);
          dispatch('alert/errorRegister', error, {root: true});
        }
      );
  },
  activation({dispatch, commit}, urldata) {
    authorizationService.activate(urldata)
      .then(
        resp => {
          commit('activateSuccess', resp);
          dispatch('alert/success', 'Activation successful', {root: true});
        },
        error => {
          commit('activateFailure', error);
          dispatch('alert/errorActivation', error, {root: true});
        }
      );
  },
  resetPassword({dispatch, commit}, email) {
    authorizationService.remindPassword(email)
      .then(
        resp => {
          commit('activateResetingPassSuccess', resp);
          dispatch('alert/success', 'Activation successful', {root: true});
        },
        error => {
          commit('activateResetingPassSuccessFailure', error);
          dispatch('alert/errorActivation', error, {root: true});
        }
      );
  },
  changeUsersProfilePassword({dispatch, commit}, password_params) {
    authorizationService.changeUsersProfilePassword(password_params)
      .then(
        pass => {
          commit('activateSuccess', pass);
          dispatch('alert/clearErrorRemPassword', pass, {root: true});
          router.push('/');
          return pass;
        },
        error => {
          commit('activateFailure', error);
          dispatch('alert/errorRemPassword', error, {root: true});
        }
      );
  },
  getAccountInfo({dispatch, commit}) {
    return userService.getAccountInfo()
      .then(
        user => {
          commit('saveUser', user);
          dispatch('alert/clearAccountInfo', user, {root: true});
          return user;
        },
        error => {
          dispatch('alert/errorAccountInfo', error, {root: true});
        }
      );
  },
  saveUserInfo({dispatch}) {
    return userService.saveUserInfo()
      .then(
        user => {
          dispatch('alert/clearSaveUserInfo', user, {root: true});
          return user;
        },
        error => {
          dispatch('alert/errorSaveUserInfo', error, {root: true});
        }
      );
  },
  changeProfilePassword({dispatch}, user_pass) {
    return userService.changeUserPassword(user_pass)
      .then(
        pass => {
          dispatch('alert/clearUserPassword', pass, {root: true});
          return pass;
        },
        error => {
          dispatch('alert/errorUserPassword', error, {root: true});
          return Promise.reject(error);
        }
      );
  },
  getCountryList({dispatch}) {
    return userService.getCountryList()
      .then(
        country => {
          dispatch('alert/clearCountryList', country, {root: true});
          return country;
        },
        error => {
          dispatch('alert/errorCountryList', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getClassesList({dispatch}, choose_country) {
    return userService.getClassesList(choose_country)
      .then(
        classes => {
          return classes;
        },
        error => {
          dispatch('alert/errorRegister', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getViewedList({dispatch}, choose_country) {
    return userService.getViewedList(choose_country)
      .then(
        views => {
          dispatch('alert/clearSearchQueryByClasses', views, {root: true});
          return views;
        },
        error => {
          dispatch('alert/errorSearchQueryByClasses', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getSubcategoriesList({dispatch}, category_data) {
    return userService.getSubcategoriesList(category_data.country_code, category_data.image_code)
      .then(
        views => {
          return views;
        },
        error => {
          dispatch('alert/errorSubcategoriesList', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  createSearchQueryByKeywords({dispatch}, search_query) {
    return userService.createSearchQueryByKeywords(search_query)
      .then(
        queries => {
          dispatch('alert/clearSearchQueryByKeywords', queries, {root: true});
          router.push('/search-query');
          return queries;
        },
        error => {
          dispatch('alert/errorSearchQueryByKeywords', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  createSearchQueryByOwners({dispatch}, search_query) {
    return userService.createSearchQueryByOwners(search_query)
      .then(
        queries => {
          dispatch('alert/clearSearchQueryByOwners', queries, {root: true});
          router.push('/search-query');
          return queries;
        },
        error => {
          dispatch('alert/errorSearchQueryByOwners', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  createSearchQueryByClasses({dispatch}, search_query) {
    return userService.createSearchQueryByClasses(search_query)
      .then(
        queries => {
          dispatch('alert/clearSearchQueryByClasses', queries, {root: true});
          router.push('/search-query');
          return queries;
        },
        error => {
          dispatch('alert/errorSearchQueryByClasses', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getAllSearchQueries({dispatch}) {
    return userService.getAllSearchQueries()
      .then(
        queries => {
          dispatch('alert/clearAllSearchQueries', queries, {root: true});
          return queries;
        },
        error => {
          dispatch('alert/errorAllSearchQueries', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getIdSearchQuery({dispatch}, query_id) {
    return userService.getIdSearchQuery(query_id)
      .then(
        queries => {
          dispatch('alert/clearIdSearchQuery', queries, {root: true});
          return queries;
        },
        error => {
          dispatch('alert/errorIdSearchQuery', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getSearchInfo({dispatch}) {
    return userService.getSearchInfo()
      .then(
        queries => {
          dispatch('alert/clearSearchInfo', queries, {root: true});
          return queries;
        },
        error => {
          dispatch('alert/errorSearchInfo', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getSearchInfoToEdit({dispatch}, search_id) {
    return userService.getSearchInfoToEdit(search_id)
      .then(
        queries => {
          dispatch('alert/clearSearchInfoToEdit', queries, {root: true});
          return queries;
        },
        error => {
          dispatch('alert/errorSearchInfoToEdit', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getOwnersList({dispatch}, category_data) {
    return userService.getOwnersList(category_data.country_code, category_data.owners_name)
      .then(
        ownersName => {
          dispatch('alert/clearOwnersList', ownersName, {root: true});
          return ownersName;
        },
        error => {
          dispatch('alert/errorOwnersList', error, {root: true});
          return Promise.reject(error);
        }
      );
  },
  sendReportToEmail({dispatch}, request) {
    return userService.sendReportToEmail(request)
      .then(
        report => {
          dispatch('alert/clearsendReportToEmail', report, {root: true});
          return report;
        },
        error => {
          dispatch('alert/errorsendReportToEmail', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  stopSearchStatus({dispatch}, status_data) {
    return userService.stopSearchStatus(status_data)
      .then(
        status => {
          dispatch('alert/clearstopSearchStatus', status, {root: true});
          window.location.reload();
          return status;
        },
        error => {
          dispatch('alert/errorstopSearchStatus', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getBalanceInfo({dispatch}) {
    return userService.getBalanceInfo()
      .then(
        balance => {
          dispatch('alert/clearBalanceInfo', balance, {root: true});
          return balance;
        },
        error => {
          dispatch('alert/errorBalanceInfo', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  downloadRequestsAmountPDF({dispatch}, balance_params) {
    return userService.downloadRequestsAmountPDF(balance_params)
      .then(
        balance => {
          dispatch('alert/clearRequestsAmountPDF', balance, {root: true});
          return balance;
        },
        error => {
          dispatch('alert/errorRequestsAmountPDF', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  sendRequestsAmountEmail({dispatch}, balance_params) {
    return userService.sendRequestsAmountEmail(balance_params)
      .then(
        balance => {
          dispatch('alert/clearRequestsAmountPDF', balance, {root: true});
          return balance;
        },
        error => {
          dispatch('alert/errorRequestsAmountPDF', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getObjectByUrl({dispatch}, urlToFile) {
    return userService.getObjectByUrl(urlToFile)
      .then(
        bill => {
          dispatch('alert/clearRequestsAmountPDF', bill, {root: true});
          return bill;
        },
        error => {
          dispatch('alert/errorRequestsAmountPDF', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  saveSearchQueryByKeywords({dispatch}, search_query) {
    return userService.saveSearchQueryByKeywords(search_query)
      .then(
        queries => {
          dispatch('alert/clearSavingSearchQueryByKeywords', queries, {root: true});
          router.push('/search-query');
          return queries;
        },
        error => {
          dispatch('alert/errorSavingSearchQueryByKeywords', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  saveSearchQueryByOwners({dispatch}, search_query) {
    return userService.saveSearchQueryByOwners(search_query)
      .then(
        queries => {
          dispatch('alert/clearSavingSearchQueryByOwners', queries, {root: true});
          router.push('/search-query');
          return queries;
        },
        error => {
          dispatch('alert/errorSavingSearchQueryByOwners', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  saveSearchQueryByClass({dispatch}, search_query) {
    return userService.saveSearchQueryByClass(search_query)
      .then(
        queries => {
          dispatch('alert/clearSavingSearchQueryByClass', queries, {root: true});
          router.push('/search-query');
          return queries;
        },
        error => {
          dispatch('alert/errorSavingSearchQueryByClass', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  //footers pages
  getHowItWorksInfo({dispatch}) {
    return footerService.getHowItWorksInfo()
      .then(
        footerInfo => {
          return footerInfo;
        },
        error => {
          dispatch('alert/errorsFooter', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getHowMakeReqInfo({dispatch}) {
    return footerService.getHowMakeReqInfo()
      .then(
        footerInfo => {
          return footerInfo;
        },
        error => {
          dispatch('alert/errorsFooter', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getIntellectualPropInfo({dispatch}) {
    return footerService.getIntellectualPropInfo()
      .then(
        footerInfo => {
          return footerInfo;
        },
        error => {
          dispatch('alert/errorsFooter', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getPublicOfferInfo({dispatch}) {
    return footerService.getPublicOfferInfo()
      .then(
        footerInfo => {
          return footerInfo;
        },
        error => {
          dispatch('alert/errorsFooter', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

  getUsageRulesInfo({dispatch}) {
    return footerService.getUsageRulesInfo()
      .then(
        footerInfo => {
          return footerInfo;
        },
        error => {
          dispatch('alert/errorsFooter', error, {root: true});
          return Promise.reject(error);
        }
      );
  },

};

const mutations = {
  loginSuccess(state, user) {
    state.loggedIn = true;
    state.date_joined = user.date_joined ? user.date_joined : '';
    state.email = user.email ? user.email : '';
    state.id = user.id ? user.id : '';
    state.is_active = user.is_active ? user.is_active : false;
    state.is_trial = user.is_trial ? user.is_trial : false;
    state.mail_address = user.mail_address ? user.mail_address : '';
    state.phone = user.phone ? user.phone : '';
    state.trial_acc_end_date = user.trial_acc_end_date ? user.trial_acc_end_date : '';
    state.requests_count = user.requests_count ? user.requests_count : 0;
    state.search_package = user.search_package ? user.search_package.max_requests : 0;
    state.search_package = user.search_package ? user.search_package.daily_search_forbidden : false;
  },

  loginFailure(state) {
    state.loggedIn = false;
  },
  logout(state) {
    state.loggedIn = false;
  },
  registerRequest(state) {
    state.loggedIn = false;
  },
  registerSuccess(state) {
    state.loggedIn = false;
  },
  registerFailure(state) {
    state.loggedIn = false;
  },
  activateSuccess(state) {
    state.loggedIn = false;
    state.activate = true;
  },
  activateFailure(state) {
    state.loggedIn = false;
    state.activate = false;
  },
  activateResetingPassSuccess(state) {
    state.loggedIn = false;
  },
  activateResetingPassSuccessFailure(state) {
    state.loggedIn = false;
  },
  saveUser(state, user_info) {
    state.user.is_trial = user_info.is_trial ? user_info.is_trial : false;
    state.user.id = user_info.id ? user_info.id : '';
    state.user.email = user_info.email ? user_info.email : '';
    state.user.is_active = user_info.is_active ? user_info.is_active : '';
    state.user.trial_acc_end_date = user_info.trial_acc_end_date ? user_info.trial_acc_end_date : '';

    state.user.balance = user_info.balance ? user_info.balance : 0;
    state.user.date_joined = user_info.date_joined ? user_info.date_joined : '';
    state.user.mail_address = user_info.mail_address ? user_info.mail_address : '';
    state.user.phone = user_info.phone ? user_info.phone : '';
    state.user.requests_count = user_info.requests_count ? user_info.requests_count : 0;
    if (!user_info.legalperson) {
      state.user.legalperson.name = null;
      state.user.legalperson.edrpou = null;
      state.user.legalperson.contact = null;
      state.user.legalperson.contactperson = null;
      state.user.legalperson.reg_address = null;
    } else {
      state.user.legalperson.name = user_info.legalperson.name ? user_info.legalperson.name : '';
      state.user.legalperson.edrpou = user_info.legalperson.edrpou ? user_info.legalperson.edrpou : '';
      state.user.legalperson.contact = user_info.legalperson.contact ? user_info.legalperson.contact : '';
      state.user.legalperson.contactperson = user_info.legalperson.contactperson ? user_info.legalperson.contactperson : '';
      state.user.legalperson.reg_address = user_info.legalperson.reg_address ? user_info.legalperson.reg_address : '';
    }
    if (!user_info.naturalperson) {
      state.user.naturalperson.name = null;
      state.user.naturalperson.last_name = null;
      state.user.naturalperson.surname = null;
    } else {
      state.user.naturalperson.name = user_info.naturalperson.name ? user_info.naturalperson.name : '';
      state.user.naturalperson.last_name = user_info.naturalperson.last_name ? user_info.naturalperson.last_name : '';
      state.user.naturalperson.surname = user_info.naturalperson.surname ? user_info.naturalperson.surname : '';
    }
    if (!user_info.search_package) {
      state.user.search_package.max_requests = null;
      state.user.search_package.daily_search_forbidden = false;
    } else {
      state.user.search_package.max_requests = user_info.search_package.max_requests ? user_info.search_package.max_requests : 0;
      state.user.search_package.daily_search_forbidden = user_info.search_package.daily_search_forbidden ? user_info.search_package.daily_search_forbidden : false;
    }
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
