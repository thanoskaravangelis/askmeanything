import axios from 'axios';
import config from './config';

const { questMan, questRun, auth, profile, esb, authms, questManMs, questRunMs, questDispMs, profileMs, statsMs } = config;

const token = localStorage.getItem('token');
const authHeader = () => {
    const headers = { "Authorization": "Bearer " + token };
    return headers;
}

const arch = localStorage.getItem('backEnd');

export const isLogged = () => {
    const headers = authHeader();
    if(arch === 'soa') {
        const url = `${auth}/whoami`;
        const method = "get";
        return axios.post(esb, {url:url, method : method } , { headers });
    }
    else {
        const url = `${authms}/whoami`;
        return axios.get(url,{ headers });
    }
}

export const loginPost = (username, password) => {
    const body = {
        'username':username,
        'password':password
    };
    if(arch==='soa'){
        const url = `${auth}/login`;
        const method = "post";
        return axios.post(esb, {url:url, method:method, req_data : body});
    }
    else {
        const url = `${authms}/login`;
        return axios.post(url, body);
    }
}

export const signup = (body) => {
    if(arch==='soa') {
        const url = `${auth}/signup`;
        const method = "post";
        return axios.post(esb, {url : url, method : method, req_data : body});
    }else {
        const url = `${authms}/signup`;
        return axios.post(url,body);
    }
}

export const getQuestions = (startDate, endDate) => {
    if(arch==='soa') {
        const url = `${profile}/questions/from/${startDate}/to/${endDate}`;
        return axios.post(esb, {url: url, method : "get"});
    }
    else {
        const url = `${statsMs}/questions/from/${startDate}/to/${endDate}`;
        return axios.get(url);
    }
}

export const getKeywords = () => {
    if(arch==='soa'){
        const url = `${questMan}/keywords`;
        return axios.post(esb, {url : url, method : "get"} );
    }
    else{
        const url = `${questManMs}/keywords`;
        return axios.get(url);
    }
}

export const postQuestion = (obj) => {
    const headers = authHeader();
    if(arch==='soa'){
        const url = `${questMan}/newquestion`;
        return axios.post(esb, {url: url, method : "post", req_data : obj}, { headers });
    }
    else {
        const url = `${questManMs}/newquestion`;
        return axios.post(url,obj,{ headers });
    }
}

export const postKeyword = (name) => {
    const headers = authHeader();
    if(arch==='soa'){
        const url = `${questMan}/newkeyword`;
        return axios.post(esb, { url:url, method : "post", req_data : {name}},  { headers });
    }
    else {
        const url = `${questManMs}/newkeyword`;
        return axios.post(url, {name} , { headers });
    }
}

export const attachKeyword = (keyword_id, question_id) => {
    const obj = {
        keyword: { id: keyword_id },
        question: { id: question_id},
    }
    const headers = authHeader();
    if(arch==='soa') {
        const url = `${questMan}/newquestionhaskeyword`;
        return axios.post(esb,{url : url, method : "post", req_data: obj}, { headers });
    }
    else {
        const url = `${questManMs}/newquestionhaskeyword`;
        return axios.post(url, obj , { headers });
    }
}

export const getQuestion = (id) => {
    if(arch==='soa'){
        const url = `${questMan}/question/${id}`;
        return axios.post(esb, {url : url, method : "get"});
    }
    else {
        const url =`${questDispMs}/question/${id}`;
        return axios.get(url);
    }
}

export const Answer = (user_id, question_id, text) => {
    const headers = authHeader();
    const obj = {
        question: { id: question_id },
        user: { id: user_id },
        text,
    };
    if(arch==='soa'){
        const url = `${questRun}/newanswer`;
        return axios.post(esb, {url : url, method : "post", req_data : obj}, { headers });
    }
    else {
        const url = `${questRunMs}/newanswer`;
        return axios.post(url,obj,{ headers });
    }
}

export const getProfile = (id) => {
    if(arch==='soa'){
        const url = `${profile}/${id}`;
        return axios.post(esb,{url: url, method:"get"});
    }
    else {
        const url = `${profileMs}/${id}`;
        return axios.get(url);
    }
}

export const getProfileQuestions = (id, start, end) => {
    if(arch==='soa'){
        const url = `${profile}/${id}/myquestions?start=${start}&end=${end}`; 
        return axios.post(esb, {url:url, method:"get"});
    }
    else {
        const url = `${statsMs}/${id}/myquestions?start=${start}&end=${end}`;
        return axios.get(url);
    }
}

export const getProfileAnswered = (id, start, end) => {
    if(arch==='soa'){
        const url = `${profile}/${id}/myanswered?start=${start}&end=${end}`;
        return axios.post(esb, {url:url, method:"get"});
    }
    else {
        const url = `${statsMs}/${id}/myanswered?start=${start}&end=${end}`;
        return axios.get(url);
    }
}

export const addVote = (user_id, answer_id, kind) => {
    const headers = authHeader();
    const obj = {
        answer: { id: answer_id },
        user: { id: user_id },
        upvote: kind==='upvote',
        downvote: kind==='downvote',
    };
    if(arch==='soa'){
        const url = `${questRun}/newvote`;
        return axios.post(esb, { url : url, method :"post", req_data:obj }, { headers });
    }
    else {
        const url = `${questRunMs}/newvote`;
        return axios.post(url, obj, { headers });
    }
}

export const deleteVote = (vote_id) => {
    const headers = authHeader();
    if(arch==='soa') {
        const url = `${questRun}/deletevote/${vote_id}`;
        return axios.post(esb, { url : url, method : "delete"}, { headers });
    }
    else {
        const url = `${questRunMs}/deletevote/${vote_id}`;
        return axios.delete(url);
    }
}

export const getKeywordAnalytics = (name) => {
    if(arch==='soa'){
        const url = `${profile}/questionsperkeyword/${name}`;
        return axios.post(esb, {url : url, method:"get"});
    }
    else {
        const url = `${statsMs}/questionsperkeyword/${name}`;
        return axios.get(url);
    }
}

export const questionsDaily = () => {
    if(arch==='soa'){
        const url = `${profile}/questions/daily/stats`;
        return axios.post(esb , {url:url, method : "get"});
    }
    else{
        const url = `${statsMs}/questions/daily/stats`;
        return axios.get(url);
    }
}

export const answersDaily = () => {
    if(arch==='soa'){
        const url = `${profile}/answers/daily/stats`;
        return axios.post(esb , {url:url, method : "get"});
    }
    else {
        const url = `${statsMs}/answers/daily/stats`;
        return axios.get(url);
    }
}

export const questionsMonthly = () => {
    if(arch==='soa'){
        const url = `${profile}/questions/monthly/stats`;
        return axios.post(esb , {url:url, method : "get"});
    }
    else{
        const url = `${statsMs}/questions/monthly/stats`;
        return axios.get(url);
    }
}

export const answersMonthly = () => {
    if(arch==='soa'){
        const url = `${profile}/answers/monthly/stats`;
        return axios.post(esb , {url:url, method : "get"});
    }
    else {
        const url = `${statsMs}/answers/monthly/stats`;
        return axios.get(url);
    }
}

export const keywordsStats = () => {
    if(arch==='soa'){
        const url = `${profile}/questions/perkeyword/stats`;
        return axios.post(esb , {url:url, method : "get"});
    }
    else{
        const url = `${statsMs}/questions/perkeyword/stats`;
        return axios.get(url);
    }
}