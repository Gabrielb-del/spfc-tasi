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
import { useAuth } from '../../contexts/AuthContext';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useCarrinho } from '../../contexts/CarrinhoContext';


const NavBar = () => {
    const { isAdmin, logout } = useAuth();
    const { itens } = useCarrinho();

    const handleLogout = () => {
        logout();
    };



    return (
        <AppBar position="static" elevation={1} sx={{ backgroundColor: '#fff', color: '#000', overflow: 'visible', zIndex: 10 }}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', minHeight: '80px', position: 'relative', zIndex: 10 }}>
                <Box sx={{ position: 'relative', height: '60px' }}>
                    {isAdmin ? (
                        <>
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
                        </>

                    ) : (<Link to="/" style={{ textDecoration: 'none' }}>
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
                    )}

                </Box>

                <Box display="flex" gap={2}>
                    {isAdmin ? (
                        <>
                            <Button component={Link} to="/admin/categorias" color="inherit">Categorias</Button>
                            <Button component={Link} to="/admin/produtos" color="inherit">Produtos</Button>
                            <Button component={Link} to="/admin/vendas" color="inherit">Vendas</Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/" color="inherit">Home</Button>
                            <Button color="inherit" component={Link} to="/categoria/camisetas">Camisetas</Button>
                            <Button color="inherit" component={Link} to="/categoria/blusas">Blusas</Button>
                            <Button color="inherit" component={Link} to="/categoria/calcas">Calças</Button>
                            <Button color="inherit" component={Link} to="/categoria/moletom">Moletom</Button>
                            <Button color="inherit" component={Link} to="/categoria/camisa_polo">Camisa Polo</Button>
                        </>
                    )}
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    {isAdmin ? (
                        <>
                            <Button onClick={handleLogout} component={Link} to="/" color="inherit">
                                Sair <LogoutIcon />
                            </Button>
                        </>

                    ) : (
                        <>
                            <Button component={Link} to="/carrinho" color="inherit">
                                ({itens.length})<LocalGroceryStoreIcon />
                            </Button>

                            <Button component={Link} to="/login" color="inherit">
                                Login Admin <PersonIcon />
                            </Button>
                        </>
                    )}

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
