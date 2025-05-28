import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Obrigado() {
  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Obrigado pela compra!</Typography>
      <Typography variant="body1" mb={4}>Seu pedido foi registrado com sucesso.</Typography>
      <Button component={Link} to="/" variant="contained">
        Voltar para Home
      </Button>
    </Container>
  );
}