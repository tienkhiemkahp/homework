var cartTable = document.querySelector(".cart-table");
var cart = [];
var total = 0;
var totalQuantity = 0;
var empty = document.querySelector(".empty");
var addProductBtnEls = document.getElementsByClassName("add-product-btn");
var updateCartBtn = document.querySelector(".update-cart-btn");
var clearCartBtn = document.querySelector(".clear-cart-btn");

function addHeaderRow() {
    var headerRow = "<tr><td>STT</td><td>Tên sản phẩm</td><td>Giá</td><td>Số Lượng</td><td>Thành tiền</td><td>Xóa</td></tr>";
    cartTable.innerHTML = headerRow;
}

function addFooterRow() {
    var footerRow = `<tr class="footer-row"><td colspan="3">Tổng</td><td>${totalQuantity}</td><td>${total}</td><td></td></tr>`;
    cartTable.innerHTML += footerRow;
}

function findProductIndexInCart(productName) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === productName) {
            return i;
        }
    }
    return -1;
}

function handleAddProduct(event) {
    var productRow = event.target.closest('tr');
    var productName = productRow.querySelector('.product-name').textContent.trim();
    var productPrice = parseInt(productRow.querySelector('.product-price').textContent.trim(), 10);
    var productQuantity = parseInt(productRow.querySelector('.quantity').value, 10);

    var existingProductIndex = findProductIndexInCart(productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += productQuantity;
        cart[existingProductIndex].total += productPrice * productQuantity;
    } else {
        var product = {
            name: productName,
            price: productPrice,
            quantity: productQuantity,
            total: productPrice * productQuantity
        };
        cart.push(product);
    }

    total += productPrice * productQuantity;
    totalQuantity += productQuantity;

    empty.style.display = "none";
    renderCart();
}

function updateRemoveButtons() {
    var removeButtons = document.getElementsByClassName('remove-product-btn');
    for (var i = 0; i < removeButtons.length; i++) {
        (function(index) {
            removeButtons[index].addEventListener('click', function() {
                var confirmation = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
                if (confirmation) {
                    var product = cart[index];
                    total -= product.total;
                    totalQuantity -= product.quantity;
                    cart.splice(index, 1);
                    renderCart();
                }
            });
        })(i);
    }
}

function updateQuantityInputs() {
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        (function(index) {
            quantityInputs[index].addEventListener('change', function() {
                var newQuantity = parseInt(quantityInputs[index].value, 10);
                if (newQuantity > 0) {
                    var product = cart[index];
                    totalQuantity = totalQuantity - product.quantity + newQuantity;
                    total = total - product.total + (product.price * newQuantity);
                    product.quantity = newQuantity;
                    product.total = product.price * newQuantity;
                    renderCart();
                }
            });
        })(i);
    }
}

function renderCart() {
    if (cart.length === 0) {
        empty.style.display = "block";
        cartTable.innerHTML = "";
        updateCartBtn.style.display = "none"; 
        clearCartBtn.style.display = "none"; 
        return;
    }
    empty.style.display = "none";
    addHeaderRow();
    var cartRows = '';
    for (var i = 0; i < cart.length; i++) {
        var product = cart[i];
        cartRows += `<tr><td>${i + 1}</td><td>${product.name}</td><td>${product.price}</td><td><input type="number" value="${product.quantity}" min="1" class="cart-quantity"></td><td>${product.total}</td><td><button class="remove-product-btn">Xóa</button></td></tr>`;
    }
    cartTable.innerHTML += cartRows;
    addFooterRow();
    updateRemoveButtons();
    updateQuantityInputs();

    updateCartBtn.style.display = "block";
    clearCartBtn.style.display = "block";
}

function updateCart() {
    alert("Cập nhật giỏ hàng thành công!");
}

function clearCart() {
    var confirmation = confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?");
    if (confirmation) {
        cart = [];
        total = 0;
        totalQuantity = 0;
        renderCart();
    }
}

if (updateCartBtn) {
    updateCartBtn.addEventListener("click", updateCart);
}

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
}

for (var i = 0; i < addProductBtnEls.length; i++) {
    addProductBtnEls[i].addEventListener("click", handleAddProduct);
}
