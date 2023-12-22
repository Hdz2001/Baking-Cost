/*SHOW PROFILE*/
const userButton = document.querySelector(".imageBtn");
const userProfile = document.querySelector(".user_detail");

userButton.addEventListener("click", ()=> {
    if (userProfile.style.display == "block"){
        userProfile.style.display = "none";
    }
    else{
        userProfile.style.display = "block";
    }
})

/*CHANGE LANGUAGE*/
const langBtn = document.getElementById("languague");

/*CHANGE FOR COST BOX*/
let costLang = [
    {
        lang: "VN",
        bigTitle: "TÍNH TIỀN:",
        edit: "Chỉnh sửa",
        id: "STT",
        name: "Tên",
        quantity: "Số lượng",
        total: "Số tiền",
        realQuantity: "Số lượng TT",
        realTotal: "Số tiền TT",
        finalTotal: "TỔNG TIỀN: "
    },
    {
        lang: "EN",
        bigTitle: "COST CALCULATION:",
        edit: "Edit",
        id: "ID",
        name: "Name",
        quantity: "Quantity",
        total: "Cost",
        realQuantity: "Real Quantity",
        realTotal: "Real Cost",
        finalTotal: "TOTAL COST: "
    }
]

const bigTitle = document.getElementById("bigTitle");
const editCol = document.getElementById("editCol");
const idCol = document.getElementById("idCol");
const nameCol = document.getElementById("nameCol");
const quantityCol = document.getElementById("quantityCol");
const costCol = document.getElementById("costCol");
const realQuantityCol = document.getElementById("realQuantityCol");
const realCostCol = document.getElementById("realCostCol");

function changeCost(){
    const costResult = costLang.find(({ lang }) => lang === langBtn.value);
    
    bigTitle.innerHTML = costResult.bigTitle;
    editCol.innerHTML = costResult.edit;
    idCol.innerHTML = costResult.id;
    nameCol.innerHTML = costResult.name;
    quantityCol.innerHTML = costResult.quantity;
    costCol.innerHTML = costResult.total;
    realQuantityCol.innerHTML = costResult.realQuantity;
    realCostCol.innerHTML = costResult.realTotal;
}

/*CHANGE FOR ADD BOX*/
let addLang = [
    {
        lang: "VN",
        name: "TÊN",
        quantity: "SỐ LƯỢNG",
        total: "SỐ TIỀN (Đ)",
        realQuantity: "SỐ LƯỢNG TT",
        addBtn: "THÊM"
    },
    {
        lang: "EN",
        name: "NAME",
        quantity: "QUANTITY",
        total: "COST (Đ)",
        realQuantity: "REAL QUANTITY",
        addBtn: "ADD"
    }
]
const addName = document.getElementById("nameItem");
const addQuantity = document.getElementById("quantityItem");
const addTotal = document.getElementById("totalItem");
const addRealQuantity = document.getElementById("realQuantityItem");
const addAddBtn = document.querySelector(".addButton");

function changeAdd(){
    const addResult = addLang.find(({ lang }) => lang === langBtn.value);

    addName.placeholder = addResult.name;
    addQuantity.placeholder = addResult.quantity;
    addTotal.placeholder = addResult.total;
    addRealQuantity.placeholder = addResult.realQuantity;
    addAddBtn.innerHTML = addResult.addBtn;
}

/*CHANGE FOR CALC BOX*/
let calcLang = [
    {
        lang: "VN",
        weight: "Số cân thành phẩm",
        sellWeight: "Tổng số lượng muốn bán",
        calcBtn: "TÍNH"
    },
    {
        lang: "EN",
        weight: "Total final weight",
        sellWeight: "Total sell weight",
        calcBtn: "CALCULATE"
    }
]
const calcWeight = document.getElementById("doneWeight");
const calcSell = document.getElementById("sellQuantity");
const calcCalcBtn = document.getElementById("calcBtn");

function changeCalc(){
    const calcResult = calcLang.find(({ lang }) => lang === langBtn.value);

    calcWeight.placeholder = calcResult.weight;
    calcSell.placeholder = calcResult.sellWeight;
    calcCalcBtn.innerHTML = calcResult.calcBtn;
}

/*EVENT LISTENER FOR CHANGE LANGUAGE*/
langBtn.addEventListener("change", function() {
    changeCost();
    changeAdd();
    changeCalc();
});