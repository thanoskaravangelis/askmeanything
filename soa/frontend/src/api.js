import axios from "axios";
import config from './config'

axios.defaults.baseURL = config.authURL;

export const loginPost = (params) => {
    const requestUrl = '/auth/login';
    return axios.post(requestUrl, params);
}
