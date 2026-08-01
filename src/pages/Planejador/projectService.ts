import axios from 'axios';

const API_URL = 'https://gestao-armony-backend.onrender.com/projects';

export const projectService = {
  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Faz o envio de PATCH /projects/:id com os campos do payload no corpo da requisição
  updateProject: async (id: string, payload: Record<string, any>) => {
    const response = await axios.patch(`${API_URL}/${id}`, payload);
    return response.data; 
}

}