class DBHelper {

  static get DATABASE_URL() {
    // const path = window.location.hostname === 'hallya.github.io' ? 'data/restaurants.json' : 'http://localhost:1337/restaurants';
    const path = 'data/restaurants.json';
    return path;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants() {
    return fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
      .catch(error => console.error(`Request failed. Returned status of ${error}`));
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id) {
    // fetch all restaurants with proper error handling.
    return fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
      .then(data => data.restaurants[id - 1])
      .catch(error => console.error(`Restaurant does not exist: ${error}`));
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine) {
    // Fetch all restaurants  with proper error handling
    return DBHelper.fetchRestaurants()
      .then(restaurants => restaurants.restaurants.filter(r => r.cuisine_type == cuisine))
      .catch(error => console.error(error));
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood) {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
      .then(restaurants => restaurants.restaurants.filter(r => r.neighborhood == neighborhood))
      .catch(error => console.error(error));
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
      .then(restaurants => {
        let results = restaurants.restaurants;
        if (cuisine !== 'all') {
          results = restaurants.restaurants.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood !== 'all') {
          results = restaurants.restaurants.filter(r => r.neighborhood == neighborhood);
        }
        return results;
      })
      .catch(error => console.error(error));
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods() {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
      .then(restaurants => {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.restaurants.map(restaurant => restaurant.neighborhood);
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
        return uniqueNeighborhoods;
      })
      .catch(error => console.error(error));
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines() {
    // Fetch all restaurants
    return DBHelper.fetchRestaurants()
      .then(restaurants => {
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
    return (`restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`assets/img/jpg/${restaurant.photograph}`);
  }
  
  static imageWebpUrlForRestaurant(restaurant) {
    return (`assets/img/webp/${restaurant.photograph}`);
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
      animation: google.maps.Animation.DROP
    });
    return marker;
  }

  static switchLoaderToMap() {
    if (document.getElementById('map').classList.contains('hidden')) {
      document.getElementById('map').classList.remove('hidden');
      document.getElementById('map-loader').classList.add('hidden');
    }
    return;
  }

  static sendMessage(message) {
    return new Promise(function (resolve, reject) {
      var messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function (event) {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      navigator.serviceWorker.controller.postMessage(message,
        [messageChannel.port2]);
    });
  }
}