document.addEventListener('DOMContentLoaded', () => {
    const carForm = document.getElementById('carForm');
    const carList = document.getElementById('carList');

    const carData = {}; // Objeto para armazenar dados de classificação de carros

    carForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const carSelect = document.getElementById('carSelect');
        const carRatingInput = document.getElementById('carRating');

        const carName = carSelect.value;
        const carRating = parseInt(carRatingInput.value);

        if (carName && carRating >= 1 && carRating <= 5) {
            addCarRating(carName, carRating);
            carForm.reset();
        } else {
            alert('Por favor, selecione um carro e insira uma classificação entre 1 e 5.');
        }
    });

    function addCarRating(carName, rating) {
        if (!carData[carName]) {
            carData[carName] = { ratings: [], averageRating: 0 };
        }
        carData[carName].ratings.push(rating);
        carData[carName].averageRating = calculateAverage(carData[carName].ratings);
        renderCarList();
    }

    function calculateAverage(ratings) {
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        return sum / ratings.length;
    }

    function renderCarList() {
        carList.innerHTML = '';
        for (const carName in carData) {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
            carItem.innerHTML = `
                <h2>${carName}</h2>
                <p>Classificação Média: ${carData[carName].averageRating.toFixed(2)}</p>
                <p>Classificações: ${carData[carName].ratings.join(', ')}</p>
            `;
            carList.appendChild(carItem);
        }
    }
});



