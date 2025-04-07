// База товаров
const products = [
    { id: 1, name: "Гарри Поттер", price: 500, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Властелин Колец", price: 600, image: "https://via.placeholder.com/150" },
    { id: 3, name: "1984", price: 450, image: "https://via.placeholder.com/150" }
];

// Корзина
let cart = [];

// Отображаем товары
function displayProducts() {
    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";
    
    products.forEach(product => {
        productsDiv.innerHTML += `
            <div class="product">
                <img src="${product.image}" width="100">
                <h3>${product.name}</h3>
                <p>Цена: ${product.price} ₽</p>
                <button onclick="addToCart(${product.id})">В корзину</button>
            </div>
        `;
    });
}

// Добавляем в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Обновляем корзину
function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
}

// Оформление заказа (отправка в Telegram)
function checkout() {
    if (cart.length === 0) return alert("Корзина пуста!");
    
    let message = "Новый заказ:\n";
    cart.forEach(item => {
        message += `- ${item.name}: ${item.price} ₽\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `Итого: ${total} ₽`;
    
    // Отправляем в Telegram (замени XXXXX на свой ID бота)
    fetch(`https://api.telegram.org/bot7925066714:AAF8EcFjyj_6RLu6nal5UO5X2Sf5p8-25kE/sendMessage?chat_id=1900010758&text=${encodeURIComponent(message)}`);
    
    alert("Заказ отправлен! Мы свяжемся с вами.");
    cart = [];
    updateCart();
}

// Запускаем магазин
displayProducts();