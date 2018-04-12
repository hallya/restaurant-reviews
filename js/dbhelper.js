class DBHelper {

  static get DATABASE_URL() {
    const path = window.location.hostname === 'hallya.github.io' ? 'data/restaurants.json' : 'http://localhost:1337/restaurants';
    // const path = 'http://localhost:1337/restaurants';
    return path;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants() {
    return fetch(DBHelper.DATABASE_URL).then(response => response.json()).catch(error => console.error(`Request failed. Returned status of ${error}`));
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id) {
    // fetch all restaurants with proper error handling.
    return fetch(DBHelper.DATABASE_URL).then(response => response.json()).then(data => {
      return data[id - 1];
    }).catch(error => console.error(`Restaurant does not exist: ${error}`));
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine) {
    // Fetch all restaurants  with proper error handling
    return DBHelper.fetchRestaurants().then(restaurants => restaurants.restaurants.filter(r => r.cuisine_type == cuisine)).catch(error => console.error(error));
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood) {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants().then(restaurants => restaurants.restaurants.filter(r => r.neighborhood == neighborhood)).catch(error => console.error(error));
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants().then(restaurants => {
      let results = restaurants.restaurants;
      if (cuisine !== 'all') {
        results = restaurants.restaurants.filter(r => r.cuisine_type == cuisine);
      }
      if (neighborhood !== 'all') {
        results = restaurants.restaurants.filter(r => r.neighborhood == neighborhood);
      }
      return results;
    }).catch(error => console.error(error));
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods() {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants().then(restaurants => {
      // Get all neighborhoods from all restaurants
      const neighborhoods = restaurants.restaurants.map(restaurant => restaurant.neighborhood);
      // Remove duplicates from neighborhoods
      const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
      return uniqueNeighborhoods;
    }).catch(error => console.error(error));
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines() {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants().then(restaurants => {
      // Get all cuisines from all restaurants
      const cuisines = restaurants.restaurants.map(restaurant => restaurant.cuisine_type);
      // Remove duplicates from cuisines
      const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
      return uniqueCuisines;
    }).catch(error => console.error(error));
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return `restaurant.html?id=${restaurant.id}`;
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return `assets/img/${restaurant.photograph}`;
  }

  /**q
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP });
    return marker;
  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRiaGVscGVyLmpzIl0sIm5hbWVzIjpbIkRCSGVscGVyIiwiREFUQUJBU0VfVVJMIiwicGF0aCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaG9zdG5hbWUiLCJmZXRjaFJlc3RhdXJhbnRzIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJmZXRjaFJlc3RhdXJhbnRCeUlkIiwiaWQiLCJkYXRhIiwiZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lIiwiY3Vpc2luZSIsInJlc3RhdXJhbnRzIiwiZmlsdGVyIiwiciIsImN1aXNpbmVfdHlwZSIsImZldGNoUmVzdGF1cmFudEJ5TmVpZ2hib3Job29kIiwibmVpZ2hib3Job29kIiwiZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lQW5kTmVpZ2hib3Job29kIiwicmVzdWx0cyIsImZldGNoTmVpZ2hib3Job29kcyIsIm5laWdoYm9yaG9vZHMiLCJtYXAiLCJyZXN0YXVyYW50IiwidW5pcXVlTmVpZ2hib3Job29kcyIsInYiLCJpIiwiaW5kZXhPZiIsImZldGNoQ3Vpc2luZXMiLCJjdWlzaW5lcyIsInVuaXF1ZUN1aXNpbmVzIiwidXJsRm9yUmVzdGF1cmFudCIsImltYWdlVXJsRm9yUmVzdGF1cmFudCIsInBob3RvZ3JhcGgiLCJtYXBNYXJrZXJGb3JSZXN0YXVyYW50IiwibWFya2VyIiwiZ29vZ2xlIiwibWFwcyIsIk1hcmtlciIsInBvc2l0aW9uIiwibGF0bG5nIiwidGl0bGUiLCJuYW1lIiwidXJsIiwiYW5pbWF0aW9uIiwiQW5pbWF0aW9uIiwiRFJPUCJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsUUFBTixDQUFlOztBQUViLGFBQVdDLFlBQVgsR0FBMEI7QUFDeEIsVUFBTUMsT0FBT0MsT0FBT0MsUUFBUCxDQUFnQkMsUUFBaEIsS0FBNkIsa0JBQTdCLEdBQWtELHVCQUFsRCxHQUE0RSxtQ0FBekY7QUFDQTtBQUNBLFdBQU9ILElBQVA7QUFDRDs7QUFFRDs7O0FBR0EsU0FBT0ksZ0JBQVAsR0FBMEI7QUFDeEIsV0FBT0MsTUFBTVAsU0FBU0MsWUFBZixFQUNKTyxJQURJLENBQ0NDLFlBQVlBLFNBQVNDLElBQVQsRUFEYixFQUVKQyxLQUZJLENBRUVDLFNBQVNDLFFBQVFELEtBQVIsQ0FBZSxzQ0FBcUNBLEtBQU0sRUFBMUQsQ0FGWCxDQUFQO0FBR0Q7O0FBRUQ7OztBQUdBLFNBQU9FLG1CQUFQLENBQTJCQyxFQUEzQixFQUErQjtBQUM3QjtBQUNBLFdBQU9SLE1BQU1QLFNBQVNDLFlBQWYsRUFDSk8sSUFESSxDQUNDQyxZQUFZQSxTQUFTQyxJQUFULEVBRGIsRUFFSkYsSUFGSSxDQUVDUSxRQUFRO0FBQ1osYUFBT0EsS0FBS0QsS0FBSyxDQUFWLENBQVA7QUFDRCxLQUpJLEVBS0pKLEtBTEksQ0FLRUMsU0FBU0MsUUFBUUQsS0FBUixDQUFlLDhCQUE2QkEsS0FBTSxFQUFsRCxDQUxYLENBQVA7QUFNRDs7QUFFRDs7O0FBR0EsU0FBT0ssd0JBQVAsQ0FBZ0NDLE9BQWhDLEVBQXlDO0FBQ3ZDO0FBQ0EsV0FBT2xCLFNBQVNNLGdCQUFULEdBQ0pFLElBREksQ0FDQ1csZUFBZUEsWUFBWUEsV0FBWixDQUF3QkMsTUFBeEIsQ0FBK0JDLEtBQUtBLEVBQUVDLFlBQUYsSUFBa0JKLE9BQXRELENBRGhCLEVBRUpQLEtBRkksQ0FFRUMsU0FBU0MsUUFBUUQsS0FBUixDQUFjQSxLQUFkLENBRlgsQ0FBUDtBQUdEOztBQUVEOzs7QUFHQSxTQUFPVyw2QkFBUCxDQUFxQ0MsWUFBckMsRUFBbUQ7QUFDakQ7QUFDQSxXQUFPeEIsU0FBU00sZ0JBQVQsR0FDSkUsSUFESSxDQUNDVyxlQUFlQSxZQUFZQSxXQUFaLENBQXdCQyxNQUF4QixDQUErQkMsS0FBS0EsRUFBRUcsWUFBRixJQUFrQkEsWUFBdEQsQ0FEaEIsRUFFSmIsS0FGSSxDQUVFQyxTQUFTQyxRQUFRRCxLQUFSLENBQWNBLEtBQWQsQ0FGWCxDQUFQO0FBR0Q7O0FBRUQ7OztBQUdBLFNBQU9hLHVDQUFQLENBQStDUCxPQUEvQyxFQUF3RE0sWUFBeEQsRUFBc0U7QUFDcEU7QUFDQSxXQUFPeEIsU0FBU00sZ0JBQVQsR0FDSkUsSUFESSxDQUNDVyxlQUFlO0FBQ25CLFVBQUlPLFVBQVVQLFlBQVlBLFdBQTFCO0FBQ0EsVUFBSUQsWUFBWSxLQUFoQixFQUF1QjtBQUNyQlEsa0JBQVVQLFlBQVlBLFdBQVosQ0FBd0JDLE1BQXhCLENBQStCQyxLQUFLQSxFQUFFQyxZQUFGLElBQWtCSixPQUF0RCxDQUFWO0FBQ0Q7QUFDRCxVQUFJTSxpQkFBaUIsS0FBckIsRUFBNEI7QUFDMUJFLGtCQUFVUCxZQUFZQSxXQUFaLENBQXdCQyxNQUF4QixDQUErQkMsS0FBS0EsRUFBRUcsWUFBRixJQUFrQkEsWUFBdEQsQ0FBVjtBQUNEO0FBQ0QsYUFBT0UsT0FBUDtBQUNELEtBVkksRUFXSmYsS0FYSSxDQVdFQyxTQUFTQyxRQUFRRCxLQUFSLENBQWNBLEtBQWQsQ0FYWCxDQUFQO0FBWUQ7O0FBRUQ7OztBQUdBLFNBQU9lLGtCQUFQLEdBQTRCO0FBQzFCO0FBQ0EsV0FBTzNCLFNBQVNNLGdCQUFULEdBQ0pFLElBREksQ0FDQ1csZUFBZTtBQUNuQjtBQUNBLFlBQU1TLGdCQUFnQlQsWUFBWUEsV0FBWixDQUF3QlUsR0FBeEIsQ0FBNEJDLGNBQWNBLFdBQVdOLFlBQXJELENBQXRCO0FBQ0E7QUFDQSxZQUFNTyxzQkFBc0JILGNBQWNSLE1BQWQsQ0FBcUIsQ0FBQ1ksQ0FBRCxFQUFJQyxDQUFKLEtBQVVMLGNBQWNNLE9BQWQsQ0FBc0JGLENBQXRCLEtBQTRCQyxDQUEzRCxDQUE1QjtBQUNBLGFBQU9GLG1CQUFQO0FBQ0QsS0FQSSxFQVFKcEIsS0FSSSxDQVFFQyxTQUFTQyxRQUFRRCxLQUFSLENBQWNBLEtBQWQsQ0FSWCxDQUFQO0FBU0Q7O0FBRUQ7OztBQUdBLFNBQU91QixhQUFQLEdBQXVCO0FBQ3JCO0FBQ0EsV0FBT25DLFNBQVNNLGdCQUFULEdBQ0pFLElBREksQ0FDQ1csZUFBZTtBQUNuQjtBQUNBLFlBQU1pQixXQUFXakIsWUFBWUEsV0FBWixDQUF3QlUsR0FBeEIsQ0FBNEJDLGNBQWNBLFdBQVdSLFlBQXJELENBQWpCO0FBQ0E7QUFDQSxZQUFNZSxpQkFBaUJELFNBQVNoQixNQUFULENBQWdCLENBQUNZLENBQUQsRUFBSUMsQ0FBSixLQUFVRyxTQUFTRixPQUFULENBQWlCRixDQUFqQixLQUF1QkMsQ0FBakQsQ0FBdkI7QUFDQSxhQUFPSSxjQUFQO0FBQ0QsS0FQSSxFQU9GMUIsS0FQRSxDQU9JQyxTQUFTQyxRQUFRRCxLQUFSLENBQWNBLEtBQWQsQ0FQYixDQUFQO0FBUUQ7O0FBRUQ7OztBQUdBLFNBQU8wQixnQkFBUCxDQUF3QlIsVUFBeEIsRUFBb0M7QUFDbEMsV0FBUyxzQkFBcUJBLFdBQVdmLEVBQUcsRUFBNUM7QUFDRDs7QUFFRDs7O0FBR0EsU0FBT3dCLHFCQUFQLENBQTZCVCxVQUE3QixFQUF5QztBQUN2QyxXQUFTLGNBQWFBLFdBQVdVLFVBQVcsRUFBNUM7QUFDRDs7QUFFRDs7O0FBR0EsU0FBT0Msc0JBQVAsQ0FBOEJYLFVBQTlCLEVBQTBDRCxHQUExQyxFQUErQztBQUM3QyxVQUFNYSxTQUFTLElBQUlDLE9BQU9DLElBQVAsQ0FBWUMsTUFBaEIsQ0FBdUI7QUFDcENDLGdCQUFVaEIsV0FBV2lCLE1BRGU7QUFFcENDLGFBQU9sQixXQUFXbUIsSUFGa0I7QUFHcENDLFdBQUtsRCxTQUFTc0MsZ0JBQVQsQ0FBMEJSLFVBQTFCLENBSCtCO0FBSXBDRCxXQUFLQSxHQUorQjtBQUtwQ3NCLGlCQUFXUixPQUFPQyxJQUFQLENBQVlRLFNBQVosQ0FBc0JDLElBTEcsRUFBdkIsQ0FBZjtBQU9BLFdBQU9YLE1BQVA7QUFDRDtBQTlIWSIsImZpbGUiOiJkYmhlbHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIERCSGVscGVyIHtcclxuXHJcbiAgc3RhdGljIGdldCBEQVRBQkFTRV9VUkwoKSB7XHJcbiAgICBjb25zdCBwYXRoID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09PSAnaGFsbHlhLmdpdGh1Yi5pbycgPyAnZGF0YS9yZXN0YXVyYW50cy5qc29uJyA6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvcmVzdGF1cmFudHMnO1xyXG4gICAgLy8gY29uc3QgcGF0aCA9ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvcmVzdGF1cmFudHMnO1xyXG4gICAgcmV0dXJuIHBhdGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBhbGwgcmVzdGF1cmFudHMuXHJcbiAgICovXHJcbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudHMoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goREJIZWxwZXIuREFUQUJBU0VfVVJMKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGBSZXF1ZXN0IGZhaWxlZC4gUmV0dXJuZWQgc3RhdHVzIG9mICR7ZXJyb3J9YCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggYSByZXN0YXVyYW50IGJ5IGl0cyBJRC5cclxuICAgKi9cclxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlJZChpZCkge1xyXG4gICAgLy8gZmV0Y2ggYWxsIHJlc3RhdXJhbnRzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAgcmV0dXJuIGZldGNoKERCSGVscGVyLkRBVEFCQVNFX1VSTClcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gZGF0YVtpZCAtIDFdO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihgUmVzdGF1cmFudCBkb2VzIG5vdCBleGlzdDogJHtlcnJvcn1gKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgdHlwZSB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cclxuICAgKi9cclxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lKGN1aXNpbmUpIHtcclxuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50cyAgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmdcclxuICAgIHJldHVybiBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKClcclxuICAgICAgLnRoZW4ocmVzdGF1cmFudHMgPT4gcmVzdGF1cmFudHMucmVzdGF1cmFudHMuZmlsdGVyKHIgPT4gci5jdWlzaW5lX3R5cGUgPT0gY3Vpc2luZSkpXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIG5laWdoYm9yaG9vZCB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cclxuICAgKi9cclxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlOZWlnaGJvcmhvb2QobmVpZ2hib3Job29kKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcclxuICAgIHJldHVybiBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKClcclxuICAgICAgLnRoZW4ocmVzdGF1cmFudHMgPT4gcmVzdGF1cmFudHMucmVzdGF1cmFudHMuZmlsdGVyKHIgPT4gci5uZWlnaGJvcmhvb2QgPT0gbmVpZ2hib3Job29kKSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgY3Vpc2luZSBhbmQgYSBuZWlnaGJvcmhvb2Qgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXHJcbiAgICovXHJcbiAgc3RhdGljIGZldGNoUmVzdGF1cmFudEJ5Q3Vpc2luZUFuZE5laWdoYm9yaG9vZChjdWlzaW5lLCBuZWlnaGJvcmhvb2QpIHtcclxuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xyXG4gICAgcmV0dXJuIERCSGVscGVyLmZldGNoUmVzdGF1cmFudHMoKVxyXG4gICAgICAudGhlbihyZXN0YXVyYW50cyA9PiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSByZXN0YXVyYW50cy5yZXN0YXVyYW50cztcclxuICAgICAgICBpZiAoY3Vpc2luZSAhPT0gJ2FsbCcpIHtcclxuICAgICAgICAgIHJlc3VsdHMgPSByZXN0YXVyYW50cy5yZXN0YXVyYW50cy5maWx0ZXIociA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5laWdoYm9yaG9vZCAhPT0gJ2FsbCcpIHtcclxuICAgICAgICAgIHJlc3VsdHMgPSByZXN0YXVyYW50cy5yZXN0YXVyYW50cy5maWx0ZXIociA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIGFsbCBuZWlnaGJvcmhvb2RzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaE5laWdoYm9yaG9vZHMoKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcclxuICAgIHJldHVybiBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKClcclxuICAgICAgLnRoZW4ocmVzdGF1cmFudHMgPT4ge1xyXG4gICAgICAgIC8vIEdldCBhbGwgbmVpZ2hib3Job29kcyBmcm9tIGFsbCByZXN0YXVyYW50c1xyXG4gICAgICAgIGNvbnN0IG5laWdoYm9yaG9vZHMgPSByZXN0YXVyYW50cy5yZXN0YXVyYW50cy5tYXAocmVzdGF1cmFudCA9PiByZXN0YXVyYW50Lm5laWdoYm9yaG9vZCk7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBuZWlnaGJvcmhvb2RzXHJcbiAgICAgICAgY29uc3QgdW5pcXVlTmVpZ2hib3Job29kcyA9IG5laWdoYm9yaG9vZHMuZmlsdGVyKCh2LCBpKSA9PiBuZWlnaGJvcmhvb2RzLmluZGV4T2YodikgPT0gaSk7XHJcbiAgICAgICAgcmV0dXJuIHVuaXF1ZU5laWdoYm9yaG9vZHM7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBhbGwgY3Vpc2luZXMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXHJcbiAgICovXHJcbiAgc3RhdGljIGZldGNoQ3Vpc2luZXMoKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcclxuICAgIHJldHVybiBEQkhlbHBlci5mZXRjaFJlc3RhdXJhbnRzKClcclxuICAgICAgLnRoZW4ocmVzdGF1cmFudHMgPT4ge1xyXG4gICAgICAgIC8vIEdldCBhbGwgY3Vpc2luZXMgZnJvbSBhbGwgcmVzdGF1cmFudHNcclxuICAgICAgICBjb25zdCBjdWlzaW5lcyA9IHJlc3RhdXJhbnRzLnJlc3RhdXJhbnRzLm1hcChyZXN0YXVyYW50ID0+IHJlc3RhdXJhbnQuY3Vpc2luZV90eXBlKTtcclxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIGN1aXNpbmVzXHJcbiAgICAgICAgY29uc3QgdW5pcXVlQ3Vpc2luZXMgPSBjdWlzaW5lcy5maWx0ZXIoKHYsIGkpID0+IGN1aXNpbmVzLmluZGV4T2YodikgPT0gaSk7XHJcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUN1aXNpbmVzO1xyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0YXVyYW50IHBhZ2UgVVJMLlxyXG4gICAqL1xyXG4gIHN0YXRpYyB1cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcclxuICAgIHJldHVybiAoYHJlc3RhdXJhbnQuaHRtbD9pZD0ke3Jlc3RhdXJhbnQuaWR9YCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0YXVyYW50IGltYWdlIFVSTC5cclxuICAgKi9cclxuICBzdGF0aWMgaW1hZ2VVcmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpIHtcclxuICAgIHJldHVybiAoYGFzc2V0cy9pbWcvJHtyZXN0YXVyYW50LnBob3RvZ3JhcGh9YCk7XHJcbiAgfVxyXG5cclxuICAvKipxXHJcbiAgICogTWFwIG1hcmtlciBmb3IgYSByZXN0YXVyYW50LlxyXG4gICAqL1xyXG4gIHN0YXRpYyBtYXBNYXJrZXJGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQsIG1hcCkge1xyXG4gICAgY29uc3QgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgIHBvc2l0aW9uOiByZXN0YXVyYW50LmxhdGxuZyxcclxuICAgICAgdGl0bGU6IHJlc3RhdXJhbnQubmFtZSxcclxuICAgICAgdXJsOiBEQkhlbHBlci51cmxGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQpLFxyXG4gICAgICBtYXA6IG1hcCxcclxuICAgICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gbWFya2VyO1xyXG4gIH1cclxufSJdfQ==
