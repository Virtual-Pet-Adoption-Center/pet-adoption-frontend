import React from 'react';
import Box from '@mui/material/Box';
import PetCard from '../components/PetCard.jsx';
import '../styles/Home.css';
import { useState } from 'react';
import { Modal } from '@mui/material';
import AddPetForm from './AddPetForm.jsx';
import api, { pets_api } from '../services/api';
import { useEffect } from 'react';
import EmptyData from './EmptyData';

const PetList = ({ mood, adopt }) => {
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
    // const filterPetsByMood = async () => {
    //     try {
    //         if (mood === 'all') {
    //             await getAllPetsData();
    //             return;
    //         } else {
    //             let url = pets_api.filterPetsMood;
    //             let params = {};
    //             params.mood = mood
    //             const response = await api.get(url, { params });
    //             setPets(response?.data);
    //         }

    //     } catch (err) {
    //         console.error("Filtering error:", err);
    //     }
    // };
    // useEffect(() => {
    //     filterPetsByMood();
    //     // eslint-disable-next-line
    // }, [mood])

    const filterPets = async () => {
        try {
            let moodFilteredPets = [];

            if (mood === 'all') {
                const res = await api.get(pets_api.getAllPets);
                moodFilteredPets = res?.data || [];
            } else {
                const res = await api.get(pets_api.filterPetsMood, {
                    params: { mood },
                });
                moodFilteredPets = res?.data || [];
            }

            // Apply adopt filtering on frontend
            const adoptFilteredPets =
                adopt === 'all'
                    ? moodFilteredPets
                    : moodFilteredPets.filter(pet =>
                        adopt === false ? !pet?.adopted : pet?.adopted
                    );

            setPets(adoptFilteredPets);
        } catch (err) {
            console.error("Filtering error:", err);
        }
    };

    useEffect(() => {
        filterPets();
        // eslint-disable-next-line
    }, [mood, adopt]);

    return (
        <div>
            <div className="pet-card-container">
                {pets?.length === 0 ? (
                    <EmptyData />
                ) : (
                    pets.map((pet) => (
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
                            image={pet?.image}
                        />
                    )))}
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