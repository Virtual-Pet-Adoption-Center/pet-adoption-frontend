import React from 'react';
import Box from '@mui/material/Box';
import PetCard from '../components/PetCard.jsx';
import PetData from '../utils/PetData.jsx';
import '../styles/Home.css';
import { useState } from 'react';
import { Modal } from '@mui/material';
import AddPetForm from './AddPetForm.jsx';

const PetList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPet, setEditPet] = useState(null);

    const handleEditClick = (pet) => {
        setEditPet(pet);
        setIsModalOpen(true);
    };
    return (
        <div>
            <div className="pet-card-container">
                {PetData.map((pet, index) => (
                    <PetCard
                        key={index}
                        name={pet?.name}
                        age={pet?.age}
                        species={pet?.species}
                        mood={pet?.mood}
                        personality={pet?.personality}
                        adapted={pet?.adapted}
                        adapted_date={pet?.adapted_date}
                        onEdit={() => handleEditClick(pet)}
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
                        />
                    </Box>
                </Modal>
            )}
        </div>
    )
}

export default PetList;