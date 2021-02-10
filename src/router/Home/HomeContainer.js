import {useEffect, useState, useRef} from 'react';
import HomePresenter from './HomePresenter';
const HomeContainer = () => {    
    const initialDoc = {
        "year"  : new Date().getFullYear(),
        "month" : new Date().getMonth() +1,
        "week"  : new Date().getWeek() -1,
        "graphSort" : ""
    }

    // 일자 설정 - db에서는 날짜 설정시 한자리 수가 없다.
    if(initialDoc['month'].toString().length == 1){
        initialDoc['month'] = '0' + initialDoc['month'].toString();
    }
    if(initialDoc['week'].toString().length == 1){
        initialDoc['week'] = '0' + initialDoc['week'].toString();
    }

    // state 설정
    const [searchDate, setSearchDate] = useState(new Date());        
    const [period, setPeriod]         = useState("week");
    const [condition1, setCondition1] = useState({...initialDoc, "graphSort": "dataOccur"});
    const [condition2, setCondition2] = useState({...initialDoc, "graphSort": "dataFlow"});
    const [condition3, setCondition3] = useState({...initialDoc, "graphSort": "categoryOccur"});
    const [condition4, setCondition4] = useState({...initialDoc, "graphSort": "categoryComparison"});
    const dateRef = useRef(null);
    

    // 검색 기간 업데이트 함수
    const _handler_on_period = (e) =>{        
        
        setPeriod(e.target.value);        
        const value = e.target.value;

        // 기간선택에 따른 date component 수정
        if (value === 'week'){
            dateRef.current.type='date';
        }else if (value === 'year'){
            // 년도 제한설정
            dateRef.current.type='number';
            dateRef.current.min='2000';
            dateRef.current.max='2099';
            dateRef.current.step='1';
            dateRef.current.default='2000';            
        }else{
            dateRef.current.type='month';
        }
    }
    
    // 검색 날짜 업데이트 함수
    const _handler_on_date = (e) => {
        setSearchDate(e.target.value);        
    }
    
    // condition 새로 설정함으로써 각 article component rerendering
    const searchPlot = async (e) => {
        e.preventDefault();               
        const date = new Date(searchDate);
        const new_doc = {};            
        switch (period ){
            case 'week':
                new_doc['year']  = date.getFullYear();
                new_doc['month'] = date.getMonth() +1;
                new_doc['week']  = date.getWeek() -1;
                new_doc['period'] = period;
                break;
            case 'month':
                new_doc['year']  = date.getFullYear();
                new_doc['month'] = date.getMonth() +1;
                new_doc['period'] = period;
                break;
            case 'year':
                new_doc['year']  = date.getFullYear();
                new_doc['period'] = period;
                break;
        }
        if(new_doc['month'].toString().length == 1){
            new_doc['month'] = '0' + new_doc['month'].toString();
        }
        if(new_doc['week'].toString().length == 1){
            new_doc['week'] = '0' + new_doc['week'].toString();
        }
        new_doc['graphSort'] = condition1['graphSort'];
        setCondition1({...new_doc});
        new_doc['graphSort'] = condition2['graphSort'];
        setCondition2({...new_doc});
        new_doc['graphSort'] = condition3['graphSort'];
        setCondition3({...new_doc});
        new_doc['graphSort'] = condition4['graphSort'];
        setCondition4({...new_doc});       
    }

    useEffect( ()=> {
        const date = new Date();
        setSearchDate(date);

    }, []);
    
    return (<HomePresenter searchPlot         = {searchPlot}
                           dateRef            = {dateRef}
                           period             = {period}
                           _handler_on_period = {_handler_on_period}
                           searchDate         = {searchDate}
                           _handler_on_date   = {_handler_on_date}
                           condition1         = {condition1}
                           condition2         = {condition2}
                           condition3         = {condition3}
                           condition4         = {condition4}
            />);
}

export default HomeContainer;