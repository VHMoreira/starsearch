import React, { useEffect, useState, useCallback } from 'react';

import { Container, Content, ContentList } from './styles';
import Header from '../../shared/components/Header';
import { useCharacter } from '../../hooks/Character';

import axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useFavorite } from '../../hooks/Favorite';
import { FiArrowLeft } from 'react-icons/fi';
import SingleContent from '../../shared/components/SingleContent';
import Loading from '../../shared/components/Loading';

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
    characters: string[]
    vehicles: string[];
    starships: string[];
    planets: string[];
    species: string[];
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
    films: string[];
    pilots: string[];
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
    films: string[];
    pilots: string[];
}

interface LocationStateProps {
    character: ICharacter;
}

const Character: React.FC = () => {
    const { state } = useLocation<LocationStateProps>();

    const { character, alterCharacter } = useCharacter();
    const { favorites, addNewFavorite, removeFavorite } = useFavorite();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function loadCharacter() {

            const currentCharacterIsFavorite = favorites.find(favorite => favorite.name === state.character.name);

            if (currentCharacterIsFavorite) {
                setIsFavorite(true);
                alterCharacter(currentCharacterIsFavorite);
                setIsLoading(false);
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
                setIsLoading(false);
            }
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
    }, [isFavorite, character, addNewFavorite, removeFavorite]);

    return (
        <Container>
            <Loading isLoading={isLoading} />
            {!isLoading &&
                <>
                    <Header>
                        <div>
                            <FiArrowLeft size={30} onClick={history.goBack} />
                            {isFavorite ? <AiFillStar size={30} onClick={handleToggleFavorite} /> : <AiOutlineStar size={30} onClick={handleToggleFavorite} />}
                        </div>
                        <h1>{character.name}</h1>
                    </Header>
                    <Content>
                        <SingleContent>
                            <span>Altura:</span> {character.height} cm
                        </SingleContent>
                        <SingleContent>
                            <span>Peso:</span> {character.mass} Kg
                        </SingleContent>
                        <SingleContent>
                            <span>Cor do cabelo:</span> {character.hair_color}
                        </SingleContent>
                        <SingleContent>
                            <span>Cor dos olhos:</span> {character.eye_color}
                        </SingleContent>
                        <SingleContent>
                            <span>Ano de nascimento:</span> {character.birth_year}
                        </SingleContent>
                        <SingleContent>
                            <span>Gênero:</span> {character.gender}
                        </SingleContent>
                        <SingleContent>
                            <span>Planeta natal:</span> {character.homeworld}
                        </SingleContent>
                        <ContentList>

                            <span>Filmes:</span>
                            {character.films.map((film, index) => {
                                return (
                                    <section key={film.title}>
                                        <Link to={`/character/film/${index}`}>
                                            {film.title} <span>Ver mais</span>
                                        </Link>
                                    </section>
                                );
                            })}
                        </ContentList>
                        {character.vehicles.length > 0 &&
                            <ContentList>
                                <span>Veiculos:</span>
                                {character.vehicles.map((vehicles, index) => {
                                    return (
                                        <Link to={`/character/vehicle/${index}`} key={vehicles.name}>
                                            {vehicles.name} <span>Ver mais</span>
                                        </Link>
                                    );
                                })}
                            </ContentList>
                        }
                        {character.starships.length > 0 &&
                            <ContentList>
                                <span>Naves:</span>
                                {character.starships.map((starships, index) => {
                                    return (
                                        <Link to={`/character/starship/${index}`} key={starships.name}>
                                            {starships.name} <span>Ver mais</span>
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