import { useMemo, useState } from "react";
import { useTasks } from "../store/useTasks";
import { PriorityTask, StateTask, Task } from "../interfaces/task.interface";

interface Filters {
    status: 'all' | StateTask;
    priority: 'all' | PriorityTask;
    sort: 'none' | 'dueDate-asc' | 'dueDate-desc';
}

type FilterKey = keyof Filters;

export const useTaskListManager = (selectedProjectId?: number) => {


    const [filters, setFilters] = useState<Filters>({
        status: 'all',
        priority: 'all',
        sort: 'none'
    });


    const { isLoading, data: tasks, error } = useTasks(selectedProjectId ?? 0);

    const filteredTasks: Task[] = useMemo(() => {
        if (!tasks) return [];
        let result = [...tasks];

        // Filtrar por estado
        if (filters.status !== 'all') {
            result = result.filter(task => task.state === filters.status);
        }

        // Filtrar por prioridad
        if (filters.priority !== 'all') {
            result = result.filter(task => task.priority === filters.priority);
        }

        // Ordenar por fecha de vencimiento
        if (filters.sort === 'dueDate-asc') {
            result.sort((a, b) => {
                if (!a.end_date) return 1;
                if (!b.end_date) return -1;
                return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
            });
        } else if (filters.sort === 'dueDate-desc') {
            result.sort((a, b) => {
                if (!a.end_date) return 1;
                if (!b.end_date) return -1;
                return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
            });
        }

        return result;
    }, [tasks, filters]);

    const clearFilters = (): void => {
        setFilters({
            status: 'all',
            priority: 'all',
            sort: 'none'
        });
    };

    const handleFilterChange = (key: FilterKey, value: string): void => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return {
        /* Task */
        isLoading,
        tasks,
        filteredTasks,
        error,
        filters,
        /* Limpiar Filtros */
        clearFilters,
        /* Cambios del select */
        handleFilterChange,
    }
}
