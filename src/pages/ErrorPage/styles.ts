import styled from 'styled-components';

export const Container = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 40px;

    >svg{
        border-radius: 30px;
        color: yellow;
    }

    span{
        font-size: 20px;
        margin-top: 50px;
    }

    a{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        background: yellow;
        padding: 10px;
        border: transparent;
        border-radius: 10px;
        color: black;

        svg{
            margin-right: 10px;
        }
    }
`;