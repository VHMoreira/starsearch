import React, { useMemo } from 'react';

import { Container } from './styles';
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
                <section>
                    <span>Modelo:</span> {starship.model}
                </section>
                <section>
                    <span>Montadora:</span> {starship.manufacturer}
                </section>
                <section>
                    <span>Preço:</span> {starship.cost_in_credits}
                </section>
                <section>
                    <span>Tamanho:</span> {starship.length} m
                </section>
                <section>
                    <span>Velocidade máxima:</span> {starship.max_atmosphering_speed} Km/h
                </section>
                <section>
                    <span>Equipe:</span> {starship.crew}
                </section>
                <section>
                    <span>Passageiros:</span> {starship.passengers}
                </section>
                <section>
                    <span>Capacidade de carga:</span> {starship.cargo_capacity}
                </section>
                <section>
                    <span>Consumo:</span> {starship.consumables}
                </section>
                <section>
                    <span>Taxa de Hyperdrive:</span> {starship.hyperdrive_rating}
                </section>
                <section>
                    <span>MGLT:</span> {starship.MGLT}
                </section>
                <section>
                    <span>Classe da nave:</span> {starship.starship_class}
                </section>
            </Content>
        </Container>
    );
};

export default Starship;