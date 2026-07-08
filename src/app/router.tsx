import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { ProductsPage } from "../pages/ProductsPage";
import { SalesPage } from "../pages/SalesPage";
import { InventoryPage } from "../pages/InventoryPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/ventas" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="ventas" element={<SalesPage />} />
        <Route path="productos" element={<ProductsPage />} />
        <Route path="inventario" element={<InventoryPage />} />
      </Route>
    </Routes>
  );
}