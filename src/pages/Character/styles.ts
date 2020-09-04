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

        svg{
            position: absolute;
            right: 0;
            top: 0;
            margin: 20px;
            color: yellow;
        }
    }
    
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px;
`;

export const SingleContent = styled.section`
    
    padding:5px 0;
    justify-content: space-between;
    border-bottom: 1px solid grey;
    
    span{
        text-align: left;
        color: yellow;
        font-weight: 500;
    }
    
`;

export const ContentList = styled.section`
    padding-top: 5px;
    display: flex;
    flex-direction: column;

    span{
        text-align: left;
        color: yellow;
        font-weight: 500;
    }

    a{
        padding:5px 0;
        display: flex;
        font-weight: 400;
        justify-content: space-between;
        border-bottom: 1px solid grey;
    }
`;