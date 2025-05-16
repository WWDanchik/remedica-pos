import React, { useState, useEffect, useRef } from "react";

// Импорт типов
import { Product, CartItem } from "@/entities/product/model/types";
import {
    AlertCircle,
    Banknote,
    CreditCard,
    Minus,
    Plus,
    Search,
    ShoppingCart,
    Trash2,
    Barcode,
    CheckCircle2,
    Clock,
    ListX,
} from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shared/ui/dialog";

// Моковые данные для примера
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Аспирин",
        price: 120,
        stock: 45,
        category: "Обезболивающие",
        sku: "ASP001",
        barcode: "4600123456789",
    },
    {
        id: 2,
        name: "Парацетамол",
        price: 80,
        stock: 30,
        category: "Обезболивающие",
        sku: "PAR001",
        barcode: "4600123456790",
    },
    {
        id: 3,
        name: "Ибупрофен",
        price: 150,
        stock: 28,
        category: "Противовоспалительные",
        sku: "IBU001",
        barcode: "4600123456791",
    },
    {
        id: 4,
        name: "Амоксициллин",
        price: 320,
        stock: 15,
        category: "Антибиотики",
        sku: "AMX001",
        barcode: "4600123456792",
        isRx: true,
    },
    {
        id: 5,
        name: "Витамин С",
        price: 210,
        stock: 50,
        category: "Витамины",
        sku: "VTC001",
        barcode: "4600123456793",
    },
];

const categories = [
    "Все",
    "Обезболивающие",
    "Противовоспалительные",
    "Антибиотики",
    "Витамины",
];

const PosPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showScanner, setShowScanner] = useState(false);
    const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
    const [scanFeedback, setScanFeedback] = useState({
        show: false,
        success: false,
        message: "",
    });
    const [lastTransactions, setLastTransactions] = useState<
        {
            items: CartItem[];
            total: number;
            timestamp: Date;
            paymentMethod: string;
        }[]
    >([]);
    const [showLastTransactionDialog, setShowLastTransactionDialog] =
        useState(false);

    const searchInputRef = useRef<HTMLInputElement>(null);

    // Эффект для автофокуса на поле поиска/сканирования
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [cart.length]); // Перефокус после изменения корзины

    // Обработка нажатия клавиш для быстрых действий
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // F2 - переключение в режим сканера
            if (e.key === "F2") {
                e.preventDefault();
                toggleScannerMode();
            }
            // F3 - быстрая оплата наличными
            else if (e.key === "F3" && cart.length > 0) {
                e.preventDefault();
                checkout("cash");
            }
            // F4 - быстрая оплата картой
            else if (e.key === "F4" && cart.length > 0) {
                e.preventDefault();
                checkout("card");
            }
            // F5 - очистить корзину
            else if (e.key === "F5") {
                e.preventDefault();
                clearCart();
            }
            // F6 - открыть последние транзакции
            else if (e.key === "F6") {
                e.preventDefault();
                setShowLastTransactionDialog(true);
            }
            // Enter в режиме сканера для подтверждения ввода
            else if (e.key === "Enter" && showScanner) {
                e.preventDefault();
                processBarcode(searchQuery);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showScanner, searchQuery, cart]);

    // Переключение режима поиск/сканер
    const toggleScannerMode = () => {
        setShowScanner(!showScanner);
        setSearchQuery("");
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    // Обработка сканированного штрих-кода
    const processBarcode = (barcode: string) => {
        if (!barcode.trim()) return;

        const product = mockProducts.find(
            (p) => p.barcode === barcode || p.sku === barcode
        );

        if (product) {
            addToCart(product);
            setScannedProduct(product);
            setScanFeedback({
                show: true,
                success: true,
                message: `${product.name} добавлен в корзину`,
            });

            // Автоматически очищаем поле ввода после успешного сканирования
            setSearchQuery("");

            // Скрываем уведомление через 1.5 секунды
            setTimeout(() => {
                setScanFeedback({ show: false, success: false, message: "" });
            }, 1500);
        } else {
            setScanFeedback({
                show: true,
                success: false,
                message: "Товар не найден",
            });

            // Скрываем уведомление через 1.5 секунды
            setTimeout(() => {
                setScanFeedback({ show: false, success: false, message: "" });
            }, 1500);
        }
    };

    // Фильтрация продуктов
    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.barcode && product.barcode.includes(searchQuery));
        const matchesCategory =
            selectedCategory === "Все" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Добавление товара в корзину
    const addToCart = (product: Product) => {
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId: number) => {
        const existingItem = cart.find((item) => item.id === productId);

        if (existingItem && existingItem.quantity > 1) {
            setCart(
                cart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        } else {
            setCart(cart.filter((item) => item.id !== productId));
        }
    };

    const removeItemCompletely = (productId: number) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const clearCart = () => {
        if (cart.length > 0) {
            if (confirm("Вы уверены, что хотите очистить корзину?")) {
                setCart([]);
                // toast({
                //     title: "Корзина очищена",
                //     description: "Все товары были удалены из корзины",
                // });
            }
        }
    };

    // Завершение покупки
    const checkout = (paymentMethod: "cash" | "card") => {
        console.log(`Оплата ${paymentMethod}`, cart, calculateTotal());

        // Сохраняем транзакцию в истории
        const transaction = {
            items: [...cart],
            total: calculateTotal(),
            timestamp: new Date(),
            paymentMethod: paymentMethod === "cash" ? "Наличные" : "Карта",
        };

        setLastTransactions((prev) => [transaction, ...prev.slice(0, 9)]);

        // Очищаем корзину
        setCart([]);

        // Показываем уведомление об успешной операции
        // toast({
        //     title: "Заказ оформлен",
        //     description: `Оплата: ${
        //         paymentMethod === "cash" ? "Наличные" : "Карта"
        //     }`,
        // });

        // Возвращаем фокус на поле ввода
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    // Форматирование времени транзакции
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="flex h-full gap-4 p-4">
            {/* Левая панель с товарами */}
            <div className="w-2/3 flex flex-col">
                <div className="mb-4 flex items-center gap-2">
                    <div className="relative flex-1">
                        {showScanner ? (
                            <Barcode className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                        ) : (
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        )}
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder={
                                showScanner
                                    ? "Отсканируйте штрих-код..."
                                    : "Поиск по названию или коду..."
                            }
                            className={`pl-8 ${
                                showScanner
                                    ? "border-blue-400 focus:border-blue-500"
                                    : ""
                            }`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && showScanner) {
                                    processBarcode(searchQuery);
                                }
                            }}
                        />
                    </div>
                    <Button
                        variant={showScanner ? "default" : "outline"}
                        size="icon"
                        onClick={toggleScannerMode}
                        title="Режим сканера (F2)"
                    >
                        <Barcode className="h-4 w-4" />
                    </Button>
                </div>

                {/* Уведомление о результате сканирования */}
                {scanFeedback.show && (
                    <Alert
                        className={`mb-4 ${
                            scanFeedback.success
                                ? "bg-green-50 text-green-800 border-green-200"
                                : "bg-red-50 text-red-800 border-red-200"
                        }`}
                    >
                        {scanFeedback.success ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>
                            {scanFeedback.message}
                        </AlertDescription>
                    </Alert>
                )}

                {!showScanner && (
                    <Tabs defaultValue="Все" className="mb-4">
                        <TabsList className="w-full justify-start overflow-auto">
                            {categories.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                )}

                {/* Информация о горячих клавишах в режиме сканера */}
                {showScanner && (
                    <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-sm flex items-center">
                        <div className="grid grid-cols-3 gap-2 w-full">
                            <span>
                                <kbd className="px-2 py-1 bg-white border rounded shadow-sm">
                                    F2
                                </kbd>{" "}
                                - Режим поиска
                            </span>
                            <span>
                                <kbd className="px-2 py-1 bg-white border rounded shadow-sm">
                                    F3
                                </kbd>{" "}
                                - Оплата наличными
                            </span>
                            <span>
                                <kbd className="px-2 py-1 bg-white border rounded shadow-sm">
                                    F4
                                </kbd>{" "}
                                - Оплата картой
                            </span>
                            <span>
                                <kbd className="px-2 py-1 bg-white border rounded shadow-sm">
                                    F5
                                </kbd>{" "}
                                - Очистить корзину
                            </span>
                            <span>
                                <kbd className="px-2 py-1 bg-white border rounded shadow-sm">
                                    F6
                                </kbd>{" "}
                                - История
                            </span>
                            <span>
                                <kbd className="px-2 py-1 bg-white border rounded shadow-sm">
                                    Enter
                                </kbd>{" "}
                                - Подтвердить код
                            </span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4 overflow-auto pb-4">
                    {!showScanner &&
                        filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => addToCart(product)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium">
                                            {product.name}
                                        </h3>
                                        {product.isRx && (
                                            <Badge
                                                variant="outline"
                                                className="bg-orange-100 text-orange-800 border-orange-200"
                                            >
                                                Rx
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold mt-1">
                                        {product.price} ₽
                                    </p>
                                    <p
                                        className={`text-sm mt-1 ${
                                            product.stock < 10
                                                ? "text-red-500"
                                                : "text-green-600"
                                        }`}
                                    >
                                        В наличии: {product.stock}
                                    </p>
                                    <div className="flex justify-between text-gray-500 text-xs mt-1">
                                        <span>SKU: {product.sku}</span>
                                        {product.barcode && (
                                            <span>
                                                Штрих-код: {product.barcode}
                                            </span>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                    {!showScanner && filteredProducts.length === 0 && (
                        <div className="col-span-3">
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Товары не найдены. Попробуйте изменить
                                    параметры поиска.
                                </AlertDescription>
                            </Alert>
                        </div>
                    )}
                </div>
            </div>

            {/* Правая панель с корзиной */}
            <div className="w-1/3 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Корзина</h2>
                    </div>
                    {cart.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={clearCart}
                        >
                            <ListX className="h-4 w-4 mr-1" />
                            Очистить
                        </Button>
                    )}
                </div>

                <div className="flex-1 overflow-auto p-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <ShoppingCart className="h-12 w-12 mb-2 opacity-30" />
                            <p>Корзина пуста</p>
                            <p className="text-sm">
                                {showScanner
                                    ? "Отсканируйте штрих-код товара"
                                    : "Добавьте товары из каталога"}
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-md"
                                >
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium">
                                                {item.name}
                                            </h4>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeItemCompletely(
                                                        item.id
                                                    );
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-sm">
                                                {item.price} ₽ × {item.quantity}{" "}
                                                = {item.price * item.quantity} ₽
                                            </span>
                                            <div className="flex items-center">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6 rounded-full"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart(item.id);
                                                    }}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="mx-2 min-w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6 rounded-full"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart(item);
                                                    }}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-4 border-t dark:border-gray-700">
                    <div className="flex justify-between mb-4">
                        <span className="text-lg">Итого:</span>
                        <span className="text-lg font-bold">
                            {calculateTotal()} ₽
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => checkout("cash")}
                            disabled={cart.length === 0}
                        >
                            <Banknote className="mr-2 h-4 w-4" />
                            Наличные (F3)
                        </Button>
                        <Button
                            className="w-full"
                            onClick={() => checkout("card")}
                            disabled={cart.length === 0}
                        >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Карта (F4)
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full mt-2 text-gray-500"
                        onClick={() => setShowLastTransactionDialog(true)}
                    >
                        <Clock className="mr-2 h-4 w-4" />
                        История (F6)
                    </Button>
                </div>
            </div>

            {/* Диалог с последними транзакциями */}
            <Dialog
                open={showLastTransactionDialog}
                onOpenChange={setShowLastTransactionDialog}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>История транзакций</DialogTitle>
                    </DialogHeader>

                    {lastTransactions.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            <Clock className="h-12 w-12 mx-auto mb-2 opacity-30" />
                            <p>История транзакций пуста</p>
                        </div>
                    ) : (
                        <div className="max-h-96 overflow-auto">
                            {lastTransactions.map((transaction, index) => (
                                <div
                                    key={index}
                                    className="mb-4 p-3 border rounded bg-gray-50"
                                >
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">
                                            Транзакция #
                                            {lastTransactions.length - index}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {formatTime(transaction.timestamp)}
                                        </span>
                                    </div>
                                    <ul className="space-y-1 mb-2">
                                        {transaction.items.map(
                                            (item, itemIndex) => (
                                                <li
                                                    key={itemIndex}
                                                    className="text-sm flex justify-between"
                                                >
                                                    <span>
                                                        {item.name} ×{" "}
                                                        {item.quantity}
                                                    </span>
                                                    <span>
                                                        {item.price *
                                                            item.quantity}{" "}
                                                        ₽
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div className="flex justify-between pt-2 border-t">
                                        <div className="flex items-center">
                                            <Badge variant="outline">
                                                {transaction.paymentMethod}
                                            </Badge>
                                        </div>
                                        <span className="font-bold">
                                            Итого: {transaction.total} ₽
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            onClick={() => setShowLastTransactionDialog(false)}
                        >
                            Закрыть
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Компонент для отображения уведомлений */}
        </div>
    );
};

export default PosPage;
