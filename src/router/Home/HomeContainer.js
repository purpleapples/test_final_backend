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
        window.Bokeh.embed.embed_item(plot, div_id);
    }
    
    const data = async () => {
        try{
            const weekContentCnt = await serverApi.getBokeh();
            const weekTopics = await serverApi.getBokeh();
            const weekTopicCnt = await serverApi.getBokeh();

        }catch(error){
            setError({error:error});
            
        }finally{
            setLoading(false);    
            setWeekTopics(weekContentCnt);
            console.log(weekContentCnt);
            showBokeh(weekContentCnt, "weeks_content_count");
            setWeekTopics(weekTopics);
            setWeeksTopicsCnt(weekTopicCnt);
        }
        
    }
    useEffect( ()=> {data() }, []);
    return (<HomePresenter/>);
        

}

export default HomeContainer;