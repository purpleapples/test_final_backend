import axios from 'axios';

const config = {
    baseURL : "http://localhost:5000"
};

const api = axios.create(config);

export const serverApi = {
    // test source
    getTestBokeh : () => api.get('/test/data2').then(response => {
        return response.data
    }).then(item => {
        
        return window.Bokeh.embed.embed_item(item.data['0'].plot
            ,'myplot'
            ); // python에서 시각화시 설정한 target_id를 id 값으로 가진 tag에 펼처진다.
        // target id 설정가능
    }),
    getBokeh : () => api.get('/test/data2').then(response => {
        console.log(response.data);
        return response.data.data['0']
    })
};