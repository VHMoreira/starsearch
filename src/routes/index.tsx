import React from 'react';
import { Switch, Route } from "react-router-dom";

import Search from '../pages/Search';
import Character from '../pages/Character';
import Film from '../pages/Film';
import Vehicle from '../pages/Vehicle';
import Starship from '../pages/Starship';
import ErrorPage from '../pages/ErrorPage';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/error" component={ErrorPage} />
            <Route path="/character" exact component={Character} />
            <Route path="/character/film/:filmIndex" component={Film} />
            <Route path="/character/vehicle/:vehicleIndex" component={Vehicle} />
            <Route path="/character/starship/:starshipIndex" component={Starship} />
        </Switch>
    );
}

export default Routes;