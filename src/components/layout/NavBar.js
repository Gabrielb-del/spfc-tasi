import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoSP from '../../img/logo-spfc.png';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ajuste o caminho se necessário

const NavBar = () => {
    const { isAdmin } = useAuth(); // usa o contexto

    return (
        <AppBar position="static" elevation={1} sx={{ backgroundColor: '#fff', color: '#000', overflow: 'visible', zIndex: 10 }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', minHeight: '80px', position: 'relative', zIndex: 10 }}>
                {/* ESQUERDA - Logo */}
                <Box sx={{ position: 'relative', height: '60px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Box
                            component="img"
                            src={LogoSP}
                            alt="SPFC"
                            sx={{
                                height: '80px',
                                position: 'absolute',
                                bottom: '-20px',
                                left: 0,
                            }}
                        />
                    </Link>
                </Box>

                {/* CENTRO - Botões dinâmicos */}
                <Box display="flex" gap={2}>
                    {isAdmin ? (
                        <>
                            <Button component={Link} to="/admin/categorias" color="inherit">Categorias</Button>
                            <Button component={Link} to="/admin/produtos" color="inherit">Produtos</Button>
                            <Button component={Link} to="/admin/vendas" color="inherit">Vendas</Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/camisetas" color="inherit">Camisetas</Button>
                            <Button component={Link} to="/blusas" color="inherit">Blusas</Button>
                            <Button component={Link} to="/calcas" color="inherit">Calças</Button>
                            <Button component={Link} to="/moletom" color="inherit">Moletom</Button>
                            <Button component={Link} to="/camisapolo" color="inherit">Camisa Polo</Button>
                        </>
                    )}
                </Box>

                {/* DIREITA - Login */}
                <Box display="flex" alignItems="center" gap={1}>
                    {isAdmin ? (
                        <>
                            <Button component={Link} to="/login" color="inherit">
                                Sair <LogoutIcon />
                            </Button>
                        </>

                    ) : (<Button component={Link} to="/login" color="inherit">
                        Login Admin <PersonIcon />
                    </Button>
                    )}

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
