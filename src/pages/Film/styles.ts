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
    padding: 0 40px;

    section{
        padding:5px 0;
        
        span{
            text-align: left;
            color: yellow;
            font-weight: 500;
        }
    }
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

export const OpeningCrawlText = styled.section`
    display: flex;
    flex-direction: column;
    text-align: justify;
    line-height: 20px;
    
`;