import axios from 'axios';
import {PATHS} from 'configs/routes.config';
import {LOGIN, REFRESH_TOKEN as REFRESH_TOKEN_URL, WHOAMI} from 'configs/url.config';
import {ACCESS_TOKEN, REFRESH_TOKEN, BASE_URL, IS_LOGGED_IN} from 'configs/variables.config';
import {toast} from 'react-toastify';
import {refreshToken} from 'redux/actions/user.action';
import store from 'redux/store';
import history from './history.service';
import errorMap from 'assets/data/error-map';

let canRefresh = true;

class HttpService {
    constructor(entity) {
        this.entity = entity;
        axios.defaults.baseURL = BASE_URL;

        axios.interceptors.request.use((config) => {
            let token = localStorage.getItem(config.url !== REFRESH_TOKEN_URL ? ACCESS_TOKEN : REFRESH_TOKEN);
            if (config.url !== LOGIN && (config.url === WHOAMI || token)) {
                config.headers['token'] = `${token}`
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        axios.interceptors.response.use((response) => {
                // console.log('Interceptor response success', response);
                canRefresh = true;
                return response;
            },
            async (error) => {
                if (!error.response) return Promise.reject(error);

                const originalRequest = error.config;
                console.log('error : ', originalRequest);
                if (error.response.status === 401) {
                    if (canRefresh) {
                        canRefresh = false;
                        try {
                            await store.dispatch(refreshToken());
                            return new Promise((resolve, reject) => {
                                axios.request(originalRequest)
                                    .then((res) => {
                                        console.log('res originalRequest : ', res);
                                        resolve(res);
                                    })
                                    .catch(e => {
                                        reject(e);
                                    })
                            });

                        } catch (e) {
                            console.log('error refresh token: ', error.response);
                            localStorage.setItem(IS_LOGGED_IN, false.toString());
                            history.push(PATHS.PANEL_LOGIN);
                            return Promise.reject(error);
                            // }
                        }
                    }
                }
                else if (error.response.status === 404) {
                    window.location.pathname = '/404'
                }

                else {
                    toast.error(errorMap[error.response.status])
                    return Promise.reject(error);
                }

            })

        axios.defaults.timeout = 5000;
        axios.defaults.baseURL = 'http://localhost:3001';
    }

    gets = (config)=>{
        return axios.get(this.entity, config)
    }

    get(url, config) {
        return axios.get(url, config);
    }

    post(url, data, config) {
        return axios.post(url, data, config);
    }

    put(url, data, config) {
        return axios.put(url, data, config);
    }

    patch(url, data, config) {
        return axios.patch(url, data, config);
    }

    delete(url, config) {
        return axios.delete(url, config);
    }
}

export default HttpService;