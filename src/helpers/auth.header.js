import router from "../router/router";
import {store} from '../store';
import i18n from '../i18n'

export function authHeader() {
  let accepted_string;
  let access_token = localStorage.getItem('access');
  if (i18n.i18next.language === 'ua') {
    accepted_string = 'uk-UA,ru-RU;q=0.9,ru-RU;q=0.8,en-US;q=0.7,en;q=0.6';
  } else if (i18n.i18next.language === 'ru') {
    accepted_string = 'ru-RU,uk-UA;q=0.9,ru-RU;q=0.8,en-US;q=0.7,en;q=0.6';
  } else {
    accepted_string = i18n.i18next.language +';q=0.9,ru-RU;q=0.8,en-US;q=0.7,en;q=0.6';
  }


  if (access_token) {
    return {'Authorization': "Bearer " + access_token, 'Content-Type': 'application/json', 'Accept-Language': accepted_string};
  } else {
    return {'Accept-Language': accepted_string};
  }
}

function saveToken(resp) {
  return resp.text().then(text => {
    const acc_token = JSON.parse(text);
    if (!resp.ok) {
      store.dispatch('account/logout');
      return Promise.reject();
    }
    if (acc_token.access) {
      localStorage.setItem('access', acc_token.access);
    } else {
      return Promise.reject();
    }
    return acc_token;
  });
}

function refreshToken(token) {
  return fetch(`${process.env.API_URL}/auth/jwt/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'refresh': token,
    }),
  }).then(saveToken);
}

export function tryTokenRefresh(url, options) {
  let refresh_token;
  if (localStorage.refresh) {
    refresh_token = localStorage.refresh;
  } else {
    router.push('/');
  }
  try {
    return refreshToken(refresh_token);
  } catch (e) {
    store.dispatch('account/logout');
  }
}

export function ResendLatestQuery(url, params) {
  params.headers = authHeader();
  return fetch(url, params).then(handle);
}

export function handle(resp, trgt_url, trgt_params) {
  let ResendQuery = function () {
    return ResendLatestQuery(trgt_url, trgt_params);
  };

  return resp.text().then(text => {
    try {
      const data = text && JSON.parse(text);
      if (!resp.ok) {
        const error = (data && (data.new_password) || (data.re_new_password) || (data.product_classes) || (data.current_password)) || (data.detail) || resp.statusText;
        let error_result = '';
        if (resp.status === 401) {
          return tryTokenRefresh(trgt_url, trgt_params).then(ResendQuery);
        }
        if (Array.isArray(error)) {
          error_result = error.join(" ");
        } else {
          error_result = data;
        }
        return Promise.reject(error_result);
      }
      return data;
    } catch (error) {
      return Promise.reject(i18n.i18next.t("_common:pages.serverError"));
    }
  });
}
