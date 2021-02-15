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
    grid-column-gap: 30px;    
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
const LdaPresenter = ({searchPlot, 
                        dateRef,
                        period,
                        _handler_on_period,
                        searchDate,                        
                        _handler_on_date,
                        condition,
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
                    <StyledP>LDA 분석 시각화 </StyledP>
                    <Article id="dataLdaScatter" 
                             graphSort = {'dataLdaScatter'}
                             condition = {condition}
                             />
                </SubSection>
                <SubSection>
                    {loading ? (<Loader />) : (
                    <>
                    <StyledP>LDA 분석내용(100개 미만의 데이터는 표시되지 않습니다.) </StyledP>
                    <Table1 
                    
                        result = {result}
                        element_cnt ={5}
                    />
                    </>
                    )}
                    
                </SubSection>
            </StyledSection>
        </StyledDiv>            
    );
}

export default LdaPresenter;