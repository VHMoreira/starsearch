import React from 'react';
import { Container } from './styles';
import { FaGalacticSenate } from "react-icons/fa";

interface LoadingProps {
    isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {

    return (
        <>
            {isLoading &&
                < Container >
                    <FaGalacticSenate size={70} />
                    <span>Carregando...</span>
                </Container >
            }
        </>
    );
};

export default Loading;