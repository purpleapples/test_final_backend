import {useEffect, useState} from 'react';
import HomePresenter from './HomePresenter';
import {serverApi} from '../../api';
const HomeContainer = () => {
    const [weekContentCnt, setWeeksContentCnt] = useState("");
    const [weekTopics, setWeekTopics]          = useState("");
    const [weekTopicCnt, setWeeksTopicsCnt]    = useState("");
    const [loading, setLoading]                = useState(true);
    const [error, setError]                    = useState("");

    const showBokeh = (plot, div_id) => {
        console.log("data", plot);        
        window.Bokeh.embed.embed_item(plot['plot'], div_id);
    } 
    
    const data = async () => {
        try{
            const weekContentCnt = await serverApi.getBokeh();
            const weekTopics = await serverApi.getBokeh();
            const weekTopicCnt = await serverApi.getBokeh();
            setWeekTopics(weekContentCnt);
            setWeekTopics(weekTopics);
            setWeeksTopicsCnt(weekTopicCnt);
            
            showBokeh(weekContentCnt, "weeks_content_count");
            showBokeh(weekContentCnt, "weeks_topics");
            showBokeh(weekContentCnt, "weeks_topics_count");
            
        }catch(error){
            setError({error:error});
            
        }finally{
            setLoading(false);    
            
        }
        
    }
    useEffect( ()=> {data();}, []);
    return (<HomePresenter/>);
        

}

export default HomeContainer;