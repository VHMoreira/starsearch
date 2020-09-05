import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 20px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    padding: 0 20px;

    section{
        padding:5px 0;
        
        span{
            text-align: left;
            color: yellow;
            font-weight: 500;
        }

        div{
            display: flex;
            flex-direction: column;
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

export const ContentList = styled.section`
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid grey;

    span{
        text-align: left;
        color: yellow;
        font-weight: 500;
        margin: 5px 0;
    }
`;