import DS from 'ember-data';

export default DS.Model.extend({
  description : DS.attr('string'),
  isCompleted : DS.attr('boolean')
});
