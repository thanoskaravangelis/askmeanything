import axios from 'axios';
import config from './config';

const { questMan, questRun, auth, profile, stats, esb } = config;

const token = localStorage.getItem('token');
const authHeader = () => {
    const headers = { "Authorization": "Bearer " + token };
    return headers;
}

export const isLogged = () => {
    const headers = authHeader();
    const requestUrl = `${auth}/whoami`;
    return axios.get(requestUrl, { headers });
}

export const loginPost = (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    const requestUrl = `${auth}/login`;
    return axios.post(requestUrl, params);
}

export const signup = (body) => {
    const requestUrl = `${auth}/signup`;
    return axios.post(requestUrl, body);
}

export const getQuestions = (startDate, endDate) => {
    const requestUrl = `${profile}/questions/from/${startDate}/to/${endDate}`;
    return axios.get(requestUrl);
}

export const getKeywords = () => {
    const requestUrl = `${questMan}/keywords`;
    return axios.get(requestUrl);
}

export const postQuestion = (obj) => {
    const headers = authHeader();
    const requestUrl = `${questMan}/newquestion`;
    return axios.post(requestUrl, obj, { headers });
}

export const postKeyword = (name) => {
    const headers = authHeader();
    const requestUrl = `${questMan}/newkeyword`;
    return axios.post(requestUrl, { name },  { headers });
}

export const attachKeyword = (keyword_id, question_id) => {
    const obj = {
        keyword: { id: keyword_id },
        question: { id: question_id},
    }
    const headers = authHeader();
    const requestUrl = `${questMan}/newquestionhaskeyword`;
    return axios.post(requestUrl, obj, { headers });
}

export const getQuestion = (id) => {
    const requestUrl = `${questMan}/question/${id}`;
    return axios.get(requestUrl);
}

export const Answer = (user_id, question_id, text) => {
    const headers = authHeader();
    const obj = {
        question: { id: question_id },
        user: { id: user_id },
        text,
    };
    const requestUrl = `${questRun}/newanswer`;
    return axios.post(requestUrl, obj, { headers });
}

export const getProfile = (id) => {
    const headers = authHeader();
    const requestUrl = `${profile}/${id}`;
    return axios.get(requestUrl, { headers });
}

export const getProfileQuestions = (id, start, end) => {
    const headers = authHeader();
    const requestUrl = `${profile}/${id}/myquestions`;
    const params = { start, end };
    return axios.get(requestUrl, { headers, params });
}

export const getProfileAnswered = (id, start, end) => {
    const headers = authHeader();
    const requestUrl = `${profile}/${id}/myanswered`;
    const params = { start, end };
    return axios.get(requestUrl, { headers, params });
}