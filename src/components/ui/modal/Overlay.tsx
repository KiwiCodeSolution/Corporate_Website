type OverlayProps = {
  children: React.ReactNode;
  closeModal?: () => void;
};

const Overlay = ({ children, closeModal }: OverlayProps) => {
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
  return (
    <div
      className="fixed w-full h-screen top-0 left-0 bg-main/60 flex items-center justify-center z-[19]"
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};

export default Overlay;
