const listItemField = document.getElementById('list-item');
const addItemBtn = document.getElementById('addItemBtn');
const shoppingList = document.querySelector('.shopping-list__content--items');
let shoppingListArray = [];

function generateList() {
    shoppingList.innerHTML = "";
   
    if(JSON.parse(localStorage.getItem('list'))) {
        shoppingListArray = JSON.parse(localStorage.getItem('list'));
    }
   
    for(let listItem of shoppingListArray) {
        const li = document.createElement("li");
        li.textContent = listItem;
        shoppingList.appendChild(li)
    }
}

generateList()

addItemBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(listItemField.value != "" && !listItemField.value.startsWith(' ')) {
        shoppingListArray.push(listItemField.value);
        listItemField.value = "";
        localStorage.setItem('list', JSON.stringify(shoppingListArray))
        generateList();
    }
})