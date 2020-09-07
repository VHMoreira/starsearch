import React, { useState, useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import { FiSearch, FiArrowDown, FiArrowUp, FiArrowRight } from "react-icons/fi";

import { Container, Content, AutoCompleteOption, AutoCompleteOptionContainer } from './styles';
import swapi from '../../services/swapi';
import { useFavorite } from '../../hooks/Favorite';
import { useCharacter } from '../../hooks/Character';

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

interface ICharacterFavorite {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Film[];
    vehicles: Vehicle[];
    starships: Starship[];
}

const Search: React.FC = () => {
    const [selectedCharacterName, setSelectedCharacterName] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState<ICharacter[]>([]);
    const [selectedCharacter, setSelectedCharacter] = useState<ICharacter>();
    const { favorites } = useFavorite();
    const { clearCharacter } = useCharacter();
    const [showFavoritesList, setShowFavoritesList] = useState(false);
    const [timeOutID, setTimeOutId] = useState(0);
    const history = useHistory();

    useEffect(() => {
        async function loadAutoCompleteOptions() {
            clearTimeout(timeOutID);
            const timerId = setTimeout(async () => {
                const response = await swapi.get(`/people/?search=${selectedCharacterName}`);
                setAutocompleteOptions(response.data.results);
            }, 500);
            setTimeOutId(timerId);
        }

        loadAutoCompleteOptions();
        // eslint-disable-next-line
    }, [selectedCharacterName]);

    const handleAutoCompleteOptions = useCallback((name: string) => {
        setSelectedCharacterName(name);
    }, []);

    const handleCharacterSelection = useCallback((character: ICharacter) => {
        setSelectedCharacter(character);
        setSelectedCharacterName(character.name);
    }, []);

    const handleSearchFavorite = useCallback((character: ICharacterFavorite) => {
        clearCharacter();
        history.push('/character', {
            character
        });
    }, [history, clearCharacter]);

    const handleSearchCharacter = useCallback(() => {
        clearCharacter();
        if (selectedCharacter) {
            history.push('/character', {
                character: selectedCharacter
            });
        }
    }, [history, selectedCharacter, clearCharacter]);

    const handleToogleShowFavoritesList = useCallback(() => {
        setShowFavoritesList(!showFavoritesList);
    }, [showFavoritesList]);

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
                <Autocomplete
                    getItemValue={(character: ICharacter) => character.name}
                    items={autocompleteOptions}
                    renderItem={({ name }: ICharacter) =>
                        <AutoCompleteOption key={name}>
                            {name}
                        </AutoCompleteOption>
                    }
                    value={selectedCharacterName}
                    onChange={({ target }) => handleAutoCompleteOptions(target.value)}
                    onSelect={(_, item) => handleCharacterSelection(item)}
                    renderMenu={children =>
                        <AutoCompleteOptionContainer>
                            {children}
                        </AutoCompleteOptionContainer>
                    }
                />
                <button onClick={handleSearchCharacter}>
                    <FiSearch /> Pesquisar
                </button>

                <span onClick={handleToogleShowFavoritesList}>
                    Ver favoritos {showFavoritesList ? <FiArrowUp /> : <FiArrowDown />}
                </span>

                {showFavoritesList &&
                    <section>
                        {favorites.map((favorite) => (
                            <div key={favorite.name} onClick={() => handleSearchFavorite(favorite)}>
                                <span>{favorite.name}</span>
                                <FiArrowRight size={20} />
                            </div>
                        ))}
                    </section>
                }
            </Content>

        </Container >
    );
};

export default Search;