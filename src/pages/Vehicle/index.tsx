import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, ContentList } from './styles';
import { useParams, useHistory } from 'react-router-dom';
import { useCharacter } from '../../hooks/Character';
import { Content } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '../../shared/components/Header';
import SingleContent from '../../shared/components/SingleContent';

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
    films: string[];
    pilots: string[];
}

interface Film {
    title: string;
}

interface Pilot {
    name: string;
}

const Vehicle: React.FC = () => {
    const { vehicleIndex } = useParams();
    const history = useHistory();
    const { character } = useCharacter();
    const [vehicle, setVehicle] = useState<Vehicle>();
    const [films, setFilms] = useState<Film[]>([]);
    const [pilots, setPilots] = useState<Pilot[]>([]);


    useEffect(() => {
        async function loadVehicle() {
            const currentsVehicle = character.vehicles[vehicleIndex];

            const { films, pilots } = currentsVehicle;

            const filmsUrls = films.map((film) => {
                return axios.get<Film>(film);
            });

            const pilotsUrls = pilots.map((pilot) => {
                return axios.get<Pilot>(pilot);
            });

            const responsesFilms = await Promise.all(filmsUrls);
            const responsesPilots = await Promise.all(pilotsUrls);

            setVehicle(currentsVehicle);
            setFilms(responsesFilms.map(response => response.data));
            setPilots(responsesPilots.map(response => response.data));
        }

        loadVehicle();
    }, [vehicleIndex]);

    return (
        <Container>
            {vehicle &&
                <>
                    <Header>
                        <div>
                            <FiArrowLeft size={30} onClick={history.goBack} />
                        </div>
                        <h1>{vehicle.name}</h1>
                    </Header>
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
                        {pilots &&
                            <ContentList>
                                <span>Pilotos:</span>
                                {pilots.map((pilots) => {
                                    return (
                                        <section>
                                            {pilots.name}
                                        </section>
                                    );
                                })}
                            </ContentList>
                        }
                        <ContentList>
                            <span>Filmes:</span>
                            {films.map((film) => {
                                return (
                                    <section>
                                        {film.title}
                                    </section>
                                );
                            })}
                        </ContentList>
                    </Content>
                </>
            }
        </Container>
    );
};

export default Vehicle;