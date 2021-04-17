const isEmpty = (value) => {
    if(value) return false;
    else return true;
}

const textNumberVal = (value) => {
    var regex = new RegExp(/^[a-zA-Z0-9]?$/g);
    return regex.test(this.accountRequest.zip);
}

module.exports = {isEmpty, textNumberVal};