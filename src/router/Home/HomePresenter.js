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
const StyledP = styled.p`
    padding-bottom:5px;
`;
const HomePresenter = ({searchBokeh, 
                        loading,
                        searchDate,
                        setDate
                    }) => {
    return (
    <>
    {loading ? (<Loader />) : (<div>
                            <form onSubmit={searchBokeh}>
                                <input type='date' value ={searchDate} onChange={setDate}/>
                                <input type='submit' value='click'/>
                            </form>
                            <StyledSection>
                                <SubSection>
                                    <StyledP>title1 </StyledP>
                                    <article id="data_count_graph" />                                             
                                </SubSection>   
                                <SubSection>
                                    <StyledP>title2 </StyledP>
                                    <article id="weeks_topics" />                           
                                </SubSection>        
                                <SubSection>
                                    <StyledP>title3 </StyledP>
                                    <article id="weeks_topics_count" />                
                                </SubSection>
                                <SubSection>
                                    <StyledP>title4 </StyledP>
                                    <article id="weeks_topics_count2" />                            
                                </SubSection>            
                            </StyledSection>
                            
                        </div>
                        )
                    }
    </>
        
    );
}

export default HomePresenter;