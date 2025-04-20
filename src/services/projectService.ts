import { PostgrestError } from "@supabase/supabase-js";
import { Project } from "../interfaces";
import { supabase } from "../lib/supabaseClient";

interface CreateProject {
    ok: boolean,
    data: Project[],
    error: PostgrestError | null,
}

export const getAllProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase.from("Project").select("*");

    if (error) {
        throw new Error('Error al cargar proyectos')
    }

    return data;
};

export const getProjectById = async (id: number): Promise<Project> => {
    const { data, error } = await supabase
        .from("Project")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error("Error al obtener el proyecto");
    }

    return data;
};

export const createProject = async (project: { name: string, description?: string }): Promise<CreateProject> => {
    const { data, error } = await supabase.from("Project").insert([project]);

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

export const updateProject = async (id: number, data: { name: string; description?: string }) => {
    const { error } = await supabase
        .from("Project")
        .update(data)
        .eq("id", id);

    if (error) {
        return { ok: false, error };
    }

    return { ok: true };
};

export const deleteProject = async (id: number) => {
    try {
        await getProjectById(id);

        const { error } = await supabase
            .from("Project")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error("Error al eliminar el proyecto");
        }

        return { ok: true };
    } catch (err: any) {
        throw new Error(err.message);
    }
};