import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Snackbar,
    Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api, { pets_api } from '../services/api';
import SelectImage from './SelectImage';

const AddPetForm = ({ handleCloseModal, mode = "create", petData = {}, onPetSubmitSuccess }) => {
    const [formValues, setFormValues] = useState({
        name: petData.name || '',
        age: petData.age || '',
        species: petData.species || '',
        personality: petData.personality || '',
    });

    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("age", formValues.age);
        formData.append("species", formValues.species);
        formData.append("personality", formValues.personality);
        if (selectedImageFile) {
            formData.append("image", selectedImageFile);
        }

        try {
            const res = mode === 'create'
                ? await api.post(pets_api?.addNewPet, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                : await api.put(`${pets_api.updatePetData}/${petData._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

            if (res?.status === 200 || res?.status === 201) {
                setSuccessMessageOpen(true);
                onPetSubmitSuccess?.();
            } else {
                console.log("Error:: Cannot Submit::");
            }
        } catch (err) {
            console.error("Submission error:", err);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessageOpen(false);
        handleCloseModal();
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit}>
                <Box>
                    <Box
                        onClick={handleCloseModal}
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
                <Grid container spacing={2}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <FormControl fullWidth required>
                        <InputLabel id="species-label">Species</InputLabel>
                        <Select
                            labelId="species-label"
                            name="species"
                            value={formValues.species}
                            onChange={handleChange}
                            label="Species"
                            disabled={mode === 'edit'}
                        >
                            <MenuItem value="Dog">Dog</MenuItem>
                            <MenuItem value="Cat">Cat</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={formValues.age}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={mode === 'edit'}
                    />
                    <TextField
                        label="Personality"
                        name="personality"
                        value={formValues.personality}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <SelectImage onImageSelect={setSelectedImageFile} />

                    <div className='button-group'>
                        <Button
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ backgroundColor: "#616161", color: 'white' }}
                        >
                            {mode === 'edit' ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </Grid>
            </Box>

            <Snackbar
                open={successMessageOpen}
                autoHideDuration={1000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {mode === 'edit' ? 'Pet updated successfully!' : 'Pet added successfully!'}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddPetForm;
