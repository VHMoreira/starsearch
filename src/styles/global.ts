import { createGlobalStyle } from "styled-components";
import background from '../assets/background.jpg'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    body{
        background: #312E38;
        background-image: url(${background});
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }
    body, input, button{
        font-family: 'Ubuntu', serif;
        font-size: 16px;
    }
    h1{
        font-weight: 700;
    }
    h1, span{
        cursor: default;
    }
    a{
        text-decoration: none;
        color: #FFF;
    }
    button{
        cursor: pointer;
    }
`;