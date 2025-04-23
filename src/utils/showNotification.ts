// Mostrar notificación
export const showNotification = (taskTitle: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Tarea por vencer', {
      body: `La tarea "${taskTitle}" vence pronto.`,
    });
  }
};