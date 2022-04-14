

export default class UserInfo {

    constructor(info) {
        this.nameContainer = document.querySelector(info.name);
        this.aboutContainer = document.querySelector(info.about);
        this.avatarImg = document.querySelector(`${info.avatar} img`)

    }

    getUserInfo() {
        return {
            name: this.nameContainer.textContent,
            about: this.aboutContainer.textContent,
            avatar: this.avatarImg.src,
            _id: this.id,
        }
    }

    setUserInfo(name, about, avatar, id) {
        this.nameContainer.textContent = name;
        this.aboutContainer.textContent = about;
        this.id = id;
        this.avatar = avatar
    }
    setUserAvatar(link) {
        this.avatarImg.src = link
    }
}
