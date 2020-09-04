import React from 'react';
import { Switch, Route } from "react-router-dom";

import Search from '../pages/Search';
import Character from '../pages/Character';
import Film from '../pages/Film';
import Vehicle from '../pages/Vehicle';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/character" exact component={Character} />
            <Route path="/character/film/:filmIndex" component={Film} />
            <Route path="/character/vehicle/:vehicleIndex" component={Vehicle} />
        </Switch>
    );
}

export default Routes;