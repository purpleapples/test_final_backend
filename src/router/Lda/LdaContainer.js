import {useEffect, useState, useRef} from 'react';
import LdaPresenter from './LdaPresenter';
const LdaContainer = () => {    
    const initialDoc = {
        "year"  : new Date().getFullYear(),
        "month" : new Date().getMonth(),
        "week"  : new Date().getWeek(),
        "graphSort" : ""
    }

    const [searchDate, setSearchDate] = useState(new Date());        
    const [period,     setPeriod]     = useState("week");
    const [table,      setTable]      = useState({});
    const [condition1, setCondition1] = useState({...initialDoc, "graphSort": "dataLdaScatter"});
    const [condition2, setCondition2] = useState({...initialDoc, "graphSort": "dataLdaTable"});

    const dateRef = useRef(null);
    
    // 검색 기간 업데이트 함수
    const _handler_on_period = (e) =>{
        // 선택된 기간에 따라 date input 조절
        setPeriod(e.target.value);
        const value = e.target.value;
        if (value == 'week'){
            dateRef.current.type='date';
        }else if (value == 'year'){
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
    // Data.protype에 주차 구하는 새로운 함수 생성

    const searchPlot = async (e) => {
        e.preventDefault();
        const date = new Date(searchDate);
        const new_doc = {};
        switch (period ){
            case 'week':
                new_doc['year']  = date.getFullYear();
                new_doc['month'] = date.getMonth();
                new_doc['week']  = date.getWeek();
                new_doc['period'] = period;
                break;
            case 'month':
                new_doc['year']  = date.getFullYear();
                new_doc['month'] = date.getMonth();
                new_doc['period'] = period;
                break;
            case 'year':
                new_doc['year']  = date.getFullYear();
                new_doc['period'] = period;
                break;
        }

        // 검색조건 새로 배정
        new_doc['graphSort'] = condition1['graphSort'];
        setCondition1({...new_doc});
        new_doc['graphSort'] = condition2['graphSort'];
        setCondition2({...new_doc});   
    }

    useEffect( ()=> {
        const date = new Date();
        setSearchDate(date);

    }, []);
    
    return (<LdaPresenter searchPlot          = {searchPlot}
                           dateRef            = {dateRef}
                           period             = {period}
                           _handler_on_period = {_handler_on_period}
                           searchDate         = {searchDate}
                           _handler_on_date   = {_handler_on_date}
                           condition1         = {condition1}
                           condition2         = {condition2}
                           table              = {table}
            />);
}

export default LdaContainer;