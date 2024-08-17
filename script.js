let items = document.querySelectorAll(".item");
let filterList = document.querySelector(".filter-list");
let itemList = document.querySelector(".items");
let tags = document.querySelector(".tags");
let clear = document.querySelector(".clear");
let itemTag = document.querySelectorAll(".right span");

let tagArray = [];
itemTag.forEach((tag) => {
  tag.addEventListener("click", () => {
    let tagValue = tag.textContent;

    if (tagArray.includes(tagValue) === false) {
      filterList.classList.remove("hide-filter");
      let tagItem = `<div class="tag">
                <span>${tagValue}</span>
                <img src="/images/icon-remove.svg" alt="" />
              </div>
              `;
      tags.insertAdjacentHTML("beforeend", tagItem);
      tagArray.push(tagValue);
    }
    console.log(`this is the tags selected ${tagArray}`);
    let removeTag = document.querySelectorAll(".tag img");
    let removeTagArr = [];
    removeTag.forEach((tag) => {
      tag.addEventListener("click", () => {
        let deletedTag = tag.previousElementSibling.textContent;

        tag.parentElement.remove();

        if (tags.childElementCount === 0) {
          filterList.classList.add("hide-filter");
          restoreItem(items);
        }
        let index = tagArray.indexOf(deletedTag);
        if (index > -1) {
          tagArray.splice(index, 1);
        }
        restoreItems(tagArray, items);
      });
    });

    removeItem(items, tagArray);
  });
});
clear.addEventListener("click", () => {
  tags.innerHTML = "";
  tagArray = [];
  filterList.classList.add("hide-filter");
  items.forEach((item) => {
    item.style.display = "flex";
  });
});
function removeItem(items, tagArray) {
  let itemArr = [];
  items.forEach((item) => {
    let itemTags = item.querySelectorAll(".right span");

    let itemTagsArr = [];
    itemTags.forEach((tag) => {
      itemTagsArr.push(tag.textContent);
    });
    itemArr.push(itemTagsArr);
  });

  let indexArr = [];
  itemArr.forEach((item, index) => {
    let result = tagArray.every((tag) => item.includes(tag));
    if (!result) {
      indexArr.push(index);
    }
  });

  indexArr.forEach((item) => {
    let removedItem = itemList.children[item];

    removedItem.style.display = "none";
  });
}
function restoreItem(items) {
  items.forEach((item) => {
    item.style.display = "flex";
  });
}
function restoreItems(tagArray, items) {
  let itemArr = [];
  items.forEach((item) => {
    let itemTags = item.querySelectorAll(".right span");

    let itemTagsArr = [];
    itemTags.forEach((tag) => {
      itemTagsArr.push(tag.textContent);
    });
    itemArr.push(itemTagsArr);
  });

  let indexArr = [];
  itemArr.forEach((item, index) => {
    let result = tagArray.every((tag) => item.includes(tag));
    if (result) {
      indexArr.push(index);
    }
  });

  indexArr.forEach((item) => {
    let removedItem = itemList.children[item];

    removedItem.style.display = "flex";
  });
}
