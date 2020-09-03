import React, { createContext, useCallback, useState, useContext } from 'react';

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

interface ICharacterContextData {
    character: ICharacter;
    alterCharacter(character: ICharacter): void;
}

const CharacterContext = createContext<ICharacterContextData>({} as ICharacterContextData);

const CharacterProvider: React.FC = ({ children }) => {
    const [character, setCharacter] = useState<ICharacter>({} as ICharacter);

    const alterCharacter = useCallback((character: ICharacter) => {
        setCharacter(character);
    }, []);

    return (
        <CharacterContext.Provider value={{ character, alterCharacter }}>
            {children}
        </CharacterContext.Provider>
    )
};

const useCharacter = (): ICharacterContextData => {
    const context = useContext(CharacterContext);

    if (!context) {
        throw new Error('useCharacter must be used within an AuthProvider');
    }

    return context;
};

export { CharacterProvider, useCharacter }