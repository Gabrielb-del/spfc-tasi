import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import {
    getCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} from "../../api/apiCategorias";

export default function CategoriasAdmin() {
    const { token } = useAuth();

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const [modalOpen, setModalOpen] = useState(false);
    const [formNome, setFormNome] = useState("");
    const [editId, setEditId] = useState(null);


    const loadCategorias = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getCategorias(token);
            setCategorias(data);
        } catch (err) {
            setError("Erro ao carregar categorias");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) loadCategorias();
    }, [token]);


    const openCreateModal = () => {
        setEditId(null);
        setFormNome("");
        setModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditId(cat._id);
        setFormNome(cat.nome);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setFormNome("");
        setEditId(null);
    };


    const saveCategoria = async () => {
        if (!formNome.trim()) {
            setError("Nome é obrigatório");
            return;
        }
        setError("");
        try {
            if (editId) {
                await updateCategoria(token, editId, formNome);
            } else {
                await createCategoria(token, formNome);
            }
            closeModal();
            await loadCategorias();
        } catch (err) {
            setError("Erro ao salvar categoria");
            console.error(err);
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Confirma exclusão da categoria?")) return;
        setError("");
        try {
            await deleteCategoria(token, id);
            await loadCategorias();
        } catch (err) {
            setError("Erro ao excluir categoria");
            console.error(err);
        }
    };

    return (
        <Box p={4} component={Paper} elevation={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5">Categorias</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={openCreateModal}>
                    Nova categoria
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
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((cat) => (
                            <TableRow key={cat._id} hover>
                                <TableCell>{cat._id}</TableCell>
                                <TableCell>{cat.nome}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => openEditModal(cat)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}


            <Dialog open={modalOpen} onClose={closeModal} maxWidth="xs" fullWidth>
                <DialogTitle>{editId ? "Editar categoria" : "Nova categoria"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Nome da categoria"
                        value={formNome}
                        onChange={(e) => setFormNome(e.target.value)}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button variant="contained" onClick={saveCategoria}>
                        {editId ? "Salvar" : "Criar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}