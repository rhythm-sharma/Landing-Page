(() => {
  const linearCarousel = (el) => {
    const carouselElement = el;
    let carouselItems = el.querySelectorAll(".carousel__item");
    let activeIndex = 0;

    const reAlignCarousel = () => {
      if (carouselItems.length == 0) {
        return;
      }
      Array.prototype.forEach.call(carouselItems, (item) => {
        item.classList.remove("carousel__item-next", "carousel__item--active");
      });

      if (activeIndex === 0) {
        // carouselItems[carouselItems.length - 1].classList.add(
        //   "carousel__item-prev"
        // );
        carouselItems[activeIndex + 1].classList.add("carousel__item-next");
      } else if (activeIndex === 1) {
        carouselItems[0].classList.add("carousel__item-next");
      }
      carouselItems[activeIndex].classList.add("carousel__item--active");
    };

    const cloneElementAndAppendToCarousel = (element) => {
      var clone = element.cloneNode(true);
      console.log(clone);
      carouselElement.appendChild(clone);
    };

    const moveToNextItem = () => {
      if (activeIndex == carouselItems.length - 1) {
        activeIndex = 0;
      } else {
        activeIndex++;
      }
      reAlignCarousel();
    };

    const moveToPrevItem = () => {
      if (activeIndex == 0) {
        activeIndex = carouselItems.length - 1;
      } else {
        activeIndex--;
      }
      reAlignCarousel();
    };

    const addButtonsToCarousel = () => {
      const prevButtonElement = document.getElementById("leftArrow");

      prevButtonElement.classList.add("carousel__button-prev");

      const nextButtonElement = document.getElementById("rightArrow");
      nextButtonElement.classList.add("carousel__button-next");

      prevButtonElement.addEventListener("click", moveToPrevItem);
      nextButtonElement.addEventListener("click", moveToNextItem);
    };

    const bindClickEventForItems = () => {
      carouselElement.addEventListener("click", (e) => {
        const targetElement = e.path.filter(
          (element) =>
            element.classList && element.classList.contains("carousel__item")
        )[0];
        if (!targetElement) return;
        const indexCSSClasses = [
          "carousel__item-next-next",
          "carousel__item-next",
          "carousel__item-prev",
          "carousel__item-prev-prev",
        ];
        const indexCSSClass = indexCSSClasses.filter((cssClass) =>
          targetElement.classList.contains(cssClass)
        )[0];
        switch (indexCSSClass) {
          case "carousel__item-next":
            moveToNextItem();
            break;
          case "carousel__item-prev":
            moveToPrevItem();
        }
      });
    };

    const initializeCarousel = () => {
      carouselItems = el.querySelectorAll(".carousel__item");
      reAlignCarousel();

      addButtonsToCarousel();

      bindClickEventForItems();
    };
    initializeCarousel();
    console.log("DAMAN", carouselItems[0]);
  };
  console.log(
    "linearCarousel: ",
    document.querySelector(".horizontal-carousel")
  );
  linearCarousel(document.querySelector(".horizontal-carousel"));
})();

// jQuery(".tab-menu-item").click(function () {
//   var _this = jQuery(this);
//   var _menu_index = _this.index();

//   jQuery(this)
//     .addClass("w-p-active-tab-item")
//     .siblings()
//     .removeClass("w-p-active-tab-item");

//   jQuery(".tab-tab-item")
//     .eq(_menu_index)
//     .addClass("w-p-active-tab-item")
//     .siblings()
//     .removeClass("w-p-active-tab-item");

//   jQuery(".tab-tab-item").eq(_menu_index).addClass("w-p-active-tab-item");

//   jQuery(".tab-tab-item")
//     .not(":eq(" + _menu_index + ")")
//     .removeClass("w-p-active-tab-item");

//   // Menu item
//   jQuery(".tab-menu-item").removeClass("tab-menu-item-active");
//   _this.addClass("tab-menu-item-active");
// });

const tabMenuItemEdits = document.querySelectorAll(".tab-menu-item");

for (let i = 0; i < tabMenuItemEdits.length; i++)
  tabMenuItemEdits[i].addEventListener("click", changeTab);

function changeTab(evt) {
  for (let i = 0; i < tabMenuItemEdits.length; i++)
    if (tabMenuItemEdits[i] == evt.target) {
      tabMenuItemEdits[i].classList.add("w-p-active-tab-item");
      for (let sibling of tabMenuItemEdits[i].parentNode.children) {
        if (sibling !== tabMenuItemEdits[i])
          sibling.classList.remove("w-p-active-tab-item");
      }

      const tabTabItem = document.querySelectorAll(".tab-tab-item")[i];

      tabTabItem.classList.add("w-p-active-tab-item");
      for (let sibling of tabTabItem.parentNode.children) {
        if (sibling !== tabMenuItemEdits[i])
          sibling.classList.remove("w-p-active-tab-item");
      }
      tabTabItem.classList.add("w-p-active-tab-item");

      const tabMenuItem = document.querySelectorAll(".tab-menu-item")[i];
      for (let sibling of tabMenuItem.parentNode.children) {
        if (sibling !== tabMenuItemEdits[i])
          sibling.classList.remove("tab-menu-item-active");
      }
      tabMenuItem.classList.add("tab-menu-item-active");
    }
}
