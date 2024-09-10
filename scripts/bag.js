let bagItemsObject;
const convinienceFee = 99;

onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displyaBagSummary();
}

function loadBagItemObjects() {
  bagItemsObject = bagItems.map(itemId => {
    for (let i = 0; i < item.length; i++) {
      if (itemId == item[i].id) {
        return item[i];
      }
    }
  });
};


function displyaBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItem = bagItemsObject.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemsObject.forEach((bagItem) => {
    totalMRP += bagItem.price.original_price;
    totalDiscount += bagItem.price.original_price - bagItem.price.current_price;
  });
  let finalPayment = totalMRP - totalDiscount + convinienceFee;

  bagSummaryElement.innerHTML = `
 <div class="price-details">PRICE DETAILS (${totalItem} items)</div>
      <div class="total-mrp">
        <span class="mrp">Total MRP</span>
        <span class="rupee">Rs.${totalMRP}</span>
      </div>
      <div class="discount-mrp">
        <span class="dis-mrp">Discount on MRP</span>
        <span class="dis-mrp discount-rupee">-Rs.${totalDiscount}</span>
      </div>
      <div class="convinience-fee">
        <span class="convinience">
          Convinience Fee
        </span>
        <span class="convinience-rupee">
          Rs.${convinienceFee}
        </span>
      </div>
      <hr />
      <div class="total-amount">
        <span class="amount">Total Amount</span>
        <span class="amount-rupee">Rs.${finalPayment}</span>
      </div>      
      <button class="place-order">
        PLACE ORDER
      </button>`;
}

function displayBagItems() {
  let containerElement = document.querySelector(".item-summary")
  let innerHtml = "";
  bagItemsObject.forEach(bagItem => {
    innerHtml += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHtml;
};

function removeFromBag(itemId) {
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displyaBagSummary();
}

function generateItemHTML(items) {
  return `<div class="bag-left">
      <div class="image-container">
         <img src="${items.image}" alt="item-image">
       </div>
       <div class="item-detail-container">
         <div class="company">${items.company}</div>
         <div class="item-name">${items.name}</div>
         <div class="price">
           <span class="current-price">Rs.${items.price.current_price}</span>
           <span class="original-price">Rs.${items.price.original_price}</span>
           <span class="off-price">Rs.${items.price.off_price}</span>
         </div>
         <div class="return-date">
           <span class="return">${items.return_date} </span>
           <span class="available">return available</span>
         </div>
         <div class="delivery-date">
           ${items.delivery_date}
         </div>
         <div onclick="removeFromBag(${items.id})" class="cross-icon">
           X
         </div>
      </div>
     </div>`;
};