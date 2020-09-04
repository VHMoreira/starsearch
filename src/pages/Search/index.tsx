import React, { useState, useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Autocomplete from 'react-autocomplete';
import { FiSearch } from "react-icons/fi";

import { Container, Content, AutoCompleteOption } from './styles';
import swapi from '../../services/swapi';
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

const Search: React.FC = () => {
    const [selectedCharacterName, setSelectedCharacterName] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState<ICharacter[]>([]);
    const [selectedCharacter, setSelectedCharacter] = useState<ICharacter>();
    const { clearCharacter } = useCharacter();
    const [timeOutID, setTimeOutId] = useState(0);
    const history = useHistory();

    useEffect(() => {
        clearCharacter();
    }, [clearCharacter]);

    useEffect(() => {
        async function loadAutoCompleteOptions() {
            clearTimeout(timeOutID);
            const timerId = setTimeout(async () => {
                const response = await swapi.get(`/people/?search=${selectedCharacterName}`);
                setAutocompleteOptions(response.data.results);
                console.log(response.data.results);
            }, 500);
            setTimeOutId(timerId);
        }

        loadAutoCompleteOptions();
    }, [selectedCharacterName]);

    const handleAutoCompleteOptions = useCallback((name: string) => {
        setSelectedCharacterName(name);
    }, []);

    const handleCharacterSelection = useCallback((character: ICharacter) => {
        setSelectedCharacter(character);
        setSelectedCharacterName(character.name);
    }, []);

    const handleSearchCharacter = useCallback(() => {
        if (selectedCharacter) {
            history.push('/character', {
                character: selectedCharacter
            });
        }
    }, [history, selectedCharacter]);

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
                />
                <button onClick={handleSearchCharacter}>
                    <FiSearch /> Pesquisar
                </button>
            </Content>
        </Container>
    );
};

export default Search;