import {useEffect, useState, useRef} from 'react';
import HomePresenter from './HomePresenter';
const HomeContainer = () => {    

    // state 설정
    const [searchDate, setSearchDate] = useState(new Date());        
    const [period, setPeriod]         = useState("week");
    const [condition, setCondition] = useState({"date": new Date(), "period":'week'});
    const dateRef = useRef(null);
    

    // 검색 기간 업데이트 함수
    const _handler_on_period = (e) =>{        
        console.log("update period :", e.target.value);
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
    const searchPlot = (e) => {        
        e.preventDefault();        
        console.log('searchPlot');               
        let new_doc = {'date':searchDate, 'period':period};
        setCondition({...new_doc});        

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
                           condition          = {condition}
            />);
}

export default HomeContainer;