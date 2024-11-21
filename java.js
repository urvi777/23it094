const products = [
    { title: 'Book 1', author: 'Author 1', price: 10, rating: 4.5 },
    { title: 'Book 2', author: 'Author 2', price: 15, rating: 4.0 },
    // Add more products as needed
];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCounts();
});

function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.author}</td>
            <td>$${product.price}</td>
            <td>${product.rating} ★</td>
            <td>
                <button class="AddToCart">Add to Cart</button>
                <button class="AddToWishlist">Add to Wishlist</button>
            </td>
        `;
        productGrid.appendChild(row);
    });

    document.querySelector('table').addEventListener('click', (e) => {
        if (e.target.className === 'AddToCart') {
            const [bookTd, authorTd] = [...e.target.closest('tr').children];
            addToLocalStorage('cart', { title: bookTd.textContent, author: authorTd.textContent });
        } else if (e.target.className === 'AddToWishlist') {
            const [bookTd, authorTd] = [...e.target.closest('tr').children];
            addToLocalStorage('wishlist', { title: bookTd.textContent, author: authorTd.textContent });
        }
        updateCounts();
    });
}

function addToLocalStorage(type, obj) {
    let items = JSON.parse(localStorage.getItem(type)) || [];
    items.push(obj);
    localStorage.setItem(type, JSON.stringify(items));
    console.log('adding to ' + type + ':', obj);
}

function updateCounts() {
    const cartCount = (JSON.parse(localStorage.getItem('cart')) || []).length;
    const wishlistCount = (JSON.parse(localStorage.getItem('wishlist')) || []).length;
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('wishlist-count').textContent = wishlistCount;
}