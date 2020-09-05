import React, { useMemo } from 'react';

import { Container, SingleContent } from './styles';
import { useParams, useHistory } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';
import { Content } from './styles';
import { FiArrowLeft } from 'react-icons/fi';

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
    const history = useHistory();
    const { character } = useCharacter();

    const vehicle = useMemo<Vehicle>(() => {
        return character.vehicles[vehicleIndex];
    }, [character.vehicles, vehicleIndex]);

    return (
        <Container>
            <header>
                <div>
                    <FiArrowLeft size={30} onClick={history.goBack} />
                </div>
                <h1>{vehicle.name}</h1>
            </header>
            <Content>
                <SingleContent>
                    <span>Modelo:</span> {vehicle.model}
                </SingleContent>
                <SingleContent>
                    <span>Montadora:</span> {vehicle.manufacturer}
                </SingleContent>
                <SingleContent>
                    <span>Preço:</span> {vehicle.cost_in_credits}
                </SingleContent>
                <SingleContent>
                    <span>Tamanho:</span> {vehicle.length} m
                </SingleContent>
                <SingleContent>
                    <span>Velocidade máxima:</span> {vehicle.max_atmosphering_speed} Km/h
                </SingleContent>
                <SingleContent>
                    <span>Equipe:</span> {vehicle.crew}
                </SingleContent>
                <SingleContent>
                    <span>Passageiros:</span> {vehicle.passengers}
                </SingleContent>
                <SingleContent>
                    <span>Capacidade de carga:</span> {vehicle.cargo_capacity}
                </SingleContent>
                <SingleContent>
                    <span>Consumo:</span> {vehicle.consumables}
                </SingleContent>
                <SingleContent>
                    <span>Classe do veiculo:</span> {vehicle.vehicle_class}
                </SingleContent>
            </Content>
        </Container>
    );
};

export default Vehicle;