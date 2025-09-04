import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEscapeKey } from "../../hooks";
import styles from "./modal.module.css";

interface IModalProps {
  title?: string;
  onClose: () => void;
}

export const Modal: React.FC<React.PropsWithChildren<IModalProps>> = ({
  title = "",
  children,
  onClose,
}) => {
  useEscapeKey(onClose);

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <section
      data-testid="modal"
      className={styles.modal}
      role="dialog"
      aria-modal="true"
    >
      <article className={`${styles.content} pl-10 pr-10 pt-10`}>
        <header className={`${styles.header}`}>
          <h6
            data-testid="modal-title"
            className={`${styles.title} text text_type_main-large`}
          >
            {title}
          </h6>
          <div data-testid="modal-close-button" className={styles.close}>
            <CloseIcon
              type="primary"
              onClick={onClose}
              aria-label="Закрыть модальное окно"
            />
          </div>
        </header>
        <div className={styles.body}>{children}</div>
      </article>
      <ModalOverlay onClose={onClose} />
    </section>,
    modalRoot
  );
};
