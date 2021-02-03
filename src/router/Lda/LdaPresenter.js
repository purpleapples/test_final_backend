import styled from 'styled-components';
import Loader from '../../components/Loader';

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
`;
const StyledP = styled.p`
    padding-bottom:5px;
`;
const LdaPresenter = ({searchBokeh, 
                        loading,
                        searchDate,
                        setDate
                    }) => {
    return (
    <>
    {loading ? (<Loader />) : (<div>
                            <form onSubmit={searchBokeh}>
                                <InputLabel for='date'>일자 선택 </InputLabel>
                                <input id='date' type='date' value ={searchDate} onChange={setDate}/>
                                <input type='submit' value='click'/>
                            </form>
                            <StyledSection>
                                <SubSection>
                                    <StyledP>주간 데이터 발생량 </StyledP>
                                    <article id="weeklyDataOccurence" />                                             
                                </SubSection>   
                                <SubSection>
                                    <StyledP>주간 이슈 변화량 </StyledP>
                                    <article id="weeklyIssueChange" />                           
                                </SubSection>        
                                <SubSection>
                                    <StyledP> 주간 이슈 발생 비율 </StyledP>
                                    <article id="weeklyIssueOccurence" />                
                                </SubSection>
                                <SubSection>
                                    <StyledP> 월간 데이터 발생량 </StyledP>
                                    <article id="monthlyDataOccurence" />                            
                                </SubSection>            
                            </StyledSection>
                            
                        </div>
                        )
                    }
    </>
        
    );
}

export default LdaPresenter;