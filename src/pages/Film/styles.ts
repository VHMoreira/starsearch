import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 20px 0;

    >header{
        display: flex;
        flex-direction: column;
        height: 120px;
        width: 100%;
        max-width: 800px;

        h1{
            text-align: center;
            -webkit-text-fill-color: black;
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: yellow;
        }

        div{
            display:flex;
            justify-content: flex-start;
            padding: 5px 20px;

            svg{
                cursor: pointer;
            }
        }
    }
    
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    width: 100%;
    max-width: 700px;

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
    line-height: 25px;
    
`;