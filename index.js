import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase,ref,push , onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://playground-a5345-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoplistfromDBM = ref(database,"Cart") 



const InputEL = document.getElementById("itemsIEL") 
const btnAdd = document.getElementById("Btnadd")
const shopinglistUL = document.getElementById("ulShopingList")


btnAdd.addEventListener("click",function(){
   let itemobj = {
      name: "Apples" ,
      price : "R34.5" ,
      shop : "Spar" 
   }
   let enteritem = InputEL.value3
   let databaseobject = itemobj
   push(shoplistfromDBM, databaseobject)
   clear()
})

onValue(shoplistfromDBM , function(snapshot){

   if (snapshot.exists()){ let arrcart = Object.entries(snapshot.val())
      clearUL()
      for (let i = 0 ; i < arrcart.length ; i ++) {
         display(arrcart[i])}
  
   } else {
      shopinglistUL.innerHTML = "No items have been added.... yet"
   }
})


function display (item) {

   let itemID = item[0]
   let listitem = item[1]
   let additem = document.createElement("li")

   additem.textContent = listitem

   additem.addEventListener("click", function()
   {
      let exactlocatrioninDB = ref(database,`Cart/${itemID}`)
      remove(exactlocatrioninDB)
   })

   shopinglistUL.append(additem)
}

function clear() {
   InputEL.value = " "
}

function clearUL(){
   shopinglistUL.innerHTML = " "
}