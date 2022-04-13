

export default class UserInfo {

    constructor(info) {
        console.log(info)
        this.nameContainer = document.querySelector(info.name);
        this.aboutContainer = document.querySelector(info.about);
        this.avatarImg = document.querySelector(`${info.avatar} img`)

    }

    getUserInfo() {
        console.log(this)
        return {
            name: this.nameContainer.textContent,
            about: this.aboutContainer.textContent,
            cohort: '"cohort-39"',
            avatar: this.avatarImg.src,
            _id: this.id,
        }
    }

    setUserInfo(name, about) {
        this.nameContainer.textContent = name;
        this.aboutContainer.textContent = about;
    }
    setUserAvatar(link) {
        this.avatarImg.src = link
    }




}
