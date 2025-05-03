import React from 'react';
import Box from '@mui/material/Box';
import PetCard from '../components/PetCard.jsx';
import '../styles/Home.css';
import { useState } from 'react';
import { Modal } from '@mui/material';
import AddPetForm from './AddPetForm.jsx';
import api, { pets_api } from '../services/api';
import { useEffect } from 'react';

const PetList = ({ mood }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPet, setEditPet] = useState(null);
    const [pets, setPets] = useState([]);

    const handleEditClick = (pet) => {
        getPetData(pet?._id)
        setEditPet(pet);
        setIsModalOpen(true);
    };

    const getAllPetsData = async () => {
        try {
            const response = await api.get(pets_api.getAllPets);
            setPets(response?.data);
        } catch (err) {
            console.error("Error fetching on Get All Pets::", err)
        }
    }
    const getPetData = async (id) => {
        try {
            const res = await api.get(`${pets_api.getPetData}/${id}`);
            setEditPet(res?.data);
        } catch (err) {
            console.error("Error fetching on Pet::", err);
        }
    }
    const filterPetsByMood = async () => {
        try {
            if (mood === 'all') {
                await getAllPetsData();
                return;
            } else {
                let url = pets_api.filterPetsMood;
                let params = {};
                params.mood = mood
                const response = await api.get(url, { params });
                setPets(response?.data);
            }

        } catch (err) {
            console.error("Filtering error:", err);
        }
    };
    useEffect(() => {
        filterPetsByMood();
    }, [mood])

    return (
        <div>
            <div className="pet-card-container">
                {pets.map((pet) => (
                    <PetCard
                        key={pet?._id}
                        id={pet?._id}
                        name={pet?.name}
                        age={pet?.age}
                        species={pet?.species}
                        mood={pet?.mood}
                        personality={pet?.personality}
                        adapted={pet?.adopted}
                        adapted_date={pet?.adoption_date}
                        onEdit={() => handleEditClick(pet)}
                        onPetSubmitSuccess={getAllPetsData}
                    />
                ))}
            </div>

            {isModalOpen && (
                <Modal open={true} onClose={() => setIsModalOpen(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50vw',
                            height: '50vh',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            overflowY: 'auto',
                            borderRadius: 2,
                        }}
                    >
                        <AddPetForm
                            handleCloseModal={() => setIsModalOpen(false)}
                            mode="edit"
                            petData={editPet}
                            onPetSubmitSuccess={getAllPetsData}
                        />
                    </Box>
                </Modal>
            )}
        </div>
    )
}

export default PetList;