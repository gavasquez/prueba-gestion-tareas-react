import { PriorityTask } from "../interfaces/task.interface";

export const getPriorityColor = (priority: PriorityTask) => {
    switch(priority) {
        case 'alta':
            return 'badge-error';
        case 'media':
            return 'badge-warning';
        case 'baja':
            return 'badge-info';
        default:
            return 'badge-ghost';
    }
};