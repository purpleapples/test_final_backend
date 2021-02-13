import styled from 'styled-components';
import Article from '../../components/Article';

const StyledDiv = styled.div`

padding-left : 30px;

`;

const StyledSection = styled.section`
    display:grid;
    grid-template-columns: 50em 50em;
    grid-template-rows : 20em 20em;
    grid-row: auto auto;
    grid-column-gap: 50px;
    grid-row-gap: 50px;
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
const HomePresenter = ({searchPlot, 
                        dateRef,
                        period,
                        _handler_on_period,
                        searchDate,                        
                        _handler_on_date,
                        condition
                    }) => {
                        //delete_test
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
                    <StyledP>데이터 발생량 </StyledP>
                    <Article id="dataOccur" 
                             graphSort={'dataOccur'}
                             condition= {condition}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>데이터 변화량 </StyledP>
                    <Article id="dataFlow" 
                             graphSort={'dataFlow'}
                             condition= {condition}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>카테고리별 발생량 </StyledP>
                    <Article id="categoryOccur" 
                             graphSort={'categoryOccur'}
                             condition= {condition}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>카테고리별 데이터 생성량 </StyledP>
                    <Article id="categoryComparison"
                             graphSort={'categoryComparison'} 
                             condition= {condition}
                             />
                </SubSection>          
            </StyledSection>
        </StyledDiv>            
    );
}

export default HomePresenter;