/**
 * Repeater - v1.1.1
 * Copyright 2021 Abel Brencsan
 * Released under the MIT License
 */

var Repeater = function(options) {

	'use strict';

	// Test required options
	if (typeof options.wrapper !== 'object') throw 'Repeater "wrapper" option must be an object';
	if (typeof options.trigger !== 'object') throw 'Repeater "trigger" option must be an object';
	if (typeof options.renderItem !== 'function') throw 'Repeater "renderItem" option must be a function';

	// Default repeater instance options
	var defaults = {
		wrapper: null,
		trigger: null,
		renderItem: null,
		itemClasses: [],
		removeTriggerSelector: null,
		initCallback: null,
		addCallback: null,
		beforeRemoveCallback: null,
		removeCallback: null,
		destroyCallback: null
	};

	// Extend repeater instance options with defaults
	for (var key in defaults) {
		this[key] = (options.hasOwnProperty(key)) ? options[key] : defaults[key];
	}

	// Repeater instance variables
	this.items = [];
	this.isInitialized = false;

};

Repeater.prototype = function () {

	'use strict';

	var repeater = {

		guid: 0,

		/**
		* Initialize repeater. It adds events related to handle repeaters. (public)
		*/
		init: function() {
			if (this.isInitialized) return;
			this.handleEvent = function(event) {
				repeater.handleEvents.call(this, event);
			};
			this.trigger.addEventListener('click', this);
			this.isInitialized = true;
			if (this.initCallback) this.initCallback.call(this);
		},

		/**
		* Add new repeater item. (public)
		* @param tokens mixed
		*/
		add: function(tokens) {
			var removeTrigger;
			var index;
			var guid = repeater.guid;
			var item = document.createElement('div');
			for (var i = 0; i < this.itemClasses.length; i++) {
				item.classList.add(this.itemClasses[i]);
			}
			item.innerHTML = this.renderItem.call(this, tokens, guid);
			this.wrapper.appendChild(item);
			removeTrigger = item.querySelector(this.removeTriggerSelector);
			if (removeTrigger) {
				removeTrigger.addEventListener('click', this);
			}
			this.items.push({
				wrapper: item,
				removeTrigger: removeTrigger,
				guid: guid
			});
			index = this.items.length - 1;
			if (this.addCallback) this.addCallback.call(this, this.items[index], guid, index);
			repeater.guid = guid + 1;
			return guid;
		},

		/**
		* Remove repeater item by given index. (public)
		* @param index number
		*/
		remove: function(index) {
			if (index >= this.items.length) return;
			var guid = this.items[index].guid;
			if (this.beforeRemoveCallback) this.beforeRemoveCallback.call(this, this.items[index], guid, index);
			this.items[index].wrapper.parentNode.removeChild(this.items[index].wrapper);
			this.items.splice(index, 1);
			if (this.removeCallback) this.removeCallback.call(this, guid, index);
			return guid;
		},

		/**
		* Handle events. (private)
		* On repeater trigger click: Add new repeater item.
		* On repeater item remove trigger click: Remove repeater item.
		* @param event object
		*/
		handleEvents: function(event) {
			if (event.type == 'click') {
				if (event.target == this.trigger) {
					repeater.add.call(this, null);
				}
				else {
					for (var i = 0; i < this.items.length; i++) {
						if (event.target == this.items[i].removeTrigger) {
							repeater.remove.call(this, i);
						}
					}
				}
			}
		},

		/**
		* Destroy repeater. It removes all repeater items and related events. (public)
		*/
		destroy: function() {
			if (!this.isInitialized) return;
			this.trigger.removeEventListener('click', this);
			while (this.items.length) {
				repeater.remove.call(this, 0);
			}
			this.isInitialized = false;
			if (this.destroyCallback) this.destroyCallback.call(this);
		},

		/**
		 * Get value of repeater "guid". (public)
		 */
		getGuid: function() {
			return repeater.guid;
		}
	};

	return {
		init: repeater.init,
		add: repeater.add,
		remove: repeater.remove,
		destroy: repeater.destroy,
		getGuid: repeater.getGuid
	};

}();
