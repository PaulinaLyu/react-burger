import { Bounce, ToastContainer } from "react-toastify";
import { MainPage } from "../../pages";
import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <MainPage />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};
