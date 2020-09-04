import React, { useMemo } from 'react';

import { Container } from './styles';
import { useParams } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';
import { Content } from '../Search/styles';

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

const Vehicle: React.FC = () => {
    const { vehicleIndex } = useParams();
    const { character } = useCharacter();

    const vehicle = useMemo<Vehicle>(() => {
        return character.vehicles[vehicleIndex];
    }, [character.vehicles, vehicleIndex]);

    return (
        <Container>
            <header>
                <h1>{vehicle.name}</h1>
            </header>
            <Content>
                <section>
                    <span>Modelo:</span> {vehicle.model}
                </section>
                <section>
                    <span>Montadora:</span> {vehicle.manufacturer}
                </section>
                <section>
                    <span>Preço:</span> {vehicle.cost_in_credits}
                </section>
                <section>
                    <span>Velocidade máxima:</span> {vehicle.max_atmosphering_speed} Km/h
                </section>
                <section>
                    <span>Equipe:</span> {vehicle.crew}
                </section>
                <section>
                    <span>Passageiros:</span> {vehicle.passengers}
                </section>
                <section>
                    <span>Capacidade de carga:</span> {vehicle.cargo_capacity}
                </section>
                <section>
                    <span>Consumo:</span> {vehicle.consumables}
                </section>
                <section>
                    <span>Classe do veiculo:</span> {vehicle.vehicle_class}
                </section>
            </Content>
        </Container>
    );
};

export default Vehicle;