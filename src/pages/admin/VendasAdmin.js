import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Paper, Box,
  CircularProgress, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../contexts/AuthContext';

const API = 'https://backend-completo.vercel.app/app/venda';

export default function VendasAdmin() {
  const { token } = useAuth();         
  const [vendas, setVendas]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro]       = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const carregarVendas = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API, { headers });

      if (Array.isArray(res.data)) setVendas(res.data);
      else {
        setErro(res.data.error || 'Formato inesperado da resposta');
        setVendas([]);
      }
    } catch (err) {
      console.error(err);
      setErro('Falha ao carregar vendas');
    } finally {
      setLoading(false);
    }
  };

  const excluirVenda = async (id) => {
    if (!window.confirm('Excluir esta venda?')) return;
    try {
      await axios.delete(API, {        
        headers,
        data: { id }
      });
      setVendas((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar venda');
    }
  };

  useEffect(() => { if (token) carregarVendas(); }, [token]);


  if (loading) return (
    <Container sx={{ mt: 4, textAlign:'center' }}>
      <CircularProgress />
    </Container>
  );

  if (erro) return (
    <Container sx={{ mt: 4, textAlign:'center' }}>
      <Typography color="error">{erro}</Typography>
    </Container>
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Vendas Realizadas</Typography>

      {vendas.length === 0 ? (
        <Typography>Nenhuma venda encontrada.</Typography>
      ) : (
        vendas.map((venda) => (
          <Paper key={venda._id} sx={{ p: 2, mb: 2 }}>
            <Typography><b>Cliente:</b> {venda.nomeCliente}</Typography>
            <Typography><b>Usuário:</b> {venda.usuario}</Typography>
            <Typography><b>Data:</b> {new Date(venda.data).toLocaleDateString()}</Typography>

            <Typography sx={{ mt: 1 }}><b>Produtos:</b></Typography>
            <ul style={{ marginTop: 4 }}>
              {venda.produtos.map((p, i) => (
                <li key={i}>{p.nome} — {p.quantidade}x — R$ {p.preco.toFixed(2)}</li>
              ))}
            </ul>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => excluirVenda(venda._id)}
              sx={{ mt: 1 }}
            >
              Deletar
            </Button>
          </Paper>
        ))
      )}
    </Container>
  );
}