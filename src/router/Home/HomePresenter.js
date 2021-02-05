import styled from 'styled-components';
import Article from '../../components/Article';
const StyledSection = styled.section`
    display:grid;
    grid-template-columns: 50em 50em;
    grid-template-rows : 20em 20em;
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
const HomePresenter = ({searchPlot, 
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
                    <StyledP>데이터 발생량 </StyledP>
                    <Article id="dataOccur" 
                             condition= {condition1}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>데이터 변화량 </StyledP>
                    <Article id="dataFlow" 
                             condition= {condition2}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>카테고리별 발생량 </StyledP>
                    <Article id="categoryOccur" 
                             condition= {condition3}
                             />
                </SubSection>
                <SubSection>
                    <StyledP>카테고리별 데이터 생성 비교 </StyledP>
                    <Article id="categoryComparison" 
                             condition= {condition4}
                             />
                </SubSection>          
            </StyledSection>
        </div>            
    );
}

export default HomePresenter;