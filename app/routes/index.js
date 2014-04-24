import SampleData from "../data/data";
import DefaultPopupView from "../views/default-popup-view";

export default Ember.Route.extend({
  model: function() {
    return SampleData.companies;    
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('index').set('popupView', DefaultPopupView)
  }
});
