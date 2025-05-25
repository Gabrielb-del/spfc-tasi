import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Tela de Login administrativa
 * --------------------------------------------------
 * – Campos necessários pelo backend: usu_email & usu_senha
 * – Usa AuthContext para fazer login e armazenar o token
 * – Redireciona para /admin após sucesso
 */
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const sucesso = await login(data.usuario, data.senha);
    if (sucesso) {
      navigate("/admin", { replace: true });
    } else {
      alert("Usuário ou senha inválidos. Tente novamente!");
    }
  };


  if (user) return <Navigate to="/admin" replace />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login administrativo
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Usuário"
            fullWidth
            margin="normal"
            {...register("usuario", { required: "Informe o usuário" })}
            error={Boolean(errors.usuario)}
            helperText={errors.usuario?.message}
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register("senha", { required: "Informe a senha" })}
            error={Boolean(errors.senha)}
            helperText={errors.senha?.message}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
