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

interface IFavoriteContextData {
    favorites: ICharacter[];
    addNewFavorite(character: ICharacter): void;
    removeFavorite(character: ICharacter): void;
}

const FavoriteContext = createContext<IFavoriteContextData>({} as IFavoriteContextData);

const FavoriteProvider: React.FC = ({ children }) => {
    const [favorites, setFavorites] = useState<ICharacter[]>(() => {
        const favorites = localStorage.getItem('@StarSearch:favorites');

        if (favorites) {
            return JSON.parse(favorites);
        }

        localStorage.setItem('@StarSearch:favorites', JSON.stringify([]));
        return [];
    });

    const addNewFavorite = useCallback((character: ICharacter) => {
        localStorage.setItem('@StarSearch:favorites', JSON.stringify([...favorites, character]));
        setFavorites([...favorites, character]);
    }, [favorites]);

    const removeFavorite = useCallback((character: ICharacter) => {
        const filteredFavorites = favorites.filter(favorite => favorite.name === character.name);

        localStorage.setItem('@StarSearch:favorites', JSON.stringify(filteredFavorites));
        setFavorites(filteredFavorites);
    }, [favorites]);

    return (
        <FavoriteContext.Provider value={{ favorites, addNewFavorite, removeFavorite }}>
            {children}
        </FavoriteContext.Provider>
    )
};

const useFavorite = (): IFavoriteContextData => {
    const context = useContext(FavoriteContext);

    if (!context) {
        throw new Error('useCharacter must be used within an AuthProvider');
    }

    return context;
};

export { FavoriteProvider, useFavorite }