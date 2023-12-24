let ingredients = []
let listIngredients = [ingredients]
let titleList = [
    {
    id: 0,
    title: "Untitled"
    }
]; 
let currentIndex = 0;

let totalCost = 0;
let editing = false;

const ingre = document.querySelector(".ingreTable");
/*FORMULA: total * realQuantity / quantity*/

/*COST BOX*/
const editTitleBtn = document.getElementById("editTitle");
const boxTitle = document.getElementById("bigTitle");
let editingTitle = false;

/*REMOVE LIST*/
const removeList = document.getElementById("removeList");
const confirmDel = document.querySelector(".confirmDel");
const yesDel = document.getElementById("yesDel");
const noDel = document.getElementById("noDel");

removeList.addEventListener("click", ()=> {
    if (listIngredients.length > 1){
        confirmDel.style.display = "block";

        yesDel.addEventListener("click", ()=> {
            listIngredients.splice(currentIndex, 1);
            titleList.splice(currentIndex, 1);

            if (currentIndex != 0){
                currentIndex -= 1;
            } 

            ingredients = listIngredients[currentIndex];

            confirmDel.style.display = "none";

            /*SHOULD ADD CONFIRMATION WINDOW*/

            showItem();
            showFooter();
        })

        noDel.addEventListener("click", ()=> {
            confirmDel.style.display = "none";
        })     
    }
})

/*EDIT BOX TITLE*/
editTitleBtn.addEventListener("click", ()=> {
    editingTitle = !editingTitle;

    if (editingTitle){
        boxTitle.innerHTML = `
        <input type = "text" id = "boxTitle" placeholder="TÊN" spellcheck="false"></input>
        <button id = "finalize">SỬA</button>
        <button id = "abort">HỦY</button>
        `;

        const inputTitle = document.getElementById("boxTitle");

        document.getElementById("abort").addEventListener("click", ()=> {
            editingTitle = !editingTitle;
            boxTitle.innerHTML = `${titleList[currentIndex].title}`;
        })

        document.getElementById("finalize").addEventListener("click", ()=> {
            if (inputTitle.value != ''){   
                editingTitle = !editingTitle;
                titleList[currentIndex].title = inputTitle.value;
                boxTitle.innerHTML = `${titleList[currentIndex].title}`;
                showFooter();
            }
        })
    }
    else{
        // if canceled
        boxTitle.innerHTML = `${titleList[currentIndex].title}`;
    }
    
})

/*SHOW COST BOX ITEMS*/
function showItem(){
    boxTitle.innerHTML = `${titleList[currentIndex].title}`;

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

    if (ingredients != undefined || ingredients.length != 0){
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
    }
    

    listIngredients[currentIndex] = ingredients;

    removeItem();
    editItem()
}

showItem();
console.log(listIngredients)

/*CALC ITEM*/
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

        document.querySelector(".resultQuantity").style.display = "block";
        
        document.querySelector(".resultQuantity").innerHTML =
        `
        <h3>Giá tiền: ${totalSell.toLocaleString('en', {useGrouping:true})}đ </h3>       
        `
    }
})

/*ADD ITEM*/
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

/*FOOTER*/
const footer = document.querySelector(".footer");
const addFooter = document.getElementById("addFooter");

function showFooter(){
    footer.innerHTML = 
    `<img id = "addFooter" src = "images/add.png"></img>`

    for (let i=0; i<titleList.length; i++){
        footer.innerHTML += `<p id = "listTitle${i}">${titleList[i].title}</p>`;
    }

    document.getElementById("listTitle"+currentIndex).style.backgroundColor = "#ffd1dc"

    // add event for item button
    document.querySelectorAll('[id^="listTitle"]').forEach((titleBox, index) => {
        titleBox.addEventListener("click", () => {
            currentIndex = index;

            confirmDel.style.display = "none";

            titleBox.style.backgroundColor = "#ffd1dc";

            for (let i=0; i<titleList.length; i++){
                if (i != index){
                    document.getElementById("listTitle"+i).style.backgroundColor = "transparent"
                }
            }
    
            ingredients = listIngredients[index];

            showItem();
        });
    });
}

showFooter();

/* ADD ITEM FOOTER*/
footer.addEventListener("click", (event)=> {
    if (event.target.id === "addFooter"){
        titleList.push(
            {
                id: titleList.length,
                title: "Untitled"
            }
        )
        
        // add new ingredient array for new list
        listIngredients.push([]);

        showFooter();       
    }
})

/*LOAD AND SAVE*/
document.getElementById("save").addEventListener("click", ()=> {
    localStorage.setItem('ingredientsList', JSON.stringify(listIngredients));
    localStorage.setItem('footerList', JSON.stringify(titleList));
})

document.getElementById("load").addEventListener("click", ()=> {
    const ingredientListData = localStorage.getItem('ingredientsList');
    const footerListData = localStorage.getItem('footerList');

    listIngredients = JSON.parse(ingredientListData);
    ingredients = listIngredients[0];
    titleList = JSON.parse(footerListData);

    showItem();
    showFooter();
})