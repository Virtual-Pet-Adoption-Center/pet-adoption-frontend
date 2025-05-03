import React from 'react';
import { Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const NoPetsPlaceholder = () => {
  return (
    <Box
      sx={{
        height: '100%',
        textAlign: 'center',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9e9e9e',
      }}
    >
      <PetsIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        No Pets Available
      </Typography>
      <Typography variant="body2">
        Try adding a new pet or check back later.
      </Typography>
    </Box>
  );
};

export default NoPetsPlaceholder;