const ingredients = []

let totalCost = 0;
const index = document.querySelector(".id");
const nameX = document.querySelector(".name");
const quantity = document.querySelector(".quantity");
const total = document.querySelector(".total");
const realQuantity = document.querySelector(".realQuantity");
const realTotal = document.querySelector(".realTotal");
/*FORMULA: total * realQuantity / quantity*/

function showItem(){
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

        index.innerHTML += `<p>${i+1}</p>`
        nameX.innerHTML += `<p>${j.name}</p>`
        quantity.innerHTML += `<p>${j.quantity}</p>`
        total.innerHTML += `<p>${parseInt(j.total).toLocaleString('en', {useGrouping:true})}đ</p>`
        realQuantity.innerHTML += `<p>${j.realQuantity}</p>`

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
        <h3>Giá tiền: ${totalSell.toFixed(3).toLocaleString('en', {useGrouping:true})}đ </h3>       
        `
    }
})

const addItem = document.querySelector(".addItem button");

addItem.addEventListener("click", ()=> {
    let nameItem = document.getElementById('nameItem').value;
    let quantityItem = document.getElementById('quantityItem').value;
    let totalItem = document.getElementById('totalItem').value;
    let realQuantityItem = document.getElementById('realQuantityItem').value;

    if ((nameItem != '' && quantityItem == '' && totalItem != '' && realQuantityItem == '') || (nameItem != '' && quantityItem != '' && totalItem != '' && realQuantityItem != '')){
        ingredients.push(
        {
            name: nameItem,
            quantity: quantityItem,
            total: totalItem,
            realQuantity: realQuantityItem
        })
        showItem();

        document.getElementById('nameItem').value = '';
        document.getElementById('totalItem').value = '';
        document.getElementById('quantityItem').value = '';
        document.getElementById('realQuantityItem').value = '';
    }
    
    console.log("ING")
    console.log(ingredients)
})
