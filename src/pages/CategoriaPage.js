import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Grid, CircularProgress, Container } from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

export default function CategoriaPage() {
    const { nome } = useParams();

    const slugToNome = {
        camisetas: "Camisetas",
        blusas: "Blusas",
        calcas: "Calças",
        moletom: "Moletom",
        camisa_polo: "Camisa Polo",
    };
    const categoriaReal = slugToNome[nome];

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProdutos() {
            setLoading(true);
            try {
                const userIdPublico = '010623023';
                const res = await axios.get(`https://backend-completo.vercel.app/app/produtos/${userIdPublico}`);
                console.log('Produtos recebidos:', res.data);
                console.log('Categorias encontradas:', res.data.map(p => p.categoria));
                console.log('Categoria filtrada:', categoriaReal);

                const filtrados = res.data.filter(produto => {
                    if (!produto.categoria) return false;
                    return produto.categoria.trim().toLowerCase() === categoriaReal.trim().toLowerCase();
                });

                setProdutos(filtrados);
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
                setProdutos([]);
            } finally {
                setLoading(false);
            }
        }

        if (categoriaReal) fetchProdutos();
    }, [categoriaReal]);
    return (
        <div>
            <Container maxWidth={false} sx={{ px: 4 }}>

                <Typography variant="h5" fontWeight="bold" mb={2} mt={4}>
                    {categoriaReal}
                </Typography>
            </Container>



            {loading ? (
                <CircularProgress />
            ) : produtos.length === 0 ? (
                <Typography variant="h6" mx={4} mt={1}>Nenhum produto encontrado.</Typography>
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {produtos.map((produto) => (
                        <Grid item xs={12} sm={6} md={4} key={produto._id}>
                            <Link to={`/produto/${encodeURIComponent(produto.nome)}`} style={{ textDecoration: 'none' }}>
                            <ProductCard produto={produto} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}
