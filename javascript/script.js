document.addEventListener('DOMContentLoaded', () => {
    const initialProducts = [
        { name: 'Funko Pop - Pudge', price: '20.00', image: 'css/img/1.jpg' },
        { name: 'Funko Pop - Phantom', price: '20.00', image: 'css/img/2.jpg' },
        { name: 'Funko Pop - Earth', price: '20.00', image: 'css/img/3.jpg' },
        { name: 'Funko Pop - Spirit', price: '20.00', image: 'css/img/4.jpg' },
        { name: 'Funko Pop - Juggernaut', price: '20.00', image: 'css/img/5.jpg' },
        { name: 'Funko Pop - 5x4', price: '80.00', image: 'css/img/6.jpg' },
    ];

    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    loadStoredProducts();

    document.getElementById('productForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const imageInput = document.getElementById('productImageInput');
        
        if (name && price && imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const image = e.target.result;
                const product = {
                    name: name,
                    price: price,
                    image: image
                };

                addProduct(product);
                saveProduct(product);
                clearForm();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            alert('Por favor, completa todos los campos y selecciona una imagen.');
        }
    });
});

function addProduct(product) {
    const productContainer = document.getElementById('products');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    const productImg = document.createElement('img');
    productImg.src = product.image;
    productImg.alt = product.name;

    const productName = document.createElement('h3');
    productName.textContent = product.name;

    const productPrice = document.createElement('p');
    productPrice.textContent = `$${product.price}`;

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '&#128465;'; // Tachito de basura emoji
    deleteButton.addEventListener('click', () => {
        deleteProduct(product);
    });

    productDiv.appendChild(productImg);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(deleteButton);

    productContainer.appendChild(productDiv);
}

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function loadStoredProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => addProduct(product));
}

function deleteProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(p => !(p.name === product.name && p.price === product.price && p.image === product.image));
    localStorage.setItem('products', JSON.stringify(products));

    const productContainer = document.getElementById('products');
    const productsDOM = productContainer.querySelectorAll('.product');
    productsDOM.forEach(productDOM => {
        if (productDOM.childNodes[1].textContent === product.name && productDOM.childNodes[2].textContent === `$${product.price}` && productDOM.childNodes[0].src === product.image) {
            productContainer.removeChild(productDOM);
        }
    });
}

function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImageInput').value = '';
}
