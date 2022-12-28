//save to local storage
//clear inputs
//search
//clean data

/*Start Global Variables*/

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('create')
let mode = 'create' //create or update
let temp;

/*End Global Variables*/
//get total = price + taxes + ads - discount
function getTotal() {
    if (price.value != '') {
        let result = (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value)
        total.innerHTML = result
        total.style.background = '#04AA6D';
    }
    else {
        total.innerHTML = ''
        total.style.background = '#a30b00';
    }
}

//create new item
let productData; //Array of product objects
if (localStorage.product != null) {
    productData = JSON.parse(localStorage.product)
}
else { productData = []; }

create.addEventListener('click', () => {
    let NewProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
        sold: 0
    }
    if (title.value != '' && price.value != '' && category.value != '') {
        if (mode == 'create') {
            productData.push(NewProduct)
        }
        else {// mode = update
            let soldTemp = productData[temp].sold
            productData[temp] = NewProduct
            productData[temp].sold = soldTemp
            mode = 'create'
            create.innerHTML = 'Create'
        }
        //call function clearData to execute "doesn't execute unless product is created firstly"
        clearData()
    }
    //save to local storage
    localStorage.setItem('product', JSON.stringify(productData))
    // call function showData to show the data entered in the table
    showData()
})
// function ClearData to clear inputs values after user clicks on create button
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
    total.style.background = '#a30b00';
}


function showData() {
    let table = ''
    for (let i = 0; i < productData.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}$</td>
            <td>${productData[i].taxes}$</td>
            <td>${productData[i].ads}$</td>
            <td>${productData[i].discount}$</td>
            <td>${productData[i].total}$</td>
            <td>${productData[i].count}</td>
            <td>${productData[i].category}</td>
            <td><button onclick='updateData(${i})' id='update'>Update</button></td>
            <td><button onclick='sellData(${i})' id='Sell'>Sell</button></td>
            <td><button onclick='deleteItem(${i})' id='delete'>Delete</button></td>
            <td>${productData[i].sold}</td>
        </tr> `
    }
    document.getElementById('tbody').innerHTML = table
    let btndelete = document.getElementById('deleteAll')
    if (productData.length > 0) {
        btndelete.innerHTML = `
    <button onclick='deleteAll()'>Delete All Items</button>
    `
    } else {
        btndelete.innerHTML = ''
    }
}

showData();

//function to sell one item
function sellData(i) {
    if (productData[i].count > 0) { productData[i].count--; }
    if (productData[i].count > 0) { productData[i].sold++ }
    else if (productData[i].count == 0) {
        productData.sold = productData.sold
    }
    localStorage.product = JSON.stringify(productData)
    showData()
}
//function to delete one item
function deleteItem(i) {
    productData.splice(i, 1)
    localStorage.product = JSON.stringify(productData)
    showData()
}
function updateData(i) {
    title.value = productData[i].title
    price.value = productData[i].price
    taxes.value = productData[i].taxes
    ads.value = productData[i].ads
    discount.value = productData[i].discount
    getTotal()
    count.value = productData[i].count
    category.value = productData[i].category
    // let inputSection = document.getElementsByClassName('inputs')[0]
    // inputSection.insertAdjacentHTML("beforeend",`
    // <input type='number' id='sold' value='${productData[i].sold}'>
    // `)
    create.innerHTML = 'Update'
    mode = 'update'
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

//function to delete all items
function deleteAll() {
    localStorage.clear()
    productData.splice(0)
    showData()
}

//search Function
let searchMode = 'title'
let searchbox = document.querySelector('#Search')
function getSearchMode(id) {
    if (id == 'SearchTitle') {
        searchMode = 'title'
    }
    else {
        searchMode = 'category'
    }
    searchbox.placeholder = `Search by ${searchMode} `
    searchbox.focus()
    searchbox.value = ''
    showData()
}

function searchData(value) {
    let table = ''
    if (searchMode == 'title') {
        for (let i = 0; i < productData.length; i++) {
            if (productData[i].title.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}$</td>
            <td>${productData[i].taxes}$</td>
            <td>${productData[i].ads}$</td>
            <td>${productData[i].discount}$</td>
            <td>${productData[i].total}$</td>
            <td>${productData[i].count}</td>
            <td>${productData[i].category}</td>
            <td><button onclick='updateData(${i})' id='update'>Update</button></td>
            <td><button onclick='sellData(${i})' id='Sell'>Sell</button></td>
            <td><button onclick='deleteItem(${i})' id='delete'>Delete</button></td>
            <td>${productData[i].sold}</td>
        </tr>
        `
            }
        }
    }
    else {
        for (let i = 0; i < productData.length; i++) {
            if (productData[i].category.includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}$</td>
            <td>${productData[i].taxes}$</td>
            <td>${productData[i].ads}$</td>
            <td>${productData[i].discount}$</td>
            <td>${productData[i].total}$</td>
            <td>${productData[i].count}</td>
            <td>${productData[i].category}</td>
            <td><button onclick='updateData(${i})' id='update'>Update</button></td>
            <td><button onclick='sellData(${i})' id='Sell'>Sell</button></td>
            <td><button onclick='deleteItem(${i})' id='delete'>Delete</button></td>
            <td>${productData[i].sold}</td>
        </tr>
        `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table

}
