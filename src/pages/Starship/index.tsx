import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, ContentList } from './styles';
import { useParams, useHistory } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';
import { Content } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '../../shared/components/Header';
import SingleContent from '../../shared/components/SingleContent';
import Loading from '../../shared/components/Loading';

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
    pilots: string[];
}

interface Film {
    title: string;
}

interface Pilot {
    name: string;
}

const Starship: React.FC = () => {
    const { starshipIndex } = useParams();
    const history = useHistory();
    const { character } = useCharacter();
    const [starship, setStarship] = useState<Starship>();
    const [films, setFilms] = useState<Film[]>([]);
    const [pilots, setPilots] = useState<Pilot[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStarship() {
            const currentsStarship = character.starships[starshipIndex];

            const { films, pilots } = currentsStarship;

            const filmsUrls = films.map((film) => {
                return axios.get<Film>(film);
            });

            const pilotsUrls = pilots.map((pilot) => {
                return axios.get<Pilot>(pilot);
            });

            const responsesFilms = await Promise.all(filmsUrls);
            const responsesPilots = await Promise.all(pilotsUrls);

            setStarship(currentsStarship);
            setFilms(responsesFilms.map(response => response.data));
            setPilots(responsesPilots.map(response => response.data));
            setIsLoading(false);
        }

        loadStarship();
        // eslint-disable-next-line
    }, [starshipIndex]);

    return (
        <Container>
            <Loading isLoading={isLoading} />
            {starship &&
                <>
                    <Header>
                        <div>
                            <FiArrowLeft size={30} onClick={history.goBack} />
                        </div>
                        <h1>{starship.name}</h1>
                    </Header>
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
                        {pilots &&
                            <ContentList>
                                <span>Pilotos:</span>
                                {pilots.map((pilots) => {
                                    return (
                                        <section key={pilots.name}>
                                            {pilots.name}
                                        </section>
                                    );
                                })}
                            </ContentList>
                        }
                        <ContentList>
                            <span>Filmes:</span>
                            {films.map((film) => {
                                return (
                                    <section key={film.title}>
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