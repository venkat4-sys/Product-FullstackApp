function addProduct() {
    var productData = {};

    var productName = document.getElementById("ProductName").value;
    var productPrice = document.getElementById("ProductPrice").value;
    var productQuantity = document.getElementById("ProductQuantity").value;

    productData.productName = productName;
    productData.productPrice = productPrice;
    productData.productQuantity = productQuantity;
    
    //by using the fetch api doing post operation
    fetch('http://localhost:8080/product/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData), // Convert JavaScript object to JSON string
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMessage(data);
        })
        .catch(error => console.error('Fetch error:', error));

        function displayMessage(data){
            console.log("product message called" +data.message);
            var sucessMsg=data.message
            var messageContainer = document.getElementById("productMessage");
            messageContainer.innerHTML = sucessMsg;
            messageContainer.style.color = 'green';
    
            setTimeout(function () {
                messageContainer.innerHTML = '';
                messageContainer.style.color = ''; // Reset color
            }, 3000);
}

} 

document.addEventListener('DOMContentLoaded', function () {
    const editedProduct = JSON.parse(localStorage.getItem('editedProduct'));

    if (editedProduct) {
        document.getElementById('ProductName').value = editedProduct.productName;
        document.getElementById('ProductPrice').value = editedProduct.productPrice;
        document.getElementById('ProductQuantity').value = editedProduct.productQuantity;
    }

    // Clear the local storage after using the data
    localStorage.removeItem('editedProduct');
});  
