// отвечает за управление отображением информации о пользователе на странице

//Принимает в конструктор объект с селекторами двух элементов: элемента
//имени пользователя и элемента информации о себе.
class UserInfo {
    constructor({inputProfileName,inputProfileAbout}){
        this._profileName = document.querySelector(inputProfileName);
        this._profileAbout = document.querySelector(inputProfileAbout);        
    }
    //возвр обект с данными польз.данные подст в форму при открытии
    getUserInfo(){
        return{
            userName:this._profileName.textContent,
            userAbout:this._profileAbout.textContent
        }
    }

    //приниимает новые данныен пользователя и добавляет их на страницу
    setUserInfo(userName,userAbout){
        this._profileName.textContent = userName;
        this._profileAbout.textContent = userAbout;
    }
}
export {UserInfo};