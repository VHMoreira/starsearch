import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    h1{
        padding: 20px;
        text-align: center;
        line-height: 40px;
        -webkit-text-fill-color: black;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: yellow;
    }
    div{
        display:flex;
        justify-content: space-between;
        
        svg{
            cursor: pointer;
            
            & + svg{
                color: yellow;
            }
        }
    }
`;