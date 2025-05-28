import React from 'react';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { Container, Typography, Button, Box } from '@mui/material';

const Carrinho = () => {
    const { itens, removerDoCarrinho, limparCarrinho } = useCarrinho();

    const total = itens.reduce((acc, item) => acc + (item.preco || 0), 0);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Carrinho de Compras</Typography>

            {itens.length === 0 ? (
                <Typography>Seu carrinho está vazio.</Typography>
            ) : (
                <>
                    {itens.map((item) => (
                        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
                            <Box
                                component="img"
                                src={item.imagem}
                                alt={item.nome}
                                sx={{
                                    maxWidth: '15%',
                                    height: 'auto',
                                    maxHeight: 500,
                                    objectFit: 'contain',
                                    borderRadius: 2,
                                    boxShadow: 3
                                }}
                            />
                            <Box key={item._id} sx={{ py: 2 }}>

                                <Typography variant="h6">{item.nome}</Typography>
                                <Typography>R$ {item.preco.toFixed(2)}</Typography>
                                <Button color="error" onClick={() => removerDoCarrinho(item._id)}>Remover</Button>
                            </Box>
                        </Box>
                    ))}

                    <Typography variant="h6" sx={{ mt: 2 }}>Total: R$ {total.toFixed(2)}</Typography>

                    <Box sx={{ mt: 3 }}>
                        <Button variant="contained" color="primary" sx={{
                            backgroundColor: '#CC0000',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#990000'
                            }
                        }} onClick={() => alert('Compra finalizada!')}>
                            Finalizar Compra
                        </Button>
                        <Button variant="outlined" sx={{
                            color: '#CC0000'
                        
                            
                        }} onClick={limparCarrinho}>
                            Limpar Carrinho
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Carrinho;
