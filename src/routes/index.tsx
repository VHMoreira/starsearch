import React from 'react';
import { Switch, Route } from "react-router-dom";

import Search from '../pages/Search';
import Character from '../pages/Character';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/character" component={Character} />
        </Switch>
    );
}

export default Routes;