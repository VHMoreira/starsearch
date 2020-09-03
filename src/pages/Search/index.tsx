import React from 'react';
import { Container, Content } from './styles';
import { FiSearch } from "react-icons/fi";

const Search: React.FC = () => {
    return (
        <Container>
            <header>
                <h1>
                    STAR <br />
                    SEARCH
                </h1>
            </header>
            <Content>
                <span>
                    Insira o nome do personagem para pesquisar:
                </span>
                <input placeholder="Ex: Luke Skywalker" />
                <button>
                    <FiSearch /> Pesquisar
                </button>
            </Content>
        </Container>
    );
};

export default Search;