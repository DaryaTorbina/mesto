import "./index.css";
import {
  config,
  popupProfileSelector,
  popupElementPhotoSelector,
  popupZoomSelector,
  popupUpdateAvatarSelector,
  profileAvatarEditButton,
  inputProfileName,
  inputProfileAbout,
  inputProfileAvatar,
  editProfileButton,
  addMestoButton,
  popupConfirmSelector,
  cardsContainerSelector,
  cardSelector,
  profileDataAbout,
  profileDataName,
  mestoApiConfig,
} from "../script/utils/constants.js";
import Api from "../script/Api.js";
import Card from "../script/Card.js";
import FormValidator from "../script/FormValidator.js";
import Section from "../script/Section.js";
import PopupWithForm from "../script/PopupWithForm.js";
import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithConfirm from "../script/PopupConfirmation.js";
import UserInfo from "../script/UserInfo.js";

//запросы к серверу
const api = new Api(mestoApiConfig);

const userInfo = new UserInfo({
  inputProfileName,
  inputProfileAbout,
  inputProfileAvatar,
});

//первоначальные данные с сервера

api
  .getServerData()
  .then((responses) => {
    const [cardData, userData] = responses;
    userInfo.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
    });
    userInfo.setUserAvatar({ userAvatarLink: userData.avatar });
    userInfo.saveUserId(userData._id);
    cards.renderItems(cardData);
  })
  .catch((err) => {
    console.error(err);
  });

//////КАРТОЧКИ
// отрисовка карточек
const cards = new Section(
  {
    renderer: (item) => {
      const cardElement = createNewCard(item, cardSelector);
      cards.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

const addModalMesto = new PopupWithForm(popupElementPhotoSelector, (evt) => {
  evt.preventDefault();
  addModalMesto.isLoadingMessage(true);
  const formValues = addModalMesto.getFormInputValues();

  const item = { name: formValues.name, link: formValues.url };
  api
    .addNewMesto(item)
    .then((newCardItem) => {
      const cardElement = createNewCard(newCardItem, cardSelector);
      cards.addNewItem(cardElement);
      addModalMesto.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addModalMesto.isLoadingMessage(false);
    });
});
addModalMesto.setEventListener();
const popupValidatorMesto = new FormValidator(
  config,
  addModalMesto.getPopupForm()
);
popupValidatorMesto.enableValidation();

function createNewCard(item, cardSelector) {
  const card = new Card({
    data: item,
    cardSelector,
    userId: userInfo.getUserId(),
    handleCardClick: () => {
      popupZoom.open(item.link, item.name);
    },
    handleLikeButtonClick: () => {
      if (card.isLiked) {
        api
          .deleteLikeMesto(card.getCardId())
          .then((data) => {
            card.removeLike();
            card.likesCount(data.likes);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        api
          .addLikeMesto(card.getCardId())
          .then((data) => {
            card.setLike();
            card.likesCount(data.likes);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    handleRemoveButtonClick: (evt) => {
      const cardElement = evt.target.closest(".element");
      const cardId = card.getCardId();
      popupConfirm.changeHandlerSubmitForm((evt) => {
        evt.preventDefault();
        api
          .removeMesto(cardId)
          .then(() => {
            cardElement.remove();
            popupConfirm.close();
          })
          .catch((err) => {
            console.error(err);
          });
      });
      popupConfirm.open();
    },
  });
  return card.generateCard();
}

addMestoButton.addEventListener("click", () => {
  popupValidatorMesto.clearError();
  addModalMesto.open();
});

/////ПРОФИЛЬ
const popupUser = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  popupUser.isLoadingMessage(true);
  const formInputValues = popupUser.getFormInputValues();
  api
    .updateUserInfo({
      name: formInputValues.nameinput,
      about: formInputValues.aboutinput,
    })
    .then((data) => {
      userInfo.setUserInfo({
        userName: data.name,
        userDescription: data.about,
      });
      popupUser.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupUser.isLoadingMessage(false);
    });
});
popupUser.setEventListener();

const popupValidatorProfile = new FormValidator(
  config,
  popupUser.getPopupForm()
);
popupValidatorProfile.enableValidation();

editProfileButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileDataAbout.value = userInfoData.userDescription;
  profileDataName.value = userInfoData.userName;
  popupValidatorProfile.clearError();
  popupUser.open();
});

//////АВАТАР
//запись в попап
const popupAvatar = new PopupWithForm(popupUpdateAvatarSelector, (evt) => {
  evt.preventDefault();
  popupAvatar.isLoadingMessage(true);
  const formInputValues = popupAvatar.getFormInputValues();
  api
    .updateProfileAvatar({ avatar: formInputValues.urlavatar })
    .then((data) => {
      userInfo.setUserAvatar({ userAvatarLink: data.avatar });
      popupAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAvatar.isLoadingMessage(false);
    });
});
popupAvatar.setEventListener();

const popupAvatarValidator = new FormValidator(
  config,
  popupAvatar.getPopupForm()
);
popupAvatarValidator.enableValidation(); //

profileAvatarEditButton.addEventListener("click", () => {
  popupAvatarValidator.clearError();
  popupAvatar.open();
});

/////УДАЛЕНИЕ
const popupConfirm = new PopupWithConfirm(popupConfirmSelector);
popupConfirm.setEventListener();

/////УВЕЛИЧЕНИЕ
const popupZoom = new PopupWithImage(popupZoomSelector);
popupZoom.setEventListener();
