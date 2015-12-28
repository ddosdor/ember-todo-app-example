import Ember from 'ember';

export default Ember.Component.extend({
  // DI
  globals : Ember.inject.service('globals'),
  store   : Ember.inject.service('store'),

  // events / actions
  actions : {
    addNewTask(newTask) {
      let new_task = this.get('store').createRecord('task', {
        description : newTask,
        status      : false,
        date        : this.get('globals').getDate()
      });

      new_task.save();
    }
  }
});
