import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ produto }) => (
  <Card
    sx={{
      width: 220,            
      height: 340,          
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <CardMedia
      component="img"
      height="200"
      image={produto.imagem}
      alt={produto.nome}
      sx={{ objectFit: 'cover' }}
    />

    <CardContent sx={{ px: 1, py: 1 }}>
      
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{
          height: 48,                     
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {produto.nome}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        R$ {produto.preco.toFixed(2)}
      </Typography>
    </CardContent>
  </Card>
);

export default ProductCard;