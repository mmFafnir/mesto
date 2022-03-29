

export default class UserInfo {
    constructor(info) {
        
         
        
        this.nameContainer = document.querySelector(info.name);
        this.aboutContainer = document.querySelector(info.about); 

    }

    getUserInfo() {
        return {
            name: this.nameContainer.textContent,
            about: this.aboutContainer.textContent
        }
    }

    setUserInfo(name, about) {
        this.nameContainer.textContent = name;
        this.aboutContainer.textContent = about; 
    }

    
    
}