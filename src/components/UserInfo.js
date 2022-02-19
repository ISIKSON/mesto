export default class UserInfo {
    constructor({nameElement, jobElement,avatarElement}) {
        this._nameElement = nameElement;
        this._jobElement = jobElement;
        this._avatarElement = avatarElement;
    }

    getUserInfo() {
        this._userData = {};
        this._userData.name = this._nameElement.textContent;
        this._userData.job = this._jobElement.textContent;
        this._userData.avatar = this._avatarElement.style.backgroundImage;
        return this._userData;
    }

    setUserInfo({name, about, avatar, _id}) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
        this._avatarElement.style.backgroundImage = `url(${avatar})`;
        this._id = _id;
    }

    // setUserId(id) {
    //     this._id= id;
    // }
}
