import { CiEdit, CiTrash } from "react-icons/ci";
import { useDeleteProject } from "../store/useProjects";
import Swal from "sweetalert2";
import { useUiStore } from "../store";
import { Project } from "../interfaces";

interface ProjectListProps {
  project: Project;
}

export const ProjectCardItem = ({ project }: ProjectListProps) => {
  const { id, name, description } = project;
  const { onModalProjectOpen: onModalOpen, setProjectToEdit, onSelectProject } = useUiStore();
  const deleteProject = useDeleteProject();

  const onDeleteProject = () => {
    Swal.fire({
      title: "¿Estas seguro de eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject.mutate(id, {
          onSuccess: () => {
            onSelectProject(null);
            Swal.fire("Success", "Project eliminado", "success");
          },
          onError: () => {
            Swal.fire("Opsss!", " como Error al eliminar proyecto", "error");
          },
        });
      }
    });
  };

  const onEditProject = () => {
    setProjectToEdit(project);
    onModalOpen();
  };

  return (
    <div className="card bg-gray-100 mb-3 border border-black shadow-xl hover:bg-gray-400 dark:hover:bg-gray-400 dark:hover:text-black dark:bg-base-200 dark:border-white cursor-pointer" onClick={() => onSelectProject(id)}>
      <div className="card-body p-2 flex flex-row items-center justify-between h-[60px]">
        <div className="flex flex-col overflow-hidden">
          <h3 className="font-bold text-md truncate">{name}</h3>
          <p className="text-xs font-extralight truncate">
            {description?.slice(0, 50).concat("...") ?? ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-yellow-500"
            title="Edit Project"
            onClick={onEditProject}
          >
            <CiEdit size={22} />
          </button>
          <button
            className="text-red-500"
            title="Delete Project"
            onClick={onDeleteProject}
          >
            <CiTrash size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
