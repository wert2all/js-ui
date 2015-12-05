define(function () {
	var _registry = {},
		UIContainer = {
			setObject: function (name, object) {
				_registry[name] = new UIObject(object);
			},
			getObject: function (name) {
				if (typeof _registry[name] == "undefined") {
					throw("UI object" + name + "not exist.");
				}
				return _registry[name];
			},
			getGetterName: function (key) {
				return _getterName(key);
			}
		},
		_getterName = function (key) {
			return "get" + key.charAt(0).toUpperCase() + key.slice(1);
		},
		UIObject = function (object) {
			var returnValue = {};
			object["UI"] = UIContainer;

			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					( function (name, value) {
						returnValue[_getterName(name)] = function () {
							return value;
						};
					}(key, object[key]));
				}
			}

			return returnValue;
		};

	return UIContainer;
});
