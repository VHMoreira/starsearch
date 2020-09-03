import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

    >header{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;

        h1{
            text-align: center;
            -webkit-text-fill-color: black;
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: yellow;
        }
    }
    
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
    margin-top: 50px;

    span{
        text-align: left;
        color: yellow;
        font-weight: 500;
    }

    input{
        margin-top: 20px;
        padding: 10px;
        border: 1px solid gray;
        width: 100%;

        &:focus{
            border: 1px solid yellow;
        }
    }

    button{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        background: yellow;
        padding: 10px;
        border: transparent;
        border-radius: 10px;

        svg{
            margin-right: 10px;
        }
    }
`;

export const AutoCompleteOption = styled.div`
    padding: 10px;
    color: black;
    background: white;
`;