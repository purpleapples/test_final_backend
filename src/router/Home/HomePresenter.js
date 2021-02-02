import styled from 'styled-components';

const StyledSection = styled.section`
    display:grid;
    grid-template-columns: 700px 700px;
    grid-row: auto auto;
    grid-column-gap: 50px;
    grid-row-gap: 20px;
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