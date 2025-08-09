import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay = ({ onClose }: IModalOverlayProps) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};
