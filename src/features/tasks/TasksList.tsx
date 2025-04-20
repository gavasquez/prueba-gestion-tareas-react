import { Loading } from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { useUiStore } from "../../store";
import { TaskForm } from "./TaskForm";
import { useTaskListManager } from "../../hooks/useTaskListManager";
import { TaskCardItem } from "../../components/TaskCardItem";


export const TasksList = () => {

  const { selectedProjectId } = useUiStore();
  const { isModalTaskOpen, onModalTaskOpen } = useUiStore();
  
  if (!selectedProjectId) {
    return <p className="text-gray-500">Selecciona un proyecto para ver las tareas.</p>;
  }

  const { isLoading, tasks, filters, filteredTasks, error, clearFilters, handleFilterChange } = useTaskListManager(selectedProjectId);

  if (isLoading) return <Loading />;
  if (error) return <p>Error al cargar tareas</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <button
          className="btn btn-primary"
          onClick={onModalTaskOpen}
        >
          New Task
        </button>
      </div>

      <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="label">State</label>
            <select
              className="select select-bordered w-full max-w-xs bg-gray-200 border-black dark:bg-gray-800 dark:border-white"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="pendiente">Pendientes</option>
              <option value="completado">Completadas</option>
            </select>
          </div>

          <div>
            <label className="label">Priority</label>
            <select
              className="select select-bordered w-full max-w-xs bg-gray-200 border-black dark:bg-gray-800 dark:border-white"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="label">Order by Date</label>
            <select
              className="select select-bordered w-full max-w-xs bg-gray-200 border-black dark:bg-gray-800 dark:border-white"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="none">Sin ordenar</option>
              <option value="dueDate-asc">Más próximas primero</option>
              <option value="dueDate-desc">Más lejanas primero</option>
            </select>
          </div>

          <button
            className="btn btn-outline"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
      {/* Lista de tareas */}
      {!filteredTasks || filteredTasks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            {!tasks || tasks.length === 0
              ? "No hay tareas para este proyecto"
              : "No hay tareas que coincidan con los filtros"}
          </p>
          <button
            className="btn btn-outline mt-4"
            onClick={() => onModalTaskOpen()}
          >
            Create new task
          </button>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {filteredTasks.map(task => (
            <TaskCardItem key={task.id} tasks={task} />
          ))}
        </div>
      )}

      <Modal isOpen={isModalTaskOpen}>
        <TaskForm />
      </Modal>
    </div>
  );
};
