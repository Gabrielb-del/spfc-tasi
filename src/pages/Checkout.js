import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, Box
} from '@mui/material';
import { useCarrinho } from '../contexts/CarrinhoContext';
import { createVenda } from '../api/apiVendas';

export default function Checkout() {
    const { itens, limparCarrinho } = useCarrinho();
    const [nomeCliente, setNomeCliente] = useState('');
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Adiciona esta linha

            const payload = {
                nomeCliente,
                usuario,
                data: new Date().toISOString().split('T')[0],
                produtos: itens.map(i => ({
                    nome: i.nome,
                    quantidade: i.quantidade,
                    preco: i.preco
                }))
            };
            await createVenda(token, payload);
            console.log("Payload enviado:", payload);
            limparCarrinho();
            navigate('/obrigado');
        } catch (err) {
            if (err.response) {
                console.error('Erro de resposta do servidor:', err.response.data);
            } else if (err.request) {
                console.error('Erro de requisição:', err.request);
            } else {
                console.error('Erro desconhecido:', err.message);
            }
            alert('Falha ao finalizar. Tente novamente.');
        }
    };

    if (itens.length === 0) return (
        <Container sx={{ mt: 4 }}>
            <Typography>Seu carrinho está vazio.</Typography>
        </Container>
    );

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Finalizar Compra</Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Nome do Cliente"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                    required
                />
                <TextField
                    label="Usuário fictício"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                <TextField label="Número do Cartão" required />
                <Box display="flex" gap={2}>
                    <TextField label="Validade (MM/AA)" required fullWidth />
                    <TextField label="CVV" required fullWidth />
                </Box>
                <Button type="submit" variant="contained" sx={{ backgroundColor: '#CC0000', '&:hover': { backgroundColor: '#990000' } }}>
                    Confirmar Pedido
                </Button>
            </Box>
        </Container>
    );
}