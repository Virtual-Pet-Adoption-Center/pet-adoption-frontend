import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

export const pets_api = {
    pets: '/pets',
    addNewPet:'/addPets',
    getAllPets:'/getPets',
    getPetData:'/getPets',
    updatePetData:'/updatePets',
    adoptPet:'/adoptPets',
    deletePet: '/deletePets', 
    filterPetsMood : '/filterPets',
};
