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
      className="fixed w-full h-screen top-0 left-0 bg-dark/60 backdrop-blur-[4px] flex items-center justify-center z-[19]"
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};

export default Overlay;
