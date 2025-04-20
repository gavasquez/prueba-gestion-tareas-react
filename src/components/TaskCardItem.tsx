import Swal from "sweetalert2";
import { Task } from "../interfaces/task.interface"
import { useDeleteTask, useUpdateTaskState } from "../store/useTasks";
import { getPriorityColor } from "../utils/getPriorityColor";
import { Loading } from "./Loading";
import { useUiStore } from "../store";

interface TaskCardItemProps {
    tasks: Task,
}

export const TaskCardItem = ({ tasks }: TaskCardItemProps) => {
    const { id, title, description, state, priority, end_date, project_id } = tasks;
    const { onModalTaskOpen, setTaskToEdit } = useUiStore();
    const { isLoading, mutate } = useUpdateTaskState();
    const useDelete = useDeleteTask();

    if (isLoading) {
        return (<div className="flex flex-column justify-center items-center w-96">
            <Loading />
        </div>)
    }

    const onDeleteTask = () => {
        Swal.fire({
            title: "¿Estas seguro de eliminar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                useDelete.mutate({ taskId: id, projectId: project_id }, {
                    onSuccess: () => {
                        Swal.fire("Success", "Task eliminado", "success");
                    },
                    onError: () => {
                        Swal.fire("Opsss!", " como Error al eliminar Task", "error");
                    },
                });
            }
        });
    }

    const onEditProject = () => {
        setTaskToEdit(tasks);
        onModalTaskOpen();
    };

    return (
        <div className={`card ${state === 'completado' ? 'bg-neutral-focus text-slate-800 dark:text-slate-300' : 'bg-neutral text-white'} border border-black w-80`}>
            <div className="card-body">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-accent"
                            checked={state === 'completado'}
                            onChange={() => mutate({
                                taskId: id,
                                newState: state === "completado" ? "pendiente" : "completado",
                                projectId: project_id
                            })}
                        />
                        <h2 className={`card-title ${state === 'completado' ? 'line-through opacity-70' : ''}`}>
                            {title}
                        </h2>
                    </div>
                    <div className={`badge ${getPriorityColor(priority)}`}>
                        {priority}
                    </div>
                </div>

                <p className={state === 'completado' ? 'opacity-70' : ''}>{description.length > 100 ? `${description.slice(0, 100)}...` : 'No existe una descripción'}</p>

                {end_date && (
                    <div className="text-sm opacity-70 text-left mt-2">
                        Vence: {new Date(end_date).toLocaleDateString()}
                    </div>
                )}

                <div className="card-actions justify-end mt-2">
                    <button className="btn btn-sm btn-outline" onClick={onEditProject}>Editar</button>
                    <button className="btn btn-sm btn-outline btn-error" onClick={onDeleteTask}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}
