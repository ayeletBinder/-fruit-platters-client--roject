
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useTheme } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '150px',
        py: 4,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Stack direction="row" spacing={1} justifyContent="center">
            <img src="./pictures/לוגו מנגו.png" alt="Footer Image" width="200" height="50" />

          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
           מנגו
           .
           מגשי פירות מעוצבים בסטייל בטעם שלך בהזמנה אישית 
           
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
        <IconButton color="inherit" aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Pinterest">
          <PinterestIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter">
        <TwitterIcon/>
        </IconButton>

      </Box>
      <Typography variant="caption" align="center" sx={{ mt: 1 }}>
        All winnings are reserved mango. &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;