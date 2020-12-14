vegText = "";
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

function saveList() {
    var detailsObj = JSON.parse(localStorage.getItem("allOrders"));
    console.log(detailsObj);
    if (detailsObj == null) {
      var detailsObj =  [{foodPicture: "", vegNVVegan: "", offerNeed: "", pickupDelivery: "",nativity: "",dishname: "", dishdetail:"", ingredients:"", allergyContents:"", price:"", onDate:"", atTime:"", address:"", phoneNumber:""}];
      var jsonArray1 = JSON.stringify(detailsObj);
      localStorage.setItem("allOrders", jsonArray1);
    }
    var orderDetails =  {};
    
    orderDetails.foodPicture = ".jpg"; //document.getElementsByTagName("img").src;
    orderDetails.vegNVVegan =  vegText;
    orderDetails.offerNeed = "Offer";  //document.getElementById("").innerHTML;
    orderDetails.pickupDelivery = "Pick-Up";  //document.getElementById("").innerHTML;
    orderDetails.nativity =  document.getElementById("origin").value;
    orderDetails.dishname =  document.getElementById("fooditem").value;
    orderDetails.dishdetail =  document.getElementById("description").value;
    orderDetails.ingredients =  document.getElementById("ingredients").value;
    orderDetails.allergyContents =  document.getElementById("allergy").value;
    orderDetails.price =  document.getElementById("value").value;
    orderDetails.onDate =  document.getElementById("date").value;
    orderDetails.atTime =  document.getElementById("time").value;
    orderDetails.address =  document.getElementById("address").value;
    orderDetails.phoneNumber =  document.getElementById("phone").value;
    
    var posn = detailsObj.length;
    detailsObj[posn] = orderDetails;
    console.log(detailsObj);
    localStorage.setItem("allOrders", (JSON.stringify(detailsObj)));
}


function loadList() {
  //{foodPicture: "", vegNVVegan: "", offerNeed: "", pickupDelivery: "",nativity: "",dishname: "", dishdetail:"", ingredients:"", allergyContents:"", price:"", onDate:"", atTime:"", address:"", phoneNumber:""}
  var detailsObj = JSON.parse(localStorage.getItem("allOrders"));
  console.log(detailsObj);
  if (detailsObj == null) {
    var detailsObj =  [];
  }
}

function toggleSelection1() {
  var button1 = document.getElementById("btn-veg");
  var button2 = document.getElementById("btn-nonveg");
  var button3 = document.getElementById("btn-vegan");
  if (button1.style.background == "blue") {
    button1.style.background = "white";button1.style.color = "blue";
  }
  else {
    button1.style.background = "blue";button1.style.color = "white";
  }
  button2.style.background = "white";button2.style.color = "blue";
  button3.style.background = "white";button3.style.color = "blue";
  vegText = "Veg";
}


function toggleSelection2() {
  var button1 = document.getElementById("btn-veg");
  var button2 = document.getElementById("btn-nonveg");
  var button3 = document.getElementById("btn-vegan");
  button1.style.background = "white";button1.style.color = "blue";
  if (button2.style.background == "blue") {
    button2.style.background = "white";button2.style.color = "blue";
  }
  else {
    button2.style.background = "blue";button2.style.color = "white";
  }
  button3.style.background = "white";button3.style.color = "blue";
  vegText = "Non-Veg";
}


function toggleSelection3() {
  var button1 = document.getElementById("btn-veg");
  var button2 = document.getElementById("btn-nonveg");
  var button3 = document.getElementById("btn-vegan");
  button1.style.background = "white";button1.style.color = "blue";
  button2.style.background = "white";button2.style.color = "blue";
  if (button3.style.background == "blue") {
    button3.style.background = "white";button3.style.color = "blue";
  }
  else {
    button3.style.background = "blue";button3.style.color = "white";
  }
  vegText = "Vegan";
}

