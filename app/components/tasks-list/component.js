import Ember from 'ember';

export default Ember.Component.extend({
  filterBy   : 'all',
  filterType : {
    all : function() {
      return true;
    },
    done : function(task) {
      return task.get('status') === true;
    },
    todo : function(task) {
      return task.get('status') !== true;
    }
  },
  tasksList : function() {
    let filterFunction = this.filterType[this.get('filterBy')];

    return this.get('tasks').filter(filterFunction);
  }.property('tasks','filterBy'),
  actions : {
    filterTasksList(type) {
      this.set('filterBy', type);
    },
    refreshTasksList() {
      this.set('refresh', true);
    }
  }
});
