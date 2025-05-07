const menuData = [
    { name: "3 Poori + Aloo Palya + Chutney", price: 90 },
    { name: "2 Plain Dosa + Chutney", price: 50 },
    { name: "2 Karam Dosa + Chutney", price: 70 },
    { name: "2 Ghee Karam Dosa + Chutney", price: 80 },
    { name: "2 Masala Dosa + Chutney", price: 90 },
    { name: "6 Paddu/Paniyaram + Chutney", price: 70 },
    { name: "2 Egg Dosa + Chutney", price: 100 },
    { name: "Rice + Andhra Pappu + Kabab (3 pcs)", price: 120 },
    { name: "Rice + Andhra Pappu + Papad", price: 80 },
    { name: "Chicken Kabab", price: 100 },
    { name: "Chicken Fry", price: 100 },
    { name: "Chicken Biryani (750ml) + Raita", price: 150 }
  ];
  
  let cart = {};

  
  const menuContainer = document.getElementById("menuItems");
  const cartList = document.getElementById("cartList");
  const totalAmount = document.getElementById("totalAmount");
  
  menuData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
      <img src="images/dosa.jpg" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart(${index})" class="hero-btn">Add</button>
    `;
    menuContainer.appendChild(card);
  });
  
  window.addToCart = function(index) {
    const item = menuData[index];
    if (cart[item.name]) {
      cart[item.name].quantity += 1;
    } else {
      cart[item.name] = {
        price: item.price,
        quantity: 1
      };
    }
    updateCart();
  };
  
  function updateCart() {
    cartList.innerHTML = "";
    let total = 0;
  
    for (let name in cart) {
      const item = cart[name];
      const li = document.createElement("li");
      li.innerHTML = `
        ${name} (x${item.quantity}) - ₹${item.price * item.quantity}
        <button onclick="removeFromCart('${name}')">–</button>
      `;
      cartList.appendChild(li);
      total += item.price * item.quantity;
    }
  
    totalAmount.textContent = total;
  }
  window.removeFromCart = function(name) {
    if (cart[name]) {
      cart[name].quantity -= 1;
      if (cart[name].quantity <= 0) {
        delete cart[name];
      }
      updateCart();
    }
  };
    
  document.getElementById("checkoutForm").addEventListener("submit", function(e) {
    e.preventDefault();  // Stops form from refreshing page
    document.getElementById("paymentPopup").classList.remove("hidden"); // Shows QR popup
  });
  document.getElementById("payConfirm").addEventListener("click", function () {
    const door = document.getElementById("doorNumber").value;
    let orderSummary = "";
    let total = 0;
  
    for (let name in cart) {
      const item = cart[name];
      orderSummary += `• ${name} x${item.quantity} - ₹${item.price * item.quantity}%0A`;
      total += item.price * item.quantity;
    }
  
    const msg = `*Order from Geetha's Kitchen*%0A${orderSummary}%0AFlat No: ${door}%0ATotal: ₹${total}%0A*Paid via UPI* ✅`;
  
    window.open(`https://wa.me/918546889678?text=${msg}`, "_blank");
    document.getElementById("paymentPopup").classList.add("hidden");
  });
    