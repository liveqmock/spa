/**
*
* */

module.exports = function(week) {
    if(!week) return week;
    var arr = ['周日','周一','周二','周三','周四','周五','周六'];
    return week.replace(/(\d)/g,function(){ return arr[arguments[1]]});
};