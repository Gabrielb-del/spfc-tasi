import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box } from '@mui/material';
import banner1 from '../img/banner1.png';
import banner2 from '../img/banner2.png';
import banner3 from '../img/banner3.png';

const images = [banner1, banner2, banner3];

const CarouselBanner = () => {
    return (
        <Box
            sx={{
                marginTop: '1px', // depende da altura da sua NavBar
                position: 'relative',
                zIndex: 1, 
            }}
        >
            <Carousel
                animation="fade"
                indicators={false}
                interval={4000}
                navButtonsAlwaysInvisible
            >
                {images.map((image, i) => (
                    <Box key={i} sx={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                        <img
                            src={image}
                            alt={`banner-${i}`}
                            style={{ width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'top' }}
                        />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default CarouselBanner;