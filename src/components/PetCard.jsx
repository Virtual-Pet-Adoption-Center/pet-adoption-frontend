import * as React from 'react';
import PetLogo from '../assests/pet_logo.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Card, CardHeader, CardMedia, CardContent, Avatar,
    IconButton, Typography, Button, Dialog,
    DialogContent, DialogActions, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PetCard = ({ id, name, species, age, personality, mood, adapted, adapted_date, onEdit }) => {
    const moodColors = {
        Happy: { button: 'green', border: '#4caf50' },
        Excited: { button: 'orange', border: '#ff9800' },
        Sad: { button: 'red', border: '#f44336' }
    };

    const moodColor = moodColors[mood] || { button: 'grey', border: '#e91e63' };

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAdapt, setOpenAdapt] = React.useState(false);

    const handleDeleteConfirm = () => {
        setOpenDialog(false);
    };
    const handleAdaptConfirm = () => {
        setOpenAdapt(false);
    };

    return (
        <>
            <Card sx={{ maxWidth: 300, margin: '10px', flex: '1 1 300px', border: `2px solid ${moodColor?.border}`, borderRadius: '12px' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#616161' }} aria-label="pet">
                            {name?.[0] || 'P'}
                        </Avatar>
                    }
                    action={
                        <>
                            <IconButton aria-label="edit" size="small" onClick={onEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" size="small" sx={{ color: 'red' }} onClick={() => setOpenDialog(true)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                    title={name}
                    subheader={species}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={PetLogo}
                    alt={`${name} the ${species}`}
                />
                <CardContent>
                    <div className='container3' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Typography variant="body2" color="text.secondary">
                            {age} {age === 1 ? 'year' : 'years'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {personality}
                        </Typography>
                    </div>
                    <Button size='small' disabled={adapted === true}
                        onClick={() => setOpenAdapt(true)}
                        sx={{ backgroundColor: adapted === false ? '#616161' : '#bdbdbd', color: 'white', width: '100%', borderRadius: 2 }}>
                        {adapted === false ? "Adopt Me" : `Adapted   ${adapted_date}`}
                    </Button>
                </CardContent>
                <Button size='small' sx={{ backgroundColor: moodColor?.button, color: 'white', width: '100%', borderRadius: 0 }}>
                    {mood}
                </Button>
            </Card>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <Box>
                    <Box
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            cursor: 'pointer',
                            zIndex: 1
                        }}
                    >
                        <CloseIcon sx={{ color: 'white', backgroundColor: "#616161" }} />
                    </Box>
                </Box>
                <DialogContent>
                    Are you sure you want to delete <strong>{name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdapt} onClose={() => setOpenAdapt(false)}>
                <Box>
                    <Box
                        onClick={() => setOpenAdapt(false)}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            cursor: 'pointer',
                            zIndex: 1
                        }}
                    >
                        <CloseIcon sx={{ color: 'white', backgroundColor: "#616161" }} />
                    </Box>
                </Box>
                <DialogContent>
                    Are you sure to ADOPT <strong>{name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAdaptConfirm} color="success" variant="contained">
                        Adopt
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PetCard;
