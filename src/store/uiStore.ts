import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Project } from "../interfaces";
import { Task } from "../interfaces/task.interface";

interface UiStore {
    theme: boolean,
    isModalProjectOpen: boolean,
    isModalTaskOpen: boolean,
    projectToEdit: Project | null,
    tastToEdit: Task | null,
    selectedProjectId: number | null;
    onSelectProject: (projectId: number | null) => void,
    onModalProjectOpen: () => void,
    onModalProjectClose: () => void,
    onModalTaskOpen: () => void,
    onModalTaskClose: () => void,
    onChangeTheme: () => void,
    setProjectToEdit: (project: Project | null) => void,
    setTaskToEdit: (task: Task | null) => void,
}

export const useUiStore = create<UiStore>()(
    persist(
        (set, get) => ({
            theme: false,
            isModalProjectOpen: false,
            isModalTaskOpen: false,
            projectToEdit: null,
            tastToEdit: null,
            selectedProjectId: null,
            onSelectProject: (projectId: number | null) => set({ selectedProjectId: projectId }),
            onChangeTheme: () => set({ theme: !get().theme }),
            onModalProjectOpen: () => set({ isModalProjectOpen: true }),
            onModalProjectClose: () => set({ isModalProjectOpen: false }),
            onModalTaskOpen: () => set({ isModalTaskOpen: true }),
            onModalTaskClose: () => set({ isModalTaskOpen: false }),
            setProjectToEdit: (project: Project | null) => set({ projectToEdit: project }),
            setTaskToEdit: (task: Task | null) => set({ tastToEdit: task })
        }),
        {
            name: 'theme',
            storage: createJSONStorage(() => localStorage),
        }
    )
)