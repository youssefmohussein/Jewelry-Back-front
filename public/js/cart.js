document.addEventListener("DOMContentLoaded", async function () {
  const cartContainer = document.getElementById("cartContainer");
  let subtotal = 0;

  // Fetch cart from backend
  let response = await fetch("/api/cart"); // Adjust the endpoint as needed
  let cart = await response.json();

  if (!cart.length) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="container product-info">
        <p class="product1-name">Product: ${item.name}</p>
        <p class="product-price">Price: LE ${item.price.toLocaleString()}</p>
        <p class="unit">Quantity: ${item.quantity}</p>
        <div class="btn-area">
          <i class="fa fa-trash" onclick="removeFromCart('${item._id}')"></i>
        </div>
      </div>`;
    cartContainer.appendChild(box);
  });

  const tax = subtotal * 0.15;
  const shipping = subtotal > 0 ? 5000 : 0;
  const total = subtotal + tax + shipping;

  document.getElementById("subtotal").textContent = `LE ${subtotal.toLocaleString()}`;
  document.getElementById("tax").textContent = `LE ${tax.toLocaleString()}`;
  document.getElementById("shipping").textContent = `LE ${shipping.toLocaleString()}`;
  document.getElementById("total").textContent = `LE ${total.toLocaleString()}`;


  async function removeFromCart(itemId) {
  await fetch(`/api/cart/${itemId}`, {
    method: "DELETE"
  });

  // Refresh the cart
  window.location.reload();
}

});
