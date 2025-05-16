import { Product } from "@/entities/product/model/types";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
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
    AlertCircle,
    Edit,
    FileDown,
    FileUp,
    MoreHorizontal,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import { useState } from "react";

const categories = [
    "Все категории",
    "Обезболивающие",
    "Противовоспалительные",
    "Антибиотики",
    "Витамины",
    "Спазмолитики",
    "Антигистаминные",
    "Пищеварение",
];

// Моковые данные
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Аспирин",
        price: 120,
        stock: 45,
        category: "Обезболивающие",
        sku: "ASP001",
        manufacturer: "Байер",
        expiryDate: "2025-06-15",
    },
    {
        id: 2,
        name: "Парацетамол",
        price: 80,
        stock: 30,
        category: "Обезболивающие",
        sku: "PAR001",
        manufacturer: "Озон",
        expiryDate: "2025-08-10",
    },
    {
        id: 3,
        name: "Ибупрофен",
        price: 150,
        stock: 28,
        category: "Противовоспалительные",
        sku: "IBU001",
        manufacturer: "Вертекс",
        expiryDate: "2025-04-22",
    },
    {
        id: 4,
        name: "Амоксициллин",
        price: 320,
        stock: 15,
        category: "Антибиотики",
        sku: "AMX001",
        manufacturer: "Синтез",
        expiryDate: "2025-12-01",
        isRx: true,
    },
    {
        id: 5,
        name: "Витамин С",
        price: 210,
        stock: 50,
        category: "Витамины",
        sku: "VTC001",
        manufacturer: "Эвалар",
        expiryDate: "2026-01-15",
    },
    {
        id: 6,
        name: "Но-шпа",
        price: 165,
        stock: 38,
        category: "Спазмолитики",
        sku: "NSP001",
        manufacturer: "Санофи",
        expiryDate: "2025-07-20",
    },
    {
        id: 7,
        name: "Супрастин",
        price: 230,
        stock: 12,
        category: "Антигистаминные",
        sku: "SPR001",
        manufacturer: "Эгис",
        expiryDate: "2025-09-05",
        isRx: true,
    },
    {
        id: 8,
        name: "Мезим",
        price: 185,
        stock: 42,
        category: "Пищеварение",
        sku: "MEZ001",
        manufacturer: "Берлин-Хеми",
        expiryDate: "2025-11-28",
    },
];

const InventoryPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Все категории");
    const [showLowStock, setShowLowStock] = useState(false);
    const [showRxOnly, setShowRxOnly] = useState(false);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Фильтрация продуктов
    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.manufacturer
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "Все категории" ||
            product.category === selectedCategory;
        const matchesLowStock = !showLowStock || product.stock < 20;
        const matchesRx = !showRxOnly || product.isRx === true;

        return matchesSearch && matchesCategory && matchesLowStock && matchesRx;
    });

    // Обработчики событий
    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsAddProductOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsAddProductOpen(true);
    };

    const handleDeleteProduct = (productId: number) => {
        // В реальном приложении здесь был бы API-запрос
        alert(`Удаление товара с ID: ${productId}`);
    };

    const handleSaveProduct = (product: Product) => {
        // В реальном приложении здесь был бы API-запрос
        setIsAddProductOpen(false);
        alert(editingProduct ? "Товар обновлен" : "Товар добавлен");
    };

    return (
        <div className="flex flex-col h-full p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Управление товарами</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={handleAddProduct}>
                        <Plus className="mr-2 h-4 w-4" />
                        Добавить товар
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <FileDown className="mr-2 h-4 w-4" />
                                Экспорт
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Экспорт в CSV</DropdownMenuItem>
                            <DropdownMenuItem>Экспорт в Excel</DropdownMenuItem>
                            <DropdownMenuItem>Печать</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline">
                        <FileUp className="mr-2 h-4 w-4" />
                        Импорт
                    </Button>
                </div>
            </div>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4">
                        <div className="relative flex-1 min-w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Поиск товаров..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Категория" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="lowStock"
                                checked={showLowStock}
                                onCheckedChange={(checked) =>
                                    setShowLowStock(checked as boolean)
                                }
                            />
                            <Label htmlFor="lowStock">Мало на складе</Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="rxOnly"
                                checked={showRxOnly}
                                onCheckedChange={(checked) =>
                                    setShowRxOnly(checked as boolean)
                                }
                            />
                            <Label htmlFor="rxOnly">Только рецептурные</Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex-1 overflow-auto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">ID</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead className="text-right">Цена</TableHead>
                            <TableHead className="text-right">Кол-во</TableHead>
                            <TableHead>Производитель</TableHead>
                            <TableHead>Срок годности</TableHead>
                            <TableHead className="text-right">
                                Действия
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            {product.name}
                                            {product.isRx && (
                                                <Badge
                                                    variant="outline"
                                                    className="ml-2 bg-orange-100 text-orange-800 border-orange-200"
                                                >
                                                    Rx
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell className="text-right">
                                        {product.price} ₽
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-right">
                                            <span
                                                className={
                                                    product.stock < 10
                                                        ? "text-red-500 font-medium"
                                                        : product.stock < 20
                                                        ? "text-orange-500"
                                                        : ""
                                                }
                                            >
                                                {product.stock}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {product.manufacturer}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            product.expiryDate || ""
                                        ).toLocaleDateString("ru-RU")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEditProduct(
                                                            product
                                                        )
                                                    }
                                                >
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Редактировать
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Удалить
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={9}
                                    className="text-center py-4"
                                >
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Товары не найдены. Попробуйте
                                            изменить параметры поиска.
                                        </AlertDescription>
                                    </Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Диалог добавления/редактирования товара */}
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProduct
                                ? "Редактирование товара"
                                : "Добавление нового товара"}
                        </DialogTitle>
                        <DialogDescription>
                            Заполните информацию о товаре. Все поля, отмеченные
                            * обязательны для заполнения.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Название *
                            </Label>
                            <Input
                                id="name"
                                defaultValue={editingProduct?.name}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="sku" className="text-right">
                                SKU *
                            </Label>
                            <Input
                                id="sku"
                                defaultValue={editingProduct?.sku}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Категория *
                            </Label>
                            <Select defaultValue={editingProduct?.category}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories
                                        .filter((c) => c !== "Все категории")
                                        .map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Цена *
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                defaultValue={editingProduct?.price}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">
                                Количество *
                            </Label>
                            <Input
                                id="stock"
                                type="number"
                                defaultValue={editingProduct?.stock}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="manufacturer"
                                className="text-right"
                            >
                                Производитель
                            </Label>
                            <Input
                                id="manufacturer"
                                defaultValue={editingProduct?.manufacturer}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expiryDate" className="text-right">
                                Срок годности
                            </Label>
                            <Input
                                id="expiryDate"
                                type="date"
                                defaultValue={editingProduct?.expiryDate}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Рецептурный</Label>
                            <div className="col-span-3 flex items-center">
                                <Checkbox
                                    id="isRx"
                                    defaultChecked={editingProduct?.isRx}
                                />
                                <Label htmlFor="isRx" className="ml-2">
                                    Требуется рецепт
                                </Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddProductOpen(false)}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => handleSaveProduct({} as Product)}
                        >
                            Сохранить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InventoryPage;
