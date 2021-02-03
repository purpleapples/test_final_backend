import {useEffect, useState, useRef} from 'react';
import HomePresenter from './HomePresenter';
import {serverApi} from '../../api';

const HomeContainer = () => {
    const [weekContentCnt, setWeeksContentCnt] = useState("");
    const [weekTopics, setWeekTopics]          = useState("");
    const [weekTopicCnt, setWeeksTopicsCnt]    = useState("");
    const [loading, setLoading]                = useState(true);
    const [error, setError]                    = useState("");
    const [searchDate, setSearchDate]          = useState("");
    const showBokeh = (plot, div_id) => {
        console.log("data", plot);        
        window.Bokeh.embed.embed_item(plot['plot'], div_id);
    } 
    const setDate = (e) => {
        setSearchDate(e.target.value);
    }
    // Data.protype에 주차 구하는 새로운 함수 생성
    Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
      }
    const searchBokeh = async (e) => {
        e.preventDefault();                
        // 주차 계산
        const date = new Date(searchDate);                
        const year = (date.getFullYear()).toString(); 
        const weekNum = (date.getWeek()).toString(); // 해당 년도의 주차 반환 

        try{
            const searchDoc = {"year": year,
                               "weekNum" : weekNum,
                               "graphSort": "data_count_graph"}
                
            const testBokehJson = await serverApi.getBokeh(searchDoc);
            console.log(testBokehJson);
            showBokeh(await serverApi.getBokeh(searchDoc), "data_count_graph");

        }catch(error){
            setError({error:error});            
        }finally{
            setLoading(false);                
        }
    }
    const data = async () => {
        try{
            const weekContentCnt = await serverApi.getDataCntGraph();
            const weekTopics = await serverApi.getBokeh();
            const weekTopicCnt = await serverApi.getBokeh();
            setWeekTopics(weekContentCnt);
            setWeekTopics(weekTopics);
            setWeeksTopicsCnt(weekTopicCnt);
             
            // showBokeh(weekContentCnt, "data_count_graph");
            // showBokeh(weekTopics, "weeks_topics");
            // showBokeh(weekTopicCnt, "weeks_topics_count");
            
        }catch(error){
            setError({error:error});
            
        }finally{
            setLoading(false);    
        }
        
    }
    useEffect( ()=> {data();}, []);

    return (<HomePresenter searchBokeh={searchBokeh}
                           loading = {loading}
                           searchDate = {searchDate}
                           setDate = {setDate}

            />);        
}

export default HomeContainer;