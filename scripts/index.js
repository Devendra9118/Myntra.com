let bagItems;

onLoad();
function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayElementHomePage();
  displayBagIcon();
}

function addToBag(itemId) {
   bagItems.push(itemId);
   localStorage.setItem("bagItems", JSON.stringify(bagItems));
   displayBagIcon();
} 

function displayBagIcon() {
    let bagItemCount = document.querySelector(".item-numbers");
    if (bagItems.length > 0) {
        bagItemCount.style.visibility = "visible";
        bagItemCount.innerHTML = bagItems.length;
    } else {
        bagItemCount.style.visibility = "hidden";
    }
}

function displayElementHomePage() {
    let elementContainer = document.querySelector("#items-container");    
    let innerHTML = "";
    if (!elementContainer) {
        return;
    }
    item.forEach((items) => {
    innerHTML += `
    <div class="item-container">
        <div class="image-container">
            <img class="image" src="${items.image}" alt="lamp">
            <div class="rating">${items.rating}</div>
        </div>
        <div class="company">${items.company}</div>
        <div class="name">${items.name}</div>
        <div class="price">
            <span class="current-price">Rs.${items.price.current_price}</span>
            <span class="original-price">Rs.${items.price.original_price}</span>
            <span class="off-price">${items.price.off_price}</span>
        </div>
        <button onclick="addToBag(${items.id})" class="add-to-bag">
            Add to Bag
        </button>
        </div>`;
    });
    elementContainer.innerHTML = innerHTML;
}
