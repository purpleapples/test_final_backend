import styled from 'styled-components';

const StyledSection = styled.section`
    display:grid;
    grid-template-columns: repeat(auto-fill, 125px);
`;
const HomePresenter = () => {
    return (<div>
        <StyledSection>
            <article id="weeks_content_count">                            
            </article>
            <article id="weeks_topics">
            </article>
            <article id="weeks_topics_count">                
            </article>
            <article id="weeks_topics_count2">                
            </article>
        </StyledSection>
        
    </div>);
}

export default HomePresenter;