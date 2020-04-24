let addFullName = document.querySelector('.add-full-name'),
addAdress = document.querySelector('.add-adress'),
addPhone = document.querySelector('.add-phone'),
addButton = document.querySelector('.add-button'),
editButton = document.querySelector('.edit-button'),
deleteButton = document.querySelector('.delete-button'),
tbody = document.querySelector('.tbody'),
itemsSelected = document.querySelectorAll('.item-to-edit'),
modal = document.querySelector('.modal-window'),
modalFullName = document.querySelector('.modal-full-name'),
modalAdress = document.querySelector('.modal-adress'),
modalPhone = document.querySelector('.modal-phone'),
modalAddButton = document.querySelector('.modal-add-button'),
modalCancelButton = document.querySelector('.modal-cancel-button'),
closeButton = document.querySelector('.close-button');
let itemsToDelete = [];
let itemsToEdit = [];
let table = [];
let editedArr = [];


//Импорт данных из json файла
let DATA;
function getData (fileName) {
    let request = new XMLHttpRequest();
    request.open('GET', fileName);
    request.onloadend = function() {
    parse(request.responseText);
    }
    request.send();
}
getData('../data.json'); 
function parse(obj) {
    DATA = JSON.parse(obj);
    localStorage.setItem('data', JSON.stringify(DATA));
}
//Экспорт полученных файлов в localStorage и вывод на страницу
if (!localStorage.getItem('table')) {
if(localStorage.getItem('data')) {
    table = JSON.parse(localStorage.getItem('data'));
    addRow();
}};
//Вывод на страницу данных, хранящихся в LocalSorage
if(localStorage.getItem('table')) {
    table = JSON.parse(localStorage.getItem('table'));
    addRow();
};
function addRow() {
    let addedRow = '';
    table.forEach((item, i) => {        
    addedRow += `
    <tr id='${i}'>
        <td class="full-name">${item.name}</td>
        <td class="adress">${item.adress}</td>
        <td class="phone">${item.phone}</td>
    </tr>
    `;
    tbody.innerHTML = addedRow;
    localStorage.setItem('table', JSON.stringify(table));
    });

};
addButton.addEventListener('click', () => {
    if (newRow !== '') {
    let newRow = {
        name: addFullName.value,
        adress: addAdress.value,
        phone: addPhone.value,
    };
    table.push(newRow);
    addRow();
    localStorage.setItem('table', JSON.stringify(table));
    addFullName.value='';
    addAdress.value = '';
    addPhone.value ='';
};
  });
//добавление в массив строк, предназначенных для удаления и редактирования
let tr = '';
tbody.addEventListener('click', (event) => {
   const target = event.target;
   tr = target.parentNode;
   tr.classList.toggle('item-to-edit');
   
   if (tr.classList.contains('item-to-edit')) {
   itemsToDelete.push(tr);
   if (itemsToEdit.length < 1) {
   itemsToEdit.push(tr);
   };
  
   } else {
    itemsToDelete.splice(itemsToDelete.length - 1);
    itemsToEdit.splice(itemsToEdit.length - 1);
   }; 
});      
    deleteButton.addEventListener('click', () => {
    if (tr.classList.contains('item-to-edit')) { 
    tr.classList.add('deleted');
    let deletedArr = table.filter((tr) => {
    itemsToDelete.forEach(function(item) {
    for (let  i = 0; i < table.length; i++) {
    if (i == item.id) {
    localStorage.getItem('table');
    table.splice(i, 1);
    item.classList.add('deleted');     
    localStorage.setItem('table', JSON.stringify(table));
    //localStorage.setItem('data', JSON.stringify(table));            
    };
    };       
    });           
    });
    };
});  

function toggleModal () {
    modal.classList.toggle('is-open');
};
editButton.addEventListener('click', () => {
    if (tr.classList.contains('item-to-edit') && document.querySelectorAll('.item-to-edit').length > 1) {
    alert('Пожалуйста, выберите один элемент для редактирования!');
    } else {
        toggleModal();
    table.filter((tr) => {
    itemsToDelete.forEach(function(item) {
    for (let  i = 0; i < table.length; i++) {
    if (i == item.id) {
        table[i].id = true;
        modalFullName.value = table[i].name;
        modalAdress.value = table[i].adress;
        modalPhone.value = table[i].phone;        
    };
    };       
    });           
    });
    };
    });
modalAddButton.addEventListener('click', () => {
    toggleModal();
    tr.classList.remove('item-to-edit'); 
    let editedObj = {
        name: modalFullName.value,
        adress: modalAdress.value,
        phone: modalPhone.value,
        id: ''
    };
    editedArr.push(editedObj);
    localStorage.getItem('table');
    table.filter((item, i) => {
        if (table[i].id === true) {
            table[i] = editedObj;   
            localStorage.setItem('table', JSON.stringify(table));
            addRow();    
        };
   });
});
closeButton.addEventListener('click', toggleModal);
modalCancelButton.addEventListener('click', toggleModal);