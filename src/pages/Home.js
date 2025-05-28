import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import CarouselBanner from '../components/CarouselBanner';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const userIdPublico = '010623023';

                const res = await axios.get(`https://backend-completo.vercel.app/app/produtos/${userIdPublico}`);
                console.log('Produtos recebidos:', res.data);

                setProdutos(res.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    const lancamentos = shuffle(produtos).slice(0, 5);
    const maisVendidos = shuffle(produtos).slice(0, 5);
    const recomendados = shuffle(produtos).slice(0, 5);

    const renderSection = (title, items) => (
        <Box my={4}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                {title}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {items.map((produto) => (
                    <Grid item key={produto._id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/produto/${encodeURIComponent(produto.nome)}`} style={{ textDecoration: 'none' }}>
                            <ProductCard produto={produto} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    return (
        <>
            <CarouselBanner />
            <Container disableGutters maxWidth={false} sx={{ px: 4 }}>

                {renderSection('Lançamentos', lancamentos)}
                {renderSection('Mais Vendidos', maisVendidos)}
                {renderSection('Recomendados', recomendados)}
            </Container>
        </>
    );
};

export default Home;