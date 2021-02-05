import styled from 'styled-components';
import Article from '../../components/Article';
const StyledSection = styled.section`
    display:grid;
    grid-template-columns: 700px 700px;
    grid-row: auto auto;
    grid-column-gap: 50px;
    grid-row-gap: 20px;
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
                        searchDate,
                        setDate,
                        condition1,
                        condition2,
                        condition3,
                        condition4,
                        articleRef1,
                        articleRef2,
                        articleRef3,
                        articleRef4
                    }) => {
                        //delete_test
    return (
        <div>
            <StyledForm onSubmit={searchPlot}>
                <InputLabel htmlFor ='date'>일자 선택 </InputLabel>
                <input id='date' type='date' value ={searchDate} onChange={setDate}/>
                <input type='submit' value='click'/>
            </StyledForm>
            <StyledSection>
                <SubSection>
                    <StyledP> 주제 산점도 </StyledP>
                    <Article id="t-sne" 
                             condition= {condition1}
                             />
                </SubSection>
{/*                 
                <SubSection>
                    <StyledP>주간 데이터 변화량 </StyledP>
                    <Article id="weeklyDataOccurence2" 
                             condition= {condition2}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>주요 토픽 </StyledP>
                    <Article id="monthlyDataOccurence1" 
                             condition= {condition3}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>월간 데이터 변화량 </StyledP>
                    <Article id="monthlyDataOccurence2" 
                             condition= {condition4}
                             />
                </SubSection>           */}
            </StyledSection>
        </div>            
    );
}

export default LdaPresenter;