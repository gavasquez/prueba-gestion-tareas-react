// Verifica si la tarea vence hoy o mañana
export const isTaskDueSoon = (taskDate: string) => {
  const today = new Date();
  console.log({ today });
  const task = new Date(taskDate + "T00:00:00");
  console.log({ task });
  const diffInMs = task.getTime() - today.getTime(); // Aquí se calcula la diferencia en milisegundos entre la fecha de la tarea y la fecha actual.
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); //Esto da el número de días completos entre la fecha de hoy y la fecha de la tarea.
  return diffInDays === 0; // 0 es porque vence hoy
};
