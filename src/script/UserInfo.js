// отвечает за управление отображением информации о пользователе на странице

//Принимает в конструктор объект с селекторами двух элементов: элемента
//имени пользователя и элемента информации о себе.
export default class UserInfo {
  constructor({ inputProfileName, inputProfileAbout, inputProfileAvatar }) {
    this._inputProfileName = document.querySelector(inputProfileName);
    this._inputProfileAbout = document.querySelector(inputProfileAbout);
    this._inputProfileAvatar = document.querySelector(inputProfileAvatar);
  }

  getUserInfo() {
    return {
      userName: this._inputProfileName.textContent,
      userDescription: this._inputProfileAbout.textContent,
    };
  }

  setUserInfo({ userName, userDescription }) {
    this._inputProfileName.textContent = userName;
    this._inputProfileAbout.textContent = userDescription;
  }

  setUserAvatar({ userAvatarLink }) {
    this._inputProfileAvatar.src = userAvatarLink;
  }

  saveUserId(userId) {
    this._userId = userId;
  }
  getUserId() {
    return this._userId;
  }
}
