import {useEffect, useState} from 'react';
import HomePresenter from './HomePresenter';
const HomeContainer = () => {    
    const initialDoc = {
        "year"  : new Date().getFullYear(),
        "month" : new Date().getMonth(),
        "week"  : new Date().getWeek(),
        "graphSort" : ""
    }

    const [searchDate, setSearchDate] = useState(new Date());        
    const [condition1, setCondition1] = useState({...initialDoc, "graphSort": "data_count_graph"});
    const [condition2, setCondition2] = useState({...initialDoc, "graphSort": "data_change_graph"});
    const [condition3, setCondition3] = useState({...initialDoc, "graphSort": "data_category_graph"});
    const [condition4, setCondition4] = useState({...initialDoc, "graphSort": "classificationPiechart"});

    // state 업데이트 함수
    const setDate = (e) => {
        setSearchDate(e.target.value);        
    }
    // Data.protype에 주차 구하는 새로운 함수 생성

    const searchPlot = async (e) => {
        e.preventDefault();               
        const date = new Date(searchDate);
        const new_doc = {
        "year"  : date.getFullYear(),
        "month" : date.getMonth(),
        "week"  : date.getWeek(),
        }

        setCondition1({...condition1, ...new_doc});
        setCondition2({...condition2, ...new_doc});
        setCondition3({...condition3, ...new_doc});
        setCondition4({...condition4, ...new_doc});       
    }

    useEffect( ()=> {
        const date = new Date();
        setSearchDate(date);

    }, []);
    
    return (<HomePresenter searchPlot  ={searchPlot}
                           searchDate  = {searchDate}
                           setDate     = {setDate}
                           condition1  = {condition1}
                           condition2  = {condition2}
                           condition3  = {condition3}
                           condition4  = {condition4}

            />);
}

export default HomeContainer;