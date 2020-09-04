import React, { useMemo } from 'react';

import { Container, Content, OpeningCrawlText } from './styles';
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
            <Content>
                <section>
                    <span>Diretor:</span> {film.director}
                </section>
                <section>
                    <span>Produtor:</span> {film.producer}
                </section>
                <section>
                    <span>Data de lançamento:</span> {film.release_date}
                </section>
                <OpeningCrawlText>
                    <span>Texto de abertura:</span>
                    {film.opening_crawl}
                </OpeningCrawlText>
            </Content>
        </Container>
    );
};

export default Film;