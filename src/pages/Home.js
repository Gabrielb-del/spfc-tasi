import React from 'react';
import { Container } from '@mui/material';
import CarouselBanner from '../components/CarouselBanner';

const Home = () => {
    return (
        <Container disableGutters maxWidth={false}>
            <CarouselBanner />
        </Container>
    );
};

export default Home;