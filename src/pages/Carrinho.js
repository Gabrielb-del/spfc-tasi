import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../contexts/CarrinhoContext';
import {
    Container, Typography, Button, Box, TextField, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Carrinho() {
    const navigate = useNavigate();
    const { itens, removerDoCarrinho, alterarQuantidade, limparCarrinho } = useCarrinho();

    const total = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Carrinho de Compras</Typography>

            {itens.length === 0 ? (
                <Typography>Seu carrinho está vazio.</Typography>
            ) : (
                <>
                    {itens.map((item) => (
                        <Box key={item._id} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
                            <Box
                                component="img"
                                src={item.imagem}
                                alt={item.nome}
                                sx={{
                                    maxWidth: '15%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: 2,
                                    boxShadow: 3
                                }}
                            />
                            <Box sx={{ py: 2, flexGrow: 1 }}>
                                <Typography variant="h6">{item.nome}</Typography>
                                <Typography>R$ {item.preco.toFixed(2)}</Typography>

                                <Box display="flex" alignItems="center" gap={1} mt={1}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => alterarQuantidade(item._id, -1)}
                                        disabled={item.quantidade <= 1}
                                    >-</Button>
                                    <Typography>{item.quantidade}</Typography>
                                    <Button
                                        variant="outlined"
                                        onClick={() => alterarQuantidade(item._id, 1)}
                                    >+</Button>
                                </Box>

                                <Button
                                    color="error"
                                    onClick={() => removerDoCarrinho(item._id)}
                                    sx={{ mt: 1 }}
                                >
                                    Remover
                                </Button>
                            </Box>
                        </Box>
                    ))}

                    <Typography variant="h6" mt={2}>Total: R$ {total.toFixed(2)}</Typography>

                    <Box mt={3} display="flex" gap={2}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#CC0000', '&:hover': { backgroundColor: '#990000' } }}
                            onClick={() => navigate('/checkout')}
                        >
                            Finalizar Compra
                        </Button>
                        <Button variant="outlined" color="error" onClick={limparCarrinho}>
                            Limpar Carrinho
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
}