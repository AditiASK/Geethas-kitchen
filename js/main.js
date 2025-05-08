document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Order submitted! Please proceed to payment.");
    window.location.href = "thankyou.html";
  });
  