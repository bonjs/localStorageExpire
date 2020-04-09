

Storage.prototype.setItem = function() {
	
	var originFn = Storage.prototype.setItem;

	return function(key, value, expire) {
		var data = {
			value: value,
			expire: new Date().getTime() + expire
		}
		originFn.call(this, key, JSON.stringify(data));
	};
}()


Storage.prototype.getItem = function() {
	
	var originFn = Storage.prototype.getItem;
	return function(key) {

		var originVal = originFn.call(this, key);
		if(originVal == null) {
			return null;
		}
		var data = JSON.parse(originFn.call(this, key));
		if(data.expire < new Date().getTime()) {
			this.removeItem(key);
			return null;
		} else {
			return data.value;
		}

	}
}();