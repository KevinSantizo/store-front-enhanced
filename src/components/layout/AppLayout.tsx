import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Sistema de Inventario</h1>
            <p>Sucursal Principal · Caja 1</p>
          </div>

          <div className="topbar-user">
            <span>Kevin</span>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}