import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StateTask, Task } from "../interfaces/task.interface";
import { changeTaskState, createTask, deleteTask, getTasksByProjectId, updateTask } from "../services/taskService";
import { FormTask } from "../features/tasks/TaskForm";

const QUERY_KEY = "tasks";

export const useTasks = (projectId: number) => {
    return useQuery<Task[]>({
        queryKey: ['tasks', projectId],
        queryFn: () => getTasksByProjectId(projectId),
        enabled: !!projectId,
        refetchOnWindowFocus: false,
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (mewTask: FormTask) => {
            const { ok, data, error } = await createTask(mewTask);
            if (!ok) throw new Error(error?.message);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.project_id] });
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<Task> }) => {
            const { ok, error } = await updateTask(id, data);
            if (!ok) throw new Error(error?.message || "Error al actualizar");
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.data.project_id] });
        }
    });
};


export const useUpdateTaskState = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ taskId, newState }: { taskId: number; newState: StateTask, projectId: number }) =>
            changeTaskState(taskId, newState),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.projectId] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ taskId }: { taskId: number, projectId: number }) => {
            const { ok } = await deleteTask(taskId);
            if (!ok) throw new Error("Error al eliminar el Task");
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.projectId] });
        }
    });
};