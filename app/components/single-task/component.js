import Ember from 'ember';

export default Ember.Component.extend({
  // DI
  store         : Ember.inject.service('store'),
  dispatcher    : Ember.inject.service(),

  // cusotmizing
  tagName : 'tr',
  classNames : ['cursor-pointer', 'item'],
  classNameBindings : ['isDone:task-done'],
  isDone : false,

  init() {
    let status = this.get('task.isCompleted');
    this.set('isDone',status);

    // init default Ember methods
    this._super();
  },
  didInsertElement() {
    // add animations from Semantic UI
    this.$().hide().transition('fade');
  },
  willDestroyElement() {
    // add animations from Semantic UI
    this.$().transition('fade');
  },
  // events
  actions : {
    toggleTaskStatus() {
      let store = this.get('store'),
          task_id = this.get('task.id');

      store.findRecord('task', task_id)
        .then((task) => {
          let new_status = task.get('isCompleted') ? false : true;
          task.set('isCompleted', new_status);
          task.save()
            .then(() => {
              this.$().find('.task-status').transition('pulse');
              // change class
              this.set('isDone', new_status);
              // trigger action in subscribers
              this.get('dispatcher').publish('refreshTasksList');
            });
        });
    }
  }
});
