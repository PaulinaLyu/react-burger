import { Outlet } from "react-router";
import styles from './main-layout.module.css'
import { AppHeader } from "../../components";

export const MainLayout = () => {
    return (     
      <>
        <AppHeader />
        <main className={styles.container}>
          <Outlet />
        </main>
      </> 
  );
}