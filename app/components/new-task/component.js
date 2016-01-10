import Ember from 'ember';

export default Ember.Component.extend({
  // DI
  store         : Ember.inject.service('store'),
  dispatcher    : Ember.inject.service(),

  // events / actions
  actions : {
    addNewTask(newTask) {
      let new_task = this.get('store').createRecord('task', {
        description : newTask,
        isCompleted : false
      });

      new_task.save()
        .then(() => {
          this.get('dispatcher').publish('refreshTasksList');
          this.set('newTask', '');
        });
    }
  }
});
