import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import MainLayout from "@/app/layout/main-layout";

// Pages

import PosPage from "@/pages/pos-page";
import InventoryPage from "@/pages/inventory-page";
import StocktakingPage from "@/pages/stocktaking-page";
import ReportsPage from "@/pages/reports-page";

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<PosPage />} />
                    <Route path="inventory" element={<InventoryPage />} />
                    <Route path="stocktaking" element={<StocktakingPage />} />
                    <Route path="reports" element={<ReportsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
