import React from 'react';
import { Container } from './styles';
import { GiCrownedExplosion } from "react-icons/gi";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {

    return (
        <Container>
            <GiCrownedExplosion size={100} />
            <span>Ocorreu um erro durante o carregamento</span>
            <Link to='/'><FiArrowLeft size={20} />Voltar para a pesquisa</Link>
        </Container>
    );
};

export default ErrorPage;