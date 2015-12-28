import Ember from 'ember';

export default Ember.Service.extend({
  getDate() {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth().toString().length === 2 ? date.getMonth() : '0' + date.getMonth(),
        day = date.getDay().toString().length === 2 ? date.getDay() : '0' + date.getDay(),
        h = date.getHours().toString().length === 2 ? date.getHours() : '0' + date.getHours(),
        m = date.getMinutes().toString().length === 2 ? date.getMinutes() : '0' + date.getMinutes(),
        s = date.getSeconds().toString().length === 2 ? date.getSeconds() : '0' + date.getSeconds();

    return year + '-' + month + '-' + day + ' ' + h + ":" + m + ":" + s;
  }
});
