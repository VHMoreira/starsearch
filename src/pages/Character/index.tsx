import React from 'react';
import { Container } from './styles';
import { useCharacter } from '../../hooks/Character';

const Character: React.FC = () => {
    const { character } = useCharacter();
    return (
        <Container>
            <h1>{character.name}</h1>
        </Container>
    );
};

export default Character;