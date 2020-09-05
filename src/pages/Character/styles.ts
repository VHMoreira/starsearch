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
    padding: 0 20px;
    width: 100%;
    max-width: 700px;
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

        span{
            cursor: pointer;
        }
    }
`;