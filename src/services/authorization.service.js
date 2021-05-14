import {userService} from '../services';
export const authorizationService = {
    register,
    activate,
    login,
    logout,
    remindPassword,
    changeUsersProfilePassword
};

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${process.env.API_URL}/auth/users/`, requestOptions).then(handleResponse);
}

function activate(params) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    return fetch(`${process.env.API_URL}/auth/users/activation/`, requestOptions).then(handleResponse);
}

function login(user_data) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user_data)
    };
    return fetch(`${process.env.API_URL}/auth/jwt/create/`, requestOptions)
        .then(handleResponse)
        .then(tokens => {
            if (tokens.access && tokens.refresh) {
                localStorage.setItem('access', tokens.access);
                localStorage.setItem('refresh', tokens.refresh);
            } else {
                return Promise.reject('Invalid Tokens!');
            }
            return tokens;
        }).catch(function(error) {
            return Promise.reject(error);
    })
}

function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}

function remindPassword(email_param) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({'email': email_param.email})
  };
  return fetch(`${process.env.API_URL}/auth/users/reset_password/`, requestOptions).then(handleResponse);
}

function changeUsersProfilePassword(password_params) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(password_params)
  };
  return fetch(`${process.env.API_URL}/auth/users/reset_password_confirm/`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && (data.password) || (data.email) || (data.is_trial)) || (data.detail) || (data.new_password) || response.statusText;
            let error_result = '';

            if (Array.isArray(error)) {
                error_result = error.join(" ")
            } else {
                error_result = error
            }
            return Promise.reject(error_result);
        }
        return data;
    });
}
