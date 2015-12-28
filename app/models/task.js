import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  status: DS.attr('boolean'),
  date: DS.attr('string')
});
