// База товаров
const products = [
    { id: 1, name: "Гарри Поттер", price: 500, image: "https://www.bing.com/images/search?view=detailV2&ccid=5JT994MO&id=8F1A5846CF4328EBE7D7FC2D7A093690D247421C&thid=OIP.5JT994MOCx_1ESCN3Ax_2gHaHq&mediaurl=https%3a%2f%2fn1s1.hsmedia.ru%2fb1%2f14%2f92%2fb11492da66f3299680668605ad2e63fb%2f480x497_0xac120003_3459082961595935020.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.e494fdf7830e0b1ff511208ddc0c7fda%3frik%3dHEJH0pA2CXot%252fA%26pid%3dImgRaw%26r%3d0&exph=497&expw=480&q=%d0%b3%d0%b0%d1%80%d1%80%d0%b8&simid=608007872263052418&FORM=IRPRST&ck=063FADCC176025684FCAF6F0EFEF4342&selectedIndex=9&itb=0" },
    { id: 2, name: "Властелин Колец", price: 600, image: "https://www.bing.com/images/search?view=detailV2&ccid=X37Bunep&id=2AD0CC538BEAAC81AF7DDED406FAFF9096443E1C&thid=OIP.X37Bunep-m_aQMGTc5Cg8AHaKK&mediaurl=https%3a%2f%2fgl.weburg.net%2f00%2fmovies%2f2%2f6775%2foriginal%2f407662.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.5f7ec1ba77a9fa6fda40c1937390a0f0%3frik%3dHD5ElpD%252f%252bgbU3g%26pid%3dImgRaw%26r%3d0&exph=1733&expw=1262&q=%d0%b2%d0%bb%d0%b0%d1%81%d1%82%d0%b5%d0%bb%d0%b8%d0%bd+%d0%ba%d0%be%d0%bb%d0%b5%d1%86&simid=608019756166032447&FORM=IRPRST&ck=F2EBE1EEE036B94A5E17013B311E8B51&selectedIndex=0&itb=0" },
    { id: 3, name: "1984", price: 450, image: "https://www.bing.com/images/search?view=detailV2&ccid=CdyrOwdv&id=34B0EB0228413F3F339AB9A74DCDB9E0EC2C8C3C&thid=OIP.CdyrOwdv2Mre-ZhrSzJ7lwHaJM&mediaurl=https%3a%2f%2fs3.amazonaws.com%2fcriterion-production%2ffilms%2f9b263f6358cf0bae18244c759d4592f0%2fBonyZ4taymxrfBiRqY6K42NBh0jsop_large.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.09dcab3b076fd8cadef9986b4b327b97%3frik%3dPIws7OC5zU2nuQ%26pid%3dImgRaw%26r%3d0&exph=1600&expw=1288&q=1984&simid=608000682472913339&FORM=IRPRST&ck=65D69C1D2D7C79F53D238F2EB6D955C4&selectedIndex=1&itb=0" }
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
