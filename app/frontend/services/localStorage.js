Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export function setValue(key, value, exp=(new Date().addDays(5)) ){
    localStorage.setItem(key, JSON.stringify({
        data: value,
        exp: exp
    }));
}

export function getValue(key){
    return JSON.parse(localStorage.getItem(key))
}
export function checkIsAuth(){
    let tokenData = JSON.parse(localStorage.getItem("token"));
    return (tokenData?.data !== undefined && new Date(tokenData?.exp) > new Date())
}