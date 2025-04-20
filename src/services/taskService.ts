import { PostgrestError } from "@supabase/supabase-js";
import { StateTask, Task } from "../interfaces/task.interface";
import { supabase } from "../lib/supabaseClient";
import { FormTask } from "../features/tasks/TaskForm";

interface CreateTask {
    ok: boolean,
    data: Task[],
    error: PostgrestError | null,
}

export const getTasksByProjectId = async (projectId: number): Promise<Task[]> => {
    const { data, error } = await supabase
        .from("Task")
        .select("*")
        .eq("project_id", projectId);

    if (error) {
        throw new Error("Error al cargar tareas del proyecto");
    }

    return data as Task[];
};

export const createTask = async (newTask: FormTask): Promise<CreateTask> => {
    const { data, error } = await supabase.from("Task").insert([newTask]);

    if (error) {
        return {
            ok: false,
            data: [],
            error,
        }
    }

    return {
        ok: true,
        data: data ?? [],
        error: null,
    };
}

export const updateTask = async (id: number, data: Partial<Task>) => {
    const { error } = await supabase
        .from("Task")
        .update(data)
        .eq("id", id);

    if (error) {
        return { ok: false, error };
    }

    return { ok: true };
};

export const getTaskById = async (id: number): Promise<Task> => {
    const { data, error } = await supabase
        .from("Task")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error("Error al obtener el proyecto");
    }

    return data;
};

export const changeTaskState = async (id: number, newState: StateTask) => {
    const { data, error } = await supabase
        .from("Task")
        .update({ state: newState })
        .eq("id", id);

    if (error) {
        throw new Error("Error al cargar tareas del proyecto");
    }

    return data;
};

export const deleteTask = async (id: number) => {
    try {
        await getTaskById(id);

        const { error } = await supabase
            .from("Task")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error("Error al eliminar Tasks");
        }

        return { ok: true };
    } catch (err: any) {
        throw new Error(err.message);
    }
};