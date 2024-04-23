import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Paper, Typography } from '@mui/material';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div style={{ margin: "0 10%", padding: "2rem 0" }}>
            <Slider {...settings}>
    <div>
        <Paper elevation={3} 
            style={{ 
                padding: "2rem",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                color: "white",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Quake - Your Creative Community
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                Welcome to Quake, an innovative online platform where creators gather to share their work, connect with like-minded individuals, and explore the world of creativity.
            </Typography>
        </Paper>
    </div>
    <div>
        <Paper elevation={3} 
            style={{ 
                padding: "2rem",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                color: "white",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Explore Creativity
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                Dive into a world of endless possibilities. Discover amazing creations and talent across various creative fields.
            </Typography>
        </Paper>
    </div>
    <div>
        <Paper elevation={3} 
            style={{ 
                padding: "2rem",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                color: "white",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Connect and Collaborate
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                Join forces with fellow creators. Collaborate on projects, exchange ideas, and amplify your creative potential.
            </Typography>
        </Paper>
    </div>
    <div>
        <Paper elevation={3} 
            style={{ 
                padding: "2rem",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                color: "white",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Monetize Your Talent
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                Turn your passion into profit. Explore bounties and opportunities to earn money for your creative work.
            </Typography>
        </Paper>
    </div>
    <div>
        <Paper elevation={3} 
            style={{ 
                padding: "2rem",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                color: "white",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
            }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Share and Inspire
            </Typography>
            <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
                Share your creations and inspire others. Your work has the power to spark creativity and drive positive change.
            </Typography>
        </Paper>
    </div>
    {/* Add more slides as needed */}
</Slider>

        </div>
    );
};

export default Carousel;
