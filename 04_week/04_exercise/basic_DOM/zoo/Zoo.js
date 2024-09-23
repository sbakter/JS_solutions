// Initial animal data (you can expand this with more animals)
let animals = [
    { name: 'Lion', type: 'Mammal', habitat: 'Savannah', image: 'lion.jpg' },
    { name: 'Penguin', type: 'Bird', habitat: 'Arctic', image: 'penguin.jpg' },
    { name: 'Elephant', type: 'Mammal', habitat: 'Forest', image: 'elephant.jpg' },
    { name: 'Crocodile', type: 'Reptile', habitat: 'Swamp', image: 'crocodile.jpg' }
];

// Function to display the animal list
function displayAnimals(animalArray) {
    const animalListDiv = document.getElementById('animalList');
    animalListDiv.innerHTML = ''; // Clear the list before re-rendering

    animalArray.forEach(animal => {
        const animalCard = `
            <div class="animal-card">
                <img src="${animal.image}" alt="${animal.name}" />
                <h2>${animal.name}</h2>
                <p><strong>Type:</strong> ${animal.type}</p>
                <p><strong>Habitat:</strong> ${animal.habitat}</p>
            </div>
        `;
        animalListDiv.innerHTML += animalCard;
    });
}

// Initial display of animals
displayAnimals(animals);

// Function to filter and search animals
function filterAnimals() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredAnimals = animals.filter(animal => {
        return animal.name.toLowerCase().includes(searchInput);
    });
    displayAnimals(filteredAnimals);
}

// Search bar event listener
document.getElementById('searchInput').addEventListener('input', filterAnimals);

// Function to add a new animal
function addAnimal() {
    const name = document.getElementById('newAnimalName').value;
    const type = document.getElementById('newAnimalType').value;
    const habitat = document.getElementById('newAnimalHabitat').value;
    const image = document.getElementById('newAnimalImage').value;

    if (name && type && habitat && image) {
        const newAnimal = { name, type, habitat, image };
        animals.push(newAnimal); // Add new animal to the array
        displayAnimals(animals); // Refresh the animal list
    } else {
        alert('Please fill out all fields before adding a new animal.');
    }
}

// Add animal button event listener
document.getElementById('addAnimalBtn').addEventListener('click', addAnimal);
