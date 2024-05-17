// Object with option of selects
const filterOptions = {

    brand: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    doors: '',
    transmision: '',
    color: '',

}


// Variables 
const brand       = document.querySelector('#brand');
const year        = document.querySelector('#year');
const minPrice    = document.querySelector('#minPrice');
const maxPrice    = document.querySelector('#maxPrice');
const doors       = document.querySelector('#doors');
const transmision = document.querySelector('#transmision');
const color       = document.querySelector('#color');
const result      = document.querySelector('#result');
const max         = new Date().getFullYear();
const min         = max - 20;


// Event Listener - Load DOM as soon as enter in the page
document.addEventListener('DOMContentLoaded', () => {
    showCars(cars); 

    createYearSelect(); 
});


// Event listener when choose in select
brand.addEventListener('change', e => {
    filterOptions.brand = e.target.value;
    filterCars();
});
year.addEventListener('change', e => {
    filterOptions.year = parseInt( e.target.value );
    filterCars();
});
minPrice.addEventListener('change', e => {
    filterOptions.minPrice = e.target.value;
    filterCars();
});
maxPrice.addEventListener('change', e => {
    filterOptions.maxPrice = e.target.value;
    filterCars();
});
doors.addEventListener('change', e => {
    filterOptions.doors = parseInt( e.target.value );
    filterCars();
});
transmision.addEventListener('change', e => {
    filterOptions.transmision = e.target.value;
    filterCars();
});
color.addEventListener('change', e => {
    filterOptions.color = e.target.value;
    filterCars();
});


// Show lisf of cars in Result
function showCars(cars) {

    cleanHTML();

    cars.forEach( car => {
        const { brand, model, year, price, doors, transmision, color } = car
        const listCar = document.createElement('P');
        listCar.textContent = `

            ${brand} - ${model} - ${year} - ${price}$ - ${doors} Puertas - Transmision: ${transmision} - ${color}
        `
    // Write result filter list car
    result.appendChild(listCar);
    });

}


// Create the years inside the select
function createYearSelect() {

    for( let i = max; i > min; i-- ) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    
    }
}


// Clean HTML filter before new search
function cleanHTML() {
    while( result.firstChild) {
        result.removeChild(result.firstChild);
    }
}


// Filter cars according to selected parameters
function filterCars() {

    const resultFilteredCars = cars.filter( filterBrand )
        .filter( filterYear ).filter( filterMinPrice )
        .filter( filterMaxPrice ).filter( filterDoors )
        .filter( filterTransmision ).filter( filterColor );

    // Show car or show mesage: not found 
    if(resultFilteredCars.length) {
        showCars( resultFilteredCars );
    } else { 
        carNotFound();
    }
}


// Car not found
function carNotFound() {

    cleanHTML();

    const noResult = document.createElement('DIV');
    noResult.classList.add('alert', 'error');
    noResult.textContent = 'Nothing was found, try again';
    result.appendChild(noResult);
}

// Functions of filters 
function filterBrand(car) {
    const { brand } = filterOptions;
    if( brand ) {
        return car.brand === brand;
    }
    return car;
}

function filterYear(car) {
    const { year } = filterOptions;
    if( year ) {
        return car.year === year;
    }
    return car;
}

function filterMinPrice(car) {
    const { minPrice } = filterOptions;
    if( minPrice ) {
        return car.price >= minPrice;
    }
    return car;
}

function filterMaxPrice(car) {
    const { maxPrice } = filterOptions;
    if( maxPrice ) {
        return car.price <= maxPrice;
    }
    return car;
}

function filterDoors(car) {
    const { doors } = filterOptions;
    if( doors ) {
        return car.doors === doors;
    }
    return car;
}

function filterTransmision(car) {
    const { transmision } = filterOptions;
    if( transmision ) {
        return car.transmision === transmision;
    }
    return car;
}

function filterColor(car) {
    const { color } = filterOptions;
    if( color ) {
        return car.color === color;
    }
    return car;
}



