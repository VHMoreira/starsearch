import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, SingleContent, ContentList } from './styles';
import { useParams, useHistory } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';
import { Content } from './styles';
import { FiArrowLeft } from 'react-icons/fi';

interface Starship {
    name: string;
    url: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    starship_class: string;
    MGLT: string;
    length: string;
    hyperdrive_rating: string;
    films: string[];
}

interface Film {
    title: string;
}

const Starship: React.FC = () => {
    const { starshipIndex } = useParams();
    const history = useHistory();
    const { character } = useCharacter();
    const [starship, setStarship] = useState<Starship>();
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        async function loadFilm() {
            const currentsStarship = character.starships[starshipIndex];

            const { films } = currentsStarship;

            const filmsUrls = films.map((film) => {
                return axios.get<Film>(film);
            });

            const responsesFilms = await Promise.all(filmsUrls);

            setStarship(currentsStarship);
            setFilms(responsesFilms.map(response => response.data));
        }

        loadFilm();
    }, [starshipIndex]);

    return (
        <Container>
            {starship &&
                <>
                    <header>
                        <div>
                            <FiArrowLeft size={30} onClick={history.goBack} />
                        </div>
                        <h1>{starship.name}</h1>
                    </header>
                    <Content>
                        <SingleContent>
                            <span>Modelo:</span> {starship.model}
                        </SingleContent>
                        <SingleContent>
                            <span>Montadora:</span> {starship.manufacturer}
                        </SingleContent>
                        <SingleContent>
                            <span>Preço:</span> {starship.cost_in_credits}
                        </SingleContent>
                        <SingleContent>
                            <span>Tamanho:</span> {starship.length} m
                        </SingleContent>
                        <SingleContent>
                            <span>Velocidade máxima:</span> {starship.max_atmosphering_speed} Km/h
                        </SingleContent>
                        <SingleContent>
                            <span>Equipe:</span> {starship.crew}
                        </SingleContent>
                        <SingleContent>
                            <span>Passageiros:</span> {starship.passengers}
                        </SingleContent>
                        <SingleContent>
                            <span>Capacidade de carga:</span> {starship.cargo_capacity}
                        </SingleContent>
                        <SingleContent>
                            <span>Consumo:</span> {starship.consumables}
                        </SingleContent>
                        <SingleContent>
                            <span>Taxa de Hyperdrive:</span> {starship.hyperdrive_rating}
                        </SingleContent>
                        <SingleContent>
                            <span>MGLT:</span> {starship.MGLT}
                        </SingleContent>
                        <SingleContent>
                            <span>Classe da nave:</span> {starship.starship_class}
                        </SingleContent>
                        <ContentList>
                            <span>Filmes:</span>
                            {films.map((film) => {
                                return (
                                    <section>
                                        {film.title}
                                    </section>
                                );
                            })}
                        </ContentList>
                    </Content>
                </>
            }
        </Container>
    );
};

export default Starship;