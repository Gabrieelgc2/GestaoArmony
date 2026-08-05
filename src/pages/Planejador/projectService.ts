import {api} from './services/api';

export const projectService = {
  getById: async (id: string) => {
    const response = await api.get(`projects/${id}`);
    return response.data;
  },

  // Faz o envio de PATCH /projects/:id com os campos do payload no corpo da requisição
  updateProject: async (id: string, payload: Record<string, any>) => {
    const response = await api.patch(`projects/${id}`, payload);
    return response.data; 
}

}