// Pancake base prices
const pancakePrices = {
    classic: 5,
    blueberry: 6,
    chocolate: 7
};

// Extra topping prices
const extrasPrices = {
    whippedCream: 2,
    syrup: 1.5,
    fruit: 2.5,
    chocolateChips: 3
};

// Delivery surcharge
const deliveryCharge = 5;

// Orders array to store all orders
let orders = [];

// Function to calculate total price
function calculateTotalPrice() {
    let totalPrice = 0;

    // Get the selected pancake type and its base price
    const pancakeType = document.getElementById('pancakeType').value;
    totalPrice += pancakePrices[pancakeType];

    // Get all toppings and extras that are checked
    const toppings = document.querySelectorAll('.topping:checked');
    toppings.forEach(topping => {
        totalPrice += 1;  // Each topping adds $1
    });

    // Get all extras that are checked and add their specific prices
    const extras = document.querySelectorAll('.extra:checked');
    extras.forEach(extra => {
        totalPrice += extrasPrices[extra.value];  // Add extra prices
    });

    // Check the selected delivery method
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    if (deliveryMethod === 'delivery') {
        totalPrice += deliveryCharge;  // Add delivery charge if delivery is selected
    }

    // Update the total price in the DOM
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

    // Add animation to draw attention to the price change
    totalPriceElement.classList.add('price-change');
    setTimeout(() => {
        totalPriceElement.classList.remove('price-change');
    }, 500);
}

// Function to display the current order
function displayOrderSummary() {
    const customerName = document.getElementById('customerName').value;
    const pancakeType = document.getElementById('pancakeType').value;

    const toppings = Array.from(document.querySelectorAll('.topping:checked'))
        .map(topping => topping.value);

    const extras = Array.from(document.querySelectorAll('.extra:checked'))
        .map(extra => extra.value);

    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const totalPrice = document.getElementById('totalPrice').textContent;

    // Create the summary message
    let summary = `<h3>Order Summary</h3>`;
    summary += `<p><strong>Customer Name:</strong> ${customerName}</p>`;
    summary += `<p><strong>Pancake Type:</strong> ${pancakeType}</p>`;
    summary += `<p><strong>Toppings:</strong> ${toppings.length > 0 ? toppings.join(', ') : 'None'}</p>`;
    summary += `<p><strong>Extras:</strong> ${extras.length > 0 ? extras.join(', ') : 'None'}</p>`;
    summary += `<p><strong>Delivery Method:</strong> ${deliveryMethod === 'delivery' ? 'Delivery' : (deliveryMethod === 'pickUp' ? 'Pick Up' : 'Eat In')}</p>`;
    summary += `<p><strong>Total Price:</strong> ${totalPrice}</p>`;

    // Display the summary in the DOM
    document.getElementById('orderSummary').innerHTML = summary;

    // Add order to orders array
    const order = {
        customerName,
        pancakeType,
        toppings,
        extras,
        deliveryMethod,
        totalPrice
    };

    // Add to the orders array (replacing or updating an existing order if necessary)
    const existingOrderIndex = orders.findIndex(o => o.customerName === customerName);
    if (existingOrderIndex !== -1) {
        orders[existingOrderIndex] = order;  // Update existing order
    } else {
        orders.push(order);  // Add new order
    }

    console.log(orders);  // Log orders array to console for debugging
