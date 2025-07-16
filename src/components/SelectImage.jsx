import React, { useState, useEffect } from 'react';
import {
    Button,
    Typography,
    IconButton,
    Box,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SelectImage = ({ onImageSelect }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setError('Only JPG, JPEG, and PNG files are allowed.');
                setSelectedFile(null);
                setPreviewUrl(null);
                onImageSelect(null);
                return;
            }

            setSelectedFile(file);
            setError('');
            onImageSelect(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setError('');
        onImageSelect(null);
    };

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    return (
        <Box sx={{ width: '100%', mt: 2 }}>
            {!selectedFile && (
                <>
                    <input
                        type="file"
                        hidden
                        id="upload-button"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                    />
                    <label htmlFor="upload-button">
                        <Button
                            variant="contained"
                            component="span"
                            fullWidth
                            sx={{
                                maxWidth: { xs: '100%', sm: '300px' },
                                mb: 1
                            }}
                        >
                            Upload Pet Image
                        </Button>
                    </label>
                </>
            )}

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {previewUrl && (
                    <Box
                        component="img"
                        src={previewUrl}
                        alt="Preview"
                        sx={{
                            mt: 2,
                            mr: 2,
                            maxWidth: '15%',
                            height: 'auto',
                            borderRadius: 2,
                            border: '1px solid #ccc'
                        }}
                    />
                )}
                {selectedFile && (
                    <Stack
                        direction="row"
                        alignItems="end"
                        spacing={1}
                        flexWrap="wrap"
                        sx={{ mt: 1 }}
                    >
                        <Typography
                            sx={{
                                fontSize: '13px',
                                color: '#616161',
                                wordBreak: 'break-all'
                            }}
                        >
                            Selected File: {selectedFile.name}
                        </Typography>
                        <IconButton
                            onClick={handleRemoveImage}
                            size="small"
                            color="error"
                            aria-label="remove image"
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Stack>
                )}
            </div>

            {error && (
                <Typography sx={{ color: 'red', fontSize: '12px', mt: 1 }}>
                    {error}
                </Typography>
            )}

            {!selectedFile && (
                <Typography
                    sx={{
                        fontSize: '12px',
                        color: 'red',
                        mt: 1
                    }}
                >
                    * Image upload is required
                </Typography>
            )}
        </Box>
    );
};

export default SelectImage;
