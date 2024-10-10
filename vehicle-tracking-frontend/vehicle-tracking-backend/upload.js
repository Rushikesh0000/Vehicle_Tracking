import axios from 'axios';

const handleSave = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('File uploaded:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
