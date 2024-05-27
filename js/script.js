
/*
* Add producto to shop Car and delete. 
* Amound increase/more than one product
* Empty the shopping cart
*/
const shopCart = document.querySelector('#shopCart');
const containerSHopCart = document.querySelector('#list-shopCart tbody');
const emptyShopCArt = document.querySelector('#clean-cart');
const bookList = document.querySelector('#book-list');
let articlesShorCart = []; 


startEventListener();
function startEventListener() {
    bookList.addEventListener('click', addProduct);

    shopCart.addEventListener('click', reaseBook);

    document.addEventListener('DOMContentLoaded', ()=> {
        articlesShorCart = JSON.parse(localStorage.getItem('shopCart')) || [];
        shopCartHTML();
    })

    emptyShopCArt.addEventListener('click', () => {
        articlesShorCart = [];
        shopCartHTML();
    } )
}


function addProduct(e) {
    
    e.preventDefault();
    if(e.target.classList.contains('add-shopcart') ) {
        const productSelected = e.target.parentElement.parentElement; 
        readData(productSelected);
    }
}


function readData(productSelected) {

    const infoBookToBuy = {
        image: productSelected.querySelector('img').src,
        title: productSelected.querySelector('h4').textContent,
        price: productSelected.querySelector('.price span').textContent,
        id: productSelected.querySelector('a').getAttribute('data-id'),
        amound: 1
    }

   
    if(articlesShorCart.some( elementSelected => elementSelected.id === infoBookToBuy.id ) ) {
        const elementSelected = articlesShorCart.map( elementSelected => {
            if( elementSelected.id === infoBookToBuy.id ) {
                elementSelected.amound++;
                return elementSelected; 
            }else{
                return elementSelected; 
            }
        })
        articlesShorCart = [...elementSelected];
    } else {
        articlesShorCart = [...articlesShorCart, infoBookToBuy];
    }

    shopCartHTML();
}


function reaseBook(e) {
    e.preventDefault();
    if(e.target.classList.contains('rease-book')) {
        const bookId = e.target.getAttribute('data-id')

        articlesShorCart = articlesShorCart.filter( elementSelected => elementSelected.id !== bookId );
       
        shopCartHTML();
    }
}


function shopCartHTML() {
    
   cleanHTML();

    articlesShorCart.forEach( elementSelected => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${ elementSelected.image }" width="100"></td>
            <td>${ elementSelected.title } </td>
            <td>${ elementSelected.price }</td>
            <td>${ elementSelected.amound }</td>
            <td><a href=""class="rease-book" data-id="${ elementSelected.id }"> X </td>
        `;

       containerSHopCart.appendChild(row);
    });

    // add to localStorage
    syncLocalStorage();

}

function syncLocalStorage() {
    localStorage.setItem('shopCart', JSON.stringify(articlesShorCart) );
}


function cleanHTML() {

    while(containerSHopCart.firstChild) {
        containerSHopCart.removeChild(containerSHopCart.firstChild);
    }
}

