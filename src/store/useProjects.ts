import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Project } from "../interfaces";
import { createProject, deleteProject, getAllProjects, updateProject } from "../services/projectService";

const QUERY_KEY = "projects";


export const useProjects = () => {
    return useQuery<Project[]>({
        queryKey: ['projects'],
        queryFn: getAllProjects,
        refetchOnWindowFocus: false,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newProject: { name: string, description?: string }) => {
            const { ok, data, error } = await createProject(newProject);
            if (!ok) throw new Error(error?.message);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        }
    })
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: { name: string; description?: string } }) => {
            const { ok, error } = await updateProject(id, data);
            if (!ok) throw new Error(error?.message || "Error al actualizar el proyecto");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        }
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (projectId: number) => {
            const { ok } = await deleteProject(projectId);
            if (!ok) throw new Error("Error al eliminar el proyecto");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        }
    });
};