import { IoAddCircleOutline } from "react-icons/io5";
import { Modal } from "../components/Modal";
import { ProjectForm, ProjectList } from "../features/projects";
import { useUiStore } from "../store";
import { TasksList } from "../features/tasks/TasksList";

export const Home = () => {
  const { isModalProjectOpen, onModalProjectOpen } = useUiStore();
  const { selectedProjectId } = useUiStore();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      <aside className="w-full md:w-1/4 bg-gray-200 rounded-0 border-black dark:bg-gray-800 md:min-h-screen p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My projects</h1>
          <button onClick={onModalProjectOpen} title="Create Project">
            <IoAddCircleOutline size={30} />
          </button>
        </div>

        <Modal isOpen={isModalProjectOpen}>
          <ProjectForm />
        </Modal>

        <ProjectList />
      </aside>

      <main className="w-full md:w-3/4 p-6">
        {selectedProjectId ? (
          <TasksList />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-xl font-semibold mb-2">
              Selecciona un proyecto
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Elige un proyecto de la lista o crea uno nuevo para ver sus tareas
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
