// Car class definition
class Car {
    constructor(licensePlate, maker, model, owner, price, color) {
        this.licensePlate = licensePlate;
        this.maker = maker;
        this.model = model;
        this.owner = owner;
        this.price = price;
        this.color = color;
    }
}

// Array to store car objects
let cars = [];

// Handling form submission
document.getElementById("carForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form values
    let licensePlate = document.getElementById("licensePlate").value;
    let maker = document.getElementById("maker").value;
    let model = document.getElementById("model").value;
    let owner = document.getElementById("owner").value;
    let price = document.getElementById("price").value;
    let color = document.getElementById("color").value;

    // Create a new Car object
    let newCar = new Car(licensePlate, maker, model, owner, price, color);

    // Add the new car to the cars array
    cars.push(newCar);

    // Update the table with the new car
    updateCarTable();

    // Clear the form
    document.getElementById("carForm").reset();
});

// Function to update the table with car objects
function updateCarTable() {
    let tbody = document.getElementById("carTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Clear existing rows

    // Loop through the cars array and add rows to the table
    cars.forEach(car => {
        let row = tbody.insertRow();

        row.insertCell(0).textContent = car.licensePlate;
        row.insertCell(1).textContent = car.maker;
        row.insertCell(2).textContent = car.model;
        row.insertCell(3).textContent = car.owner;
        row.insertCell(4).textContent = "$" + car.price;
        row.insertCell(5).textContent = car.color;
    });
}

// Search function to find a car by license plate
function searchCar() {
    let searchPlate = document.getElementById("searchPlate").value.trim();
    let result = cars.find(car => car.licensePlate === searchPlate);

    let searchResultElement = document.getElementById("searchResult");

    if (result) {
        searchResultElement.textContent = `Car Found: Maker: ${result.maker}, Model: ${result.model}, Owner: ${result.owner}`;
    } else {
        searchResultElement.textContent = "No car found with this license plate.";
    }
}
