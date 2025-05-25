import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, TextField, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Paper
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const urlBase = 'https://backend-completo.vercel.app/app/categorias';

export default function CategoriasAdmin() {
  const { token } = useAuth();

  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState('');
  const [editId, setEditId] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchCategorias = async () => {
    try {
      const { data } = await axios.get(urlBase, { headers });
      setCategorias(data);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err.response?.data || err.message);
    }
  };

  const salvar = async () => {
    if (!nome.trim()) return;

    try {
      if (editId) {
        await axios.put(`${urlBase}/${editId}`, { cat_nome: nome }, { headers });
      } else {
        await axios.post(urlBase, { cat_nome: nome }, { headers });
      }
      setNome('');
      setEditId(null);
      fetchCategorias();
    } catch (err) {
      console.error('Erro ao salvar categoria:', err.response?.data || err.message);
    }
  };

  const deletar = async (id) => {
    if (!window.confirm('Excluir categoria?')) return;
    try {
      await axios.delete(`${urlBase}/${id}`, { headers });
      fetchCategorias();
    } catch (err) {
      console.error('Erro ao deletar categoria:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchCategorias();
  }, [token]);

  return (
    <Box p={4} component={Paper} elevation={3}>
      <Typography variant="h5" gutterBottom>Gerenciar Categorias</Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          label="Nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Button variant="contained" onClick={salvar}>
          {editId ? 'Atualizar' : 'Criar'}
        </Button>
      </Box>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Nome</strong></TableCell>
            <TableCell><strong>Ações</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.id}</TableCell>
              <TableCell>{cat.cat_nome}</TableCell>
              <TableCell>
                <Button size="small" onClick={() => { setNome(cat.cat_nome); setEditId(cat.id); }}>
                  Editar
                </Button>
                <Button size="small" color="error" onClick={() => deletar(cat.id)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
