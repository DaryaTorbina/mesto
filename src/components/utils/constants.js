export const config = {
  formSelector: ".popup__form",
  inputSelector: "popup__text",
  submitButtonSelector: "popup__button-save",
  inactiveButtonClass: "popup__button-save_inacive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__error_active",
  formSelector: ".popup__form",
};

export const popupProfileSelector = ".popup_profile";
export const popupElementPhotoSelector = ".popup_mesto";
export const popupZoomSelector = ".popup_zoom";
export const popupConfirmSelector = ".popup_confirmation";
export const popupUpdateAvatarSelector = ".popup_newavatar";

export const inputProfileAvatar = ".profile__avatar";
export const inputProfileName = ".profile__name";
export const inputProfileAbout = ".profile__about";

//модалки
export const editModalProfile = document.querySelector(".popup_profile");
export const addModalMesto = document.querySelector(".popup_mesto");

//поля
export const profileDataName = editModalProfile.querySelector("#name-input");
export const profileDataAbout = editModalProfile.querySelector("#about-input");

//popup кнопки
export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-edit"
);

export const profileElement = document.querySelector(".profile");

export const editProfileButton = profileElement.querySelector(
  ".profile__edit-button"
);
export const addMestoButton = profileElement.querySelector(
  ".profile__add-button"
);

export const cardsContainerSelector = ".elements";
export const cardSelector = "#element";

// export const popupZoomContainer = document.querySelector(
//   ".popup__container_zoom"
// );
// export const popupZoomImageImg =
//   popupZoomContainer.querySelector(".popup__image");
// export const popupZoomImageTitle = popupZoomContainer.querySelector(
//   ".popup__description"
// );

export const mestoApiConfig = {
  address: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: `b998bf4e-efa3-49ce-b447-6c7ee02ac497`,
    'Content-Type': 'application/json'
  }
};
