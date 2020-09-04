import React, { useMemo } from 'react';

import { Container } from './styles';
import { useParams } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';

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
        </Container>
    );
};

export default Vehicle;