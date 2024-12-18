import axios from 'axios';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(
    'https://crafto.app/crafto/v1.0/media/assignment/upload',
    formData
  );
  return response.data.mediaUrl;
};