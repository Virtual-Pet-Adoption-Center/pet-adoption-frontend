import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import PetLogo from '../assests/new_logo.png';
import NewCoverImage from '../assests/new_cover.png';
import PetList from '../components/PetList';
import AddPetForm from '../components/AddPetForm';
import { Modal, Box, MenuItem, Button, FormControl, Select } from '@mui/material';

const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    const [mood, setMood] = useState('all');
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000); // splash screen duration
        return () => clearTimeout(timer);
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChangeMood = (event) => {
        setMood(event.target.value);
    };

    if (showSplash) {
        return (
            <div className="splash-screen">
                <img src={PetLogo} alt="logo" className="splash-logo" />
            </div>
        );
    }

    return (
        <div className="container1">
            <div className="background-container">
                <img src={NewCoverImage} alt="cover" className="background-image" />
                <div className="white-overlay" />
            </div>

            <div className="begin-container">
                <div className="header-overlay" />
                <img src={PetLogo} width="150" height="150" alt="logo" className="logo-animation" />

                <Button
                    onClick={handleOpenModal}
                    variant="outlined"
                    size="small"
                    sx={{
                        height: '40px',
                        flexShrink: 0,
                        width: {
                            xs: '100%',
                            sm: 'auto',
                            md: '25%',
                        },
                        margin: '0 auto',
                        backgroundColor: 'white',
                        color: '#616161',
                        border: '2px solid #616161',
                        fontWeight: 'bold',
                    }}
                >
                    Add New Pet
                </Button>

                <FormControl
                    sx={{
                        minWidth: 120,
                        height: '40px',
                        flexShrink: 0,
                        width: {
                            xs: '100%',
                            sm: 'auto',
                            md: '25%',
                        },
                        border: '2px solid #616161',
                        borderRadius: '5px',
                    }}
                >
                    <Select
                        value={mood}
                        onChange={handleChangeMood}
                        autoWidth
                        sx={{ height: '40px', backgroundColor: 'white' }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="Happy">Happy</MenuItem>
                        <MenuItem value="Excited">Excited</MenuItem>
                        <MenuItem value="Sad">Sad</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="container4">
                <PetList handleOpenModal={handleOpenModal} mood={mood} />
            </div>

            <Modal open={openModal} onClose={handleCloseModal}>
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
                    <AddPetForm handleCloseModal={handleCloseModal} />
                </Box>
            </Modal>
        </div>
    );
};

export default Home;
