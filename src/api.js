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
        console.log('plot');
        console.log(response.data.data.plot);        
        return response;
    })
    
};