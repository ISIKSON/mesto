export default class UserInfo {
    constructor({nameEl, jobEl}) {
        this._nameEl = nameEl;
        this._jobEl = jobEl;
    }

    getUserInfo() {
        this._userData = {};
        this._userData.name = this._nameEl.textContent;
        this._userData.job = this._jobEl.textContent;
        return this._userData;
    }

    setUserInfo(name,job) {
        this._nameEl.textContent = name;
        this._jobEl.textContent = job;
    }
}