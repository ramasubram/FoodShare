vegText = "";
var selectedIndex=0;

var imageId = "";
var loadFile1 = function(event) {
  var image = document.getElementById(imageId);
	image.src = URL.createObjectURL(event.target.files[0]);
  image.alt = event.target.files[0].name;
  image.width = 70;
  image.height = 50;
};

var loadFile = function(event) {
  var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
	image.alt = event.target.files[0].name;
};

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function saveList() {
  var orderDetails =  {};
  
  var image = document.getElementById('output');
  
  orderDetails.foodPicture = image.alt;
  if (vegText == ""){
    alert("Fill all details");
    return;
  }
  orderDetails.vegNVVegan =  vegText;

  var offerNeed = document.getElementsByName('offerneed');
  if (offerNeed[0].checked == true) {
    orderDetails.offerNeed = offerNeed[0].value;
  } else if (offerNeed[1].checked == true) {
    orderDetails.offerNeed = offerNeed[1].value;
  } else {
    alert("Fill all details");
    return;
  }
  var deliveryMode = document.getElementsByName('deliverymode');
  if ((deliveryMode[0].checked == true) && (deliveryMode[1].checked == true)) {
    orderDetails.pickupDelivery = "Both";
  } else if (deliveryMode[0].checked == true) {
    orderDetails.pickupDelivery = deliveryMode[0].value;
  } else if (deliveryMode[1].checked == true) {
    orderDetails.pickupDelivery = deliveryMode[1].value;
  } else {
    alert("Fill all details");
    return;
  }
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

  if ((orderDetails.dishname == "") ||  (orderDetails.dishdetail == "") || (orderDetails.onDate == "") || (orderDetails.atTime == "") || (orderDetails.address == "") || (orderDetails.phone == "")) {
    alert("Fill all details");
    return;
  }
  var detailsObj = JSON.parse(localStorage.getItem("allorders"));
  if (detailsObj == null) {
    var detailsObj = [];
    posn = 0;
  }
  else {
    posn = detailsObj.length;
  }

  orderDetails.menuId = posn;
  detailsObj[posn] = orderDetails;
  console.log(detailsObj);
  localStorage.setItem("allorders", (JSON.stringify(detailsObj)));
  alert("Successfull Post. Thanks for using Food Share!");
  window.location.href = "post.html";
}

function saveOrder() {
  var newOrder =  {};

  newOrder.dishname =  document.getElementById("fooditem1").value;
  newOrder.quantity =  document.getElementById("qty").value;
  newOrder.name =  document.getElementById("name").value;
  newOrder.email =  document.getElementById("email").value;
  newOrder.phone =  document.getElementById("phone").value;
  newOrder.menuId = localStorage.getItem("FSmenuId");

  if ((newOrder.dishname == "") ||  (newOrder.quantity == "") || (newOrder.name == "") || (newOrder.email == "") || (newOrder.phone == "")) {
    alert("Fill all details");
    return;
  }
  var placedOrdersList = JSON.parse(localStorage.getItem("placedOrders"));
  if (placedOrdersList == null) {
    var placedOrdersList = [];
    posn = 0;
  }
  else {
    posn = placedOrdersList.length;
  }
  newOrder.orderId = posn;
  placedOrdersList[posn] = newOrder;
  var jsonArray1 = JSON.stringify(placedOrdersList);
  localStorage.setItem("placedOrders", jsonArray1);

  alert("Order Completed. You will receive SMS from seller. Swish payment while receiving your order. Thanks for using Food Share!");
  localStorage.removeItem("FSmenuId");
  window.location.href = "index.html";
}

function loadList() {
  var x = document.getElementById("about");
  x.style.display = "none";

  const container = document.getElementById('root');

  var detailsObj = JSON.parse(localStorage.getItem("allorders"));
  if (detailsObj == null) {
      alert("No listing.")
      return
  };
  for(i=0; i < detailsObj.length; i++) {
      var orderDetails =  detailsObj[i];
      selectedIndex = i;

      // create div for each row
      const eachrow = document.createElement('div');
      eachrow.setAttribute('class', 'grid-container');
      eachrow.setAttribute("onclick", "openDishDetailPage("+i+")");
      container.appendChild(eachrow);

      const content1 = document.createElement('div');
      const content2 = document.createElement('div');
      const content3 = document.createElement('div');
      const content4 = document.createElement('div');
      const content5 = document.createElement('div');
      const content6 = document.createElement('div');
      const content7 = document.createElement('div');
      const imageContent = document.createElement('img');

      content1.setAttribute('class', 'item1');
      content2.setAttribute('class', 'grid-item text-color-red');
      content3.setAttribute('class', 'grid-item');
      content4.setAttribute('class', 'grid-item text-color-orange');
      content5.setAttribute('class', 'grid-item');
      content6.setAttribute('class', 'grid-item text-color-blue');
      content7.setAttribute('class', 'grid-item text-color-purple');
      
      imageId = "pic"+i;
      imageContent.alt = orderDetails.foodPicture;
      imageContent.src = orderDetails.foodPicture;
      imageContent.id = imageId;
      imageContent.width = 70;
      imageContent.height = 50;
      imageContent.onload = "loadFile1(event)";
      content1.appendChild(imageContent);
      content2.textContent = orderDetails.dishname;
      content3.textContent = orderDetails.vegNVVegan;
      content4.textContent = orderDetails.onDate;
      content5.textContent = orderDetails.nativity;
      content6.textContent = orderDetails.pickupDelivery;
      content7.textContent = "Status: Ordered"
  
      eachrow.appendChild(content1);
      eachrow.appendChild(content2);
      eachrow.appendChild(content3);
      eachrow.appendChild(content4);
      eachrow.appendChild(content5);
      eachrow.appendChild(content6);
      eachrow.appendChild(content7);
      console.log(imageContent);
    }
  }
  function nextDetail() {
    selectedIndex++;
    localStorage.setItem("selected", selectedIndex);
    loadListDetail();
  }
  function prevDetail() {
    selectedIndex--;
    localStorage.setItem("selected", selectedIndex);
    loadListDetail();
  }
  function openDishDetailPage(index) {
    localStorage.setItem("selected", index);
    window.location.href = "dishdetail.html";
  }

  function loadListDetail() {
 
    var detailsObj = JSON.parse(localStorage.getItem("allorders"));

    if ((detailsObj == null) || (detailsObj.length == 0)) {return};
    // Get it from the local storage
    selectedIndex = localStorage.getItem("selected");
    if ((selectedIndex < 0) || (selectedIndex >= detailsObj.length)) {
      selectedIndex = 0;
      localStorage.setItem("selected", selectedIndex);
    }

    var orderDetails =  detailsObj[selectedIndex];
    imageId = "img1";
    const imageContent = document.getElementById(imageId);
    imageContent.alt = orderDetails.foodPicture;
    imageContent.src = orderDetails.foodPicture;
    imageContent.id = imageId;
    imageContent.width = 70;
    imageContent.height = 50;
    imageContent.onload = "loadFile1(event)";
    document.getElementById("VNVV").innerHTML = orderDetails.vegNVVegan;
//    document.getElementById("offerneed").innerHTML = orderDetails.offerNeed;
    document.getElementById("deliverymode").innerHTML = orderDetails.pickupDelivery + " on";
    document.getElementById("origin").innerHTML = orderDetails.nativity;
    document.getElementById("fooditem").innerHTML = orderDetails.dishname;
    document.getElementById("description").innerHTML = orderDetails.dishdetail;
    document.getElementById("ingredients").innerHTML = orderDetails.ingredients;
    document.getElementById("allergy").innerHTML = orderDetails.allergyContents;
    document.getElementById("value").innerHTML = orderDetails.price;
    document.getElementById("date").innerHTML = orderDetails.onDate;
    document.getElementById("time").innerHTML = orderDetails.atTime;
    document.getElementById("address").innerHTML = orderDetails.address;
//    document.getElementById("phone").innerHTML = orderDetails.phoneNumber;
}
  
function loadSelected() {
  var detailsObj = JSON.parse(localStorage.getItem("allorders"));
  if (detailsObj == null) {return};
  // Get it from the local storage
  selectedIndex = localStorage.getItem("selected");
  
  if ((selectedIndex < 0) || (selectedIndex >= detailsObj.length)) {
    selectedIndex = 0;
    localStorage.setItem("selected", selectedIndex);
  }

  var orderDetails =  detailsObj[selectedIndex];
  imageId = "img2";
  const imageContent = document.getElementById(imageId);
  imageContent.alt = orderDetails.foodPicture;
  imageContent.src = orderDetails.foodPicture;
  imageContent.id = imageId;
  imageContent.width = 140;
  imageContent.height = 100;
  imageContent.onload = "loadFile1(event)";
  document.getElementById("fooditem1").innerHTML = orderDetails.dishname;
  localStorage.setItem("FSmenuId", orderDetails.menuId);
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

/*
    var detailsObj = JSON.parse(localStorage.getItem("allorders"));
  if (detailsObj == null) {
    var detailsObj =  [{foodPicture: "", vegNVVegan: "", offerNeed: "", pickupDelivery: "",nativity: "",dishname: "", dishdetail:"", ingredients:"", allergyContents:"", price:"", onDate:"", atTime:"", address:"", phoneNumber:""}];
    var jsonArray1 = JSON.stringify(detailsObj);
    localStorage.setItem("allorders", jsonArray1);
  }
{foodPicture: "", vegNVVegan: "", offerNeed: "", pickupDelivery: "",nativity: "",dishname: "", dishdetail:"", ingredients:"", allergyContents:"", price:"", onDate:"", atTime:"", address:"", phoneNumber:""}
*/
