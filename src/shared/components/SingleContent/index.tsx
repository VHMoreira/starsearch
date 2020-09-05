import React from 'react';
import { Container } from './styles';

const SingleContent: React.FC = ({ children }) => {

    return (
        <Container>
            {children}
        </Container>
    );
};

export default SingleContent;