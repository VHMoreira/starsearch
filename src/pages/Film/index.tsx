import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from '../../shared/components/Header';
import { Container, Content, OpeningCrawlText, ContentList } from './styles';
import { useParams, useHistory } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';
import { FiArrowLeft } from 'react-icons/fi';
import SingleContent from '../../shared/components/SingleContent';

interface Film {
    title: string;
    url: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[]
    vehicles: string[];
    starships: string[];
    planets: string[];
    species: string[];
}

interface Characters {
    name: string;
}

interface Planets {
    name: string;
}

interface Starships {
    name: string;
}

interface Vehicles {
    name: string
}

interface Species {
    name: string;
}

const Film: React.FC = () => {
    const { filmIndex } = useParams();
    const history = useHistory();
    const { character } = useCharacter();
    const [film, setFilm] = useState<Film>();
    const [characters, setCharacters] = useState<Characters[]>([]);
    const [planets, setPlanets] = useState<Planets[]>([]);
    const [starships, setStarships] = useState<Starships[]>([]);
    const [vehicles, setVehicles] = useState<Vehicles[]>([]);
    const [species, setSpecies] = useState<Species[]>([]);

    useEffect(() => {
        async function loadFilm() {
            const currentsFilm = character.films[filmIndex];

            const { characters, planets, starships, vehicles, species } = currentsFilm;

            const charactersUrls = characters.map((character) => {
                return axios.get<Characters>(character);
            });

            const planetsUrls = planets.map((planet) => {
                return axios.get<Planets>(planet);
            });

            const starshipsUrls = starships.map((starship) => {
                return axios.get<Starships>(starship);
            });

            const vehiclesUrls = vehicles.map((vehicle) => {
                return axios.get<Vehicles>(vehicle);
            });

            const speciesUrls = species.map((specie) => {
                return axios.get<Species>(specie);
            });

            const responsesCharacters = await Promise.all(charactersUrls);
            const responsesPlanets = await Promise.all(planetsUrls);
            const responsesStarships = await Promise.all(starshipsUrls);
            const responsesVehicles = await Promise.all(vehiclesUrls);
            const responsesSpecies = await Promise.all(speciesUrls);

            setFilm(currentsFilm);
            setCharacters(responsesCharacters.map(response => response.data));
            setPlanets(responsesPlanets.map(response => response.data));
            setStarships(responsesStarships.map(response => response.data));
            setVehicles(responsesVehicles.map(response => response.data));
            setSpecies(responsesSpecies.map(response => response.data));
        }

        loadFilm();
    }, [filmIndex, character.films]);

    return (
        <Container>
            {film &&
                <>
                    <Header>
                        <div>
                            <FiArrowLeft size={30} onClick={history.goBack} />
                        </div>
                        <h1>{film?.title}</h1>
                    </Header>
                    <Content>
                        <SingleContent>
                            <span>Diretor:</span> {film.director}
                        </SingleContent>
                        <SingleContent>
                            <span>Produtor:</span> {film.producer}
                        </SingleContent>
                        <SingleContent>
                            <span>Data de lançamento:</span> {film.release_date}
                        </SingleContent>
                        <OpeningCrawlText>
                            <span>Texto de abertura:</span>
                            {film.opening_crawl}
                        </OpeningCrawlText>
                        <ContentList>

                            <span>Personagens:</span>
                            {characters.map((character) => {
                                return (
                                    <section key={character.name}>
                                        {character.name}
                                    </section>
                                );
                            })}
                        </ContentList>
                        <ContentList>

                            <span>Planetas:</span>
                            {planets.map((planet) => {
                                return (
                                    <section key={planet.name}>
                                        {planet.name}
                                    </section>
                                );
                            })}
                        </ContentList>
                        <ContentList>

                            <span>Naves:</span>
                            {starships.map((starship) => {
                                return (
                                    <section key={starship.name}>
                                        {starship.name}
                                    </section>
                                );
                            })}
                        </ContentList>
                        <ContentList>

                            <span>Veiculos:</span>
                            {vehicles.map((vehicle) => {
                                return (
                                    <section key={vehicle.name}>
                                        {vehicle.name}
                                    </section>
                                );
                            })}
                        </ContentList>
                        <ContentList>

                            <span>Species:</span>
                            {species.map((specie) => {
                                return (
                                    <section key={specie.name}>
                                        {specie.name}
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

export default Film;