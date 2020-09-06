import axios from 'axios';

const swapi = axios.create({
    baseURL: '//swapi.dev/api',
});

export default swapi;