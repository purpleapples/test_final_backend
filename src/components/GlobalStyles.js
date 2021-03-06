import {createGlobalStyle} from 'styled-components';
import {reset} from 'styled-reset';

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:1.2rem;
        background-color:rgba(100, 100, 100, 0.9);
        color:white;
        padding-top:50px;
    }    
`;

export default globalStyles;