import Ember from 'ember';

export default Ember.Component.extend({
  // DI
  store         : Ember.inject.service('store'),
  dispatcher    : Ember.inject.service(),

  // init
  init() {
    this.get('dispatcher').subscribe('refreshTasksList', this, 'refreshTasksList');

    // init default Ember methods
    this._super();
  },
  // component
  refresh    : false,
  filterBy   : 'all',
  filterType : {
    all : function() {
      return true;
    },
    done : function(task) {
      return task.get('isCompleted') === true;
    },
    todo : function(task) {
      return task.get('isCompleted') !== true;
    }
  },
  tasksList : function() {
    let filterFunction = this.filterType[this.get('filterBy')];

    if(this.get('refresh')) {
      this.set('refresh', false);
    }

    return this.get('store').peekAll('task').filter(filterFunction);
  }.property('filterBy', 'refresh'),
  refreshTasksList(filter) {
    if(filter) {
      this.set('filterBy', filter);
    } else {
      this.set('refresh', true);
    }
  }
});
