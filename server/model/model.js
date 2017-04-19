class Account {
    constructor() {
        this.uid = "";
        this.fullname = "";
        this.email = "";
        this.password = [];
        this.photoUrl = "";
        this.joinDate = new Date();
        this.credential_provider = "";
        this.locked = false;
        this.isAdmin = false;
        this.following = [];
        this.followed = [];
        this.guildID = "";
        this.brewbook = [];
        this.isChief = false;
        this.guildInvites = [];
    }
};

class Guild {
    constructor() {
        this.name = "";
        this.logo = "";
        this.chief = "";
        this.status = "pending";
        this.pendingMembers = [];
    }
}

class Recipe {
    constructor() {
        this.name = "";
        this.status = "pending";
    }
}

module.exports = {
    Account: Account,
    Guild: Guild,
    Recipe: Recipe
}