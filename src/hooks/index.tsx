import React from 'react';

import { CharacterProvider } from './Character';
import { FavoriteProvider } from './Favorite';

const AppProvider: React.FC = ({ children }) => (
    <FavoriteProvider>
        <CharacterProvider>
            {children}
        </CharacterProvider>
    </FavoriteProvider>
);

export default AppProvider;