let ingredients = []

let totalCost = 0;
let editing = false;

const ingre = document.querySelector(".ingreTable");
/*FORMULA: total * realQuantity / quantity*/

/*SHOW COST BOX ITEMS*/

function showItem(){
    ingre.innerHTML = 
    `<tr>
        <th><h3 id = "editCol">Chỉnh sửa</h3></th>
        <th><h3 id = "idCol">STT</h3></th>       
        <th><h3 id = "nameCol">Tên</h3></th>
        <th><h3 id = "quantityCol">Số lượng</h3></th>
        <th><h3 id = "costCol">Số tiền</h3></th>
        <th><h3 id = "realQuantityCol">Số lượng TT</h3></th>
        <th><h3 id = "realCostCol">Số tiền TT</h3></th>
    </tr>`
    totalCost = 0;

    for (let i=0; i<ingredients.length; i++){
        let j = ingredients[i];
        let totalX = j.total * j.realQuantity / j.quantity;
        let x;
        let y;
        let z;

        if (j.quantity == ""){
            x = `<td>${j.quantity}</td>`
        }
        else{
            x = `<td>${j.quantity} ${j.quantityUnit}</td>`
        }

        if (j.realQuantity == ""){
            y = `<td>${j.realQuantity}</td>`
        }
        else{
            y = `<td>${j.realQuantity} ${j.realQuantityUnit}</td>`
        }
        
        if (j.quantity == '' || j.realQuantity == ''){
            z = `<td>${parseInt(j.total).toLocaleString('en', {useGrouping:true})}đ</td>`
            totalCost += parseInt(j.total);
        }
        else{
            z = `<td>${totalX.toLocaleString('en', {useGrouping:true})}đ</td>`
            totalCost += totalX;
        }

        ingre.innerHTML +=
        `
        <tr class = "item${i}">
            <td class = "edit${i}">
                <img class = "remove${i}" src = "images/remove.png">
                <img class = "pencil${i}" src = "images/pencil.png">
            </td>
                    
            <td class = "id${i}">${i+1}</td>
                    
            <td>${j.name}</td>
                    
            ${x}

            <td>${parseInt(j.total).toLocaleString('en', {useGrouping:true})}đ</td>
            ${y}

            ${z}                                  
        </tr>
        `      
    }

    document.querySelector(".totalCost").innerHTML = `TỔNG TIỀN: ${totalCost.toLocaleString('en', {useGrouping:true})}đ`;

    removeItem();
    editItem()
}

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
            if (!editing){
                editing = true;
                editIndex = i;

                document.getElementById('nameItem').value = ingredients[i].name;
                addItem.style.display = "none";
                editButton.style.display = "block";
                document.querySelector(".item" + i).style.backgroundColor = "#ffd1dc";            
            }
            else{
                editing = false;
                editIndex = i;

                document.getElementById('nameItem').value = ingredients[i].name;
                addItem.style.display = "block";
                editButton.style.display = "none";
                document.querySelector(".item" + i).style.backgroundColor = "#f2f2f2";
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

document.getElementById("save").addEventListener("click", ()=> {
    localStorage.setItem('data', JSON.stringify(ingredients));  
})

document.getElementById("load").addEventListener("click", ()=> {
    const savedData = localStorage.getItem('data');
    console.log(savedData)
})

