import { mockProjects } from "@/mocks/projects";

export const projectService = {

  async getProjects() {
    return mockProjects;
  },

  async getProjectbyId(id: number){
    return mockProjects.find(
        project => project.id === id
    )
  }

};