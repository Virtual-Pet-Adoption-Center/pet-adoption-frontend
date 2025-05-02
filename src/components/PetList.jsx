import React from 'react';
import Box from '@mui/material/Box';
import PetCard from '../components/PetCard.jsx';
// import PetData from '../utils/PetData.jsx';
import '../styles/Home.css';
import { useState } from 'react';
import { Modal } from '@mui/material';
import AddPetForm from './AddPetForm.jsx';
import api, { pets_api } from '../services/api';
import { useEffect } from 'react';


const PetList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPet, setEditPet] = useState(null);

    const handleEditClick = (pet) => {
        setEditPet(pet);
        setIsModalOpen(true);
    };

    const [pets, setPets] = useState([]);

    const getAllPetsData = async () => {
        try {
            const response = await api.get(pets_api.getAllPets);
            setPets(response?.data);
            // console.log("pets data::", response?.data )
        }catch(err){
            console.err("Error fetching on Get All Pets::", err)
        }
    }

   useEffect(() => {
       getAllPetsData()
   }, [pets]);

    return (
        <div>
            <div className="pet-card-container">
                {pets.map((pet, index) => (
                    <PetCard
                        key={index}
                        id={pet?.id}
                        name={pet?.name}
                        age={pet?.age}
                        species={pet?.species}
                        mood={pet?.mood}
                        personality={pet?.personality}
                        adapted={pet?.adopted}
                        adapted_date={pet?.adopted_date}
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
                            onPetSubmitSuccess={getAllPetsData}
                        />
                    </Box>
                </Modal>
            )}
        </div>
    )
}

export default PetList;