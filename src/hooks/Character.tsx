import React, { createContext, useCallback, useState, useContext } from 'react';

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
    films: Film[];
    vehicles: Vehicle[];
    starships: Starship[];
}

interface ICharacterContextData {
    character: ICharacter;
    alterCharacter(character: ICharacter): void;
    clearCharacter(): void;
}

interface ICharacterState {
    character: ICharacter;
}

const CharacterContext = createContext<ICharacterContextData>({} as ICharacterContextData);

const CharacterProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<ICharacterState>(() => {
        const character = localStorage.getItem('@StarSearch:character');

        if (character) {
            return JSON.parse(character);
        }

        return {} as ICharacterState;
    });

    const alterCharacter = useCallback((character: ICharacter) => {
        localStorage.setItem('@StarSearch:character', JSON.stringify({ character }));
        setData({ character });
    }, [setData]);

    const clearCharacter = useCallback(() => {
        localStorage.setItem('@StarSearch:character', JSON.stringify({} as ICharacterState));
        setData({} as ICharacterState);
    }, [setData]);

    return (
        <CharacterContext.Provider value={{ character: data.character, alterCharacter, clearCharacter }}>
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