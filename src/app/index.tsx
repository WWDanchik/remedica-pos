import { ThemeProvider } from "@/app/providers/theme-provider";
import AppRoutes from "@/app/routes";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AppRoutes />
        </ThemeProvider>
    );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

export default App;
