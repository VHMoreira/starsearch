import React, { useEffect } from 'react';

import { Container, Content } from './styles';
import { useCharacter } from '../../hooks/Character';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

interface ICharacter {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    vehicles: string[];
    starships: string[];
}

interface HomeWorld {
    name: string;
}

interface Film {
    title: string;
    url: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
}

interface Vehicle {
    name: string;
    url: string;
}

interface Starship {
    name: string;
    url: string;
}

interface LocationStateProps {
    character: ICharacter;
}

const Character: React.FC = () => {
    const { character, alterCharacter } = useCharacter();
    const { state } = useLocation<LocationStateProps>();

    useEffect(() => {
        async function loadCharacter() {

            const { films, vehicles, starships, homeworld, ...character } = state.character;

            const filmsUrls = films.map((film) => {
                return axios.get<Film>(film);
            });

            const vehiclesUrls = vehicles.map((vehicle) => {
                return axios.get<Vehicle>(vehicle);
            });

            const starshipsUrls = starships.map((starship) => {
                return axios.get<Starship>(starship);
            });

            const responseHomeworld = await axios.get<HomeWorld>(homeworld);

            const responsesFilms = await Promise.all(filmsUrls);
            const responsesVehicles = await Promise.all(vehiclesUrls);
            const responsesStarships = await Promise.all(starshipsUrls);

            alterCharacter({
                ...character,
                homeworld: responseHomeworld.data.name,
                films: responsesFilms.map(response => response.data),
                vehicles: responsesVehicles.map(response => response.data),
                starships: responsesStarships.map(response => response.data)
            });

            console.log(character);
        }

        loadCharacter();

    }, [state.character, alterCharacter]);

    return (
        <Container>
            {character &&
                <>
                    <header>
                        <h1>{character.name}</h1>
                    </header>
                    <Content>
                        <div>
                            <span>Altura:</span> {character.height} cm
                </div>
                        <div>
                            <span>Peso:</span> {character.mass} Kg
                </div>
                        <div>
                            <span>Cor do cabelo:</span> {character.hair_color}
                        </div>
                        <div>
                            <span>Cor dos olhos:</span> {character.eye_color}
                        </div>
                        <div>
                            <span>Ano de nascimento:</span> {character.birth_year}
                        </div>
                        <div>
                            <span>Gênero:</span> {character.gender}
                        </div>
                        <div>
                            <span>Planeta natal:</span> {character.homeworld}
                        </div>
                        <div>
                            <span>Filmes:</span>
                        </div>
                        {character.films.map((film, index) => {
                            return (
                                <Link to={`/character/film/${index}`} key={film.title}>
                                    {film.title}
                                </Link>
                            );
                        })}
                        <div>
                            <span>Veiculos:</span>
                        </div>
                        {character.vehicles.map((vehicles) => {
                            return (
                                <div key={vehicles.name}>
                                    {vehicles.name}
                                </div>
                            );
                        })}
                        <div>
                            <span>Naves:</span>
                        </div>
                        {character.starships.map((starships) => {
                            return (
                                <div key={starships.name}>
                                    {starships.name}
                                </div>
                            );
                        })}
                    </Content>
                </>}
        </Container>
    );
};

export default Character;