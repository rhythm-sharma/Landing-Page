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

// Tab animation

// Runs the tab animation every five seconds
// If user click on any tab at any time then animation will start from that tab on every five second

let animationInterval;

const tabMenuItemEdits = document.querySelectorAll(".tab-menu-item");

for (let i = 0; i < tabMenuItemEdits.length; i++)
  tabMenuItemEdits[i].addEventListener("click", changeTab);

function changeTab(evt) {
  for (let i = 0; i < tabMenuItemEdits.length; i++)
    if (tabMenuItemEdits[i] == evt.target) {
      tabMenuItemEdits[i].classList.add("w-p-active-tab-item");
      for (let sibling of tabMenuItemEdits[i].parentNode.children) {
        if (sibling !== tabMenuItemEdits[i]) {
          sibling.classList.remove("w-p-active-tab-item");
          clearInterval(animationInterval);
          initializeChangeTab(i);
        }
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

function initializeChangeTab(idx) {
  let index;

  if (idx) {
    index = idx;
  } else {
    index = 0;
  }

  animationInterval = window.setInterval(() => {
    if (index >= 4) {
      index = 0;
    } else {
      index++;
    }
    tabChangeAnimation(index);
  }, 5000);
}

function tabChangeAnimation(i) {
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

// initializeChangeTab();
