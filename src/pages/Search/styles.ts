import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    >header{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80px;

        h1{
            text-align: center;
            -webkit-text-fill-color: black;
            -webkit-text-stroke-width: 2px;
            -webkit-text-stroke-color: yellow;
            font-size: 40px;
        }
    }
    
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 40px;
    margin-top: 50px;
    max-width: 700px;

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

    button + span{
        margin: 10px 0;
        max-width: 125px;
        font-weight: 400;
        font-size: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;

        svg{
            margin: auto 10px;
        }
    }

    section{

        div{
            background: rgba(56, 56, 56, 0.84);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            cursor: pointer;

            span{
                cursor: pointer;
            }

            & + div{
                margin-top: 2px;
            }
        }
    }
`;

export const AutoCompleteOption = styled.div`
    padding: 10px;
    color: black;
    background: white;
`;