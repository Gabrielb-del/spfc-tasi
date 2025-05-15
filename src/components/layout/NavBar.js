import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoSP from '../../img/logo-spfc.png'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const theme = useTheme();

    return (
        <AppBar position="static" elevation={1} sx={{ backgroundColor: '#fff', color: '#000', overflow: 'visible', zIndex: 10}}>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', minHeight: '80px', position: 'relative', zIndex: 10}}>
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
                            bottom: '-20px', // faz a logo sair pra fora da navbar
                            left: 0,
                        }}
                    />
                    </Link>
                </Box>

                {/* CENTRO - Menu */}
                <Box display="flex" gap={2}>
                    <Button component={Link} to="/camisetas" color="inherit">Camisetas</Button>
                    <Button component={Link} to="/blusas" color="inherit">Blusas</Button>
                    <Button component={Link} to="/calcas" color="inherit">Calças</Button>
                    <Button component={Link} to="/moletom" color="inherit">Moletom</Button>
                    <Button component={Link} to="/camisapolo" color="inherit">Camisa Polo</Button>
                </Box>

                {/* DIREITA - Login */}
                <Box display="flex" alignItems="center" gap={1}>
                    <Button color="inherit">Login Admin <PersonIcon /></Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;