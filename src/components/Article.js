import styled from 'styled-components';
import {useEffect, useState, useRef} from 'react';
import React from 'react-dom';
import {serverApi} from '../api';
import Loader from './Loader';

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
    condition
    }) => {
        // state 설정
        const [loading, setLoading]        = useState(true);
        const [error, setError]            = useState("");
        const [keyState, setKeyState]      = useState("");

        // plot 화면에 띄우기
        const showBokeh = (plot, div_id) => {
            console.log("bokeh start");
            
            if(plot != undefined){
                console.log('load plot');
                console.log(id);
                const bokeh  =plot.data.data.plot;
                window.Bokeh.embed.embed_item(bokeh, div_id);                
            }                        
        } 

        // plot load
        const setPlot = async () => {
            console.log('setplot start') ;
            let plot = undefined;       
            setLoading(true);            
            setKeyState("random"); // key 설정만 새로 해줘도 tag 초기화 된다.
            try{                        
                plot = await serverApi.getBokeh(condition);
                console.log('setplot',plot == undefined);
                if( plot != undefined){
                    showBokeh(plot, id);
                }                
            }catch(error){
                setError(error);     
                console.log(error);
            }finally{
                if (plot != undefined){
                    console.log('load complete');
                    setLoading(false);                
                }
            }            
        }
        // plot 설정
        useEffect(()=>{          
            console.log('rerender');
            setPlot()            
        },[condition]);
        return (
            <>
            {loading ? (<Loader />) : (
                <StyledArticle id={id}  
                key={keyState}
                >
                </StyledArticle>
                )
            }
            </>
            
    )
}

export default Article;