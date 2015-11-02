// log in a user
Firebase.prototype.onAuth = (callback) => {
  callback({
    uid: '1234',
    google: {
      cachedUserProfile: {
        name: 'User Name'
      }
    }
  });
};

// make _valueChanged available to simulate firebase changes
Firebase.prototype.old_on = Firebase.prototype.on;
Firebase.prototype.on = function(eventType, callback) {
  this._valueChanged = callback;
  this.old_on(eventType, callback);
}