import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export default api;

export const pets_api = {
    pets: '/pets', //
    // addNewPet: '/pets', //
    // deletePet: '/pets/:id',
    // getPetData: '/pets', 
    // updatePetData: "/pets", //
    // adoptPet: "/pets", //patch
    // deletePet: "/pets/:id", //delete
    // filterPetsByMood: "/pets/filter", //get
};
