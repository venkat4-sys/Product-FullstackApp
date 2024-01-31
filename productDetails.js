// productDetails.js

function getAllproductsData() {
    fetch('http://localhost:8080/product/getAllproducts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        renderProducts(data); // Call the rendering function with the fetched data
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

function renderProducts(products) {
    const tbody = document.querySelector('#productTable tbody');

    // Clear existing table rows
    tbody.innerHTML = '';

    // Loop through each product and create a table row
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>$${product.productPrice}</td>
            <td class="action-buttons">
                <button class="delete-button" onclick="deleteProduct(${product.productId})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteProduct(id) {
    console.log(id);
    fetch(`http://localhost:8080/product/delete/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log(response);  // Log the entire response
        return response.json();
    })
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.log("deletion error" + error);
    });
}


// Call fetchData to initiate the process
getAllproductsData();
