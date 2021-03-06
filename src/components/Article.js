import styled from 'styled-components';
import {useEffect, useState, useRef} from 'react';
import React, {ReactDOM} from 'react-dom';
import {serverApi} from '../api';
import getDateCondition from '../js/common';
import Loader from './Loader';
import reactDom from 'react-dom';

const StyledArticle = styled.article`
border-radius : 5px 0px 0px 5px;
width: 100%;
height: 100%;
z-index: 1;
color:black;
font-size:1rem;
`;

const Article = ({
    id,    
    graphSort,
    condition
    }) => {
        // state 설정
        const [loading, setLoading]        = useState(true);
        const [error, setError]            = useState("");
        const [keyState, setKeyState]      = useState("");
        const [empty, setEmpty]            = useState(true);
        const itSelf =  useRef(null);
        // plot 화면에 띄우기
        const showBokeh = (plot, div_id) => {
            console.log(div_id, "bokeh start");        
            reactDom.findDOMNode(itSelf.current).innerHTML = "";
            window.Bokeh.embed.embed_item(plot, div_id);                                               
        } 

        // plot load
        const setPlot = async () => {
            console.log(id, 'setplot function start'); 

            if (itSelf.current !== null){
                reactDom.findDOMNode(itSelf.current).innerHTML ="<p>로딩중</p>";
                console.log(itSelf.current);
                
            }
            
            const date = new Date(condition['date']);            
            const period = condition['period'];
            let searchMap = {};
            searchMap = getDateCondition(date, period);
            
            searchMap['graphSort'] = graphSort;
            searchMap['period'] = period;
            // 내부 변수           
            let plot = null;
            let empty = null;
            setLoading(true);            
            //setKeyState("random"); // key 설정만 새로 해줘도 tag 초기화 된다.
            console.log(searchMap);
            try{                        
                searchMap['graphSort'] = graphSort;
                let response = await serverApi.getBokeh(searchMap);
                console.log(id,'load data result',response === null);                
                if( response !== null){
                    ({data:{data:{empty}}} = response);                    
                    if (!empty){
                        setEmpty(false);
                        ({data:{data:{plot:{plot}}}} = response);
                        console.log(plot);
                        showBokeh(plot, id);
                    }else{
                        setEmpty(true);
                    }                                        
                }                
            }catch(err){
                setError(err);     
                console.log(error);
            }finally{
                setLoading(false);   
                if (plot !== null){                    
                    console.log(id, 'load complete');          
                }
            }            
        }
        // plot 설정
        useEffect(()=>{          
            console.log(id, 'rerender start');
            setPlot();            
        },[condition]);
        return (
            <>
            {
                empty ? (<p style={{color:'red'}}>데이터가 없습니다. 다른 기간을 입력해 주세요</p>) : (
                <StyledArticle id={id}  
                key={keyState}
                ref= {itSelf}                
                />
                
                )
            }
            </>            
    )
}

export default Article;