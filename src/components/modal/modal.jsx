import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEscapeKey } from "../../hooks";
import styles from "./modal.module.css";

export const Modal = ({ title = "", children, onClose }) => {
  useEscapeKey(onClose);

  return ReactDOM.createPortal(
    <section className={styles.modal} role="dialog" aria-modal="true">
      <article className={`${styles.content} pl-10 pr-10 pt-10`}>
        <header className={`${styles.header}`}>
          <h6 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h6>
          <div className={styles.close}>
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
    document.getElementById("modal")
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
