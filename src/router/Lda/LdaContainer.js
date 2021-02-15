import {useEffect, useState, useRef} from 'react';
import { serverApi } from '../../api';
import LdaPresenter from './LdaPresenter';
import getDateCondition from '../../js/common';
const LdaContainer = () => {    

    const [searchDate, setSearchDate] = useState(new Date());        
    const [period,     setPeriod]     = useState("week");
    const [condition, setCondition] = useState({"date": new Date(), "period":'week'});
    const [state,      setState]      = useState({
        result:{columns:"", data:""},
        error:"",
        loading:true
    });
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
    
    // 날짜 formatter
    const dateFormatter = (cell, row) => {
        const date = new Date(cell)
        return(
            <span>
                {date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() }
            </span>
        )
    }
    // float 값 출력 제한
    const floatFormatter = (cell, row) => {
        return ( <p>{cell.toFixed(3)}</p>);
    }
    // category formatter
    const categoryFormatter = (cell, row) => {
        let category ="";
        switch(cell){
            case 0: category = "CPU/메인보드 / 램"; break;
            case 1: category = "그래픽카드";        break;
            case 2: category = "공랭/수랭쿨러";     break;
            case 3: category = "SSD/HDD/USB";      break;
            case 4: category = "모니터/TV";        break;
            case 5: category = "네트워크/인터넷";   break;
            case 6: category = "OS/소프트웨어";     break;
            case 7: category = "파워서플라이";      break;
            case 8: category = "키보드/마우스";     break;
            case 9: category = "오버클러킹";        break;
            default : category = "잘못입력된 값입니다. :" +cell.toString();
                break;
        }        
        return(
            <span>
                {category}
            </span>
        )
    }
    // table column style
    const headerStyle = {
        width:'50px',
        fontSize:'0.8rem',
        backgroundColor:"skyblue"
    }
    const headerStyle2 = {
        width:'200px',
        fontSize:'0.8rem',
        backgroundColor:"skyblue"
    }
    const columnStyle = {
        fontSize:'0.8rem',
        backgroundColor:"white"
    }

    // model 활동 내역 table 조회
    const searchTable = async (date, period) => {
        let cond = getDateCondition(date, period);
        cond['weekofyear'] = cond['week'];
        delete cond['week'];
        
        let result = null;
        try {
            ({data:result} = await serverApi.getLdaTable(cond));
        }
        catch(error){
            console.log(error);
        }finally{
            if( result !== null){
                console.log('confirm');                                
                const columns = [
                    {dataField: 'key_value', text: '행렬번호', hidden:true},         
                    {dataField: 'datetime', text: '작성시간', formatter:dateFormatter, sort:true,
                     headerStyle: headerStyle, style:columnStyle},
                    {dataField: 'Perc_Contribution', text: '기여도', formatter:floatFormatter, sort:true,
                     headerStyle: headerStyle, style:columnStyle},
                    {dataField: 'label', text: 'category', formatter:categoryFormatter, sort:true,
                     headerStyle: headerStyle, style:columnStyle},
                    {dataField: 'board_content', text: '작성내용', sort:true,
                     headerStyle: headerStyle2, style:columnStyle}                    
                ]
                result.column= columns;
                setState({result ,loading:false});
            }            
        }
    }
    
    // 시각화 자료 찾기
    const searchPlot = async (e) => {
        e.preventDefault();
        console.log('searchPlot');
        let new_doc = {'date':searchDate, 'period':period};
        setCondition({...new_doc});       
        const date = new Date(searchDate);        
        searchTable(date, period);
    }

    // 최초에는 최근 일자만 검색
    useEffect( ()=> {
        const date = new Date();
        setSearchDate(date);        
        searchTable(date, period);
    }, []);
    
    return (<LdaPresenter searchPlot          = {searchPlot}
                           dateRef            = {dateRef}
                           period             = {period}
                           _handler_on_period = {_handler_on_period}
                           searchDate         = {searchDate}
                           _handler_on_date   = {_handler_on_date}
                           condition          = {condition}
                           state              = {state}

            />);
}

export default LdaContainer;