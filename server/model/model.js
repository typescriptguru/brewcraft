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
    }
};

module.exports = {
    Account: Account
}