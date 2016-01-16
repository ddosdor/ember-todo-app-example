import Ember from 'ember';

export default Ember.Component.extend({
  // DI
  store      : Ember.inject.service('store'),
  dispatcher : Ember.inject.service(),

  attributeBindings : ['popupText:data-content','popupSize:data-variation'],
  popupText : 'Double click to change description',
  popupSize : 'mini',

  isEditing : false,
  tempDecription : '',

  didInsertElement() {
    // add popup from Semantic UI
    this.$().popup();
  },
  // events
  doubleClick() {
    if(this.isEditing) {
      this.set('description',this.tempDecription);
      // activate popup again
      this.$().popup();
    } else {
      this.set('tempDecription', this.get('description'));
      // destroy popup
      this.$().popup('destroy', true);
    }
    this.set('isEditing', !this.isEditing);
  },

  actions : {
    editTaskDecription() {
      let store = this.get('store'),
          task_id = this.get('id');

      store.findRecord('task', task_id)
        .then((task) => {
          task.set('description', this.get('description'));
          task.save();
          // close editing
          this.set('isEditing', false);
          // activate popup again
          this.$().popup();
          // trigger action in subscribers
          this.get('dispatcher').publish('refreshTasksList');
        });
    },
    cancelEditing() {
      this.set('isEditing', false);
      this.set('description',this.tempDecription);
      // activate popup again
      this.$().popup();
    }
  }
});
