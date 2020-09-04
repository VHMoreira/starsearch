import React from 'react';
import { Switch, Route } from "react-router-dom";

import Search from '../pages/Search';
import Character from '../pages/Character';
import Film from '../pages/Film';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/character" exact component={Character} />
            <Route path="/character/film/:filmIndex" component={Film} />
        </Switch>
    );
}

export default Routes;