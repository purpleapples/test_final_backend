import {useEffect, useState, useRef} from 'react';
import LdaPresenter from './LdaPresenter';
import {serverApi} from '../../api';

const LdaContainer = () => {
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
        if (searchDate == ""){
            searchDate =  new Date();
        }          
        const date = new Date(searchDate); 
             
        const year = (date.getFullYear()).toString(); 
        const weekNum = (date.getWeek()).toString(); // 해당 년도의 주차 반환 
        const searchDoc2 = '';
        try{
            const searchDoc = {"year": year,
                               "weekNum" : weekNum,
                               "graphSort": "data_count_graph"}
                
            const weeklyDataOccurence = await serverApi.getBokeh(searchDoc);
            showBokeh(weeklyDataOccurence, "weeklyDataOccurence");
            
            // const searchDoc2 = {"year": year,
            //                    "weekNum" : weekNum,
            //                    "graphSort": "data_count_graph"}
                
            // const weeklyIssueChange = await serverApi.getBokeh(searchDoc2);
            // showBokeh(weeklyIssueChange, "weeklyIssueChange");
            // const searchDoc3 = {"year": year,
            //                    "weekNum" : weekNum,
            //                    "graphSort": "data_count_graph"}
                
            // const weeklyIssueOccurence = await serverApi.getBokeh(searchDoc3);
            // showBokeh(weeklyIssueOccurence, "weeklyIssueOccurence");
            // const searchDoc4 = {"year": year,
            //                    "weekNum" : weekNum,
            //                    "graphSort": "data_count_graph"}
                
            // const monthlyDataOccurence = await serverApi.getBokeh(searchDoc4);
            // showBokeh(monthlyDataOccurence, "monthlyDataOccurence");

        }catch(error){
            setError({error:error});     
            console.log(error);
        }finally{
            setLoading(false);                
        }
    }
    const data = async () => {
        try{
            const weekContentCnt = await serverApi.getBokeh();
            const weekTopics = await serverApi.getBokeh();
            const weekTopicCnt = await serverApi.getBokeh();
            setWeekTopics(weekContentCnt);
            setWeekTopics(weekTopics);
            setWeeksTopicsCnt(weekTopicCnt);
             
            // showBokeh(weekContentCnt, "weeklyDataOccurence");
            // showBokeh(weekTopics, "weeklyIssueChange");
            // showBokeh(weekTopicCnt, "weeklyIssueOccurence");
            // showBokeh(weekTopicCnt, "monthlyDataOccurence");
            
        }catch(error){
            setError({error:error});
            
        }finally{
            setLoading(false);    
        }
        
    }
    useEffect( ()=> {data();}, []);

    return (<LdaPresenter searchBokeh={searchBokeh}
                           loading = {loading}
                           searchDate = {searchDate}
                           setDate = {setDate}

            />);        
}

export default LdaContainer;