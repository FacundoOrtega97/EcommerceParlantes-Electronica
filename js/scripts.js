document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsElement = document.getElementById('cart-items');

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cartItems.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm" data-id="${item.id}">Eliminar</button></td>
            `;

            cartItemsElement.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    function addToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        updateCart();
    }

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-primary')) {
            const productElement = event.target.closest('.card');
            const product = {
                id: productElement.dataset.id,
                name: productElement.querySelector('.card-title').textContent,
                price: parseFloat(productElement.querySelector('.card-text').dataset.price),
            };

            addToCart(product);
        }

        if (event.target.classList.contains('btn-danger')) {
            const id = event.target.dataset.id;
            const itemIndex = cartItems.findIndex(item => item.id === id);

            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                updateCart();
            }
        }
    });
});
