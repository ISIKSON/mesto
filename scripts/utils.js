const popupBigImg = document.querySelector(".popup_type_image-big");

function openPopup(popup) {
    //Функция:открыть попап
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", escHandler);
  }
  
  function closePopup(popup) {
    //Функция:закрыть попап
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", escHandler);
  }

  function escHandler(evt) {
    //Функция:закрыть попап BigImg
    if(evt.key==='Escape'){
      const openedPopup = document.querySelector(".popup_opened");
      closePopup(openedPopup);
    }
  }
  
  export{openPopup,popupBigImg,closePopup,escHandler};