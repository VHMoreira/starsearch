import React from 'react';

import { CharacterProvider } from './Character';

const AppProvider: React.FC = ({ children }) => (
    <CharacterProvider>
        {children}
    </CharacterProvider>
);

export default AppProvider;