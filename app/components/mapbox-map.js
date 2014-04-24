import Mapbox from "../mapbox";

var MapboxMapComponent = Ember.Component.extend({
  didInsertElement: function() {
    this._super();
    Mapbox.map = L.mapbox.map('map', Mapbox.config.api_key).setView(Mapbox.config.center, Mapbox.config.zoom);
    this.drawMarkers();
  },
  drawMarkers: function() {
    if (typeof(Mapbox.map) != 'undefined') {
      // remove old markers, skip index 0 as that is the actual map tiles
      var layerIndex = 0;
      Mapbox.map.eachLayer(function(layer) {
        if (layerIndex == 0) {
          layerIndex++;
          return;
        }
        Mapbox.map.removeLayer(layer);
        layerIndex++;
      }); 
      // add new markers
      var controller = this;

      this.get('markers').forEach(function(item) {
        var marker = L.marker([item.latitude, item.longitude], {
          icon: L.divIcon({
            className: 'marker-icon',
            html: '',
            iconSize: [15, 15]
          })
        });
        marker.addTo(Mapbox.map);

        marker.removeEventListener();

        var $this = controller;
        marker.on('click', function(event) {
          var popupView = $this.container.lookup('component:mapbox-map').createChildView($this.get('popup-view'), { context: item });
          event.target.bindPopup(popupView.renderToBuffer().buffer);
          event.target.openPopup();
        });
      }); 
    }
  }.observes('markers'),
  // returns list of markers that are within the bounds of the visible map
  visibleMarkers: function() {
    var inBounds = [],
        bounds = Mapbox.map.getBounds();

    var layerIndex = 0;
    Mapbox.map.eachLayer(function(marker) {
      if (layerIndex == 0) {
        layerIndex++;
        return;
      }
      if (bounds.contains(marker.getLatLng())) {
        inBounds.push(marker);
      }
      layerIndex++;
    }); 

    return inBounds;
  }.property()
});
export default MapboxMapComponent;
