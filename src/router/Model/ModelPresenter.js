import styled from 'styled-components';
import Article from '../../components/Article';
import Loader from '../../components/Loader';
import Table1 from '../../components/Table1';

const StyledDiv = styled.div`
    padding-left:30px;
`;
const StyledSection = styled.section`
    display:grid;
    grid-template-columns: 45em 50em;
    grid-template-rows : 20em;
    grid-row: auto;
    grid-column-gap: 50px;    
`;
const SubSection = styled.section`
    padding-top: 10px;
    display : flex;  
    flex-direction:column;
`
const InputLabel = styled.label`
    align-items:flex-end;
    font-size:1.2rem;
`;
const StyledP = styled.p`
    padding-bottom:5px;
`;
const StyledForm = styled.form`
    padding-top:15px;
    display:flex;
    flex-direction:row;
    align-items:flex-end;
`;
const ModelPresenter = ({searchPlot, 
                        dateRef,
                        period,
                        _handler_on_period,
                        searchDate,                        
                        _handler_on_date,
                        condition1,
                        condition2,
                        state                  
                    }) => {
    const {result, error, loading} = state;

    return (
        <StyledDiv>
            <StyledForm onSubmit={searchPlot}>
                <InputLabel htmlFor ='date'>기간 선택 </InputLabel>
                <select id = 'opts' size='1' name='opts' value={period} onChange={_handler_on_period}>
                    <option value='week' seleted="selected">  week</option>
                    <option value='month'>month</option>
                    <option value='year'>year</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <InputLabel htmlFor ='date'>일자 선택 </InputLabel>
                <input id='date' name='date' type='date' value ={searchDate} onChange={_handler_on_date} ref={dateRef}/>                                
                <input type='submit' value='click'/>
            </StyledForm>
            <StyledSection>

                <SubSection>
                    <StyledP>모델 작업 통계 </StyledP>
                    <Article id="dataModelScatter" 
                             condition= {condition1}
                             />
                </SubSection>
                <SubSection>
                    {loading ? (<Loader />) : (
                    <>
                    <StyledP>모델 작업 내용 </StyledP>
                    <Table1 
                        result = {result}
                    />
                    </>
                    )}
                    
                </SubSection>
            </StyledSection>
        </StyledDiv>            
    );
}

export default ModelPresenter;