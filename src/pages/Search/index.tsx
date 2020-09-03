import React, { useState, useCallback } from 'react';

import Autocomplete from 'react-autocomplete';
import { FiSearch } from "react-icons/fi";

import { Container, Content, AutoCompleteOption } from './styles';
import swapi from '../../services/swapi';

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
    const [selectedCharacter, setSelectedCharacter] = useState<ICharacter>({} as ICharacter);
    const [timeOutID, setTimeOutId] = useState(0);

    const handleAutoCompleteOptions = useCallback(async (name: string) => {
        clearTimeout(timeOutID);
        const timerId = setTimeout(async () => {
            const response = await swapi.get(`/people/?search=${name}`);
            setAutocompleteOptions(response.data.results);
        }, 1500);
        setTimeOutId(timerId);
        setSelectedCharacterName(name);
    }, [timeOutID]);

    const handleCharacterSelection = useCallback((character: ICharacter) => {
        setSelectedCharacter(character);
        setSelectedCharacterName(character.name);
    }, []);

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
                <button>
                    <FiSearch /> Pesquisar
                </button>
            </Content>
        </Container>
    );
};

export default Search;