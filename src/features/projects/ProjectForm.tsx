import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useCreateProject, useUpdateProject } from "../../store/useProjects";
import { useUiStore } from "../../store";
import { useEffect } from "react";

type Inputs = {
  name: string;
  description: string;
};

export const ProjectForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { onModalProjectClose, projectToEdit, setProjectToEdit } = useUiStore();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const isLoading = createProject.isLoading || updateProject.isLoading;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (projectToEdit) {
      updateProject.mutate(
        { id: projectToEdit.id, data },
        {
          onSuccess: () => {
            reset({ name: "", description: "" });
            setProjectToEdit(null);
            onModalProjectClose();
            Swal.fire("Success", "Proyecto actualizado", "success");
          },
          onError: () => {
            Swal.fire("Opsss!", "Error al actualizar proyecto", "error");
          },
        }
      );
    } else {
      createProject.mutate(data, {
        onSuccess: () => {
          reset();
          onModalProjectClose();
          Swal.fire("Success", "Project Created", "success");
        },
        onError: () => {
          Swal.fire("Opsss!", "Error al crear proyecto", "error");
        },
      });
    }
  };

  const onClose = () => {
    setProjectToEdit(null);
    reset({ name: "", description: "" });
    onModalProjectClose();
  };

  useEffect(() => {
    if (projectToEdit) {
      reset(projectToEdit);
    } else {
      reset({ name: "", description: "" });
    }
  }, [projectToEdit]);

  return (
    <>
      <h1 className="text-xl mb-3">
        {projectToEdit ? "Edit Project" : "Create Project"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nombre del Proyecto
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Name"
            className="input input-bordered w-full bg-gray-100 text-black border-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Descripción
          </label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Description"
            className="textarea textarea-bordered w-full bg-gray-100 text-black border-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="modal-action">
          <div className="flex flex-col w-full">
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              {projectToEdit ? "Update" : "Save"}
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
