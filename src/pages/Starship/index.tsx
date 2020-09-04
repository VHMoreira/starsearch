import React, { useMemo } from 'react';

import { Container, SingleContent } from './styles';
import { useParams } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';
import { Content } from './styles';

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

const Starship: React.FC = () => {
    const { starshipIndex } = useParams();
    const { character } = useCharacter();

    const starship = useMemo<Starship>(() => {
        return character.starships[starshipIndex];
    }, [character.starships, starshipIndex]);

    return (
        <Container>
            <header>
                <h1>{starship.name}</h1>
            </header>
            <Content>
                <SingleContent>
                    <span>Modelo:</span> {starship.model}
                </SingleContent>
                <SingleContent>
                    <span>Montadora:</span> {starship.manufacturer}
                </SingleContent>
                <SingleContent>
                    <span>Preço:</span> {starship.cost_in_credits}
                </SingleContent>
                <SingleContent>
                    <span>Tamanho:</span> {starship.length} m
                </SingleContent>
                <SingleContent>
                    <span>Velocidade máxima:</span> {starship.max_atmosphering_speed} Km/h
                </SingleContent>
                <SingleContent>
                    <span>Equipe:</span> {starship.crew}
                </SingleContent>
                <SingleContent>
                    <span>Passageiros:</span> {starship.passengers}
                </SingleContent>
                <SingleContent>
                    <span>Capacidade de carga:</span> {starship.cargo_capacity}
                </SingleContent>
                <SingleContent>
                    <span>Consumo:</span> {starship.consumables}
                </SingleContent>
                <SingleContent>
                    <span>Taxa de Hyperdrive:</span> {starship.hyperdrive_rating}
                </SingleContent>
                <SingleContent>
                    <span>MGLT:</span> {starship.MGLT}
                </SingleContent>
                <SingleContent>
                    <span>Classe da nave:</span> {starship.starship_class}
                </SingleContent>
            </Content>
        </Container>
    );
};

export default Starship;