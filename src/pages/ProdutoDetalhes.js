import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import axios from 'axios';

import { Container, Typography, CircularProgress, Box } from '@mui/material';

const ProdutoDetalhes = () => {
    const { nome } = useParams();
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { adicionarAoCarrinho } = useCarrinho();

    useEffect(() => {
        async function fetchProduto() {
            setLoading(true);
            setError(null);
            try {
                const userIdPublico = '010623023';
                const url = `https://backend-completo.vercel.app/app/produtos/${userIdPublico}/${encodeURIComponent(nome)}`;
                console.log('Buscando produto em:', url);
                const res = await axios.get(url);

                if (res.status === 200) {
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        setProduto(res.data[0]);
                    } else {
                        setError('Produto não encontrado.');
                        setProduto(null);
                    }
                } else {
                    setError('Erro ao carregar produto.');
                    setProduto(null);
                }
            } catch (err) {
                console.error('Erro na requisição do produto:', err);
                setError('Erro ao carregar produto.');
                setProduto(null);
            } finally {
                setLoading(false);
            }
        }

        if (nome) {
            fetchProduto();
        } else {
            setLoading(false);
            setError('Nome do produto não especificado.');
        }
    }, [nome]);

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 6 }}>
                <CircularProgress />
                <Typography mt={2}>Carregando...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: 'center', mt: 6 }}>
                <Typography color="error" variant="h6">{error}</Typography>
            </Container>
        );
    }

    if (!produto) {
        return (
            <Container sx={{ textAlign: 'center', mt: 6 }}>
                <Typography variant="h6">Produto não encontrado.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
                <Box flex={1} display="flex" justifyContent="center">
                    <Box
                        component="img"
                        src={produto.imagem}
                        alt={produto.nome}
                        sx={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: 500,
                            objectFit: 'contain',
                            borderRadius: 2,
                            boxShadow: 3
                        }}
                    />
                </Box>

                <Box flex={1}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {produto.nome}
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        R$ {(produto?.preco ?? 0).toFixed(2)}
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                        {produto.descricao}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Categoria: {produto.categoria}
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <button
                            style={{
                                backgroundColor: '#D50000',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                            onClick={() => {
                                adicionarAoCarrinho(produto);
                                alert('Produto adicionado ao carrinho!');
                            }}
                        >
                            🛒 Adicionar ao carrinho
                        </button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ProdutoDetalhes;
