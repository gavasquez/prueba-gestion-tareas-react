import { SubmitHandler, useForm } from "react-hook-form";
import { useUiStore } from "../../store";
import { useCreateTask, useUpdateTask } from "../../store/useTasks";
import { PriorityTask, StateTask } from "../../interfaces/task.interface";
import Swal from "sweetalert2";
import { useEffect } from "react";

export interface FormTask {
  title: string,
  description: string,
  end_date: Date | null,
  state: StateTask,
  priority: PriorityTask,
  project_id: number,
}

export const TaskForm = () => {
  const { onModalTaskClose, tastToEdit, setTaskToEdit, selectedProjectId } = useUiStore();
  const { register, handleSubmit, reset } = useForm<FormTask>();

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const isLoading = createTask.isLoading || updateTask.isLoading;

  const onSubmit: SubmitHandler<FormTask> = async (data) => {
    data.project_id = selectedProjectId!;
    if (tastToEdit) {
      updateTask.mutate(
        { id: tastToEdit.id, data },
        {
          onSuccess: () => {
            reset();
            setTaskToEdit(null);
            onModalTaskClose();
            Swal.fire("Success", "Task updated", "success");
          },
          onError: () => {
            Swal.fire("Opsss!", "Error updating", "error");
          },
        }
      );
    } else {
      createTask.mutate(data, {
        onSuccess: () => {
          reset();
          onModalTaskClose();
          Swal.fire("Success", "Task Created", "success");
        },
        onError: () => {
          Swal.fire("Opsss!", "Error creating", "error");
        },
      });
    }
  };

  const onClose = () => {
    setTaskToEdit(null);
    reset();
    onModalTaskClose();
  };

  useEffect(() => {
    if (tastToEdit) {
      reset(tastToEdit);
    } else {
      reset({
        title: '',
        description: '',
        state: 'pendiente',
        priority: 'media'
      });
    }
  }, [tastToEdit]);

  return (
    <>
      <h1 className="text-xl mb-3">
        {tastToEdit ? "Edit Task" : "Create Task"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
            placeholder="Title"
            className="input input-bordered w-full bg-gray-100 text-black border-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Description"
            className="textarea textarea-bordered w-full bg-gray-100 text-black border-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            {...register("end_date")}
            className="input input-bordered w-full bg-gray-100 text-black border-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            State
          </label>
          <select
            id="state"
            {...register("state", { required: true })}
            className="select select-bordered w-full bg-gray-100 text-black border-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            id="priority"
            {...register("priority", { required: true })}
            className="select select-bordered w-full bg-gray-100 text-black border-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="modal-action">
          <div className="flex flex-col w-full">
            <button disabled={isLoading} type="submit" className="btn btn-primary">
              {tastToEdit ? "Update" : "Save"}
            </button>
            <button type="button" className="btn mt-2" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
