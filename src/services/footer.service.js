import {authHeader, handle} from "../helpers";

export const footerService = {
  getHowItWorksInfo,
  getHowMakeReqInfo,
  getIntellectualPropInfo,
  getPublicOfferInfo,
  getUsageRulesInfo
};

function getHowItWorksInfo() {
  const url = `${process.env.API_URL}/markup/how-it-works/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function getHowMakeReqInfo() {
  const url = `${process.env.API_URL}/markup/how-to-make-request/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function getIntellectualPropInfo() {
  const url = `${process.env.API_URL}/markup/intellectual-property/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function getPublicOfferInfo() {
  const url = `${process.env.API_URL}/markup/public-offer/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}

function getUsageRulesInfo() {
  const url = `${process.env.API_URL}/markup/usage-rules/`;
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let handleReq = function (resp) {
    return handle(resp, url, requestOptions);
  };

  return fetch(url, requestOptions).then(handleReq);
}
