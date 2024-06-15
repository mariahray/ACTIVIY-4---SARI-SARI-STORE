document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");

    const stock = {
        "Denim Shorts": 10,
        "Maong Shorts": 15,
        "Cargo Jeans": 20,
        "Straigh Cut Jeans": 8,
        "V Neck Shirt ": 14,
        "Crew Neck Shirt": 25,
        "Polo Shirt": 17,
        "Sweat Shirt": 3,
        "Pear and Freesia": 5,
        "Miss Dior": 10,
        "Sweet Night": 9,
        "Calvin Klein": 2,
        "White Sando": 45,
        "Dri-Fit Black Sando": 28,
        "Sleeves Crop Top": 12,
        "Square Neck Top": 16,
        "Kitchen Set": 5,
        "Claw Machine": 11,
        "Pokemon Toy Set": 19,
        "Race Track": 7,
    };

    items.forEach(item => {
        const quantityValue = item.querySelector(".quantity-value");
        const incrementBtn = item.querySelector(".increment");
        const decrementBtn = item.querySelector(".decrement");
        const addToCartBtn = item.querySelector(".add-to-cart");
        const itemName = item.querySelector("h2").innerText;
        const price = parseFloat(item.querySelector(".price").innerText.replace("$", ""));

        let quantity = 0;

        incrementBtn.addEventListener("click", () => {
            quantity++;
            quantityValue.innerText = quantity;
        });

        decrementBtn.addEventListener("click", () => {
            if (quantity > 0) {
                quantity--;
                quantityValue.innerText = quantity;
            }
        });

        addToCartBtn.addEventListener("click", () => {
            if (quantity > 0) {
                if (stock[itemName] >= quantity) {
                    addToCart(itemName, quantity, price);
                    stock[itemName] -= quantity;
                    updateStockDisplay();
                } else {
                    alert(`Sorry, there are only ${stock[itemName]} ${itemName}(s) available.`);
                }
            }
        });
    });

    let cart = [];

    function addToCart(item, quantity, price) {
        const existingItem = cart.find(cartItem => cartItem.item === item);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ item, quantity, price });
        }

        renderCart();
    }

    function removeFromCart(item) {
        cart = cart.filter(cartItem => cartItem.item !== item);
        renderCart();
    }

    function renderCart() {
        const cartItemsList = document.querySelector(".cart-items");
        const totalElement = document.querySelector(".total");

        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach(cartItem => {
            const li = document.createElement("li");
            li.textContent = `${cartItem.item} x ${cartItem.quantity} - $${(cartItem.quantity * cartItem.price).toFixed(2)}`;
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => {
                removeFromCart(cartItem.item);
                stock[cartItem.item] += cartItem.quantity;
                updateStockDisplay();
                renderCart(); // Add this line to refresh the cart display after removing an item
            });
            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);
            total += cartItem.quantity * cartItem.price;
        });

        const discount = document.getElementById("discount").value;
        total = applyDiscount(total, discount);

        totalElement.textContent = `$${total.toFixed(2)}`;
    }
	function applyDiscount(total, discount) {
  switch (discount) {
    case "PWD":
      return total * 0.7; // Apply 30% discount
    case "Senior":
      return total * 0.8; // Apply 20% discount
    case "Student":
      return total * 0.9; // Apply 10% discount
    default:
      return total; // No discount applied
  }
}
    function updateStockDisplay() {
        const stockDisplays = document.querySelectorAll(".stock");
        stockDisplays.forEach(display => {
            const itemName = display.dataset.item;
            display.textContent = stock[itemName];
        });
    }

    document.getElementById("discount").addEventListener("change", renderCart);

    updateStockDisplay();
});
