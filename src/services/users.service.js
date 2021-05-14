import {authHeader, handle} from "../helpers";
import {store} from "../store";

export const userService = {
  getAccountInfo,
  saveUserInfo,
  changeUserPassword,
  getCountryList,
  getClassesList,
  getViewedList,
  getSubcategoriesList,
  createSearchQueryByKeywords,
  createSearchQueryByOwners,
  createSearchQueryByClasses,
  getAllSearchQueries,
  getIdSearchQuery,
  getSearchInfo,
  getSearchInfoToEdit,
  getOwnersList,
  sendReportToEmail,
  stopSearchStatus,
  getBalanceInfo,
  downloadRequestsAmountPDF,
  sendRequestsAmountEmail,
  getObjectByUrl,
  saveSearchQueryByKeywords,
  saveSearchQueryByOwners,
  saveSearchQueryByClass
};


function getAccountInfo() {
  const url = `${process.env.API_URL}/auth/users/me/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function saveUserInfo() {
  const url = `${process.env.API_URL}/auth/users/me/`;
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(store.state.account.user)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function changeUserPassword(pass) {
  const url = `${process.env.API_URL}/auth/users/set_password/`;
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(pass)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };
  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function getCountryList() {
  const url = `${process.env.API_URL}/search/countries/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}


function getClassesList(choose_country) {
  let url = `${process.env.API_URL}/trademarks-${choose_country}/product-classes/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function getViewedList(choose_country) {
  let url = `${process.env.API_URL}/trademarks-${choose_country}/image-classes`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function getSubcategoriesList(choose_country, image_code) {

  let url = `${process.env.API_URL}/trademarks-${choose_country}/image-class-subcategories/${image_code}`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function createSearchQueryByKeywords(search_q) {
  const url = `${process.env.API_URL}/search/create-search-request-by-keywords-and-classes/`;
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(search_q)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function createSearchQueryByOwners(search_q) {
  const url = `${process.env.API_URL}/search/create-search-request-by-owners/`;
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(search_q)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function createSearchQueryByClasses(search_q) {
  const url = `${process.env.API_URL}/search/create-search-request-by-one-products-class/`;
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(search_q)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function getAllSearchQueries() {
  const url = `${process.env.API_URL}/search/search-requests/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function getIdSearchQuery(query_id) {
  const url = `${process.env.API_URL}/search/get-search-results/${query_id}/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function getSearchInfo() {
  const url = `${process.env.API_URL}/search/search-requests/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function getSearchInfoToEdit(search_id) {
  const url = `${process.env.API_URL}/search/search-request/${search_id}/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}


function getOwnersList(choose_country, owners_name) {
  let url = `${process.env.API_URL}/trademarks-${choose_country}/owners?name_part=${owners_name}&limit=50`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function sendReportToEmail(request) {
  const url = `${process.env.API_URL}/search/get-search-results-email/${request.request_id}/${request.date}`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function stopSearchStatus(status_data) {
  const url = `${process.env.API_URL}/search/change-search-status/`;
  const requestOptions = {
    method: 'PATCH',
    headers: authHeader(),
    body: JSON.stringify({'status': status_data.data, 'search_id_list': status_data.search_id_list})
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function getBalanceInfo() {
  const url = `${process.env.API_URL}/search/search-packages/`;
  const requestOptions = {
    method: 'GET'
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function downloadRequestsAmountPDF(balance_params) {
  const url = `${process.env.API_URL}/search/get-search-package-invoice-pdf/${balance_params.requests_id}/${balance_params.requests_amount}`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function sendRequestsAmountEmail(balance_params) {
  const url = `${process.env.API_URL}/search/get-search-package-invoice-email/${balance_params.requests_id}/${balance_params.requests_amount}`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function getObjectByUrl(urlToFile) {
  const url = urlToFile;
  const requestOptions = {
    method: 'GET',
    headers: {'Access-Control-Allow-Origin': '*'}
  };
  return fetch(url, requestOptions).then(response => response.blob());
}

function saveSearchQueryByKeywords(search_q) {
  const url = `${process.env.API_URL}/search/update-search-request-by-keywords-and-classes/${search_q.id}/`;
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(search_q.search_data)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function saveSearchQueryByOwners(search_q) {
  const url = `${process.env.API_URL}/search/update-search-request-by-owners/${search_q.id}`;
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(search_q.search_data)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

function saveSearchQueryByClass(search_q) {
  const url = `${process.env.API_URL}/search/update-search-request-by-product_class/${search_q.id}/`;
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(search_q.search_data)
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq).catch(function (error) {
    return Promise.reject(error);
  })
}

