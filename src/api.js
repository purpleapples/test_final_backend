import axios from 'axios';

const config = {
    baseURL : "http://localhost:5000"
};

const api = axios.create(config);

export const serverApi = {
    
    //검색조건 test용
    getBokeh : (searchdoc) => (
        api.post('/visual', searchdoc,  {headers:{ "Content-Type": `application/json`}})
           .catch(error => {console.log(error)})
    ).then(response => {
        console.log('api.getBokeh async complete');
        return response;
    }),
    getLdaTable : (searchdoc) => (
        api.post('/visual/table/lda', searchdoc,  {headers:{ "Content-Type": `application/json`}})
        .catch(error => {console.log(error)})
    ).then(response => {
        console.log('api.getLdaTable async complete');
        console.log(response);
        return response.data;
    }),
    getModelTable : (searchdoc) => (
        api.post('/visual/table/model', searchdoc,  {headers:{ "Content-Type": `application/json`}})
        .catch(error => {console.log(error)})
    ).then(response => {
        console.log('api.getModelTable async complete');   
        return response.data;
    }),
    getTestBokeh : () => (api.get('/test/visual'))
    
};