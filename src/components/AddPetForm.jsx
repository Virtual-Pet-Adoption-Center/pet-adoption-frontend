import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api, { pets_api } from '../services/api';

const AddPetForm = ({ handleCloseModal, mode = "create", petData = {}, onPetSubmitSuccess }) => {
    const [formValues, setFormValues] = useState({
        name: petData.name || '',
        age: petData.age || '',
        species: petData.species || '',
        personality: petData.personality || ''
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'create') {
            try {
                const res = await api.post(pets_api?.addNewPet, formValues);
                if (res?.status === 201) {
                    onPetSubmitSuccess?.();
                } else {
                    console.log("Error:: Cannot Create::")
                }
            } catch (err) {
                console.error("Error getting on Add New Pet::", err);
            }
        } else {
            try {
                const res = await api.put(`${pets_api.updatePetData}/${petData._id}`, formValues);
                if (res?.status === 200) {
                    onPetSubmitSuccess?.();
                } else {
                    console.log("Error:: Cannot Update::")
                }
            } catch (err) {
                console.error("Error getting on Update Pet ID::", petData.id)
            }
        }
        handleCloseModal();
    };

    return (
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
    );
};

export default AddPetForm;