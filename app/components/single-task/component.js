import Ember from 'ember';

export default Ember.Component.extend({
  // DI
  store   : Ember.inject.service('store'),

  // cusotmizing
  tagName : 'li',
  classNames : ['cursor-pointer', 'list-group-item'],
  classNameBindings : ['isDone:task-done'],
  isDone : false,

  init() {
    let status = this.get('task.status');
    this.set('isDone',status);

    // init default Ember methods
    this._super();
  },

  // events
  click() {
    let store = this.get('store'),
        task_id = this.get('task.id');

    store.findRecord('task', task_id)
      .then((task) => {
        let new_status = task.get('status') ? false : true;
        task.set('status', new_status);
        task.save()
          .then(() => {
              this.set('isDone', new_status);
              // trigger action in parent component
              this.get('parentView').send('refreshTasksList');
          });
      });
  }
});
