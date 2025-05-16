import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Tooltip } from "@/shared/ui/tooltip";
import { ArrowDownRight, ArrowUpRight, FileDown } from "lucide-react";
import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

// Моковые данные для отчетов
const salesData = [
    { name: "Янв", sales: 42000, orders: 120 },
    { name: "Фев", sales: 38000, orders: 110 },
    { name: "Мар", sales: 45000, orders: 130 },
    { name: "Апр", sales: 50000, orders: 145 },
    { name: "Май", sales: 53000, orders: 152 },
    { name: "Июн", sales: 48000, orders: 138 },
    { name: "Июл", sales: 51000, orders: 147 },
];

const categorySales = [
    { name: "Обезболивающие", sales: 18000 },
    { name: "Антибиотики", sales: 12000 },
    { name: "Витамины", sales: 15000 },
    { name: "Противовоспалительные", sales: 9000 },
    { name: "Спазмолитики", sales: 6500 },
    { name: "Антигистаминные", sales: 8000 },
    { name: "Пищеварение", sales: 5500 },
];

const topProducts = [
    { id: 1, name: "Аспирин", quantity: 245, revenue: 29400 },
    { id: 5, name: "Витамин С", quantity: 120, revenue: 25200 },
    { id: 2, name: "Парацетамол", quantity: 180, revenue: 14400 },
    { id: 3, name: "Ибупрофен", quantity: 95, revenue: 14250 },
    { id: 4, name: "Амоксициллин", quantity: 42, revenue: 13440 },
];

const lowStockProducts = [
    { id: 4, name: "Амоксициллин", stock: 15, reorderLevel: 20 },
    { id: 7, name: "Супрастин", stock: 12, reorderLevel: 15 },
    { id: 3, name: "Ибупрофен", stock: 28, reorderLevel: 30 },
];

const ReportsPage: React.FC = () => {
    const [period, setPeriod] = useState("month");

    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Отчеты</h1>
                <div className="flex items-center gap-2">
                    <Select defaultValue={period} onValueChange={setPeriod}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Период" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">День</SelectItem>
                            <SelectItem value="week">Неделя</SelectItem>
                            <SelectItem value="month">Месяц</SelectItem>
                            <SelectItem value="quarter">Квартал</SelectItem>
                            <SelectItem value="year">Год</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Выбрать даты
                    </Button>
                    <Button variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Экспорт
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="sales" className="h-full flex flex-col">
                <TabsList className="mb-6">
                    <TabsTrigger value="sales">Продажи</TabsTrigger>
                    <TabsTrigger value="inventory">Инвентарь</TabsTrigger>
                    <TabsTrigger value="purchases">Закупки</TabsTrigger>
                    <TabsTrigger value="financial">Финансы</TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="flex-1 flex flex-col">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Общая выручка
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center">
                                    <div className="text-2xl font-bold mr-2">
                                        ₽53,000
                                    </div>
                                    <div className="flex items-center text-green-600 text-sm">
                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                        +12%
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    по сравнению с прошлым месяцем
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Кол-во заказов
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center">
                                    <div className="text-2xl font-bold mr-2">
                                        152
                                    </div>
                                    <div className="flex items-center text-green-600 text-sm">
                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                        +5%
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    по сравнению с прошлым месяцем
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Средний чек
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center">
                                    <div className="text-2xl font-bold mr-2">
                                        ₽348
                                    </div>
                                    <div className="flex items-center text-green-600 text-sm">
                                        <ArrowUpRight className="h-4 w-4 mr-1" />
                                        +3%
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    по сравнению с прошлым месяцем
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Наценка
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center">
                                    <div className="text-2xl font-bold mr-2">
                                        27%
                                    </div>
                                    <div className="flex items-center text-red-600 text-sm">
                                        <ArrowDownRight className="h-4 w-4 mr-1" />
                                        -2%
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    по сравнению с прошлым месяцем
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Графики */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Динамика продаж</CardTitle>
                                <CardDescription>
                                    Выручка и количество заказов по месяцам
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart
                                        data={salesData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="sales"
                                            name="Выручка (₽)"
                                            stroke="#3b82f6"
                                            activeDot={{ r: 8 }}
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="orders"
                                            name="Заказы (шт)"
                                            stroke="#10b981"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Продажи по категориям</CardTitle>
                                <CardDescription>
                                    Распределение выручки по категориям товаров
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={categorySales}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            dataKey="sales"
                                            name="Выручка (₽)"
                                            fill="#3b82f6"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Топ товаров</CardTitle>
                                <CardDescription>
                                    Товары с наибольшей выручкой
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Название</TableHead>
                                            <TableHead className="text-right">
                                                Продано (шт)
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Выручка (₽)
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {topProducts.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {product.quantity}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {product.revenue}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="inventory" className="flex-1">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Всего товаров
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">256</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Общая стоимость
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    ₽428,500
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500">
                                    Мало на складе
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">
                                    12
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Товары с низким запасом</CardTitle>
                            <CardDescription>
                                Необходимо пополнить запасы
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Название</TableHead>
                                        <TableHead className="text-right">
                                            Текущий запас
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Мин. уровень
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Действия
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {lowStockProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>
                                                {product.name}
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-red-600">
                                                {product.stock}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {product.reorderLevel}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Заказать
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="purchases" className="flex-1">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Отчет о закупках</CardTitle>
                            <CardDescription>
                                Данные о поставках и расходах на закупки
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>
                                    Выберите период для просмотра данных о
                                    закупках
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="financial" className="flex-1">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Финансовый отчет</CardTitle>
                            <CardDescription>
                                Выручка, расходы и прибыль
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>
                                    Выберите период для просмотра финансовых
                                    данных
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ReportsPage;
