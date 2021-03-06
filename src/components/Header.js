import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    color:white;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:50px;
    align-items: center;
    padding: 0px 10px;
    background-color: rgba(20, 20, 20, 0.8);
    box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
    z-index: 10;    
`;

const List = styled.ul`
    display:flex;
    // float:right;
`;

const Item = styled.li`
    width:200px;
    text-align: center;
    height:50px;
    border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent") };
    transition: border-botoom 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
    height:50px;
    display:flex;
    align-items:center;
    justify-content:center;
`;

export default withRouter(({location:{pathname}}) => {
    return(
        <>
            <Header >            
                <List>
                    <Item current={pathname === "/"}>
                        <StyledLink to={"/"}>데이터 발생 현황 </StyledLink> 
                    </Item>       
                    <Item current={pathname === "/lda"}>
                        <StyledLink to={"/lda"}>데이터 분석 결과 </StyledLink> 
                    </Item>              
                    <Item current={pathname === "/model"}>
                        <StyledLink to={"/model"}>모델 작업 결과 </StyledLink> 
                    </Item>                                      
                    <Item current={pathname === "/admin"}>
                        <StyledLink to={"/admin"}>Admin </StyledLink> 
                    </Item>                                      
                    {/* <Item current={pathname === "/test"}>
                        <StyledLink to={"/test"}>Test </StyledLink> 
                    </Item>                                       */}
                </List>
            </Header>
        </>
    )
})