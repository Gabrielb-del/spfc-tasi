import React, { useState, useEffect } from "react";
import {
    Box, Button, IconButton, TextField, Typography,
    Table, TableHead, TableRow, TableCell, TableBody, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions, Alert, CircularProgress, Select, MenuItem
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import {
    getProdutos,
    createProduto,
    updateProduto,
    deleteProduto,
} from "../../api/apiProdutos";
import { getCategorias } from "../../api/apiCategorias";


export default function ProdutosAdmin() {
    const { token, isAdmin } = useAuth();
    const usuario = "010623023";

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [categorias, setCategorias] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        nome: "",
        quantidade: 0,
        preco: 0,
        categoria: "",
        descricao: "",
        imagem: "",
    });

    const loadProdutos = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getProdutos(token, usuario); // sem produtoId aqui
            console.log("Data produtos:", data);
            setProdutos(data);
        } catch (err) {
            setError("Erro ao carregar produtos");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadCategorias = async () => {
        try {
            const data = await getCategorias(token);
            setCategorias(data);
        } catch (err) {
            console.error("Erro ao carregar categorias:", err);
        }
    };

    useEffect(() => {
        if (token) {
            loadCategorias();
            loadProdutos();
        }
    }, [token]);

    const openCreateModal = () => {
        setEditId(null);
        setFormData({
            nome: "",
            quantidade: 0,
            preco: 0,
            categoria: "",
            descricao: "",
            imagem: "",
        });
        setModalOpen(true);
    };

    const openEditModal = (produto) => {
        setEditId(produto._id);
        setFormData({
            nome: produto.nome,
            quantidade: produto.quantidade,
            preco: produto.preco,
            categoria: produto.categoria,
            descricao: produto.descricao,
            imagem: produto.imagem,
        });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setError("");
        setEditId(null);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((old) => ({
            ...old,
            [name]: name === "quantidade" || name === "preco" ? Number(value) : value,
        }));
    };


    const saveProduto = async () => {
        console.log("Tentando salvar produto:", formData);
        if (!formData.nome.trim()) {
            setError("Nome é obrigatório");
            return;
        }
        setError("");
        try {
            if (editId) {
                await updateProduto(token, { id: editId, ...formData });
            } else {
                await createProduto(token, formData);
            }
            closeModal();
            await loadProdutos();
        } catch (err) {
            setError("Erro ao salvar produto");
            console.error(err);
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Confirma exclusão do produto?")) return;
        setError("");
        try {
            await deleteProduto(token, id);
            await loadProdutos();
        } catch (err) {
            setError("Erro ao excluir produto");
            console.error(err);
        }
    };

    return (
        <Box p={4} component={Paper} elevation={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5">Produtos</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateModal}>
                    Novo produto
                </Button>
            </Box>

            {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}

            {loading ? (
                <Box display="flex" justifyContent="center" py={5}>
                    <CircularProgress />
                </Box>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Quantidade</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Imagem</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtos.map((prod) => (
                            <TableRow key={prod._id} hover>
                                <TableCell>{prod._id}</TableCell>
                                <TableCell>{prod.nome}</TableCell>
                                <TableCell>{prod.quantidade}</TableCell>
                                <TableCell>{prod.preco.toFixed(2)}</TableCell>
                                <TableCell>{prod.categoria}</TableCell>
                                <TableCell>{prod.descricao}</TableCell>
                                <TableCell>
                                    {prod.imagem ? (
                                        <img src={prod.imagem} alt={prod.nome} style={{ maxWidth: 80, maxHeight: 60 }} />
                                    ) : (
                                        "-"
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => openEditModal(prod)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(prod._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}


            <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
                <DialogTitle>{editId ? "Editar produto" : "Novo produto"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Quantidade"
                        name="quantidade"
                        type="number"
                        value={formData.quantidade}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Preço"
                        name="preco"
                        type="number"
                        value={formData.preco}
                        onChange={handleChange}
                        margin="dense"
                    />
                    <Select
                        fullWidth
                        label="Categoria"
                        name="categoria"
                        value={formData.categoria}
                        onChange={(e) => setFormData(old => ({ ...old, categoria: e.target.value }))}
                        margin="dense"
                        displayEmpty
                    >
                        {categorias.map(cat => (
                            <MenuItem key={cat._id} value={cat.nome}>
                                {cat.nome}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        fullWidth
                        label="Descrição"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        margin="dense"
                        multiline
                        rows={3}
                    />
                    <TextField
                        fullWidth
                        label="URL da Imagem"
                        name="imagem"
                        value={formData.imagem}
                        onChange={handleChange}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button variant="contained" onClick={saveProduto}>
                        {editId ? "Salvar" : "Criar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
