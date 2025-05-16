import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Column, Expanded } from "@/shared/ui/layout";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/shared/ui/sidebar";
import {
    ArrowUpCircleIcon,
    BarChart2,
    Clipboard,
    Layers,
    LogOut,
    Package,
    Settings,
    ShoppingCart,
    User,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";

const MainLayout: React.FC = () => {
    const navItems = [
        {
            path: "/",
            icon: <ShoppingCart className="h-6 w-6" />,
            label: "Касса",
        },
        {
            path: "/inventory",
            icon: <Layers className="h-6 w-6" />,
            label: "Товары",
        },
        {
            path: "/stocktaking",
            icon: <Clipboard className="h-6 w-6" />,
            label: "Инвентарь",
        },
        {
            path: "/reports",
            icon: <BarChart2 className="h-6 w-6" />,
            label: "Отчеты",
        },
        {
            path: "/supplies",
            icon: <Package className="h-6 w-6" />,
            label: "Поставки",
        },
    ];

    return (
        <SidebarProvider>
            <Sidebar collapsible="offcanvas">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <a href="#">
                                    <ArrowUpCircleIcon className="h-5 w-5" />
                                    <span className="text-base font-semibold">
                                        Acme Inc.
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="flex flex-col gap-2">
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.path}>
                                        <NavLink to={item.path}>
                                            {({ isActive }) => {
                                                return (
                                                    <SidebarMenuButton
                                                        tooltip={item.label}
                                                        isActive={isActive}
                                                    >
                                                        {item.icon}
                                                        <span>
                                                            {item.label}
                                                        </span>
                                                    </SidebarMenuButton>
                                                );
                                            }}
                                        </NavLink>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter></SidebarFooter>
            </Sidebar>

            <SidebarInset className="h-svh">
                <Column>
                    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center w-full">
                        <div className="flex items-center">
                            <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Remedica POS
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600 dark:text-gray-400">
                                Аптека №1
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Администратор
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Профиль</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Настройки</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Выйти</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    <Expanded className="overflow-hidden">
                        <Outlet />
                    </Expanded>
                </Column>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default MainLayout;
