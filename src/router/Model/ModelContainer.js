import {useEffect, useState, useRef} from 'react';
import { serverApi } from '../../api';
import ModelPresenter from './ModelPresenter';
const ModelContainer = () => {    
    const initialDoc = {
        "year"  : new Date().getFullYear(),
        "month" : new Date().getMonth(),
        "week"  : new Date().getWeek(),
        "graphSort" : ""
    }

    const [searchDate, setSearchDate] = useState(new Date());        
    const [period,     setPeriod]     = useState("week");
    const [condition1, setCondition1] = useState({...initialDoc, "graphSort": "dataModelWokd"});
    const [condition2, setCondition2] = useState({...initialDoc, "graphSort": "dataModelTable"});
    const [state,      setState]      = useState({
        result:{columns:"", data:""},
        error:"",
        loading:true
    })
    const dateRef = useRef(null);
    
    // 검색 기간 업데이트 함수
    const _handler_on_period = (e) =>{
        // 선택된 기간에 따라 date input 조절
        setPeriod(e.target.value);
        const value = e.target.value;
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

        new_doc['graphSort'] = "dataModelTable"
        searchTable(new_doc);
    }

    const dateFormatter = (cell, row) => {
        const date = new Date(cell)
        return(
            <span>
                {date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() }
            </span>
        )
    }
    const categoryFormatter = (cell, row) => {
        let category ="";
        switch(cell){
            case 0: category = "CPU/메인보드 / 램"
                break;
            case 1: category = "그래픽카드"
                break;
            case 2: category = "공랭/수랭쿨러"
                break;
            case 3: category = "SSD/HDD/USB"
                break;
            case 4: category = "모니터/TV"
                break;
            case 5: category = "네트워크/인터넷"
                break;
            case 6: category = "OS/소프트웨어"
                break;
            case 7: category = "파워서플라이"
                break;
            case 8: category = "키보드/마우스"
                break;
            case 9: category = "오버클러킹"
                break;
        }        
        return(
            <span>
                {category}
            </span>
        )
    }        
    
    const headerStyle = {
        width:'50px',
        fontSize:'0.8rem',
        backgroundColor:"white"
    }
    const headerStyle2 = {
        width:'200px',
        fontSize:'0.8rem',
        backgroundColor:"white"
    }
    const columnStyle = {
        fontSize:'0.8rem'
        
    }

    // model 활동 내역 table 조회
    const searchTable = async (condition) => {
        let result = null;
        try {
            ({data:result} = await serverApi.getModelTable(condition));
        }
        catch(error){
            console.log(error);
        }finally{
            if( result !== null){
                console.log('confirm');                                
                const columns = [
                    {dataField: 'key_value', text: '행렬번호', hidden:true},         
                    {dataField: 'datetime', text: '작성시간', formatter:dateFormatter, headerStyle: headerStyle, style:columnStyle},
                    {dataField: 'label', text: '사용자 지정 category', formatter:categoryFormatter, headerStyle: headerStyle, style:columnStyle},
                    {dataField: 'prediction', text: '모델 지정 category', formatter:categoryFormatter, headerStyle: headerStyle, style:columnStyle},
                    {dataField: 'content', text: '작성내용', style:columnStyle, headerStyle: headerStyle2, style:columnStyle}                    
                ]
                result.column= columns;
                console.log((result.product ));                                
                setState({result ,loading:false});
            }            
        }
    }

    useEffect( ()=> {
        const date = new Date();
        setSearchDate(date);
        let new_doc = {};
        new_doc['year']  = date.getFullYear();
        new_doc['month'] = date.getMonth();
        new_doc['week']  = date.getWeek();
        searchTable(new_doc);
    }, []);
    
    return (<ModelPresenter searchPlot          = {searchPlot}
                           dateRef            = {dateRef}
                           period             = {period}
                           _handler_on_period = {_handler_on_period}
                           searchDate         = {searchDate}
                           _handler_on_date   = {_handler_on_date}
                           condition1         = {condition1}
                           condition2         = {condition2}
                           state              = {state}

            />);
}

export default ModelContainer;