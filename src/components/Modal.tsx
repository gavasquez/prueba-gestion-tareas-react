interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box bg-white text-black dark:bg-gray-800 dark:text-white">
        {children}
      </div>
    </dialog>
  );
};
