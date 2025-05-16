import React from 'react';
import { Container, Typography } from '@mui/material';
import CarouselBanner from '../components/CarouselBanner';

const Home = () => {
    return (
        <Container disableGutters maxWidth={false}>
            <CarouselBanner />
            <Typography>Teste</Typography>
        </Container>
    );
};

export default Home;