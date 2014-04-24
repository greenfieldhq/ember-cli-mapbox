var DefaultPopupView = Ember.View.extend({
  template: Ember.Handlebars.compile('<ul><li>name: <p>{{name}}</p></li><li>description: <div id="description">{{{description}}}</div></li></ul>')
});
export default DefaultPopupView;
