import React, { useMemo } from 'react';

import { Container } from './styles';
import { useParams } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';

interface Film {
    title: string;
    url: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
}

const Film: React.FC = () => {
    const { filmIndex } = useParams();
    const { character } = useCharacter();

    const film = useMemo<Film>(() => {
        return character.films[filmIndex];
    }, [character.films, filmIndex]);

    return (
        <Container>
            <header>
                <h1>{film.title}</h1>
            </header>
        </Container>
    );
};

export default Film;