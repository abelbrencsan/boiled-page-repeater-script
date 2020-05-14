# Boiled Page repeater script

A simple JavaScript module for Boiled Page frontend framework to create repeatable items.

## Install

Place `repeater.js` to `/assets/js` directory and add its path to `scripts` variable in `gulpfile.js` to be combined with other scripts.

## Usage

To create a new repeater instance, call `Repeater` constructor the following way:

```js
// Create new repeater instance
var repeater = new Repeater(options);

// Initialize repeater instance
repeater.init();
```

## Options

Available options for repeater constructor:

Option| Type | Default | Required | Description
------|------|---------|----------|------------
`wrapper` | Object | null | Yes | Repeater items are appended inside wrapper on trigger click.
`trigger` | Object | null | Yes | Trigger creates and appends a new repeater item to the end of wrapper.
`renderItem` | Function | null | Yes | Function to define the output of a repeater item.
`itemClasses` | Array | [] | No | Classes added to a repeater item.
`removeTriggerSelector` | String | null | No | Attach remove event to an element inside repeater item that matches given selector.
`initCallback` | Function | null | No | Callback function after repeater is initialized.
`addCallback` | Function | null | No | Callback function after a new repeater item is added.
`beforeRemoveCallback` | Function | null | No | Callback function before a repeater item is removed.
`removeCallback` | Function | null | No | Callback function after a repeater item is removed.
`destroyCallback` | Function | null | No | Callback function after repeater is destroyed.


### Arguments for user-defined functions

`renderItem(tokens, guid)` gets the following arguments:

Parameter | Description
----------|------------
`tokens` | Tokens those were passed to `add()` method. They can be used to customize the output of rendered item.
`guid` | Unique identifier of repeater item.


`addCallback(item, guid, index)` gets the following arguments:

Parameter | Description
----------|------------
`item` | Repeater item object.
`guid` | Unique identifier of repeater item.
`index` | Index of repeater item.

`beforeRemoveCallback(item, guid, index)` gets the following arguments:

Parameter | Description
----------|------------
`item` | Repeater item object.
`guid` | Unique identifier of repeater item.
`index` | Index of repeater item.

`removeCallback(guid, index)` gets the following arguments:

Parameter | Description
----------|------------
`guid` | Unique identifier of repeater item.
`index` | Index of repeater item.

## Methods

### Initialize repeater

`init()` - Initialize repeater. It adds events related to handle repeaters.

### Add repeater item

`add(tokens)` - Add new repeater item.

Parameter | Type | Required | Description
----------|------|----------|------------
`tokens` | Mixed | Yes | Tokens are passed to `renderItem()` option. They are intended to customize the output of added item.

### Remove repeater item by index

`remove(index)` - Remove repeater item by given index.

Parameter | Type | Required | Description
----------|------|----------|------------
`index` | Number | Yes | Index of repeater item to be removed.

### Destroy repeater

`destroy()` - Destroy repeater. It removes all repeater items and related events.

### Check repeater is initialized

`getIsInitialized()` - Check repeater is initialized or not. It returns `true` when it is initialized, `false` if not.

### Get GUID

`getGuid()` - Get last created GUID of repeater.