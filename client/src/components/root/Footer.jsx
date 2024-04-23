import { Box, Grid, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ padding: '4rem 2rem', color: '#3f4144', marginTop: '2rem'}}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={4}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>About Us</Typography>
                        <Typography variant="body2" sx={{ fontSize: '1rem', width: { xs: '100%', sm: '50%' }, margin: '0 auto' }}>
                            We are a team of passionate individuals working to simplify lost item recovery.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>Contributors</Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                        <Link href="https://github.com/crizmo" color="inherit">Kurizu</Link><br />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>Contact Us</Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                        <Link href="mailto:quake@gmail.com" color="inherit">quake@gmail.com</Link><br />
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;