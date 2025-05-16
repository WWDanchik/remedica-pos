// Импорт типов
import { Product, StocktakingItem } from "@/entities/product/model/types";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Progress } from "@/shared/ui/progress";
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
import {
    AlertTriangle,
    Check,
    FileDown,
    Plus,
    Save,
    Search,
} from "lucide-react";
import { useState } from "react";

// Моковые данные
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Аспирин",
        price: 120,
        stock: 45,
        category: "Обезболивающие",
        sku: "ASP001",
    },
    {
        id: 2,
        name: "Парацетамол",
        price: 80,
        stock: 30,
        category: "Обезболивающие",
        sku: "PAR001",
    },
    {
        id: 3,
        name: "Ибупрофен",
        price: 150,
        stock: 28,
        category: "Противовоспалительные",
        sku: "IBU001",
    },
    {
        id: 4,
        name: "Амоксициллин",
        price: 320,
        stock: 15,
        category: "Антибиотики",
        sku: "AMX001",
        isRx: true,
    },
    {
        id: 5,
        name: "Витамин С",
        price: 210,
        stock: 50,
        category: "Витамины",
        sku: "VTC001",
    },
    {
        id: 6,
        name: "Но-шпа",
        price: 165,
        stock: 38,
        category: "Спазмолитики",
        sku: "NSP001",
    },
    {
        id: 7,
        name: "Супрастин",
        price: 230,
        stock: 12,
        category: "Антигистаминные",
        sku: "SPR001",
        isRx: true,
    },
    {
        id: 8,
        name: "Мезим",
        price: 185,
        stock: 42,
        category: "Пищеварение",
        sku: "MEZ001",
    },
];

// Имитация данных инвентаризации
const generateStocktakingItems = (): StocktakingItem[] => {
    return mockProducts.map((product) => {
        // Случайно генерируем фактическое количество для демонстрации
        const variance = Math.floor(Math.random() * 5) - 2; // от -2 до +2
        const actualQuantity =
            product.id % 2 === 0 ? product.stock : product.stock + variance;
        const difference = actualQuantity - product.stock;

        return {
            productId: product.id,
            productName: product.name,
            systemQuantity: product.stock,
            actualQuantity: actualQuantity,
            difference: difference,
            status: difference === 0 ? "matched" : "discrepancy",
        };
    });
};

const stocktakingItems = generateStocktakingItems();

const getStatusBadge = (status: string) => {
    switch (status) {
        case "matched":
            return (
                <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200"
                >
                    Совпадает
                </Badge>
            );
        case "discrepancy":
            return (
                <Badge
                    variant="outline"
                    className="bg-red-100 text-red-800 border-red-200"
                >
                    Расхождение
                </Badge>
            );
        case "unchecked":
        default:
            return (
                <Badge
                    variant="outline"
                    className="bg-gray-100 text-gray-800 border-gray-200"
                >
                    Не проверено
                </Badge>
            );
    }
};

const StocktakingPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [items, setItems] = useState<StocktakingItem[]>(stocktakingItems);

    // Расчет статистики инвентаризации
    const stats = {
        total: items.length,
        checked: items.filter((item) => item.status !== "unchecked").length,
        matched: items.filter((item) => item.status === "matched").length,
        discrepancies: items.filter((item) => item.status === "discrepancy")
            .length,
    };

    // Процент выполнения инвентаризации
    const completionPercentage = Math.round(
        (stats.checked / stats.total) * 100
    );

    // Фильтрация элементов по поиску и статусу
    const filteredItems = items.filter((item) => {
        const matchesSearch =
            item.productName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.productId.toString().includes(searchQuery);

        const matchesStatus =
            selectedStatus === "all" ||
            (selectedStatus === "matched" && item.status === "matched") ||
            (selectedStatus === "discrepancy" &&
                item.status === "discrepancy") ||
            (selectedStatus === "unchecked" && item.status === "unchecked");

        return matchesSearch && matchesStatus;
    });

    // Обновление фактического количества
    const handleQuantityChange = (productId: number, quantity: number) => {
        setItems(
            items.map((item) => {
                if (item.productId === productId) {
                    const difference = quantity - item.systemQuantity;
                    return {
                        ...item,
                        actualQuantity: quantity,
                        difference: difference,
                        status: difference === 0 ? "matched" : "discrepancy",
                    };
                }
                return item;
            })
        );
    };

    // Подтверждение проверки товара
    const handleConfirmItem = (productId: number) => {
        setItems(
            items.map((item) => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        status:
                            item.difference === 0 ? "matched" : "discrepancy",
                    };
                }
                return item;
            })
        );
    };

    // Создание новой инвентаризации
    const handleStartNewStocktaking = () => {
        // В реальном приложении здесь был бы API-запрос для создания новой инвентаризации
        alert("Создана новая инвентаризация");
    };

    // Сохранение результатов инвентаризации
    const handleSaveResults = () => {
        // В реальном приложении здесь был бы API-запрос для сохранения результатов
        alert("Результаты инвентаризации сохранены");
    };

    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Инвентаризация</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={handleStartNewStocktaking}>
                        <Plus className="mr-2 h-4 w-4" />
                        Начать новую
                    </Button>
                    <Button
                        onClick={handleSaveResults}
                        variant={
                            completionPercentage < 100 ? "outline" : "default"
                        }
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить результаты
                    </Button>
                    <Button variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Экспорт
                    </Button>
                </div>
            </div>

            <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Информация</AlertTitle>
                <AlertDescription>
                    Последняя инвентаризация проведена 01.04.2025. Текущая
                    инвентаризация начата 20.04.2025.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Всего позиций
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Проверено
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.checked} / {stats.total}
                        </div>
                        <Progress
                            value={completionPercentage}
                            className="h-2 mt-2"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Совпадений
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.matched}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            Расхождений
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {stats.discrepancies}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="relative flex-1 min-w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Сканировать штрих-код или найти товар..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все статусы</SelectItem>
                                <SelectItem value="matched">
                                    Совпадает
                                </SelectItem>
                                <SelectItem value="discrepancy">
                                    Расхождение
                                </SelectItem>
                                <SelectItem value="unchecked">
                                    Не проверено
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="flex-1 overflow-auto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">ID</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead className="text-right">
                                По системе
                            </TableHead>
                            <TableHead className="text-right">
                                Фактически
                            </TableHead>
                            <TableHead className="text-right">
                                Расхождение
                            </TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">
                                Действия
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell className="text-right">
                                    {item.systemQuantity}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Input
                                        type="number"
                                        value={item.actualQuantity}
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                item.productId,
                                                parseInt(e.target.value)
                                            )
                                        }
                                        className="w-20 text-right"
                                    />
                                </TableCell>
                                <TableCell
                                    className={`text-right font-medium ${
                                        item.difference < 0
                                            ? "text-red-600"
                                            : item.difference > 0
                                            ? "text-blue-600"
                                            : ""
                                    }`}
                                >
                                    {item.difference > 0
                                        ? `+${item.difference}`
                                        : item.difference}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(item.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            handleConfirmItem(item.productId)
                                        }
                                    >
                                        <Check className="mr-2 h-4 w-4" />
                                        Подтвердить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default StocktakingPage;
