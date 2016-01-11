import Ember from 'ember';

export default Ember.Component.extend({
  // DI
  store      : Ember.inject.service('store'),
  dispatcher : Ember.inject.service(),

  // init
  init() {
    this.get('dispatcher').subscribe('refreshTasksList', this, 'refreshTasksList');

    // init default Ember methods
    this._super();
  },
  // component
  classNames : ['ui','pointing','menu','stackable'],

  isRefresh : false,
  refresh() {
    if(this.get('isRefresh')) {
      this.set('isRefresh', false);
    }
  },
  countAll : function() {
    this.refresh();
    return this.get('store').peekAll('task').filter((task) => {
      return task;
    }).length;
  }.property('isRefresh'),
  countNew : function() {
    this.refresh();
    return this.get('store').peekAll('task').filter((task) => {
      return task.get('isCompleted') !== true;
    }).length;
  }.property('isRefresh'),
  countDone : function() {
    this.refresh();
    return this.get('store').peekAll('task').filter((task) => {
      return task.get('isCompleted') === true;
    }).length;
  }.property('isRefresh'),
  deleteTasks(type) {
    let tasks = this.get('store').peekAll('task'),
        promisesArray = [];

    tasks
      .filter((task) => {
        if(type === 'done') {
          return task.get('isCompleted') === true;
        } else {
          return task;
        }
      })
      .forEach((task) => {
        promisesArray.push(task.destroyRecord());
      });


    return Ember.RSVP.all(promisesArray);
  },
  refreshTasksList() {
    this.set('isRefresh', true);
  },
  actions : {
    filterTasksList(type) {
      this.$()
        .find('.item')
        .removeClass('active');
      this.$()
        .find('a[data-filter-type="' + type + '"]')
        .addClass('active');
      this.get('dispatcher').publish('refreshTasksList', type);
    },
    deleteAllTasks() {
      this.deleteTasks()
        .then(() => {
          this.get('store').unloadAll('task');
          this.get('dispatcher').publish('refreshTasksList');
        });
    },
    deleteDoneTasks() {
      this.deleteTasks('done')
        .then(() => {
          this.get('dispatcher').publish('refreshTasksList');
        });
    }
  }

});
