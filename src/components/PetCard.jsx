import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Card, CardHeader, CardContent, Avatar,
    IconButton, Typography, Button, Dialog,
    DialogContent, DialogActions, Box, DialogTitle,
    Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api, { pets_api } from '../services/api';
import { format } from 'date-fns';
import { moodColors } from '../utils/utils';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import Logo from '../assests/new_logo.png';

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
    );
};

const PetCard = ({ id, name, species, age, personality, mood, adapted, adapted_date, onEdit, onPetSubmitSuccess }) => {
    const moodColor = moodColors[mood] || { button: 'grey', border: '#e91e63' };
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openAdaptDialog, setOpenAdaptDialog] = React.useState(false);
    const [openDetailDialog, setOpenDetailDialog] = React.useState(false);

    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleDeleteConfirm = async (id) => {
        try {
            const res = await api.delete(`${pets_api?.deletePet}/${id}`);
            if (res?.status === 200) {
                onPetSubmitSuccess?.();
                showSnackbar("Pet deleted successfully!");
            } else {
                console.error("::Can not Delete pet::");
            }
        } catch (err) {
            console.error("Error getting Delete Pet::", err);
        }
        setOpenDeleteDialog(false);
    };

    const handleAdaptConfirm = async (id) => {
        try {
            const res = await api.patch(`${pets_api?.adoptPet}/${id}/adopt`);
            if (res?.status === 200) {
                onPetSubmitSuccess?.();
                showSnackbar("Pet adopted successfully!");
            } else {
                console.error("::Can not Adopt pet::");
            }
        } catch (err) {
            console.error("Error getting on Adopting::", err);
        }
        setOpenAdaptDialog(false);
    };

    const handleDownloadCertificate = (e) => {
        e.stopPropagation();
        const pdf = new jsPDF();

        const img = new Image();
        img.src = Logo;

        img.onload = function () {
            pdf.addImage(img, 'PNG', 80, 10, 50, 50);

            pdf.setFontSize(20);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Certificate of Adoption', 105, 65, null, null, 'center');

            pdf.setFontSize(12);
            let y = 75;

            pdf.setFont('helvetica', 'normal');
            pdf.text('This certifies that ', 20, y);

            pdf.setFont('helvetica', 'bold');
            pdf.text(`${name}`, pdf.getTextWidth('This certifies that ') + 20, y);

            const offset1 = pdf.getTextWidth(`This certifies that ${name} `);
            pdf.setFont('helvetica', 'normal');
            pdf.text('the ', 20 + offset1, y);

            pdf.setFont('helvetica', 'bold');
            pdf.text(`${species}`, 20 + offset1 + pdf.getTextWidth('the '), y);

            const offset2 = offset1 + pdf.getTextWidth('the ') + pdf.getTextWidth(`${species} `);
            pdf.setFont('helvetica', 'normal');
            pdf.text(' has been adopted.', 20 + offset2, y);
            y += 10;

            pdf.setFont('helvetica', 'bold');
            pdf.text('Age:', 20, y);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`${age} ${age === 1 ? 'year' : 'years'}`, 30, y);
            y += 10;

            pdf.setFont('helvetica', 'bold');
            pdf.text('Personality:', 20, y);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`${personality}`, 45, y);
            y += 10;

            pdf.setFont('helvetica', 'bold');
            pdf.text('Mood:', 20, y);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`${mood}`, 35, y);
            y += 10;

            pdf.setFont('helvetica', 'bold');
            pdf.text('Date of Adoption:', 20, y);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`${adapted_date ? format(new Date(adapted_date), 'yyyy-MM-dd') : 'N/A'}`, 60, y);
            y += 20;

            pdf.setFont('helvetica', 'normal');
            pdf.text('Thank you for giving a loving home!', 20, y);
            y += 10;

            pdf.setFont('helvetica', 'italic');
            pdf.text(`Certificate issued on: ${format(new Date(), 'yyyy-MM-dd')}`, 20, y);

            pdf.save(`Adoption_Certificate_${name}.pdf`);

            showSnackbar("Certificate downloaded successfully!");
        };
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
                            {adapted === true && (
                                <IconButton aria-label="download" size="small" onClick={handleDownloadCertificate}>
                                    <DownloadIcon />
                                </IconButton>
                            )}
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
                <DialogTitle>{name}</DialogTitle>
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

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default PetCard;
