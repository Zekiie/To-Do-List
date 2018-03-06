const addItems = document.querySelector(".add-items"),
      itemsList = document.querySelector(".plates"),
      items = JSON.parse(localStorage.getItem("items")) || [];


function addItem(event) {
    event.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text: text, // may use ES6 "text"
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    // console.log(window.localStorage);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

//get to HTML
function populateList (plates = [], platesList) { //plates is var
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''}/>
                <label for="item${i}">${plate.text}</label>
                <span data-index="${i}" class="remove-button"  onclick="removeItem()"><i  class="fa fa-close"></i></span>
            </li>
            `
    }).join('');

}

function toggleDone(event) {
    // debugger;
    if (!event.target.matches('input')) return;
    const index = event.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function removeItem(e){
    var buttons = document.querySelectorAll(' .remove-button');
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
            var el = button.parentNode;
            el.parentNode.removeChild(el);
    }
    // const del = document.querySelector('.remove-button');
    console.log(button.parentNode)
    // localStorage.removeItem("items", JSON.stringify(items));
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);



populateList (items, itemsList);


