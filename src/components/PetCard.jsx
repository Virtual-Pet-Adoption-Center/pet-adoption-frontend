import * as React from 'react';
import PetLogo from '../assests/pet_logo.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Card, CardHeader, CardMedia, CardContent, Avatar,
    IconButton, Typography, Button, Dialog,
    DialogContent, DialogActions, Box, DialogTitle
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api, { pets_api } from '../services/api';
import { format } from 'date-fns';
import { moodColors } from '../utils/utils'; 

export const CloseIconHandling = ({ onClose }) => {
    return (
        <Box>
            <Box
                onClick={onClose}
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
    )
}

const PetCard = ({ id, name, species, age, personality, mood, adapted, adapted_date, onEdit, onPetSubmitSuccess }) => {
    const moodColor = moodColors[mood] || { button: 'grey', border: '#e91e63' };
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openAdaptDialog, setOpenAdaptDialog] = React.useState(false);
    const [openDetailDialog, setOpenDetailDialog] = React.useState(false);

    const handleDeleteConfirm = async (id) => {
        try {
            const res = await api.delete(`${pets_api?.deletePet}/${id}`);
            onPetSubmitSuccess?.();
        } catch (err) {
            console.error("Error getting Delete Pet::", err)
        }
        setOpenDeleteDialog(false);
    };

    const handleAdaptConfirm = async (id) => {
        try {
            const res = await api.patch(`${pets_api?.adoptPet}/${id}/adopt`);
            onPetSubmitSuccess?.();
        } catch (err) {
            console.error("Error getting on Adopting::", err);
        }
        setOpenAdaptDialog(false);
    };

    return (
        <>
            <Card
                onClick={() => setOpenDetailDialog(true)}
                sx={{
                    maxWidth: 300,
                    margin: '10px',
                    flex: '1 1 300px',
                    border: `2px solid ${moodColor?.border}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    position: 'relative'
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: '#616161' }} aria-label="pet">
                            {name?.[0] || 'P'}
                        </Avatar>
                    }
                    action={
                        <Box onClick={e => e.stopPropagation()}>
                            <IconButton aria-label="edit" size="small" onClick={onEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" size="small" sx={{ color: 'red' }} onClick={() => setOpenDeleteDialog(true)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {age} {age === 1 ? 'year' : 'years'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {personality}
                        </Typography>
                    </Box>
                    <Button
                        size='small'
                        disabled={adapted === true}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenAdaptDialog(true);
                        }}
                        sx={{
                            backgroundColor: adapted === false ? '#616161' : '#bdbdbd',
                            color: 'white',
                            width: '100%',
                            borderRadius: 2
                        }}
                    >
                        {adapted === false ? "Adopt Me" : `Adapted   ${adapted_date ? format(new Date(adapted_date), 'yyyy-MM-dd') : ''}`}
                    </Button>
                </CardContent>
                <Button size='small' sx={{ backgroundColor: moodColor?.button, color: 'white', width: '100%', borderRadius: 0 }}>
                    {mood}
                </Button>
            </Card>

            {/* Pet Detail Dialog */}
            <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)} maxWidth="sm" fullWidth>
                <CloseIconHandling onClose={() => setOpenDetailDialog(false)} />
                <DialogTitle>
                    {name}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1"><strong>Species:</strong> {species}</Typography>
                    <Typography variant="body1"><strong>Age:</strong> {age} {age === 1 ? 'year' : 'years'}</Typography>
                    <Typography variant="body1"><strong>Personality:</strong> {personality}</Typography>
                    <Typography variant="body1"><strong>Mood:</strong> {mood}</Typography>
                    <Typography variant="body1"><strong>Status:</strong> {adapted ? `Adapted on ${adapted_date}` : 'Available for adoption'}</Typography>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <CloseIconHandling onClose={() => setOpenDeleteDialog(false)} />
                <DialogContent>
                    Are you sure you want to delete <strong>{name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDeleteConfirm(id)} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Adoption Confirmation */}
            <Dialog open={openAdaptDialog} onClose={() => setOpenAdaptDialog(false)}>
                <CloseIconHandling onClose={() => setOpenAdaptDialog(false)} />
                <DialogContent>
                    Are you sure you want to ADOPT <strong>{name}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAdaptConfirm(id)} color="success" variant="contained">
                        Adopt
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default PetCard;