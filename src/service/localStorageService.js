const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _getUsername() {
    return JSON.parse(localStorage.getItem('users'));
  }

  function _getPermission() {
    return JSON.parse(localStorage.getItem('permission'));
  }


  return {
    getService: _getService,
    getUsernames: _getUsername,
    _getPermission: _getPermission,
  };
})();
export default LocalStorageService;
