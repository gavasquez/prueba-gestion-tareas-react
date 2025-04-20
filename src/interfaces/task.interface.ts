
export type StateTask = 'pendiente' | 'completado';
export type PriorityTask = 'baja' | 'media' | 'alta';

export interface Task {
    id: number,
    title: string,
    description: string,
    end_date: Date | null,
    state: StateTask,
    priority: PriorityTask,
    project_id: number,
    created_at: Date,
}