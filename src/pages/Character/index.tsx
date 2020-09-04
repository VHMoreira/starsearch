import React, { useEffect, useState, useCallback } from 'react';

import { Container, Content, ContentList } from './styles';
import { useCharacter } from '../../hooks/Character';

import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useFavorite } from '../../hooks/Favorite';

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
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    length: string;
}

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
}

interface LocationStateProps {
    character: ICharacter;
}

const Character: React.FC = () => {
    const { state } = useLocation<LocationStateProps>();

    const { character, alterCharacter } = useCharacter();
    const { favorites, addNewFavorite, removeFavorite } = useFavorite();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function loadCharacter() {

            const currentCharacterIsFavorite = favorites.find(favorite => favorite.name === state.character.name);

            if (currentCharacterIsFavorite) {
                setIsFavorite(true);
                alterCharacter(currentCharacterIsFavorite);
            } else {
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
            }

            console.log(character);
        }

        loadCharacter();

    }, [state.character, alterCharacter, favorites]);

    const handleToggleFavorite = useCallback(() => {
        if (isFavorite) {
            removeFavorite(character);
            setIsFavorite(false);
        } else {
            addNewFavorite(character);
            setIsFavorite(true);
        }
    }, [isFavorite, character]);

    return (
        <Container>
            {character &&
                <>
                    <header>
                        <h1>{character.name}</h1>

                        {isFavorite ? <AiFillStar size={30} onClick={handleToggleFavorite} /> : <AiOutlineStar size={30} onClick={handleToggleFavorite} />}
                    </header>
                    <Content>
                        <section>
                            <span>Altura:</span> {character.height} cm
                        </section>
                        <section>
                            <span>Peso:</span> {character.mass} Kg
                        </section>
                        <section>
                            <span>Cor do cabelo:</span> {character.hair_color}
                        </section>
                        <section>
                            <span>Cor dos olhos:</span> {character.eye_color}
                        </section>
                        <section>
                            <span>Ano de nascimento:</span> {character.birth_year}
                        </section>
                        <section>
                            <span>Gênero:</span> {character.gender}
                        </section>
                        <section>
                            <span>Planeta natal:</span> {character.homeworld}
                        </section>
                        <ContentList>
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
                        </ContentList>
                        {character.vehicles.length > 0 &&
                            <ContentList>
                                <div>
                                    <span>Veiculos:</span>
                                </div>
                                {character.vehicles.map((vehicles, index) => {
                                    return (
                                        <Link to={`/character/vehicle/${index}`} key={vehicles.name}>
                                            {vehicles.name}
                                        </Link>
                                    );
                                })}
                            </ContentList>
                        }
                        {character.starships.length > 0 &&
                            <ContentList>
                                <div>
                                    <span>Naves:</span>
                                </div>
                                {character.starships.map((starships, index) => {
                                    return (
                                        <Link to={`/character/starship/${index}`} key={starships.name}>
                                            {starships.name}
                                        </Link>
                                    );
                                })}
                            </ContentList>
                        }
                    </Content>
                </>}
        </Container>
    );
};

export default Character;