let ingredients = []

let totalCost = 0;
let editing = false;
const edit = document.querySelector(".edit");
const index = document.querySelector(".id");
const nameX = document.querySelector(".name");
const quantity = document.querySelector(".quantity");
const total = document.querySelector(".total");
const realQuantity = document.querySelector(".realQuantity");
const realTotal = document.querySelector(".realTotal");
/*FORMULA: total * realQuantity / quantity*/

function showItem(){
    edit.innerHTML = `<h3>Chỉnh sửa</h3>`;
    index.innerHTML = `<h3>STT</h3>`;
    nameX.innerHTML = `<h3>Tên</h3>`;
    quantity.innerHTML = `<h3>Số lượng</h3>`;
    total.innerHTML = `<h3>Số tiền</h3>`;
    realQuantity.innerHTML = `<h3>Số lượng TT</h3>`;
    realTotal.innerHTML = `<h3>Số tiền TT</h3>`;
    totalCost = 0;

    for (let i=0; i<ingredients.length; i++){
        let j = ingredients[i];
        let totalX = j.total * j.realQuantity / j.quantity;

        edit.innerHTML +=
        `<p>
        <div class = "edit${i}">
            <img class = "remove${i}" src = "images/remove.png">
            <img class = "pencil${i}" src = "images/pencil.png">
        </div>
        </p>
        `
        index.innerHTML += `<p class = "id${i}">${i+1}</p>`
        nameX.innerHTML += `<p>${j.name}</p>`

        if (j.quantity == ""){
            quantity.innerHTML += `<p>${j.quantity}</p>`
        }
        else{
            quantity.innerHTML += `<p>${j.quantity} ${j.quantityUnit}</p>`
        }
        total.innerHTML += `<p>${parseInt(j.total).toLocaleString('en', {useGrouping:true})}đ</p>`

        if (j.realQuantity == ""){
            realQuantity.innerHTML += `<p>${j.realQuantity}</p>`
        }
        else{
            realQuantity.innerHTML += `<p>${j.realQuantity} ${j.realQuantityUnit}</p>`
        }
        
        if (j.quantity == '' || j.realQuantity == ''){
            realTotal.innerHTML += `<p>${parseInt(j.total).toLocaleString('en', {useGrouping:true})}đ</p>`
            totalCost += parseInt(j.total);
        }
        else{
            realTotal.innerHTML += `<p>${totalX.toLocaleString('en', {useGrouping:true})}đ</p>`
            totalCost += totalX;
        }
    }

    document.querySelector(".totalCost").innerHTML = `Total Cost: ${totalCost.toLocaleString('en', {useGrouping:true})}đ`;

    removeItem();
    editItem()
}

showItem();


const calculate = document.querySelector(".calcItem button");

calculate.addEventListener("click", ()=> {
    let doneWeight = document.getElementById('doneWeight').value;
    let sellQuantity = document.getElementById('sellQuantity').value;

    if (doneWeight != '' && sellQuantity != ''){
        let totalSell = totalCost/doneWeight*sellQuantity;

        /*
        <ul>
            <li> Số cân 1 cái: ${weightSingle.toFixed(3)}g </li>
            <li> Số tiền 1 cái: ${costSingle.toFixed(3).toLocaleString('en', {useGrouping:true})}đ </li> 
        </ul>  
        */

        document.querySelector(".resultQuantity").innerHTML =
        `
        <h3>Giá tiền: ${totalSell.toLocaleString('en', {useGrouping:true})}đ </h3>       
        `
    }
})

const addItem = document.querySelector(".addButton");

addItem.addEventListener("click", ()=> {
    let nameItem = document.getElementById('nameItem').value;
    let quantityItem = document.getElementById('quantityItem').value;
    let totalItem = document.getElementById('totalItem').value;
    let realQuantityItem = document.getElementById('realQuantityItem').value;
    let quantityItemUnit = document.getElementById('quantityItemUnit').value;
    let realQuantityItemUnit = document.getElementById('realQuantityItemUnit').value;

    if (editing == false){
        if ((nameItem != '' && quantityItem == '' && totalItem != '' && realQuantityItem == '') || (nameItem != '' && quantityItem != '' && totalItem != '' && realQuantityItem != '')){
            ingredients.push(
            {
                id: ingredients.length,
                name: nameItem,
                quantity: quantityItem,
                quantityUnit: quantityItemUnit,
                total: totalItem,
                realQuantity: realQuantityItem,
                realQuantityUnit: realQuantityItemUnit
            })

            showItem();

            document.getElementById('nameItem').value = '';
            document.getElementById('totalItem').value = '';
            document.getElementById('quantityItem').value = '';
            document.getElementById('realQuantityItem').value = '';
        }
    }


})

/*REMOVE ITEM*/
function removeItem(){
    for (let i=0; i<ingredients.length; i++){
        let removeButton = document.querySelector(".remove"+i);
    
        removeButton.addEventListener("click", ()=> {
            ingredients.splice(i, 1);
            showItem()
        })
    }
}

removeItem()

/*EDIT ITEM*/
const editButton = document.querySelector(".editButton");
let editIndex = 0;

function editItem(){
    for (let i=0; i<ingredients.length; i++){
        let pencilBtn = document.querySelector(".pencil"+i);
    
        pencilBtn.addEventListener("click", ()=> {
            editing = true;
            editIndex = i;
            document.getElementById('nameItem').value = ingredients[i].name;
            addItem.style.display = "none";
            editButton.style.display = "block";

            for (let j=0; j<ingredients.length; j++){
                if (i == j){
                    document.querySelector(".edit" + i).style.background = "green";
                }
                else{
                    document.querySelector(".edit" + j).style.background = "none";
                }
            }
        })
    }
}
       
editButton.addEventListener("click", ()=> {
    let nameItem = document.getElementById('nameItem').value;
    let quantityItem = document.getElementById('quantityItem').value;
    let totalItem = document.getElementById('totalItem').value;
    let realQuantityItem = document.getElementById('realQuantityItem').value;
    let quantityItemUnit = document.getElementById('quantityItemUnit').value;
    let realQuantityItemUnit = document.getElementById('realQuantityItemUnit').value;

    if (editing == true && (nameItem != '' && quantityItem == '' && totalItem != '' && realQuantityItem == '') || (nameItem != '' && quantityItem != '' && totalItem != '' && realQuantityItem != '')){
        ingredients[editIndex].name = nameItem;
        ingredients[editIndex].quantity = quantityItem;
        ingredients[editIndex].quantityUnit = quantityItemUnit;
        ingredients[editIndex].total = totalItem;
        ingredients[editIndex].realQuantity = realQuantityItem;
        ingredients[editIndex].realQuantityUnit = realQuantityItemUnit;

        showItem();

        document.getElementById('nameItem').value = '';
        document.getElementById('totalItem').value = '';
        document.getElementById('quantityItem').value = '';
        document.getElementById('realQuantityItem').value = '';

        addItem.style.display = "block";
        editButton.style.display = "none";
        editing = false;
    }
})



