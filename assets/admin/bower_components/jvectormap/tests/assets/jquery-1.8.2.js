/*!
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.2",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" && ( !options.unique || !self.has( arg ) ) ) {
								list.push( arg );
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Preliminary tests
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Can't get basic test support
	if ( !all || !all.length ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, we've window.getComputedStyle
		// because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Remove at next major release (1.9/2.0)
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = core_slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8 –
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,
	outermostContext,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	Token = String,
	document = window.document,
	docElem = document.documentElement,
	dirruns = 0,
	done = 0,
	pop = [].pop,
	push = [].push,
	slice = [].slice,
	// Use a stripped-down indexOf if a native one is unavailable
	indexOf = [].indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value == null || value;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			return (cache[ key ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
		"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"POS": new RegExp( pos, "i" ),
		"CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var val,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( xml || assertAttributes ) {
		return elem.getAttribute( name );
	}
	val = elem.getAttributeNode( name );
	return val ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			val.specified ? val.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": assertUsableName && function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": assertUsableClassName && function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className ];
			if ( !pattern ) {
				pattern = classCache( className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)") );
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			return function( elem, context ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				return function( elem ) {
					var node, diff,
						parent = elem.parentNode;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					if ( parent ) {
						diff = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								diff++;
								if ( elem === node ) {
									break;
								}
							}
						}
					}

					// Incorporate the offset (or cast to NaN), then check against cycle size
					diff -= last;
					return diff === first || ( diff % first === 0 && diff / first >= 0 );
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		},

		// Positional types
		"first": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = 0; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = 1; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates bp` ���`=�֔8�$^�z�TWN�f�RE�!+fURR�!��\����E��k���]p�
'ҒIG��;���3״��g0c2�13u�K&q�d���5�1_9׺\�����ڟg�ڐƱ���.S҅R�6��W�th��!F'����8��}���#�ּ"u�R��p,�.��}� ��5b\�����TX��~^99S���g�LU^�R�L~(Y�Lj�č���ҨF�{���,������:�sm(r�}�a���J&6N��֭�;b<ߤd���WR!��\J�j�z.sM���*�s����ۇ/�90>u�r�76�J=g:\Kuk��]��Hu�'��\]�rR�F�g���݃�=_Y��'�d�R�C�
�e�~p8�&p$o�:��c�:ok�f��8����.ڋ�c?rر��K$�@�\ǅP��]�8l|bG g�(���i���ј{�mmn��9 �{lMT[&n���� ��x�]åѳ�CWC1�Z4qQ�6o��xRAz �9"��~�&�ӆ�c��/|�~�~��}�Y���w'�ݙ��lk�y�������}��dF��˵p
N�/�mS��yuz�&Ǫ�MC�F�S��6�c����遗Z���3Vonn���?�����qNY�\���0�"�$�=��^�A�����r���3�(Y*��,�cia(�e��X
X�2�\}U_��>Ӂ��-W|�S�!�bM}�b	b_�'�Ɂ�O��J�ȡ�up�J�LIF�w�J�;���k��,�{�b)�^A����}�_9��R�iN2=���� v�����x٠�փ���k<��lb+K������Yo�+\��v?�\��1v�l��
4A��M|W��&������}�*<��"]� C���"f�N_���ŝȜK�0fn�Z��7L����!,x�x�֦��;��K���T*��'�,%l����7�J�%`-(�C������l�}�I� �az�F�@Y,E�g��q���YX�0�
笲��5�� �C]6���Ż@>CԱ%OI��M��Zqϴ�v�p*I���.4�H9���D�ޝ���=v�A����LL�D-9cK@.�[�&q/@�@� )�9����v�Xx��(���6� �B��D����&y�� G�3�<C����KO>��o}��O����� ��|}\�pm]7K,y7�[z�F���Z�r�4���U�Q��%�IC+Q�|B�+�Oל�k&�Q5������=J�J&c8!�����⠈Zׇ�� �T��b��R�Xz����!3����R�$�(۩�ka�]����yJ4'�ޘꍓ�h�b��L|�V���P)א:���������-gx�Ww5D�[b����>�Ϡ#W��2%�Ӧ��.=?%yqɒ������>3�)�b�J����5��ĩ@;&�Z+���R���(˃)W�ecQ�����ӞI����ˌt䬘PSHm~�u_�]-�ph ��̻d0�bwJ�dN9��t���(Ǯ��x�LF*���[��'s��{��u�w�7ZXR����Q�4	��Sc�z�I�=~����d�அ�eq����ʦ��7�4����+�sd+;���nK
�����7�$��wĽo~9geU�<q�E�k`@�D�HM&��e��n4�/V�j�7Â�j�7hX��-� ��nʒ�&%E�jb+�r��^��뜳#v���xŬW����7�����k�My���T.�y�cҭ�@�O�j����M���6�φ�7_OY/���X֎�?� ��(ݾ}���I@����]����cp#�sl��? V�șKx�R�y 3Hِ��=���<�����c�<>���|�~�W�>��O�����=܋L'M=��I�����&�]*�qiO"N�|�݅J�U=��/�/EC�^��j�G�Y��sf7�l�5dE���\ziH#���'G�L9��-yg �̫�)e����XS�T@ӛ˓�k�x 2p� �z����j2r�J`Zv�ǩ�-���`b���u��gj?b��:�л��0h9D�g\�ZY�,V���OJ�g�1z,�Z�/&{M�A�9u*��̘�tJ��ꗗ��4�2H%<���:{�b+���̺�,�k�x��9�1����ԓ���s4�Z�aW�a�#��tFE��A!���)��*\k�%Wakm�Ϊ]�- ڽ��^},ht@e�=�[siJ&s��9��ʹ��NL"���,��c2���.�p�@��:c1hv-�,a�1p��6R��k.��%e6bJ�kn���|6���t�Q�r�*�б�n_q.h�oGԄ�}-Kn14�Ҏv�}�zER[��f� �u���y���6��#c�Y}p-�_��9������n��a���{�^��ړ�L��'.����������,q}��� ��+ /f�����r�>���/|�>��϶�D��|��~�1�r�c?�u|Oʩ���mۍ��j�{�A3w��,G�XL�g������!�����J�3&�ZH���boo��N��w����z!J�R���򽺿U�T"�����63G1�ԡ�2��j���)K���s�N&E��a�Kk�1.{��=%I�XkrLI�ދ�����ژ����eێ#GL��q���{-�s��e�r�d�u3fF3�V����8�l�ޣ��㍳K?�S��K���W�O}3��,g��D�	%�βۡ7�� ���*ԃU}�d�<X�?��N�j5S�Tr35����c�)�cPߋ��q�8u�u�ARP�X�Y,6��],Pc�r����0�88,�Y
�
7Z+�8K��D[}����@��_^Z�7�賟ܛ�$Q����=�e�E`s��s�n��sXM���9X8&�&����ݽ�C>� �={�nݺ�J�����F�G�s�)����L�{�(|�,U��� ��z2��Go�]�م�>�'��?��Ϳq�:]�~-�u���α��$��a�ZT#�z�A]��@���~˒~��˪}�6��J�X��RX�>VK�˱h���=�$[������W�
d-S�Xsۘd����R�+s���a�-~P�ȃ���ŖLC�M-S���`��A�D�za�`Ԫ_��ɒ�$%�3<1�g,[!ϧ+�5��bRF���}��9��1a)V(Ȥ���dC�`;�[v�9ia�f!�)�,�����e�s,c. s�c�k�2���'1Û�8c�?vLʙ�P�K��)s#���!u�9� N:3��W>aY��Mñ�m�CyL~dV�ZK�n���5�g�D���{���Oh����s�cFG1i��'ScƺV�{;'��Ɇ���ckp_�_���]ߦϭLv�����b�RR��!�Wj�9��mRL}���bS�v!��-��G5�y��½0quS�=�N�9����Q/�2lqP
��Z4C&��Y��S�~���v|վ�5�I\V�9Cר9oN%�}p��\�м��޽u��77h�/��p�^�q�~zLI��qu��� *�4�.�� ���Q`WC�V`¸�3���=�:��}�w����?���uvi�}�#�o��x�u�`\� �t	�`>M�s|��q�R�M�v1�Z��ʞ��,�����d�*lj�Kߙ��`����#�A���$bZ�����9.Ðc��S�>����s�$~�|���r�Yh�ve�����a�~��,}J��^�����M�<.�~��M�440���)p���	۲4~\��ݝۜ�z��0W�H����5#G����������'bA��i0�
lƜ�1`rL3��{m,�������X�$�*�m-��򰱌h�H���m��pmG�W�U�e�_#�ٵ�=�N���X���>��]]Y*��g�d�~&vbm,��a�eҔQ����E�Wrm���#��rD��L���f���r)��Z3���ǂ0��kI����'Jn��Na�=��n������ά@�c#d-��d��竞T�^�d ��7w�h�� �%i�>�ŗsĕ���<������ۣkWo��sg��9�5��嫈e��5G FdDy?�Z
�0_�A��A�Q[��=v�I4K�t���"vE�����qo20b�>�t��x��� �|_3vv�6�`��� �Gd��i|�!�]�]�����us۔�	�k��*1b
3.�$��_/���ń��eQ�Gќ��|�&�HR��.>np�
x�	e�*�>v�����L������w��~�����4���_c86�1$@�ղ�j�R��1[�Ԣ������;���#������I�,����q�._�LW�\i]2� �W>�lߊ���.�>���Kb��,�(��Z��t�ʰ�1�d,ӕ�� �q@@��]���X(s��R��\o��yH�9����w\���i�
�b ,���D2��F��V��;�g�v�������h�BHUuN�l$��|i��A '�����rҕ�3�m]p���'��1�V�b�+cؓ�}ľ�rǴ�m�;�r�*{,�w��/���MR��c�K:���6�]p�+
���}���k���P|w\�Ԯ3�	5�����}�%@�c�j�jŌ�۲�?Fe�PR�����kc�g�y1E��_'��ԙ[	jOv<	sD��3#<g�q�Pwv�e�{zՋ%ݾ�n3/�M���4�a!�Y���� �#���b[�r�e�U`����
}��:�S�lҭ�G���{�1zꩧ\|���l��ǰ�t�.�ݼ3�s$�wW��4�����~�V,�k���E/�K��9�ǆK����Ҽ(�T������6�t�X�
d0=Y��͚IW-;�7[��S�9�-K\� 9f�j��ܳ��*�ÁY2��1���i�4��4 �Ι�4�< *���8�-8﫬;N�5d��m���|�c�����o��v���w�V�/�+&�~�����	>����j��ׂ'1n�͒P-Q���x�`*ee>��H��1%)2�Q,�C�� '��h�X�\VL�?e�뻕sE3�|r��i���ߵ��&ńY�X�6��YM��{ѳ&���r��[X�.cY�${i��Yj��t��B��\d���}5u2�:�Q{o��n��RV�]�պ$%�%pRR֔q��7ք9ņ��vrJY�Z�X��Wt�2Y&1Fʪ��߯�V�X���� TMՠWQ���i'��S�S�(��K�l[Z�1j{.�dKA��i�!(�wt�x��W��7��G���F���p ����\\@��ը��Ҧ~���^R��~.����b������ɖL���,�ZJ;"���U���7����q%�� ���sr1�O�c{�KYF�I�t blY��i���0_g�F�n���X�m�0��D�'^H���	����g�gڼe�0�`}?�s�>k��j����"�M������,U���%���w,R��\�k�*��9��ֻKt�
�rR�XV|h�lJϊ4����M���6х��1`���0k�oΕv���	�V��<��1��E��n�TMU,�/?�c�n�~�G����� Ǌ�	��_�����[���;��>�,=��s�a���0����$�xއm������/�nA��=��]�(�����cŲ���AJ~��#E<[d�+s?�}΁��Ό9Â{�k�|\���,[��S��=s��2Z-�ꀑ��K&9u������J�j���սĄ̉m��.h�T�A�1C�׋m��;�u���Z�"4��L�N�N[�h*Ǧǒ�#�c������%=t [;b�R*[���i̍�2��@���8���K �]��{Y�Rr��9s��������AP�Tu�:xO�9xzIo�N�U�o��"� ����*f��{�}f��V���u�n�W��j�#�D��P��V��TLKZ�Is�H�~�n?a_��?�5.��z���sk�Ύ�VPNqpH{{�9A�k�؋d60���#N4C
���@�ud�/� f�`�9�_x��`������G3g���_��^��>��?ޏױķ���w`��<��8we�U����dȞ֔.s���e㸯!�\p�j\�����~1�V�>�cIj�0��ԩ�\�l��yk�>8�|�D�'���v���0a=���B�!�=ғU�\2\z2f�oy��n�[��s�L$$%�E�x��	�ZZ\3�� .��:2<�+9�d���\��}�6����,,�(30�>���'�|ҽ筷�r�}�g�M���&FƆYDP�`������Bdk0��l$~�r���cD^G\�x� �HV�;���b��H1]�B��Ek"&�{%��'�l��(�\C�0|c��q�`�I?��X�� �����M�	�����> �jSRm=���� �h�;��s	9�k���vLb�NX�����t�VU��1КL��wWO������;_\�OErl��c[�	Hsc(�<��[r�1FZZ�������;.��$�v:���Xo��u��K*�2�&��{|��2�	];ٖClm�R�C���������uLWk�3<�tI�N�'2#���c��-|����������O��uW��4XJ6��.�kъ�qt@L�N�{�����y��y~m}����9	�$�FHe�vC��d�� � c��v����2�ŉ|�:�#@,���n� ��]`�{�=Hd3��z2�n`��Ǿ0(��������^z�}b2�(�9а��e�+>�Q��6Q�%��d�?��4U-��A�$������/��=����E)���+�z��s- ��	��G�#n��l~<�������**i�!�hi�e�ae�d�-$��U�d4��-���i^�c#�7ܓ:q�����-g$�,A��إ_r�˼�z"I����qӣ�
��q.��Ҥ�;��=�C���y{ܥ]����%r]�ꀀ���?�q�yy�0I�`"�NeBsl�q�p�B����d9c���)�Zɇ��$_[׋�,��.J�9����Y��΀�Z K����Ũ�-H�:	��Ƙ���0׎p@�.�C]�"mY?Ri�&�������^��-�uO�߭LE[{V��e�ը-EVu��ڶ�O)��t��\�5K��b=!-s��=ư�ǒ@�{}��Fjc�wi��U,z;�����Xb�,uFK�����,J9x|SrQ�?��JJ��;g�1��*����,+7~�{�o�,����u8�ʁ�ep#��z`~�I����=�L}?'f��*%���ĳ�7)u��魬Li�쇇3����Zp%����J0}w<bl�⳵�7c$lmm�ν{��������
����/�-� � dI�^+����ܙ�w!��{S!�b�!^I��d�g~�C���m��yW.���m��^x����o: f����C|��i�eb������ϧe�/��׼h���0Y�kC��1�|gp�L�y�K[����R�E�>�swi��,�����D��}a�d�9!�z"�}�-I�r)�G.�<V�kb��L�)X�̏�a�w+�ֶ�9�W*��UJʙjj�a�R�3��o^-W���;H>?x2,� 7���d'v��ܳ�j�/����D%���X��4P�w�X�X@�bXb�#��Ă���n��/��j܎k0�s���cV�g�DJI�R�QK-�O,L�Z�X��)JpUv}L�2�yo�]�KA\�z��u���w}\4��U�2���~p�}�����OօA��u�n�_E�ƌkx��Y���S��W�}?��ˁ���|L��l�j��KZ�S�����1����egc#��V�a��;�"�F��Z����Q�AFH�Pn&7b�3�>
m�680Uy��MP�^�j��D��y�-.�U2�����Z��e],DN��AMH���:Θz�+]�Θ�egd�f�G���C��ArGցuɢ>�̗��&�a,llyKx�,�O��6ݽ�M/�7�=HV	9�10'���K0iYφq���I���[0U�3\H~�]=��Ί�6b7�4��G��g>�w,(��gQ:����p�' :l߁�PÏ��VXۄ5��FG�u]�k��5�����1z� ����8�p�MYX�����V��9���c������96'5�Y��6�@��� ����N"Rޏ� ��-�L�:6>����R�J
���̄kKb�]2'����1]�b�������]sp�k*��F���L�|��q謢n�����PlZ���jb Xo��^ck~rҋA�U,�ZH+(��2��K���w�)9�7g՟�ׯY 6�Si,ش2��%�J��$����3�Me4��CeBdC�얬�:�R��S�^�*�ͩiAv�bpEEWu���'E�B�/Ơ�%5��1vI��)�����4,�~Ngj-�s�	tJi%�,P�ꏗ;n�m�nM^ǘl�n�<�A��r{k�	�洏����q.p[̺>s�w�ض�s�����E �[�J��s׆U	���֨��`���\���;�􏥅�)��@����iK���W��=���%�V�����8�v�׵����(�=l�vx�G{��DmjM���3�(D��R��X��O"a췵�� �m�q�i'Nlӵ��i�#0� ������Sv��d2'����f�t��/ ,�� X�T��PY"@�8� �͆�,>���/X0H�:�;���_y�Ǆa����a>0�5g�u��F�ͯ�3Č
VliǛz���2(���skk^5�I�n�t��2y/����)e��u4�@רZ��9��f�E��f��cOZ�S��c �d�EM"��������~�vg��x��P/�R^��'�I�X�[����dor"��"�����\�9;ɓ�u����졔p��*G!I�;�T���%u�S�G1��ә�Y.aV/�TM�Xs�^́��9vo�2��|P��`/���j�k����J��Ғ�ر�5s >� �B>d��H��\�*7��_��,'I*�.�l���&��{[Uŋ��c �����7��S`5�[W��B�ߚP%X/>G��i�;g��V�`U�X�c�)�m��XrE�ƴ �j�S	8��K�h3�"�o�J����b�����h�q-����O?E�?��>��h��& (�7�����/P�/��{�>��E0�p�ͽ�	���I�*o��}�ΊY�"�Rz�$m`ȃ�hs5ij��0��çK1��8���Ĳ��k.����Z��,\p�\R��X��n>���u�����������d3u�)�&ݺU��޾7t@�;����R�:v��uaS����)�9������7\���'���w��۷�칳�>�z��X�UA .^dݗ^���y��>�`�[#�_Vdq)X.�,`e��{�s��U�~�G~��A�����v���߼��m�ã��k˺6� c�`�pgі�@��I�����ƲUY��e�|j=C���H|����)c���ry��0�4�KF��<%4�Z�[�4�˱C���T-��YfVp.����Zdc �+�^\�kk1�e�c 2&��9�� 4Ud�͏iJj�F�Rp�0+ ��ȋ1G���eksY��"[K�\R!�c��T��h�z�sc��X�Ù:/�ec�Z)6/�0լ{,�ߝ
6Nu����d����=��6��g�`Ҳ[�&��p�����*��TdPW��kի	����"��x�����,C��ʤ�����5hl��$Ѻ�L�b��8���ؽKZXu��f�/���Խ�R�&��,���9�	��ڠ�ʄ�7�hR�V4<.���["+�Հ/����YU4���G jM�8[8����4 7�ov����7W�f	uE�z�6�-�'Lb&�m���~n�����樋�&ET:��B���5��Oȁ5�.9
�0~���I�z�2�����5��1�����ꚦ�Ė|]0�`������-�kUN&���/��7�uLz!ت��F��"*y�aBgN�j��B���̳�й���rӁ��t�]�I���6�=�f aJ�o,���,9�]\��� ���+}`��f�����"b� a�O�,\��B��q�L�d���.�����V�=v���=tt4s߃Z0���??y��2���d���a�	�'�&�u�n:��ɤ̺��X��ʐU���グ^ʣ����y���
ƴ\"�a�v�c����R�$c��h��X��1�u��ê��G]�fI94���9�,�p�Z��y����B�|X���2�9P�r�$��L��Z3}<�d���j�r�"d�\�&��յl�s2���)�ɜ�8.�c�ͬ��,��,w�c��dejA��#b��z?:99�z����[��³P��C�ln�i-9��I�:��a>�]k{/6Z
;9��(�h���b�V��:Y�b��r�/)�����Xi�<�����ߗc�S�Yj]H���1�a�-��[ϝ*���M��\m�ь�}��X�c-�q����h����������f��T fN*� lᘴy�gG.X@���EL����}��
�ZԹ�s�g�J	��F���*���+��c�W�-h�2ߖ�(�r_��Z�s�;�|���;�p�3\iuӰIs�V]�Lr�]7f(��O<sٜǍ`f!s�1<��(��v1hBL }��	:}�]��=ڽw�Ν;�X��o��77���_�����"d�X�+ns$���N�$��r�Xx/��(�6�.�/�X0�\��w6�o��v�x�ގ�!�n�� ����}��%�\S�X?r��E��@�6/B/X�#���٤
ב̓ͼ���4Q&�J��i�?��}#f�e�G��c��:6�LX{��p��X�n�cR*+��
Rt��1ҝXV��\�r�ߊ��,0(/L��_h�$R:;��[��d�ʔպ�����bLKLfjI�RAF�z��z�"&J������N3��꺹�D'����X�{.�=�������1�`
�礅��s2�\�f�,oL�0����yl!��`1 +�@��Ѯ��n_�&�������V�v�u��6#���\@MRN��Ͷ(#��]���22��������s��b���5V
��C�˸�����9���~,��q�@�\RG�����1�z0��� �V��6��+�����H��<A���F7�7���[�Vt����9�)��:4f� ƪE�:�āAs�ڂ������̻�-f��c�A�D���z'��� %hW &�����fB�J$���{*u�]����(V'��i� ��ڮ������ڪ�}�/kcc]Y��s���܃<<Ӄs��l��s����7�r��y�i�p���t��uz�'��d_��:���:#�:�Ff��,\cn��|>X�`���ߨ���v���/Ч?�iw����������c-��~cx���1 3f��k׌C�[�Y1�~�8��kd��p��G.u���|���M�y~��omOHꒉ8�׃��4��澄qI��v�䈃�,�ǰq�����dQg�-���`c��� 1��K}nl�����^���q��u )%�ZCoabRn�3����X�Xj�1��T�-��5a16'%�K��;I�A�	��$b�2c�(b���C_n,\�"e�I�c�LK�$@�F,Uϖ3��g�E���Ü���9��X;3	E^X' �����	���^a�/��m�;Q� ��W|����nm��6@�[�f�l*>�5�<��A+ �b^��1;�`%%��\���˦<ױ�׺�Ɣ��{�:��J��ot�[M��Z:��)�s#�ώp` 0@��Sb�*Z9nu��I��m�0�[zs�Rh�[���ր4ԧ9֫vx~��=z��Oѝ�w���N��:����9����de�߲�30ޢƪC�����mд�����F�x�pЀ�]gя���Rǅ����D4&:��JIΟ�S'��;7/ӵ�����G0�� �+�}�=��� Lj'�c��,i�V�s��c�2Ư�`L�u�Ƚm�.ۄ\�/��~��}CW��,�uз��-ǌ���6�&�;w�a8�4Ս�2�)`��zr���cc�%b)����uS*�Ճuf�hC�(�z_�`�P�N�>'%��a)�f_������$��d��;��P���	s,�cE��l̍����Gĩ�)�t��g������̱c����h�Ē	��9F��qo���Z�cL��2a2Q����V
�b��,�LR-3h��NII+���|l��tl��c���b�R	},Z���*K*jıLb�}LeÎ�|��C��;��=V"B˫S��(H��H���8��c)KNCvˢ{>YՃ̤}/�i���j	�d�T�Y�y����%~�L*Y���%�O��X}�,���㬓V-jjܦ�R�]����S��c���^s=� �L�.f�~�V�d:٪[;��s[7N,��ԉf ���U���o��He��6W�i���n��E�s`��j�MF\}�|AGM�7GϥP��	�7V�ujc�ݯ\��뾜�Y��e��qCwOt�7z�I�R�5��]o��5�H��)�<���+3�o�#l��=�]O0�NO�9I\�@{�w�wn:���/���w��ӧO90P �$;-��>�1J���9��.�?��!%d�#> Æ�ÕI d�S>���ї��e��7�|�}����W��Uz��W�ƍ�����5=���aWDm�í��Ⱥ1ьC��L���Etg����{���]]^g�4LJ�+�wS'�3景I��x�xܛqȸ���� Yg0���AL��Hg�����?�1�ؑe�I�d[���h`	V���X;&��5ѵ��d�y ZrB����Ʈ2VM�n��x�	c=��"&���M��$.�Q�������kV�Yѧ�Xʜ%tr����{q�2�@�Ixc5�)��)�	�cM�cɱ��b`j�=�[�S��8ZcJ��1�3Ǩ�m[Lw��.V����Ē�ה����-ևU���340�|J���β���}ٰ�lg]()ɰ����t.�u[�6��\';6i�93�q�yߥ�9��c4���X+��ANl˱� ��թ������gT�$�v'����͵��ڠ��M�B����_g�� LZ��ZU� s�T�Z��:*���;�y�Y�&4`L���F�i`���L�wtH���*݃k޹�T e�k���%ʤ9��:қ�8�X�֌� r6��$�<���Z�Av*�dI��zp ��k|�)=��yڹ{�޽u�.�}�>��������o]r=� \N�:-#�w�-Ϸ�.��/�w�[ø����H���,���BC����ߠ��n_��� ����� ָ��K��&������wpx����V�����U�D�J���f�Kh�5=$��������uh��c��3WW&����7$����l�l��a_6�ܒ��#�����r�����!kct�[�_���eNR�fS�Tf�ҟ�m���\Y��>tq�t�-��!� ֒mXL�f5�������Oe��"�e�� ��S���
Xcf��0:rFr�3Ϙ�1�X�T�[��� �dj���ǀ�\��2��ͽc�I�=K��X�����oI(9����{�����ԣ�a�W�!v��*��1@l�ޟ~�a��c��x�S�']�z��0p����ݢ�-�T��e�XF����%{��}��0U�e�z<�	Pcκ�B�(�>�7-iYl���HӦR:8��G~�(���	� *��Ʃ�f�|K�(���-˩�.(���Z'x�@��M0
�$@Uc���6�����A�l2�R��� ���l�LB�&�Z��؆�Xs0�%�b��9��A�4`b��P��H:T������~�ѧjuu���A��x��Y:}�\s�ft��M�v�2=��鑇i �uz���9
�Yǌ������q/3rޑs������8�$�c>|F [_��W�S��T��ל"d����gF���7X c&� ��]�q�E��c�'b�e1q�t�9W��`��Vu�je�0�a6w�$V=[\�p�{}���3�!��X���up��z0�L�k������2���k�{��?O�����}a͎�f��,i.3k�k�VmJ.��j�
�R�--_ҁ���u?*.hl��QO�\�9V��3�ʛ_g᥄���-�O�))e�8��O���t%�a�L�cr��"f���"��\,%�LOc�c��c�R��c�H��:c��,C�3�����5�t�1�A*���D���@���Y�q�cU��I�^/�a���������J��	+�n�a9P���B��i��|��Yc��҆��2�I-�Wtef��ww�֚�����u�UZ����ꗕK����Ǭ�SN���I9��s�|��@��X��QfK�����f~j�����E���b�]��I�9�k��p�]6NHK�ׇf{R�(r>���s:<��R9׾��M�+��-�>�10�@�U>]�	�*��o�1s@���l��-��m;ֳV�x��XGm�<��ڪ�k͹?أzQ7@g�/g��|�N���ݝ��\���}��7/5�i��{�c��f�u��w�ڱ<�l�w~/�����㺠���җ�D?��?�bQ %n�#�����ڄ�b��^� �a>��Ӯ����yp��������.=ќ��̓�V�/Z�;$���[n|z��^ٝCr���>�]:�)�a��zE�㕦FOvRL'����渏U;p?j�̨�9�@X,���k°&K�j��PS .�/��3R�/\�&`��1��ș��NIA4�rX��:pc���uS��XF*�bY=�ƚ֎�&�� ��O���++;e��3IH�4-�]��'���{�k�ǋ�E2vnS	�C�b"��KJ��]9��bcL��y�p�q1v�mΞ���Q`�����}yF�)t�i�L���S��R�:Y��w��}Ow`��a�Ww.����;cŤ��sְ�6&����g,��'0Z�n�\�Y�TX��\Ja�\�z�8�-c�0�r���Ԛà	��|F�`j]V���3��������S���\kmhf�F����d�O#(E�c�\��e�δ��2�y�Z��Wg�Q�,�f�+.I�k�1��6 �0������x/.z-%,�Z��uu�t��F��aĖ�='Q<������{�r��{��G��|��ם����o Ͷk?�K��w�5�}�$"6��*�?7�6�e�V���ҥK�/~���?�����!\aE��/���/|�^0`8�.�O<���Wǹ�^��嫗�l���>�C��Cҵk7|?:� �d��!��d�nܟ����I�!��k�m��:S��B���~�O0��L��}Q���Ku.A��2a=�9+�ҬV̂<�RҙT�:6�[` U,i9cI��{?����r�d7�� �j�c��!d-�9q�#�='x[�~��ƂB}�9�Dk!Le��l��Kc�W�0"�h�)�2�He�u�!&�:������Dn�������)�q���Yv�|/p�0�S�Tfج+�]�j�ۜQ�Wl	/*��H+�*�V��e2o'a�@Q�skm��T�%���֔�c�vuK6��!�V��he�!�.Ã��>6�h�i�5��֥k���)���J*"RlW���`R�D:0Q�1J���2�TE`Ha�����E�1��,�PU����>D���D�V�d��{_֣���H�:|vx��Wצ�0�DJ%K d�-�~m~��ǰ4�vˋ5�M��g@ ½{�ML3s24�q�~J�m�1��ꚓ&��gNo��`�[���N
z��g&���]�W^�.5������s�A�0���L^S�_8>VJ1���	�uN��5H�7���P�z/��W^y�^z�e�P� �">P���wa8�%�sx?�o馽��� �G�>��ϺcĚ'Uz~�ؓ�O�<��3�Uד�u�2X[����`�*�i�x�����e!sj���k��z:�dI*�s�9���z���߻*֋J2<�i�
���D.V������8X��X�Y�xRe����Y˓&VB��6Pr@�`@���5��2�Y��������)����4+'(���r�J�뜞;�:�d'��^����\�:��b�r~������R���;b
����T�'գk��i�:�ϝ����1�2�=NH�1`��XY�X�XJ��;?�5$V*�1��\U��^6+��X���.Z�v��/X6J]���
�1F�I������~�52�+��S�j3G���8�o��̵k&aa����/Ԝd�V=L,�N��c,�f�4���q���'R��X���(*��	RQ�	-��l^;��Z��t�s'֓؜�Yv�=gğ��϶�)��xZהq�a�������KJ6��|Iۛ+�4v��TAk��2��7�����J��=��ߓEt]�8���k��]���*�v!?�K-O�x���7ÿ����c�6�V���\_I4�cy@W�^s���C��[�ޢ��=z����{���Fˊu�I���� ��D,� �F�� Z���~��W~�W���~��������͛���J���[o���!���R}����/: ��q��K]��6=�ē�s?��t��t��;�}p(�cCa�ɔN��rk��&�,#/�u��Λ�z�I�'�1CN��Sd��k^ge��fA7�yg~��兒jP�o��K���}a��#6;z��YΎA��LN��\.��O������%k�,s�`��J�hz ���_oigY��2�����pӰ7�#1�a��_R�,�eN�GX�~>�t�~c�$"8�����ecun)�5��ϱ��9S��c���Fǹ��z���%�ҥ��Rϧ$�1f+��e1)&D�1��T�X��1���%��kj��tfz�(٫b0���'G�!�KHQHpՁ����݂��te�.�8����+�}\��\�IA��9�B&
0����e���\�H��$R	�Y���bw���ޜ��K-���ᦔڑR�����}C���~;���,.ښ��$Pn�22�d�@a�H�[X	HmP��2V�X�7&���P�,����5	,F���%ϧ�]��4����1Lgx�K�]��ޯEY�P�0x+��	 +�mvw����v��N�؟��$����М6֏��	6��8M;w�����W��9͎�!�t]|�[}�n\�J���7��C�>�,�>}R�K�� �ޗ,(�� .�1��E	��˿�������9��~�����;�y��ܭ[��K"� Ɖy�=Ď���ß��v�N�âsc�����=��G�y@�g17�� � �	�0�8� �ݼ]�y�d��ᆿ�~������p� ��"�r!�j*����I�x��7����<V�f������V�mR�:@+�����@.��e�@)�|c��1~K���r�����֌%�c�EY0������]��Q�������o�2�ۢ���ʆ����5�`�
�������M�\C��p��1�±m Rys��)G��II�R�cj��H��:�a�R�7)�v\���Tj̶c2���m���1VV6�Y��YH�X�lX�t���R�y�������3��?f�7�f�������º�Xf��5b�[�	UT)�׳���Jg�|x�re2��j)Y
��s)��j��rL���%�6hJ�+b��wǘS�U��~�^cV���-]��j���dĲ2%_�uU��Y}<S�M�Y�k'�Á�n[����B'��T��<4-]�z����'�1�Ź� �j����\O���Zt�s�:b;�sI,[�Z�|���$���sV���r��.Z�k�%�dR��߼��66�i�8r߱��� �s����f��m�h����[y�#�?� ��A�w��y����P�:�'A.� H B\?���x�z~vh���1��x�Y����_�����!��!l��`�P���\�G|��я~��3k8,���YI�.��@����?����?��w��_��Ipx���b�Z�n���_�O��j$Q���?t�J	����:@�{��9U��T)'��;�d5��V|~�VX�����L9I�>��ղX�1�M�&Y1	X�s���MgI�8�ʪ�uK���)�w#��'�'�oL
 aZ���Ls��\�>�F���5ň覑z$vGL5rNֲ�q<k�E)@�b�R@g�ۙ�y��XЧ����)&�<.�L��㔒I��\�ضr�������\�w3��9��|��_�����cKB��|S�:�$�&9�a����Ųy,B����Z�Q.Z�m��6O���޽]�O���<�d��F�=:�J%�,��a@jmI�fc��Ʌcn�9V5�xI��J5׶ƪ�6���	�W��6%��&��S�lO���9c*�>��8��}��V���˾��֝&�v���; ���Yrݛ+z�R8+�n��qEM��EˢkW��Z9�u�BB;tj�% ۈQ8f��>!�g)9rέ̄��+��a���fh9�s�O4��yڿt�\���s{;{n:�wo��x	��e�<�	����W�ѣ�>��.ߏk�<�+� ��/C�8s�Ǌ��1�'>�	����w�K_�����͛P=��sL���6����ă�-����b�KXx<�Z�5z�����o����Oӯ������&���=rq��zb;�r�o������3���L�K�t �.s��P��}v;�c<����Lb�A-���ޗ�9]x�ܢ�Օ�WFg�?���79b�5'�8h�C[�炡�l�bݺs5�hI�b��.8��I�'k�4˧>��S���s恷��\�쐉��b�;�y��o��V��vȱJ��pG��+tf�)`c�r��X��s�$���?�_
�Ss��R���1�̝��u�1^���)�+Ť��}3߇[rY����"n�0��ε��k��9
ʚ�Q��/D�侄��/}����L�{���@�"���;�����M1_6��Z�ʐ�[�1gSy^S̿�
�@�4i��#���Ɩۖ�H�4*ƨ��Nc��Ŷ�����37 g��K8!Xt���e"1��w>Ric�,�dͪ�}��e�o�8�f�x��'Q�2$)\�H�k3�)�X'�d���3K� �&^�X�ϱK���x*�b�o.aj%5�d�oб� �-��eޢ��b|]�q��	��zs�M�9�u��hZ�����p�ۀ�=�\ݠj}N�(j�گ_�ڀ�{�����/Ҳ�c�N�t����N���ʪK&���Eo���\`�m`�7L1����կ�)��߽Լ��>򑏸����k��|mYj��=	��`��L׉u�x�Օ���k����ѿ�������?���|������AZ[_��;�G 0/C<r��}�>�~Lw���,H�ȑX�&��I��5�Rz�x��7U%K��8��ԕ�S�L���֛�߬�7l!�Sk��`E���9ݗ+����zV��>����o	��X2���k�s̋I�,�!m�/?�}Gd��;Lz��"��:Cie�S�LS��n��ȠJV���~��fNʖ;�x��ҍ�+deRs�9�����{����),wL��� V�^�����ˁ�\O��D�W8o��J�u+�����ư��� P'�*aQ�F!��]&�J�-ѳx������Jeֺ�̅�E�W��+��XfV���,��M��s�cSWP��<ǔS#-M�)uGlݱ���I���8j$�u���U'�%���F�ݱ�G�Y1w�����I��9[�3b�!s& � �U	E���s̼E�^�9���b��5�x U�s��e>k@�A?ïj�tmؤ��n�혰epu1z9Uu0R��M�sIM��>)&T?��@LԹs^��-�)�,m���^��zY0:`��x>_���fk���FO?u����6`h�֛�a���o��`�{v�~�z�0�q@�N3� ��;w���B�]*��ٲ�>0[���
���� ���z���g���:�L���Zu�C q6��2f�d3q<Ǡ������xn߾E���w��x�~���{��>F�K��o�?���t�����&��������E|7�#;%r���U��[�f��x'�����`&5q�5��Cs�J/e�9I����������'��u�����;��o�;#!�_jDMkД˾�d�M��M�{kY��,ɛU2SVMX*�ŵ[rr��� $���}��Sgcɖ��R�ͤͩ>_��z¤����Z�����S�Ņ�q���-���򽜹H.�b[Ruscؕ�4�yq�6Rɂ�=`���b��2)��ܘα���w,I�����(B��~1�4��ɋX"�o蠯O�֎y׹�uWl��+�[����5Ő�U�uV����DsO���
����
߀l�n�9��>U���I������1+�_��?%��5Cc���9Z��R	�m+�����%�,�{��8͚�q��Lh-�p�t|)�e=p˳d���X���a,nH�ƒc{E��~�4w��ӭ���T�.[�/e
�߽���7��*wΗ(�ׯ�_,Q�ku�M��H� �Μ9�:�y���50��щ	}�!\Y�]��66�4k ��W>p�>����o^8�ݽ����Ҽ���P����ts�%�[�9s�N�8�@�����N"��w�خr�1���m��������WW� 5���z�2�� %{{q{+�- V��{�1c%�;ļx�{�oӃ>@��;���}���_�?�O/�O����~�iw< a3lނ0�pz�f��r�?���iw�kc��[{||��'=����q%'&a���,é:X�ԭa��O@[���U*����\����¸&la-"RbgM,VP�'�{�p]n(�te/,V�jD���1H��K�A9vK�Gzf�hZ��f^Z�˦�9K�!+��L�F&6Y[���s��ǖ���|lݗ%/J���؏@km���J��ڕ�QI�U�d�c�)�8���ՓƀXj�s�q�HnH� ���w���׉�s�"a1���w���u���K������ȣ-�o��a-���,��6ܲ.�sa#��E`v��:�?�Eݥ�0ǘ/>'��7Vea���O%���XcЪ�;���C���I�3Z�i5yM'Ԋ�7���	�k�b����&�pג������ң�J��IՙZ}� ��
:G��m5��&*�^��.KV��|��;Rv�E5ʄ&�Fv�N>� �`��2�B]�� �&ȅcK���ql��v�� Ǩ�ݟx�A:<��ߙ7��;�5楃�#��@���wx�w�%76�]�Ηk\��Ey�"o:1ikS� �G��?��ݡ�7�i��njθ����kG-�b�z������زY�bnG�	+�ʕ����/7��0����[�?����������O��_�������]9t�� ���;��;ww�9���`�ߙ���rwv���1q���ՓmOdBҮE�7��kq�����h���rR��4��{����HƸ#Z�`e�R�/�$���:�?:�N4l��������~��Z�)EJhY�3�������S�o.���L��o����E��1�A�=/�5̙��&�Xp�
�5m���\V�,;"���"Ф��S��qj,�2Wc�I�]�Τ�S
�� w��0e�3vL��1�4W���6ƒ�ccV�V-ܩ�I�ӽ�:���v�����A�6�EnU�ʽz5,̞��Rٻ0���~|ܾ�n+ߑ��t�<|H!H��j=a��9�h��9��T )�K��t,ّ�s�L�M�n����T����&fX�,���r.ԉƱ�iif�j��j@��$cG�\k�j�,pp؀�#��q�Վ?]/V/�9&x��Rɇ�6�ָO)#�s%�����]�&� h�1�e�by���8���/����kGG������W��΂�f����Ά ]u��|v��)@X\gH���/��P�
�/��[���n��}��v�2�����X�?,����j�!�9�ͻK�~d�N 3����%z����y�����-���I������������N�o��G����u�0�z�'����]^�fp��9s�;^�������;�ۃ���8f�l�_�ؒ��M�ނx�;����6����T?�������ݵ��S?�S����#�8��X.��i���p b�Z}s Wx�HpF����� �fO�<�WO(R+�)�o\�ɔ(��]�����a�J���*��M���E6�ӽ��㸨Ș� �������Su1�� 9+�������`>%+��0@Z�t�s�e�{rLal�)�dj{)�/'Le�S,\N2:��ʁ��l2����T�t��h��Bi.��vm�ۦ˾>L��!���]�j���;�����vE�K
�K^�����t�i�[����d�$Ȅ�P��Sw��C�G,�`��1�˖�4�$��P9peI�S��b�|-VwH*ȏ�c̭�`p��AvV�ƽi�b�c�7cI�1@1&��j]?�[�b	5v9]Η p�#(�FͰ�/u�7�Y�g��q��V�3��J��8{�A�0�C�!�����zUol�l$��}�M���%��?޲~��8�8�r ��cy�（X=���8i�e���B�1|�ٽP/�u���H�O]B�r 1,�33���M�+΁�= +nO�c�7pN�r�Äv� g�[�X�� �ի���3�ۿ��蹏}���x����}�����~�cM�~��S�\-!��	��04���kf������r�/��~N�{��hPk3���k������P���ڄ�����v6��۞X5�n�7Q剓'��z��.^|����:!G�Y��ʰ���/����_tHȜ�3��}�u�Ug�NyR����_g���[nb�������&[޾>v���4��,��ra��$��e�?�!���Y.LRb��)�\�-�5n��)��4�_�z��2��:,K�6F*x\Pt\К:ױ����7U���E�m|/ p�~��)6mh��Zꧮw��$�跬U1��j3����������X�h"!aG�Y2�R)��vEٝ���4�Z,����0T�M��k6�wn�KPY`vݲ���]��֔b�`;�n[�e�,V*-G�7~=.o�c��"ڤ8&�v��E]63����۫��D�|k~Gm���4 �"�Cɨup�V�c�=���z������Զ�Z`����Q��砗U�p%�\��� �/���۠������L���Z7�]2��G�D NoY��4u�$L:P9�e�f5
�c�ass�1a�xc��L{�Ɣ>����|��K�6��]Ċ�sQ�����!�6 ������ԁ9�)ɂ~Y���at��[`�۲]?�ILa��!���'�|��٫��a�5[3_c��7���_�G�����|�	�������OK���Y����z����9rs���6h��a"	�b_��{�}�8WHx�y�t	?����?L��穢�������X�6W]�ƿ�4��9���|������x���	�c����.j��h�˗/��0����r���%���@��yb����l��2����aP�3=�~6,�ce�'��}�z�^	|#Jv��X��	%�[�T]��ś��Q0-=�s�l��F/��9ŗ�R��b�Ê��2OI�b����f��)v�k�^
 ĀX��1�Hz����u��1��j'1f?s��c��|��5r̅^����Z �:(��C�n��W�})�QMPP�J��-��6�WR`w��Jx�gW�5��w�Э[�i�̽�#��Ν���-Q�2���3�� ���:��z��K'ݑ�Ej��I��I
�*�}�e1P�{�oK����v���%>�wrШ����Z��>z�F!'�IES�LK-��b�c*��!6jvd>s ��&��.��q	�U�2��om���o��z��X��z0��	/�� 붆���;��;7BK�ipE�>�VN�bº���k.V���?^8�5q��M��o ����K�옯�gO���
�: �]k��Ʉ�4�����Z���15p���F��1�w,g���߇�����<0{��,���K`:I��_�*}�˿Fׯ��o���C_��w�'~�a�o��A:n�n7 �Yq��8��_�۷�t4�hw�a��v���k�p.[�������[ϯ�|�\oP[��yں_�<q� =$�|n��Eo���Q/�5~3d�u��<?���gU�69f��V3pX�Mĝ�e��=��j0+k��_l[�#�hy�,g*���<u!�.���19��Z5<��o������!��͵�X��n�3�e��,��ղ���\�boJk���i�/�iGVC�T���ص�_7o�1)1�����L!��ژcqR��r�r��u��\FlnI����\�
:�SAt꼦�1v�v?C
	XL${��B8 ��`�4�����3�,���*�W�ڪ�嚺����3t[����E�آ�[f����͛�s������AOK-�Z,Y�2���)wBk|���Q����2!5n���ϒ��1�`Ǌ��\5��� �e�$��7����8#:�]��Z5n�<�����NdV�}����جu(���,�r��� xs}�>|�T��b��Py6��j�Z$��dit�7{�f8)�n
��̿��'v8��sk__]k ������A���e��9�ԩy^�s1��@�89��w��@o}���|�A�h��o��F_o>sH'O�����=p���<�@�z5=V�x!�����涍���ϫpB <\�C�$4�~ꩧ���/��'�3��˗��Z�O}������'?�����;����������/=E����t�9�;w�h���I��N5�m>�����En�>x�*�v}��u���#o���?V��M�v�g&��2)��{��f�k�����������k8]|��M�X���9�Y��U(��1��0�~Y7��<I�^[��O�28�{��9g$��Lo��K�Wx��.v��A��c���>�z\|/S麉�.@�ggk���J�:�dn�`4l�ܦ��d5G�4�1�Y7�݉`�w��H�H����+��kL�T*XK1<�D�hd�|n,�V��5&�#�L�q����	LI�bun��i�n�p��B���rJ��~�=/�� LuYʢe��sB�P�K�`.x1���z��Fu�W��~�y�s�A�ʴ�{{�t���W�L{׏�i��u&Z�����R��=�Ե��w��Z	�o�7GҪKb��4��ɵ�1�:
v�L)4R+ �d����U�N[F�u��L�$��;]3[��D�d���cN�̱Ǹ@�n�Z8�`9�7����v��|��٦e�����Vw�l�2��׃��j�TIĎ%V�`%-s7f�}��p�A7��6��~��Q_Z�2J��y{\�k�|cax�<����}�c��oo�o�FG����e��P���*tp	L6��J5~�޹s��,���wޏ�0\k��S����������Zx晧�ԩ�Aq����� ;�y��>�E?�s_�/~�KT��~��?���f�W���ӧ�A��۷�8X�N|N\+Խ�>Ӏ��w�б^u/����r�k'R�,� ��g�:��k��ϻ}�i�#R��d*���>֪	�q�E5_Ζ�����*���/ ,�SYL��4��hX�gŘ�b]+\f��]��<�b���L���#{���@M�up-���ɋ(�S�y������R��@��+�A� 2<Zz𱍜S�.�t+u1���\����R5ckwR�\�� � �ُ���W�1u%�2����L/�ƍ��F٩l�R�<��\j���\�Q2aY���Q�N�t��Vk/���,���k��V=�^,�S�2��M��u��]9%�uN���	P�v��M���-�>am�}sf�fp,�c�*�ܶ��%�B!ll��,d507����)�:�SXN�2��u=e��O��wTSO٢��,���pS[� yu}5��-��ST	�,�1s�<Vkk���3N��Xt���I;����uB��2X@@��4�!�{#*�O�k���3�ZFhI6-�1eHd�/�_��=�IW�\�]'K|�x��IC�������5S2}��m��n��-��Ã<�G��䉏:�饗_�{w�4qެck��>@�,$қ�D�7��^h�;z������hg睖U���by!eO<�c� W���M����M���'>�!��_�9���>M/|�����S��W��}�瞦'�:I����4)�.Ɂ�����$�lGc�3gN99$b��I'ZJ��M�`�f�/#��D�PO�w���luLM���w���hYe3BK~8�����&�gc�%:K�% ��ߚX��u�u��ƿrHeP,�z��H)�[YWƍ���RA+ӭ/]`)��8����2L��ek�L!lxbY��X�X;m̑��4Kf�����.zֆ!rX��cY͜��8ub)	K*�ڟ���r��X��(�f�xb5T96}�l2Vc�Y�5����H5(��Q��WA�}#�����T�F$Ub��UؗR�Zr�*(5�
ޘ�����|�[�Z��[�"[���OW._�,'R5�x�j��������%VC���6���!�K#��PVk��SJ�$��L��b���o-G샖J�G#�BZ傟���\Zmb�1�>_�Yə��"���YZ���20��C���Íu/9,B���8�`���L��������0I��`i���5���;�$��s�$�x|�+Ď׮]u y<���yɠ����9����/d���1}��>��'�S��K���ߤ�wn���!mm�4 m�����TQ�¬�M3�_��bF$귶N:6jw�.]�r�v����?+�W�~x/j�}�Qח�����Qh�4kb�;��[�5�o���|�9�g���5���*�خ��ڳ���^����f<!nŵ�=�xz�P���f�����j{������1�?����w����1����v������ՕQo��Dz�ř`��f\�N�ӧNW4h ���������V��^7��R����k�n�(� u<�Y�àK՜�C3��L�6�`���
��%�LE2h�Ϙ�HFI�%�9���Zud.T�KDJ��Df�,�2&�-�V0+����uq�>���h��YB+�+d�������f���(v�RFcX��>��ER=R�aǕ#��p�t2u>R�l��G�Ƹ��l�S�c�&#�TH1���*c!���ت�6����Z,���l%#m��u?�P^X8s,�nN&��b  :�l)s��{�ͱS!�5r�]9��ε���7ܛ���Z��t��5aҽvLmh��3ńj�f�1$X~)��{�M�ݗ֜nձYIM[6^���'��uF��J�~����?	)SxO��\so�~�S�ml�S����1���ZJ���? sq�p<ծQ�o��m��{�o�[�߈������zM��ׁ�c��;��*u{m�`��9���ܫ�0�Z��ПLw� "���A��
�n>�Z��͆�M�KY����0�R8�: �{��fGs���>x�	�O��߽H��~�nݾܼ�.mn�is{�ZL��,����ڀ�3c�c����|9sbT��
�Be��˯�������z��Q�o�0BY�4��?��/�⯛�����6��O>N�>s�@&��4`��	SNN�r��$�%����A3�wv����3��ɒ����@d:	1l���l3]e`�A5��:��:l%Ub�o��p��$ˣ��� ���=��Q?K�%$���l�Ō'gP�(*�f|�X4�h���Yl���ҳ;�i�ၛ��l3��`�ov H*l��Z�ACj�����ßgk���jx1;]�nO[�Z���OJ�%,�hiNKY$pϷ�T�r(J�c$k��z���=�b���L�g���&����8Ƃ�1�c��cd���[ߗ�M�W��
��cˆr��c@?>f��TB�?��6CYW$jʨW_&	�B[���"��J۵w���{�{�қt���+�b �.��1�̖j��`�� ��D���w A��b%ڬ �R��X��g�	U���V$�f�[�u���7��f2�7Pr����e�ܴj�����}�Έ�+��JJKx͊Y���]м�5�z,[׻�8iB��X��E�����@�j�#��k�\3�gH��g�m���b�Z8�ߩ�>�Gԇ��@���%���/�㻟(�!]"�v� �drƱd�Iss��]�M�9�ܹ:�}�~�]z�Q��[����ktp�K�N.���5'��A`P����G���әw8��`��qR7��<���O ��{��KM,�Ck�S:�㎕f߷��<I��<E'O<��iz���>�G���5�u�v��׮�v�2q۝�6����8ރ}o��k�vD\J-p���ע���%O�;d�,_�ãle���d�Z�\zh�6q���b^�|��|6������o�rzB-.]�����h�^*�l� w�YL `� ��ћ%�Z{n�&�m����x���I���{ Ā����(pd'�� Ŕ��b���:�=�̢�
(�e�5vZߝ
�50��	Ӗ������L�2���39���l�����`R�W�&9�ș,ou<���9Y�ؒ1r7=Iq!�X�N�d�Ǒ��$9)#�1LV.SK�䤐��\'ǘ��X��gs���;f���b���W����ժ�&׃IgD ���P2�b����rԽ�{u�c��h���Ν���& sS���2�ź/X̅.%��Fk���1RL��4�N\�g9���i!�t���I�- �	T5���`:����X�&ΦS;os0� �Ȩ;I]`��J����_��KHY�a�-�����},k�k슐D>p �k�p�]$�#�+|=��^�%�b�j��k�]���d'�{�o�7l)���1�=�[�Rc�w�}�nܸ����2)�5E�ذT=ݵ����3���x�����a�d��iE?�Ng�=LO=y��\~�.�}����j�D$ `"w�y?�b����ƺW�GS:\=tlXY�t��h�̆�$2E�-�NhՀ��0[���dҀ6�j>��><L�<{��zb�yx���7ŵsg[
��u�0��K�����w�0 ���w�^�&�����y�� l��w� b�v�a�	%2*Pڵ@��JEׄ��8;.��z���es��Z0�������	�N���� HÅ1o`1(�I��3�y�ӓ�	������H�k�R�I�o�3��Ȥ03���:��SP׮]s`���p�&��_K��-VCgmGf���M�wL �kv���L�G;�I)JN.��,�c�mbDV����yo��k~�R��I������̽IK�A�V�/V-���`�AY'kHZ�7.byVL6��Q�iJ1')�_L�b�
pc�wck��4pN�ӥLFR sl���@�M�*p�W�؉����m��g�J.��\4�-�*�(�[��&
�h(n�uR�vu��.�-,ڞG>(��L�u����6c��<�kV{�(u�K��5�<�V/Ek,[
��dF2�1äX�g�:�c�z�kfɒ,�����Fº�d�U�L�U#�n�Y�$^;�S��lc��,)��A�&��44���_)�]L�{��Tf��;.{��:�Tm�&�w���3OX�eվW��:���i�&��1]�bK8-��>.m�3N�·�.�� b��]�z�{�V�d�X�ir�L�|�
A���Ś'`���;�K�N��Z7��]x`��z�]��K7n���;;���i>s������,){	^� �)Ϲ�H�S'V�5u@��tp�P'�ѼM{�]\��>�~�Ξ=I�=z��yj�|�Ο[��u�6%��.Q�9tuM8�|��+~������@�0�٨1ñbL���&��$	Ṽ^��IH8�yH�2h��U�W�J?�/�K��~��HǗ|pG<�ϖ�0�5�-���`zZ�<V�T���ծ�V0��^L1(��`0�7�4�Пe &������CW��ۼp��Af�'_����^K6��}/b��5�[l�ܖ'��J9ed�j� 5�,��;���X9����h����3g��̓Μ>��[�.��O�P����aX�����Ƣ�EU.��8;�qV�]Y��fpk�m�/E��<Z.��
��5�t{W3w���TK��юe03��S�c �\ft�43����r�ǲ�1��5��U�%�����Qe���|�o�j0��κ���e):6����4�}�w��5�s�/�O��p� �d���W����8 'Aȉ@��F�ǼȚ0�����cEcj��ړ��r@P��f��.��K�1Q�}�%k��]7Ľ��)�RJ8�����)�ۋ��1�7U]��,���n��z����ۘ��� ��1f9,j)��LNީRb��0!��%�2��Q�y�D!���.�uX�����N�X�=۹�U�G-�nI7c��ΚGcq�=� 1�%��A$ӥ[�-�U��{���9��4>���_qJ���(��`4A`��t����q���?Gw�ҽ{3�u���=�;�ws��Ѽ�0�ͩh�e���	��m�k4_���4�����nm;�3�6��t��=��:=tq��_Wik������O�.i�$��>�vP��I����?8���C�Pk����}�V�̓�aDٛq�,����x�5^]�G�#:G�R�I����͖A*&��:9��|*�\���e���f�2}�@��يH*�4F�d��@Egl�s�_f�0X�j���"K|���Y$dR��N�������TI\'�y�3s,��Ҿ^/��M�Ψ���k��Y}��u�u���M�YߔSUL��
jMI��slnmU?��?M�}�cn�Hr�g��'U�+�pg(�] V/��5��s�B�vXѢ�$��-�	=0p=]&�%�9��9���i,Z&�B�^�<P�m�9 ���!`���h��3Ĥ��D_�  v�#��qs��B_�+)��4�ɬ@9a[`o}̠U_3=.�}.چ�ZcU��X�n��98W3g��b�{�XFrc]��6&1������]��5_e�wԅ��1f ���Yz���R/=�2�=Ӄ���jT���Iil��m�=1�\fߏMG_~��fx�%>��3Ȳ��n�,�S�ٰj���0&��s�e���>�
��o������:+_��r��u��>�[�`?4
^\ǖ��
��gН�N�wܬ���fXV�(.�EX_�x˪��@�����N��5\�\�n��O�X1��G�G����`��8#�i����\�GE6����������S�O�+	~R	���J�D��x�[�7n�pe!(s��n��Ȧ�Z�4���x��<4��K�5����8?��@���>5��g|K����F�c��wg�5]��l�b�ż�b��c��z@R���;��&f��p��w�N��ҩ�&j��p���]�[ח�p�	����A�6m���\����`3�]K�l�\�{�u�3��}P�|�x�`���'�^rmH&e��8�8������ �$ZUM|��h�m�r1y�@X�K+�o�X1%.b��s�.. n2,�`� �P�Œ4�(O��s̒`qƍ	����A�E�7ԕ+W��`��;/�6�d��e�V�	�&+8�Z�1�>��eȡ4buQ�Ѥ���fJ��[}������G-�kvc�\�p�(�>��?���4�ܗ���nR���L����,\�@m�����-�q����င$���ߊw�Z�����]5w���m&/t����a�:_��/�>��R���.h@\,�6��&2�Ύ��ck�q�n�-����qV�:��!�Tw]繞�(��u���-�أ��h�=���T!^
�	����,:��(ʀ7J����'d�)iNI�@G +�n��t�m�!�����@�X'���|ܺ�wN,�-M��t\�5] ;������ZH�����ܓH:#vK[-j#���y��;�_\6Nw�ܣ�o_�Ko�I�w�R�n��A�$ 5���4����%ߎ-�9V+�`����R1��S�D������P��|�d��v�K�����*hN]^P��ԉ<�F��ێch0�n>l&v?6ݵ_J�[��wlW�#l-�Dz�?����?�dκ1	(�V��XJk]�IRs5x�����:8vt���~V�l�'���֔�`���x�9T^[�j�����>�Rw5�����<kg+��IzSD[�s+ �wPH!���ߊ�bu`v���W�(���=�E�]ע�J���d�ԯ��x*�v�b�H�ip�LDp�k^ѧ�i�������J��
W�>QpNa6�cU�v�e�6�/C�/ 	�B����X��Ł���wo7��`�/���-�f�<os�����g�}:4�%8f�}󳟛�^�1�S�qRX^o�PR5�����R,v�8F�o��`皁Tc0a��
�L���S.%��N��@2?�t3
O�#�7~���g�q=��Ha4���/�Bn�0n������ӆ�"���A�u�2�����y1(N[Y}������cr��D���:�ʜZ�
zQg�%fǤ!���h�8�(V�5�8�T��u"���I����gP��-�z�٧�`3A�~C_7�.V��{�.-C�pM��"5蚇�#4zh��$�of��ܳxl6�d?����;vn����u�6"��w�<<�GK࠿����</'Z�"��B��-��a�B�O F
@oYW{V����� '��X>�P�6/0�. ��`N�.97��tY����(�v�tϕ�Y���C�_�8�In"��[�Y�0G���K$�?��Γz�K1Q@Ǚ猔כA:ӿg�&�${��B��`��[�m���޷u�ݾz�d8��z����l�!r��6����k���t�	�nv�1d�IH��q���!jIbJF�MGR2�T}�U�g�Ũ��|��)������ZJ-��,X��>H�|�J�7|V��{ѐv��{k}3؆��\4k��ڹ��3N���A����U.�ռ��#$M�c��!jR ����h���գ@�N�pP�rz��'y����mǯ��)�u��K�Tn�GX������K��K��]SuvH��S�_Z�h7l^��y�j�e?F�[6�%7��n�����k"|��o��g� �~>�}���X]��8�ѕz5�2!�D<���k'=&�z~��u��l@��jA��E�Y$���g�py���'��kd?���
	_��1�o�^��ܦ��K(7�\�>m����\l�p5Oa�ѭ�\/���]��q|�y�� �l��L
!m��z���.B|&_+z�#m����s��K�%!�����n�l߯�{���}����L8�<�X�'/���I�2��`�
D�~SX����8`�s����ˎ��W�B?�#?J������e�q&�y���U�H��U�Y$%Y�%[�7�6`Cv�=��p{��ǆ��t� ���^0VO�G�ȋ<�6$�ej�D-܋%־���{2�DfFfd��<��E=��{�='OF|�}�Źsfg'o ����_6��������ߚ7�x#0_���>Q�
�x����y��xȜQ�Ee�<�J�zmӝj��f�HP���z:�Y����9(�P�,�`Լ�[����W%�� `�aܲBJh.M7���3g��rr��':Z��}���>��vy*T{gs2��|��x�M��5�T�D��P�M����\{�$%h!�k֘\��ys��\} � `/�\Q���Av�G�J j�>��~�e�11�YG���]bxB`���E u��0z��9 L�p<�Dc ����Ի�x��n��2�1\1@�.S����B�&���cgSP�Е��mW$ם�Ҟ��P��kf�a4]x��$��W�&Ә�ݚ���voZ @c�EFg��@I
,����%�Щ�&���j�Is���c�l�O	9o�(���{FB!"��bH6��ؐ(�aV�w��Q�,9$j}uŌēޤ������4YI�e9��#-�1j�-�Uzڸ���p>�1Ү�}���GN?2 ��f��6"0peA{0�u��e� ��!�X��a� �8\{(�;6T��>��	��ب1�R�T -������F�H���8B�.)+�C��"Ļ ��" 2�i�r�����MJ�1���F��绖���+�&�^u���������#��`�q��y���Чet>�#>^���R	7/"IrWd��opprbŌ(\��� D>��Ĳ��;���L�5��;<6�����`��5�$�k�z� ��
�=��b�w�5�b��9�U���YuyJ4-����g\��|�>�U�^�ې���+�L�����](Ĕ��ԙ�\N.���>�Ϟ=R$e hBR҃Y\lYNԠ��fI(Oڡ:Tנҹ�t�@=�ן��������e�C���>^x��я~�<��c�3��L�;x� ��&&�eL���pC����Ѫޒ���ܯ�7\V�Q���I�Sy���ْ=rMj��mV��$n6[Wǀc2�6���A�6��#����0lGP}1.��ƕ�aC���5�"��Yfnj���3�~�/l�Y���  ����A�Y�Z��.|=�	/5M�ˤ
iq%+��C�g��9B���%e�-bӷK,h��c�u�1����Ĺ3�3�& �����<�xKL�0�"Vă�*����2�����E��g��2{������s$i�]b'!��4���X$��2T�B�۴����$Q����-�����f��5��/9���,̰G����A��\�������Cj�N+�����D���2Д�A�L�#7D*�p?�cs}��=n�<4�!1_�9Fp�o�h.޳�3�͖��Jf�LQ�d|=���R-5��[÷�=U�{��h_���K{�+P���=qb7�`.p��Y��O�c�vC+<ΣT5���j�ڊ�s��\���{sBػ�h	��M�����}_�3s�?
|́Ēk��<�������������X��F�%�jjС�xc��(s]�xl%7��-�˦XO~���@�
�AՄ@X�h�n+�Rv���1���:P�A�K �3�Ў�/3 +k����`j���u�*)
��V�� }��Zu�B���!��ޯ��0H~㱛���^@�s.T����H.cC�}dӖU|�@n���3��,�Λ�j�O�}����s�򵸟�����O���O�zc���3�< � ��æ{~�6���^���jI�4�^�OP@ 0c ��O�����Ax��o����7�a�^����=f�����}���?��?�/���g��@찰��ׄ׀���4S��b��-�M��lIA��ԡɈ����O�,@�J:nɭQjT�H��4�WM���,]��gpχ�|����Z>�pqc�Sb�j��:G}= x������`�ć�Q5%�]e���0��9�H�(vKt�M����L�52BdcK� 6��va���`�XӦ�c���L�e}�F٠4�$%�|��w}d�P���&钔��̒ >`�|�O�x��C��ހ�"2xG�s�z��yu�0�1?J��	R��ccO��.�-	��70s�ر�1 �0t�}`�|8�y�A�C��H�8� @-0��B�M�����gl��G���r�>W���j5��-����]�emb6�������P��
^�_o�{�O��I��I�E�� ؏a���n�}+5���5�f]�}�Jq�+-v��i���4�^�*ybC�[m |����޻�}��=�]��߾y�<6�����}fsc3˭=��~l���5&M��r3����׮_�SX���TqW� ��L�19�밦���0���م�8��k^�̓� ��ž�~T������<���>��I��G�C*=��Lq4u�ƒ�2�yi �����؂�maօ�<�N�Y�;Cߚf�S��31�(�&����0�+��� ת��0��G�d�qW6p�>�:|�&� �[���.�̪�W�ιȮů�=�%�C� ��I�Z��zUE�`B�Q�����]t�j;� �x`�6�6�T�|�v]�e+�m�w����	{�̙�W��f���hy�`��06 ���y�83�(����L��[G���շ�7n���_�� ��f��?�S���_��/�D
� )|���o��o�����!��տ���}�|���_��1���+�0 j S����dL˗�2���C�̡a�2�Ӛb���smCč�o��m�9����ڠ�,'��P��Ob��_$`�gG�U����Ɩ1�$��jmU%(Ock��9K�@AW�x~m�j�
�-�
��v��N��V������+o�����?�P�~��
�E��4�1��Ф\d�J��/�mf���<SYf[�@^ﳋ�q����	F�K���>���*R~����
�Qó�� ���0�0��)v ��2_�����kT(�@������ �B_2n	�U ���Ѓ��ĳ�����J��#���I�#�bf4(3�;�hk)t��Ȣ�Ld]��G-� iL-k
I��6��%)<��s��\RN�e�Y���.l�y�����JR9I9��}��������'Գ�Lf�x�N�e C����e��'�ϼ�}f{g'H�*y'a�y��$y1�&a�"X�Ƿn�
�9���z����[�p��|I&�gmċ6z@)�/�}; ���MM�q�J��^���r}�M��Q���؇���/Au����-�5������;�Z�:=��!���в���XT�I��G�ٝ�����C��f���[�y�}�����s�� �����P��=|Ρ�#�yT�dwm��t�7���W9J�1"��8C"#�)�~� PQ��]�᧽w�-�+�h�+�I!/��B�پ�B?8	b���f�Ǟ��]x�?�k1�v�� ���u���r����~ $ \4�E��ըt&�
4	��X���<~��������T�����/|�楗^
�-<nXhC�0���#��o~�|���3��_����~������op����|�t\��}M5k�Ӫw���rD�yi��WǕ�z>�*�pQ�F�3΅��?���zò�5�^j�%��׵�iV��Z�s	�3[��J��7��������N�ҫ��X�D��	ճ�ʄdV͐��$��Mޒ@��W��A��|8t��1�J	 �z ?��7�g��f&7j7SO"�|��\�{�MF(c̞���>����hsQ+J&S���~���b�;J���{�|�k�0�.�X�����g	��8Q$ENR�g n�N�Ę3lѹ_��LX<eQ�����sk�Êl��-xJ���̅�g���b���S��Ufȵ��8�ј�zt��ؔ����Ï^���'{{�ܸy-���?�B���# L�j��Z��{d50.�k��W�5�<ԹMMܙ_�ڷK�f����Һj�p �L�������A4��"�Gk����~Y�KL��N}_���}gF�[�Q�)ښ�ǯ�t�<�64h����Ĝ���
���Y��;�,a��ɈY�bd��6p3��Z�����un�޳Kj�X<����B��,k°>8�Y�z�<uA<�ΐE����eC�e0s7�1�2`]%��5:��c�FN���`y_ l~��0��._�ҿ��+G�í���`�2Ľ�����A�xAu6^0��J��?6KmF�hkͬ������v�i����y�s�ܹ��������?����ۛ!߂J��o^4����oa�~�S�2O=�TpQ|����C��W�Ѕ�>�+P�i{)Ql6�MH[(^c�~��������H���͹RuOrR��u@��j����am�f��[k�nh����G5Q��ᠺ��uH��i3lOx�@����gr��8�⁀���V�
�!~���������l	 �[)�Ү?_4Y*�����VNL���v�0�f����r��S��V� ���	?��+���8��b��}�^�F�h�<���j�-��&E�Ȩ ��ey&�qG[W�)���p�L\����ӽx
�i��ʷ�*3�mK�t�ҊcRQKR#hCг���_ZB۪ןK�O1�P��V(�޼uÜ={�<z��ؗ)0�S�YY�I��q���q!az���OI %gE����1M	!�;-wF�,#x3����9�|�X�$L�˵2���LQlG爫Ppn_��c�U)�봜A7R0�\.m��Tk]h{�����GN�u��-���Υ�~r�<�"����3`:��Pd��<D||�<�%4��si��(�/�oQ� �{�fn1�ͽ�*�%&,����~�CcN�:!�=`������o9'��U��t��|d��~�`�������w�AS��>�_���(��/�7 0�!y�+\��'N��Οo����	�4(7��h�RÍ�5�/�|��??$(/�[��f�m6�c�;A*�}y�\�x��������G?�1��O�D �t<N��{tc�4�3å-pI3�VaĨ,I�	�\}$�H�*p6kK|����*��҈����4ۋ�`έc5�G�W U4��/�M����X�L�^��D�Ƽ�Z;59S7�Z�Y��� ^�T�U��V�|j����$iu�'ÔA�M�䊫����;����"�fE-%Q��s9�Yi`dq3���l�u.D�얘Y�¹�P�%�_SS��rGPZ1-ɼK*)*;K���4tWZ����$uP���\���L�@����eȤk�b�%�n0�km��%ܒ!QK.^�� x���7xo��!����n�gΞ��ʾ�:�
mZ̤��泿�ƽ�9XԞ��n�G�h�4P*�j��cy����x�ֆ8p���f�/���u���GG�E�͈I:r�Ĉ���ZsO���Wߣ��e.�]5�b�!��OW�<Eb�q�Cn���'�Ct���A�o���Z�e{ u)X-�+N?��y�ϵ��g^E>��ָ>K�)CT��ZQ��ݫe/3���>��@��s;����#p�}�d�]ج��4��W-��:N'�����@zE�8���|u��'`y뭷|7�8����]��bb(VARժ�����W����ܾ~�|��_
N�'x ̂z���<uޜ��y���`v�l�G7G b_�җ̙3g͉<� 7�ht��BG-�Z�"}?ֿS�i���ΑF�����<i�@�&ד�^Ve��߅��&c��sD��7>)�3H��4-XhOt�+���
��%I���w�h9���*��8�ՒDi3���1@嫯�7'MC�v��iI��EߜWX�I�h_!�aXW�j{^�S�Sx�j1?�h�R���h�ت�_	�U	�ͬv�"I�m&���@x"aE���4�-��������;nG|��Q]��wi��Xj��h�m���+�@*<j�fK�Oe�Y
+�	��$4I��.�4A�ۙ��{�������r�4N��V�͍U 6���؇��LХi�]��I-�)��������%Z�Q�����̣��j�_omlJ�fy-�D|dg`��̙��4^k-���Q%�E��|��y�"J鵌���d�ܩTc[
�{he�W�9��Q"���M0G�M�ٴ?����+�3߰8��$m�����-dh3��sUbfd)nV(������:�[:��![W�CF�2CP� X�%�V,��On��~�������3V����jcuhu� nww����\���F�zR�~��F	j~��C&Ӭ��I8��I���n�=��9s�lH`>�݅g�2O<q޼���������s%��e0� Ӎ�_��;FL�g����[,�T��2�X%XH}]-���Hh�R@�*���\����O:�a��	�w���I8�~/0z�k���*�t '�h[7�Vx�M]�DNU�[úuYU��i�f��n�x����7���5(�cq�|3 P`�fL�|�c���X2_˧
 t�#�{���Q�
��s�Ԓ��<��6H����M[����eA��E�'��f�ya����Ĉ2Cda��������u��5�-%z�~�V�L���{T>��H�$%RC"=��cl�x߻Z�G|}W�?��0��ސ�nom��Y�G7���.ͭ�肘{�����S�Ne�D�D�� ��}]�B���Q��եYm�0J��%Y�T+*���B	�����#��w��O4@I3נO0b����*���ϙ�*��sw	�?���`�)���8��65�3��-�qi�-�J��uo�B�{�Q�u���=� �B||�R����&ky�\�Z�U+0H�O{��'���ZQ�-����3�4Yn=�;�#��CX?%�bV���u���g�F���V�z�A|*w����R�����cj+��ã���ȋ��%�7��:���Ւ[���B�����s���|�c���O�7��_���u��pC7Ǐ�����!Hl�A������G��w�C?h�^�f$<�������S���Qv���SɏV�J�%>鱒LBZ��1�@
���"�\F��5##.���P&��|����z�(С}=��[冕 &T�LV��8%�m�M�>��T�l$�d� 2�7D�홝u=jAb���Ѝ�Sqs�T%@m�P~���������F�=�t��mRrV��Zf�����q4 \X���A����m1zBn2HFS_ً���"C�%����/̦!�Σ�Uq�B 8>^���M�t��|?�&���Kik.��l��k�e�$��@[i�qM��;^�.'Qt߬�`	�`f�2$��+���;ة�k��$��� �:ہ�2nX,�ù�S���@���������&ݒ@=�>der,S��Z�{��nܸi�|����g �[a���|���	�pmҚ�/��3�5��8w�ݼu�\�1�@��x�>n���k�H3�Gg^d��`C�*��Ұjڷ�j�h�Z��:����� �
`����u�k*���&��z]`k��^���^#+ϸS.�7h�������%E�Ar@샡H]����u��h�d��۞6S��X�H;ʏ���[��Y�mV;�Ec����N��VXZ@�QCkC��%�����ӏ�S?l޾xѼu�����qp39w8��Y�=?��k��W�4�����������w'��?���66lI�Do©����z|��7��4Ia�E�*���0����p&����@'��*	1e�J&�v��nlh�zS����k��Dya�l�ّ�}�RǤY20�e��c���N�a�呝N��D��t�q�+���yl%�����+V `5��r�Z>f�!g�x�ͯ7� ��.��kfS
���0�/����x�^�'L�Bab��|0���A�}J�K�����jn��[6�}���	��Ƿ؅���S�C��Ƹ�[)Q牒���A��D�J��i����ى^ }.��ͺ�!y?
}��.A2+�6is?�9���j0�x뭷��]��	�I�1��3����t����_bQ�B���9v�tj_5�i=�<n��
�!H�� I�d�.Iz�Ha�����3[�?�P�Y��{�i������30�����o�۷n�J��pNKoX�ǣ��<2X�*	S��t^�x���m�l,'o�c�a��x��Z ��`�q6?�1Lk���+*����zJ+H�3=���T����k�#Q� s�9�A>jmԁ���aWm��z�i'�/�}��+$6R#���p6�w��S��A&��>-$VJ��i�.���&��Y��&'Ӊ.��w���*�o�n^y�G���.���T�o �|m��6����q��8���;w��~����O<�e����\�����CT�i��T�G��Ң���q���.��ն�ޥ���L�r�n�],|���[�À�.\�]�4��y�֣��������B��N��e��fS�!�!��$���,��?S�A�������Ԩ���R�xe3/����*��eH5͑�
+\�L4�p	u_B��5����z�Z���eRz���ӲE��(:i�5��7�[ b�*�O��\*L�h��W�����8�Yl<tݔbHd˖�7fK̗�/ӂ ���<,��QwAn�����ZΙfMR��Ҵ�b���襵	�#�9L �ae{o�(����c�_|o���*���t���h`n)ڍS�8^� ����dh ��3��2x��㺠J
tD�f�i�3^ �0�y�s'�S����` a�8xNt����CG��%�&���w\e���5s���}g/}�{���롯,Μ���8G��p������#@�VcD�H�^w]�E�C�<^5>Ҁ����`�s0(IC���ؿ~�z`y`��u���s�	�fb�@ө̶�|�:-�z�cU�a��x�����Hm���� ��|ޥ8:#.���F�O�7��׶)_�r>���~�/������Os�ǒ��Ulإ�Wz$w�k�2��t�.-�ΰő�z�����sgv���#�Hpp�e?k��90Sc�<p�a#�0����o�؜=s6��,>K�H�T��a^�:w�F�V��&�����(x�5�
���d>|`^+!(�`���>IR�SY�1=�͑��ζ$�-�\J��/mv;�,n�Ŝ ���*_%Y�P�@ײȧ�3�!�*`�M���a�����*H�\uE6Y+�~�7b��zfVT�<�W��8���m��6��#lJ��aA{h ��i�5|�sO��|��# ��8p�y+�A�(��DZ�+�Ƙ8������%Kb	�q���>�2W�P�0?e-i�*ڨz�b�f̸i��<��|��~?���wo?�? c�΅Z�ȝE�$t�������!A~���o������CB�!�m��F�~Ge��3����ߨ�A6?�{oȪ!��8���>���RF~�i��&�a����¨<n)a���p-�P�(_[.���(0_P�ӕo~�[�����nl�'F4�:
�\�]��)��cJ��q���j@02��ٕԾ �0��p�ǣ�7\#�'#��3 ~X<G������w�Q�\]|l�L�:�Ep�%�u��U��>�Il)�MC
h�*�%���������Ԅ�F3�GBwF�Bi�d���֘[���)w?��ٳg��Ɂ�������m�j���*9@[��ժ3/]�g?���S���p�_{�u���|��7��{�{n[�F3A��gn���χ@<�Q6E��pA`�N�Q#�'[ �Ee�����ie�$hf�%*_z�|I�I�aTc\���b��B2�c�Y&��_Z�)9Nj��ȒD������x���1��*�[��udV�!r�p�B���c�yWU�)���.�pX72.?�%��T���vhG�z,ű�2f�~�q�!���Z�8^�
�7��`uVs�� ��Yy��"�vTA��4s�����i��X��d��g��h	��ߛ�N�Y_X1F�6T�������ZZ1-G[�h$�V��� G}��^~?��W�c\��)��R�^���$\�k�FKj��9R��F2si8��06B�T������ἀC�SRqN���x�=T- ��o �y�{� �K��a��ێr7 xd��w�h���LS�E�Ǣ����z(�B�\e�����q�+"g/i��T)�q�� H  g\�fx"Iw�~��f ;4�;XP�y�\x��ݗ^�/�׫� �!`o\��H'&�Ez�U���qQ�V�3�Ydȵ��Q�����:�sY^%���p��)�5k�-����(P��M�.���s��X�aĘ���Kf0���H⊬X����J���
���˥��ˬg=���gTzH���vt�s�2Ē)G���8��U�淅m~����d�O�	����77�S��1Z0�@�I��n33K��[CF�4�=��y�ɧ�k��f�����I,��ͭ0ck��8�kv��to���6�G=g>����4�������hAOV������p�EklU��BF�r�*1h�$}/@p�g�8��9�@����Coq#s)�Y��R��4��r�V�iR�U�h#0��KTJ%�R%�o<Lس�ȋ,n���ZOq�
��c��n^�@�q�X��k�������{l�
i�f�U����>2M
]�� D
h-YU=
+���"o��%ʞIBM�Tj̅��j�_�W_�QZ:g�����8���\��n��Dqݸ`%3����eU�%9��o]U��b���جАbwA������r�}��,�TO�4���j�s;���o���1� ���nrT��1�Y�<�}�.��@��1�!|2S|��s�s�PV����)���3ʬa^@Zl!�Fe�ȘQ6�{ѕ�>�9���~��C��-�G��.8^[E^���`x�:��y��S���i�ϣX
���]. "�������8�>s��l.���f�H��{[�	(I|�Z��i�k+[{���<�m`�m-8PYr�R�1�e��䶹�f}?�b�VWYf�R1n���#w��w�g4b����yJ�6���L:z����*����s�i:ł�+�Ӡ�?.��`I���[��w��Fr�X�y.�|�y���eZ���	�����60|�0|��ݹm.��y��Sho�^0ဧ��1(�/�&����w��t�0����7�ț?���	�d����z���ɘf�W��^�'i�GM�v�I�D�x~͐!����C7^)��>��2��	=%�s��i�\5;S�5�vY�����R>[��"��WI.��⼦"!)RG܀|%E�ӽ��}�t3�\�mE�;���s֑*�W�����>f�uy�����v����_c���e֖��7�!������kV��0�[cy~���O���#,���t�ؔ���������U�2��u�X��$�R��Z9s�I���ם�^-�N��;"��*T����0��D*�B���:ib�l�,���� $���k�!�<�\���!~/�#1�0`�@�ot
��*z-y�U�-A��L�4d� �|�+_	�9�)�����l^A�@�T6 ��gY3d���(��ㅟ�q�?`f�5P���F������S��$z������`� ?���Wj����a\W}bI8+�U��Ev�k���Ky/�a�-p������bX�{�B)(e;�ܨ,��dݛ�WW�m���$�����tև��8�`��W ����w]���恅d5�L���F��1�I5M3� ���N2m2��03�{���ל��{w����h~�PI�8+�.ђ���9]�89,�-���%m�Iz_* A�4���ҙ7ߺd�|�M�ԓO��^�NؤN�|p�a6�:�q��>��s�7��3l�_���̵k�F�5+D�[� �$/SR���w�B�~֚355�Jژ[=nZc2��j �?�:�qs�QpƷ��ki�rir!A�;:�+�T���
ާ>�ڞ��J��R^�f4��jTG�e�m��$~E�Q��ɕ���k����s��@Y��L�T���DS`Jʲ��q�9��;*#��鬘���Y?�2�G�ϩ��y�ْ~�א��{@��a5������a_T-O��rYh��F1�v.�􊴂��G�9V����ů��m�q�\��"�$��
n-I�6 �{�$cV�����S����!�f�9b�ᐰmm��!��>�9k��;jO���hpQ�ԝZpk���ϛ2STE����(�/�`>����� ��KEid����<�s���`��	h��m���Y4 a� �f��B(]�R@���`B� �����:+J��ޓ=ͥ>N[�L,F����%f��=>��I+PNI��\�I��7�F677�;^wX���s���9�*�c��މŇV��%��9U��}��. k N���z���l�N����0�]�J��a}b�;"K�ʘ6�0吨�=�"_�{�8�燇���g������0?*�o~ks�mom-`#���1��f��[��α�)����c��� ��]��/�˗�#�l�HM���PM���P�3�1�3w��ͫ��b�>������@���0]�/_	ֶ��'w̓'2��[��|������E����a�FL~qq@3:���D/2�_������ʀ� �j��Ӥ����YK8�@�Y_k}q���!D)f���y��d�,����3��]|�?E�:�;�
ݨ}C2[�yL%a���T�V3g��3äs�t�dUm܁����РTܬb���Cs���Џz�j�k�1��C)[X[�S#p%�x\9u��.�܎�*�4�Nr=96z��=��5���Wɵ$����[����|���_ɀ}rE���v,����e��M3�)		ƈY5|4�/��]թU��Y>\J8ӯYRk	�8����55+f�ZK�(��I�p��3�.���qXv'�{�{!&I��ZP����yeh� �{�!V#�}9R�{�?R;ף�)�"���к�â�w���1Gf�$��Q��?���r`Ѡ�rd¨������=lnⵘ�lڹE�)N������i��!{;Jek��FI»,����Ms���f��$z���;ie@E���b42b�Op-���-**�[��(KK��TN+�o8���0r`Oc <p�0l9��G������E^�v��k��+?���W�Z�⪢�6WX�U���)���n)k<�yk����������%G����x����"0J;�fg 1�Z�B��3���� �&v�prQ�G]�<�Ѫ�T� 	6$���B�	���b ������G~�|��.l�o�1_�zd��V�����~����~x d'�w��]�W�Wa�3ll���U>X��^����+��$k
l�2�B
�R��%Sj{���F��d&-�T��6W�*�ay-���lW��ߠ�C]�-C�i�[�:b�j�\�ؔlV�ӎ=���Ā�v���d�$ry����Z�Kv���bժ�m�Z�$x&G��#��+=n]�|R`Q�?ց��rh.��sT��Ϙ2����d��Y�%�̌dw.���BgG�x�p���g空GM�+�J��6xM�#��)����,��M�{=�����xm��Iᜰ>|�$�y���h=�Src
�$�n� Omާ�c�H�1Z!K�1���{�$,{AhS��hR$��}��gÚ�0�;�[���������'nd�  Z]���@�T����8�Ƈ�?��1��Os)����{�ځ#���~9�,��m�,�%	�Td�`U�#�S����\p/][�����(�z>/�R�q��^�c>4FH���#*���(�}O��>�+J) ����&]��9�P��M��®���)�I}>V4���`cc�`����K/�1t�:>F���P3�Ƞ�T��)�Q;�g�J灛SQuP��n����:Ƨ̏����a˘c�����{�@�����}���U�1,�p�E� E�Mc#�A�����{Ѯ�[ѷ�M<��Ϡ�(`Î�sl#$���w��e���|ۜ{���G>l6�7��[7��ӧ����ǂ3��?aΜ>cև���_6�_��y��s���a��ԩS���I7��J��zi���w����+����i��Zs�>�O��<���*y�fa�� ���hl8����X2�إF�N��m�kU*)pϾ@����z�"WX�L��� 70�4�4Z�ܐ�ܒT�$��z�{Rv���R����1��D��Ɖ��U�z������M�ꗹ;�Ȼt7��*��=��L=u,/�`�ߗz1��ހ�Ւ�
���Kڧ�%���n��'�eP�f:x����M8p�L-4M־��q�?�D�cO�W��s�]��sK?�2"io�̗4$WF��S�lS���� #2\=s�/��BOu��\U�o�vH*�7	�'��YBkFg�)��H�wh� �8/Y�S6Es�����PbTc�9��o~�� ��*C��9Y���,  .���7Q�\�q&]�,�ηt� �{�|9>ޓ�۪p慂M�?X*�hc�J��ck!���%~y1|`!�J\����V�������b:׏�!�~��[x0Ux�.�v��)}_��5�R�UA� 1���L�H#�d^<5ަ�J=��ݹ��ۻ��_��/yPؽ ��A^�zս��=��|������Ш8_�A~8gnԃ����2��&�N���F
 T�8q�lmo�z�,���m��&z������SO=e�{�B�<߸y�| `��/�o:aU
��8 ?���A��Ҳ�_Li7���_eC��s%%*���*�-m�V�Ye2<}O��*oz�PA���o��]�$��#!�J��)Y�c�1�S�ٻk	Ď�ս7E��>_�â����,���x^��X�^-�0�	E]`����?�6w�,�Qv��d���ϥ`�H�N���j���uĨ��᪜᫁�[�~�e���I�Q��(�-���̞E�RdICF`ņ��OLx6s�U�f��S��J�W���e�50�6E�dw���P�ʛA.��{��X����Բ�/k )��@`fgf{����R*�I_k��|�� ڄS��TL���ڬJ-��8 ���Q+*��B)&���7�+p��=���!'Yu�j9Vkp�+�s?�x���kG���Z%�7�<�a8]�W�t�X�m�b�k^ߖA���������g� *�n����|��"`+2=:C�.P��6��`�J%� �`?��Fl�xR�ݻJ꺵� Mce:iq8S�},&� �	O�x2�fc٢T@�r��G[��\,�}�Z}Ɔ������f��_�v��t��<��`q}`��u��iX\��b$,:�@&�U䤛���"��׶i�-� �ݗ^2W�\1.\ �ԩ�C�ؼ7��W^y%��y�r��`c�}_��A�	��̙3��i��j��PK�V�J�Z�lU��:�'��
n��FK�+����[��wn�H"�̯�z}|>�=kC�%��w#�b��K�ZL)gD�A�Ă׬
&���q0��5kU�A�a�0_٫s E+hLp&���L�3�SUϠᅍ��gj�X$K���*h�� �	s�O�U������om���t�F��]��NU�x_���ڮy�7�HOa��ogq�_*v p�c����������l�������8 �7&��ӮZ_�W��"ݤ1�'!���T�,�����Fϙ�͍a�<::0w��x�=|h6�Z�Or��
z��CL)"�Q Fc�@K}�	��^����3�Bo<a��TLc�Z��U\M� �s9� �{(�M�/=��A����!�+�Ӯr���PF��j�Oq�Žh�B�_�׊{�OE�|���&E� �ddV��uL�L7ʦS�)5Bi�+�N�RN�RaZ��燵��j���05��5�%~�Dv	`��`a�ꞴR,-.��tJ:��A�5Fl��� a�Ʊc;~ww�߼y���*��y�w��a�Y/$��nم^ �L�]HR�@��X�ɚ\;8��a�=|��;����P�[K7 �hB�P��y�ST��o�MCg����*p��rFx�
Z�We�eU6�~�G+�Z�YW��d�6:i�D�K�Ք^�e�|�aR��:/D��Q�e�H�<۰�:�~��('����9R|&ݤƃ�)x�3�j�@�(p#���y]~�\�U��u"-1@TbXS鍓�-5ˠL�d��&��:���i�[�+3Y.J{$Ib�J�Z�Hϩ�W'�~[�ȣ�9pYT7�j`kfb��^���,��^��Uٽz��!c��%�͋�@*M�<�s$]'SΆ�|��X��@S�0�]�f��3�� �V̩c�z'�s�4o�7@aV�P�N�Ng ��2%�G�oP�@/7� N,�ȴ��˒�v8���  ?Z!Vs�Ԥ�-�,>�r�f�=�e��-Ur0^%ߐ΅OV�K�
�o-)p�IO�ӵ��*���RT����;C�ў-p��T�����G��}>f~��J���{<>�6h�
�x���9�ur�zf�56�B�8���>kjP&�6��bS�dK�ǩ�����Y�!n�z{k{�ǐ����n��p�mg�\U�����6!/���y0�@`t��*2=L��76h [�)��M@6��9D����ݘ8�\ l�������Yj�G�!5
}W��\n"�)	�v�_�L'��Z5V�RU�R�5TJ5���R���ͦ�T����ɳ�S���j�Ba���j�e��"����?��������yÍ�T�$�J$��Z*_�H�:�V��u��.Y��N��|���)n�Q�Y.W�L�e{����ʩ;TK�XWi2B�[1��M}{��Ss�
���c��Y�$��fq��*��3 ��qG�:I�Φ�['-�,V]i�d�?Jc �k�ϓԏ�}�5:�d�t��J}i(7�	�6;L�%�}w�e����70<�,�ak���{��;ۉ�1^l=~�~���C!�"���GK
/%�-�� ��X�nU�[�pR�oI1�1@o���!1�-�e��k4JB�9؋m(�l�Z��7�8E�|.P�<��"�6� [4��;ѿ�U8"�{o�"�nJc'��F����i\ �E��5�f>�=�VB�ʵa��)`I�w�4�kY�!����k5�VL/뽌�唾bSym��H$�5��[�Kp_����k���;��ɟ��Fy�3I�r8�#�Ay�� ��o�HD�S�:iS�T䀥��g�PG�14��B��a�� # �u ��Ě��T���&��TyZ���ZAc��[j� �C�E�vL�,�xhYb�}�&}�k�fp����`ml�������аC�k��H�+��$d���z qy�1�7���_#��K�r�fO;�?T@`p�K�H��!�lk��V�gXi�aY���"��+o�L�;%�{���v�8h���<c�
t��o�C�+�-ƚ��GT_��1�1l�R}���cE\���� e����0�~ISLrU�ՀO���@ߏ���I	���[6c�Sz%[��Qc0�}�$IlIX[�>:4�~Ǵ��Fp!6�޽� �����D:�\�"�p�H������ri��D+�8�������@��(g���}ƭ��TqQJ޵A�ph��L�<�\q�����q$�"�8��=:^�T�+�c��ˣ�Ɇgl�,�O�����20����k����!��@�o�"r\�Ej9����׊
��#�S��c&���]�Y9R4�)uc��*!�C�鹳L�a�ܖi{_����{�^�ּ4Z���������2Č����f��CP�]G-U%9!�Ȑ���f�(Єm�l� kd��Ii� g�@2"T̀���**/�6 ZmĄ���ٳ���d'���U�$��)�j�4`��j��i��7��f35�]��jɁ8��m�V�O��XU9�{BF�߈urD,��y&2-^�Dw�¯��4}1V�錃bmɎ�*@��D�����p7�9i Bs�y��/V�T6ߧO�LGdJ�wg�Ҋ�-��ޜ�rA
1���Y�D�l��fäaѴO�ϣ��..���4��x�أ%a��5���O��偵r}��֌ fF��!)���2�(R�s/�1�}�I��	)�92��)˱��K�ߏ��i���-�����MP�h�A�z��p�Bz�z|�[MI�hޔdcu�hvp-�޽;��㜪�؋��d*�������* ��0�"���Y%�J��x� �c�0P�^-�(�B�v<Ұ`�,�a������l)U4���<��@��Ap�[��u.�U1���{�j������Jca�-2�,�QW��q��a�@/�
K=ߚ��CO���sY����g�+�Y�(���l�%�y�7�������wGZxܵYr�{^/�mE}ө���������[�����Vi�i��S/�0b�]�jW�'���4@X���ȃc���@l4|�m��nt*�5�h�az �@3�3�\I}|����9h��4�xIUPm�7�d̠5���ʔk�*2�VuA�h��M�U'W�t���C���s�=�6�M��S�@�
Z$ ȫ������h�Ԁ�듩����]����;1�2������m�����4��W�s\=K�>�2�3�I�(P��A�}[T�7es��s�x�&�c��m�r��	E-�,���ޠ"�,�n����@�$�3�&�h��� �o,�kS`�F�ռ�}W6��tMF740�X�>�3w�W�)��.�լ�Qe���ċh,�h΁�?2"��}^6-�\��J^��%#� �*�x77ׇ?pa(2S(��E� �Χ��)���i�-����O5�Iɒ��C���9k��S1�5J���� s�q���Y(K!H��G33�C�ᚂ��g�q߯%2$3�#T�X�%���*�Q8&� �#fΖ>&�$��wq6�1�WL�Uj�dy$�͌�c��=Z����v¼J\���*~�߳O1b���M�Vh��I�g�$���H�e�<�{��M�$Յ�:��*�OI�u��)��nm}�?��J0��[?֒&��rXx�Rb�%�A�GdM���[�]<����x,P��M>��3�$}-m��M67 ^���l�����._3��ܫZ���M�� 6�M���\��s��<U�� !]u� W��b� W�M�a�ŉ��A��XΈ�׬χQ���n��S��^��h�� i�\YnhF:�ly�}�'��'���Y�$�>�HZ�+Zu�H�*ӊ�e3�D3��(���߲sZ�,t�®l�=v�t������#&3a��*�l4j���v���	:�m��ۭ���h��2:�8�Y�8�ԣU}}n@�=a�K	}�	�̙������T�Bב�(X�B�{�Z)��T;B��x���%��r�zJ��C��W5�?mhoKj����^����|�������ܗT-�
�J�K����RgD (��8M-�5k���&�>'�#�aRa��~�����1?�c ���8�H�s"���5��y�ΏUZ�9�R��.2Boj�([[��`���lT�Es��r���.�
cWȥ�%�ť�޿��O-	��/R��ؑs`�x"�O��I��^,1�&����N!I<����y��m5�Sz\+n!{غ���75�@+�X:�lx�$G��K�Y�}:��ʄy���R���Z��p���f	ro�n�bh�
����L�Q�Y	��q�_8�> �A���F��i�RZ �s�fʪ��݈�6�)�d�Jo0ɘC�u�36�	���U�o�1C2���3���;��.qh".�Ū�vCӍ�n>-�cEW��|���V��y��x֊!�kgj�7�H=у�,�r���!�?J�s6��9�F��(�s���jܿ$��z������;��|(������}c`]�6��O��^?���cF&~4�M�/3�����G�Qd�R<���41�F������O���2Ic$�=���Ry.�3�U�r�#��/9��Q/=Ox���MR�S)2�u��ʚײ<�\4�Me�w��ԉ�)M��dٌ�a`��kZ�� ����.y������5��U����cl%� ���ŋ��o�b8 0���%�S8*�(]�G�5����3�I=�� I�8�_�3"�%p�&��5ƯfE��b�J�g `�E��\5ϯ�`s� rL���T}�(��\����.�ٱ�$��(Q/��4�Q�9�}TT�@�seϛ���"��K��×b����q1E�]�o�Xe�E�Sd���h/X��um�ߩy!b^Xl������l�I�l�u×�k� �s-�E�mnn�+ ��!oS$�f� ;�T����U\[i�H'�J�4�%��X��I�$��p�4&М�*30:qnKKN��5��VS��$�	MN#�/�Ak-�U���A���Y�F)�L,���I_T�A� �֪k�AU��R�4����K��p�)������
C�܀2x,����NmN�ۑ�!ZS�EAV�Kul윈���fX,��N�<r6e�%��J�Y�ˆ.ǣ`��wxQnI�4�dy,�,�ܴriYA�~�ɾQi�:M���H�Wr�r}=�����c��(`���\�;^��n���u�+�"L�˭{},gkI�k6 �QkI��ўV1�]�o�i2�C��+��׀���~�sl�lno��}�;��d�9~bfn߹z����Nd�Zr<z.` �z���[o�~ƥ�-6GR�h׿�ۅǊ��8 �ڂ�s������4y����� 0a��j��S�U��I��� f���0^���Ԏw]�H����*3؀�F�[��qÒ=�2�*_�3��9��	;��qV��y�:�&�)[Ÿդ�ҾRL�Oӑ>*m�5h�T�������B5�g�y�al[�~^
vTv(��Y2��4g&
hv�&[��F��KE�p͆���c81[[�Yє��?�Ű�ob.%��J��7��¼���R�nKPoNmҧ��&ް���i#+2#�P�F�칔����>��A��I<�9��pS������Ĵ��$09��I�-9`������>o��.�q$9�$��0ޛ7U]��3�t�I�A��U޷#��4T����R?���G�=Y�k��E�I�3��őYh����_*�<C�9l�~��1W���b\'���/�}O����X�N5`E����S�iP,�T�uj|���+7>;���Se�vԐ�j����b Mb�c?�_*f,�I��
����\��l8*ߍ��d���Zq�t�צ�~4ǆ�a8S$�I��V��EZ���Uz>�y�U����D]����"8�y���L�!�8�!t��$�p<�<���q�J��
2Ľ�����vl�Xx�իW0y���C|���iq���J��i :o����ַ�� ��ӹzF��eK��4���� �@�Έ؟%U�5�I�/[<g���yG�8GpN��IS�H�S�4_���`��,��{�
�}N]u?`.��|�L*@8"_#k�OP��?]�%p��.�<�T�HR_(�s�X_H{��ԏ� �l��ﵱ
����J�Z�0��3b�U��KfF|���yK~�Jo��kl�,�n����XZ9�6�0���)0l��˱�;b��i�O3�b��.΃IN���|Z!x��,ܢJ��jgո��2�8�0��4J��!n�(3ğQ)"����4��4wJ�D��k���ini1j��檍���I�k���;V=ΖV_�����It�w���v����z~�\U�F����,��Gc_�!�r�#�6�ը:h�*�Pǣ��EW��5����Y�T��\Ѩ׽ t�s	(��If!`bpd	:��V��rլ���ѩ�{k�|')���k��Wl��ĸ��˨|�;&�}/���s<��,��U���q���!b6��z�[��d�4���!�+�M�vn��%��.$�A�	V�k?�`���(�*}�����!�|�^?4�	3m�0=I0*�^���&Y'�Ӂ��7��B�δ���������t����Gڔ��X<�>��\�r�����c��5 ƂD����P��jQ�$�U���8��;���y���s� ���;j�)Z
I�'�j�@���%�-'FM=��8O��c�fP")`$ir�u�z����~��k���_�0/�*TQ�B-�d������/,��B:#�xXiJ�_'�IfT�ʊ���E������^���@��\����6���{��w���N3[~�H۳53I�$)�xA�;YJC���/�Ν�=8$���nܼ��0�����gk P�1ԶK��~�!k�t�"z�7O'��@�:�5R�f� �&�n{k+7��L |`p��C ��X���NP���y���ЭB��]k3�np��K{��OinM:ښ]�o�U<���j���37:g�6Ā��{{��Il&�<�a���%&�{�Ѝ}d�?Ə	�-V�1@J�Xi��v�j���k�P�2��-�ÞT
]���Y!�������4����Z7a�Ʋ���N��y"�0D�����V�Um�ORxS�^-��:�.Z�@i�Ηdb&�P6N�>n�>�t����*Ô���{*5Ą��]� J�_�(;w�r���l���1���E��aM�~��{�x�����kY��q)���~�������U*����8)���o����u��5�z�6"�iS�P����13�M�vػR|����σ��"�L���}s�V�}���$�Y����#s�������0��a\�

�C�Q����}����/ ^�w��--�B�����������6�6H�-uϪΈ����
�wX/�7����̯?߫{�a��y𼤞�%f�:_�؛G�K ��dⵓ.������2̹H
�J�^�F;f�E�^�
T4^�\ؼ�B��y8#�X��{$Ų�7�� �����O��Q�8��̶L�4b@�7��Vz�$�63l�w����}�m@q��Fe��������f1l�0d�l0/f�@���ww����"T�A�Ҁ�ւ�n�as�|����G>Κ3gΚzȜ��0���E�6V����8H.]������a���	Ь:����5�)1
Z�F��܉Q��K�t��)�z�J��W�[}O�$b$��CoW�����w6����������Ҕ��TI�l�ȋaHqz�#��[˺q�+���S�����H�=�*�g�}�k�9W�~�Z����v�TzP�g�
 �e�r���������A͒
f�9��� 	���D�s��K/K�?3J��{��>�����*A�D�R�wi�46����r�V�V'=�Wq��d%�������Q䬕�����O�k7�Y��`ۚ5(,�,������1I�yVq�Z��������b�`��ގ��[[f{�G;�筍� ���+`��>|į��;t%��pfb2���`�0�n<�1�"�������+W��{w7n1z��|Q�����ֆ�u禹q��q�&g���'%�<��1#��k��`�32P5�,�Q���R�ǋOh�P�쬺?��О����J�5�o�&��C0���Α����ht׾����Q�	J";D�Z�q�v��X��bmmeA�$J̫�=��Bk������	ͦ
(��Ti�;�@�cT���ğ;bd�)9a�w�
�qm���s���U���ͼ&Q�ei�X�8V�H��<�h�T�Ijy��g��9�?1�D�l�~��ne&���;b������_�0���6��#��}T}vO�)���=�iTB�-)X��7H��=6& Y�>{�\���y��ͩ�~�kf�fM�?��6���g�	l� �~����^z)�2��a`30jq��B�^�n�봊�}�l�~��n�� �\�mL�uƃ��Jͬڰ�� �~�s������Ko_��|����p���n��3$8A�3���nH|�gI�A�:��(�Y_/?GC�����^�>��{S10�q]�=U;	��S�Jnt;�{__�1��[>3^Ȗ�dD�a�����I����%O�z]5x��F�l���F�$��,�m�K#q���Y_4!��-�y��ˎ�5�,n�]��@�:��^�g�� �d�@�=�:9�+I�ǀ�.02l١��ˉ<&F&�qh�a-���-�R��ˌ�=c��h���
8�GvqQ����Qھ�� t���g[a��� O@q�R�� �Z��f9�B��׺ ��3�?k��#f��nk���  �a?�?<2�n�0W�u����㪹~㺹q�ƐT��v<5�K{/�:�-�7�_3{������0�^�JϿ�ׁ�B���b�ɓ'�s��G&l�($�M���R\5��H > ���茰)#*im�p�["�@T��X�%Rگ�ę����y�Lp7�{p0��Q �}N\�"�=�@��\�]����83ŀ��vW͎,E�Z�1.ŏ���La�� ��K�3�8x����`�����R����l1k���Vl�rGm^���mw���V�m���K<UD[E���x,���;vl{9�/+�0�E�&����;�{?���G�#����P�O6�Xч�k�Ϭ�g���k,~�:t������G?j��pa&�A���7В.
���o`034����7����j�����/|��'��ٳ!���n������R0�*R��	K� -ڗ���M���:g+�^���`�	*%�2��{��GsʛA:3�no�|�.� �ꁻ�H��	�-�]�Ap* � ���Y�>��� �f�jks!!�Yڤ�,���x�{�f��v6sd��<+��!dCs4�NN���"�(����E�Uʘ�8�Z9X�lY���Z��2���[�����:���3�dr2_���UTuKi�Ƴ`���7�p`M��{����J��≰��ъ��u��b��?�A��z��wt� Vg�A>�Q=!�q�*8p�]�yF[|�ٗ�{����F�5� �c�P��k�p�c?�L�`��a�����A��l�A��V�x��]mX��ٚ����n�47�]ꎋ?�d.]�qp/<<�wC�;����V�����Пu# e�����q�� 3����6Β�	���p����l� �3�:U��~7.D��:tmA��8CT�*�,�W�5����)s�k׮�s��%��Қ&^iE������`8��8&�ѝ��IPi_gdvL�ײfl,Q�cQ㣨 �U/%��QC'��cK�%E�HO��n�-���1��U KSphm
�h��w��XS ����5�`��%�JE)_m�H�N��/c�	Q�{����b>?r�2���ik6���?~b�{�D���S�`�IަM��7�С�!�?����}�c������,�v��g~�e�Y�YG8æ��)}���XO�>m~�w7�d���g̗�����~�� G@���,�2�x�U�U-i���T�֓%��R��[�G�X����������߾u��6���9�Hfh4��
� S�iލ�: �,lf�`,=.�}�9R&�r<�� �&��CB���*2Ċ�~��CY^��,�c�s��ž9�T��%�R|�R�,�]�pŪ),(����b`��_���n�j�L]�-��Ͳd�g}kF,�p	uآ6��5\�\ںw�z�3�B�F3�t�}`yՒ���AX��W�O7ڝ�c dR�~��uw���e�f�؉����0T�5.%�+��_{ ����
2�:A�@�� �.d'���X��%�'���l�f���Kb��)Ĥ���D�bD1q#�	�8���o�W_{�ܼv#8��l~ԇ�{s+Ƽp��_��X,z�f%Q�d������p���Y8v�����e�\h��7�0���z`�$�+a8���m��!��sY��9���4�LJ�W��=� �ὂAɕ+W�Ԕ�VH�\���*��K-zZ>�Q�46��fg�����1*���T�ne��h�f���V(R�V�`�"--�؜��ُ�e�H���׳�VQ,��Ϧ=�c:EI��k�c�!Vɟ�z�c�Y�9P}������q�Fo�a�¿+��y���^7���8�\�4���YXi�G�� � h"��`�����}o���t�]��`�T��k�;ZI�cê%�_��:u*l��| � ���}�3��$��;@�ܹsa3�^1i�mJ�P{��{�x%X̩ݨx-��D�դA��ǭ�Z�W�Y:.�8��b�?>]��`�_ ʌ�W��)��% 4�dR���`�.����o/E�Η���T<]�����a�{�g�kk3��!îꛁ玽n��@Lf ˬ0|2w�H~�4�E�<�l w����6��E����d]��^���Y:O��6r�
l��'s�l�d�KW��9��e�u2#M{���p�h��cq髥2�6��c5��q�M�<���F� �ӆe��y��ޑ�^«��/���>Nv�>��xg����P�6�Lw��C�Zu@���VX4C�S�F#�:��S�մQI�f]��Y�B������(Iهz�U�����{s'������53�Ф*\౧{���!ν> ��^}-+E�a� ��̎� �`M-���yx�{�C\y�<�O@���0°^j��!�8<�t_�l�Q��f C��`AR���(���!+�9r�	u�m���k� ��Cqm���ヘ5G7���T�cV����~�eJ1�e�	Xj�iZ-ID����sἑ{i��� ����ya�)0���8R *>j�%����:��EiE�q�b�V�kI����(P���6+����$:��$�s,�@���낆Q�c ��I-v�־�S�_rFw7o��W!���ի��}~���6l��Q{w�I���ބS�HM�Xa��?���������M���~ظ��W%0� @���j���C0m�c�=f�z��@Z�>���ӟ��y��_��_�W^y%���x��ĥuCj�J�Q�6�^��M^L�[7�DZ�C��H��=�U��~NH7�-��,�uHr�=1Z��Mɱ	�U�?b���D�f�jM��M��7Xe�U�\��@��u��3�sAt�x/�<?�9(.��h�]�xB�5�>��-�sY����^(��󷐕�~-�P����(�D	gxP�G ؅BKd�f���]�#*�A�gbR;K,_1�CsM6ՠ�Ͳ&�H���3e>�!R�z�ha gi΍%�s�m�-�t�8�Q�	��l��D�	��>ϣ�5����Yb{�ͣ�]ݫ{�CO��T��J�3~ԓ�g��}�	�S�LJ��4!����D�9�� Lי3�̩S �XX�����dƁ��Jwn�1��]եK��w������\��욝��mmDɳA��'ְΊ}`���w]�6q��s�>���i.��qk��̭�7̵׆X8�� ��k@�v����;s��!�>L� � xB�;�?��ѻ>30�W�����9�{�U�����G�ګ��\A\�,)���5JFJ�Va��?x~t%DS�����5C,�/G*�����?�A�kh�!�0b_\��g<ѫ̍�����`>�j3y�Oj�@��
����kF�T�.�����EKzl}��^/��V�`�M�o�c0�<�VD�kI��s��K`�^d��\5 �M������D#�4р�^�(w����(����ki����P>����666�J�� ����}8C08���$n���P�s<p��ib��[+6��	�A� ���_��_6���'��?�c ���_�z `�}�j�u�8]�:��q�{��e ���A������;�������?��?�׹p�Bx~Zlٱ��P��yH�c.K��%����ru��J4��溴
�-5*�J�M|������.��tn�\�,W��k�U}Z%�]V����lO�q�R/ڏ�%�T[%�8�&��0�/�?��roud6=6��1�C ټ���&�2`���Սߞ�>��t�>�l��p�e[t:��gCt�Ɣ16�m�uq�X|�,��RO�� �T�g�
��{�-��ʵC�{|�2P��;#�����z4��R�V �ŀE��}5�MUa/V)��c�'kF�U��2����W� ���K6�>�,����>�==I��gx�i�Z-�͍�KI�6�Oc��kr���P�{術��]��=6�3'8a�7���KW�׾����w�g޸�V0Ÿ�w7�!�=sƜ|�!�;İ���͉�'��1}??6|������n��a�2k�܈���{�3��;g�C삘���ឹ7�1��uo `{{wC�y�Vx/��=T �~��~����!����p/�5}g v��y���޽.S�2����A�c�r_l�+�|�i�;xP��^�˗/��K�����q�Y�Y�S�"������28& a� 0�=�������6�qc�^@< S���=}�y��%|ij���ɤ�~0`A��d���K3�R�}��������%<�a(����.A)z�}�<%����YeвfFQ��y~ �w���!25fi�գ���c�6�T��Ҭߵ�95��Ú�Q����Z��!�H$F˩��΃�6�S o���Ǐ/����C�U�J i	V�h�燀d,��mjx!_��\�P=��s�q6C���/��~���J�#0D������l��'*^�8ݾs�|�����~@��?�����X1�P0�ͱ��7Ζ�]��}
��I�<���i��4R`�J��i,_�"#1uR�
ʦ��6���_��������#�)�brO
g(����@L�cTt�*���cKo�'�:.i�,c#���Q�U���<e]<�#��[3.�������c�ܛb�᫞�f�]� ���R��S�`�>�ݰ&�`Q�{AfYx��m��ъl|L��)k�gY�R��b�R�bdp`n|�Y�m��u����`e��6�t��r:Wc�
���`\7�$z�>�k%��ذM%�l��>~����èk�2Cl�i�K�;t�O[���$gP��z�ɧ��O?@Rd�с4����u��ұ;!��?���/������[wB�8 i� �߹�N0� �����66����1��=f����3�ǎ��'v����3�A�n���1;Ƕ���>6�q�.΂�w���6̉�����ʁ��!N�̧y2�
�_G�;7o���86��~����]L�'rGx c{��_΃a���ڄ>��?Gwٍ��ƃd2���g��l�+��Rp&���*;u��oh)/)A�>O-a��&���ߎN�i5�����>M��� _�
(o ��sV��e�]�Pl��UnTS�A�Y���}��A9��l�h2�@�%��I��A�t`r�����l����G�saq��+Z&!��!�E���n�ִ�{|\�����j���X8Pij$Ʉ�=�9���Ӕ�Ҝ
�|��`]����L��4ra����N�������n��l&G�LXN�c�o*H�&@/ �d���G�PV����r������_��_U!����F>&�0�%��x�w�M4������ ���ulv;��OHd��\����/�ˡ
�?�����; `�G^볟�l�$ �{n5��dIk���Y^R�kl�܍����<�A���n���7�s;����w�o��Z\d��d?�^�ܢ��V�k��f���V�e>G�����1�p^
~��X-KCiY���$�u��}T%vD��A\y� m�qS�Hv�>3}�m�����q/��J�.|��t��	x�Ȝ�.�/���@
c�IQiI�C�&|���h���,�,�lջ��s`�4��,K7)��'8���{����p��R��^�������yC=�����h�Ɨ��N���iO�k��9atIGd�����S�&����0{jX��>�y�³���2�xm��E�O�X���0w��1����G�����i�qk����Yf�����A
�鞱3�6�?�6[����s�������7���� 8��.�zwg�� �v��!�ſ�t3<|�eN>x�b���-}�~?2G�s3��ls�/��7 �=��8 �������a�FW ��gaY/�����y\� ��p^��B�z2 9vl�\�~�|����*_DY9W�D�� ��L=P|j,�]p-��@o90ax�^j�@��th4R ��u_~������ϨBB%�[Rܖf[j=棖�n�Yp���hO����o�p?�;e��FI�VT/�&;�D�ʱ��Ǝ��ry�It�	v���[ܥ�6Y���C���YK���T5`��/5e��L�ae��Q��T��=�SJ�{��-vmJvK��9.�o�ˣ���~�0h�=a~ؠ�ؔ�E%m�+�W�5�7:�4$� � ��,���|�+���6�P�tDݹ{�ܽ{/T�P�kӍ/Ð�l����S=h<�`\9��۷o�W_}�ܸqs:Wͯ�ʯ��ٙ3ģ>�� ��������=��Y�-�H�B�W��ժ�H�W�k�9̬�9�*�F�\�Z�=�S1gAz�G}&�M�n�
9�,��C�{���I{j:e��"8�z�����$�0IciP�7�.�J�
��/:'c,7�$���5p7�vՆ��U��h�ߑ�sW���G���� 1_������[�?���C�M����l���Tz��x�X�"�ʙ\N�Pꆽ|�..3���GHĨ̵%����*������>����
v�ZN��X�����Rz��F.yC���E�Z4U ��5І_?����s�91t��â@��L  �x��������o��ũӧ�\��ep&\��a�'ImX���s�m��.���낌b��B1q >`��5ĝM�B�=��A�x"��f��� �<L���������n �k�mnCz�#� ���tq�4�8P�����,�sspt`���! �`�F)�2�6��e2�=u/��]�O/���6�; ��n�	��S��{{�B��������b��ȉ7���]xmx-�5�|��� �*PR~
�4y�AC|`!�A֜J��ΏVh�ֿ4ʂ�G(����_-�
I&2�y�ɨ�2gEOT^,�b�QXO����l�0]T���Z�f����ݹ���NZ~�1e˩�4��Ԩ"���
�Z~&����aSF�������ֹks��O��_v	�wب��������X���ᅗ�B�:���N�N���=_ �)"n��D����M�������B L ���u��q���3��p'�X�a�{﮹9͛Ⱥv�r���ӏ�(`p�`�]�X7h���'?�������`N�`a?�"V�$ J7@�Eߒ��24�;M��f\~��ʖ��U��ޯf���VA-]F���>yP�I����+b�E,��'([m���#����%ti��x�eef�����U�X��,���V����!S��՛�%r��X�2�  :�%�EZ�A�2�����:�7\ۡ�^0I��:��j��ci���܏Fm��Z��\��]O�!`������ɊOr�nH��"��u�;��,EV�Q	��?T� ����A���a̵B 
%8���E jBB��UK�F=��5x��o�������Ϙ�c�f~�(EA�&&2,�?o��lYV�	�s�ϛ���Tfy_U�D!�@�P#����3�����?�'B��C�����	���P!Tx�
E��J�3��|��{Ι�����k��}	Ȍ�]s�^�[�[��s0�a����J���������9��q�0��A�*��O�)�m���I�Ҙ��4�t��f��r�1�`�l�>�x�x���gX�j�c;T���,�*��ϝM�65=E��1m�ڄj�?�01���`!��1�P��n���9t��x��R�q�<�s�����:mpw��7r��]{���b��&�Al�/ ���mZ7�@G�����|H�g�T�b��3�ay],HS�S1�:Q`�Ȩ�t�S��ph�6s��ږ�z�0�1�C.��p�t
0A�x-n�я��a���~��-��'��ܜeH�Q+HQ��梊���Hj&,��H�˙��IsN^$�r]�����<�5z�L=C!�䩂�I3�R3Vq1����_�xЌ�T��z����us�۴]������Ƕ�+�s�*�����vYU��,����}��?�B��V��6^t�C���[1	# >��C,���d,����Y<C,t `���� �&w�����.�������!�ݹ�9�g��E敐��p��z�u:��)�t��Z\���b����C�@��7:q/��}����}�c�P���İ=�2n�uj�U�ڨF��Z� D����ȶ2�KU6R7�V9J�GY��ZRy�Aa< ݦ\/<�����s�)}Y`��;<YC�;q�D5*E1���T�{^L��)�j̪yyv}_��8��(�IN�<=��}o��爩��͊8��i�(*�>n��h́���WP�Z��1փ<���AW,�k�s����������t�
�͞vj%���5�K�0 ��k��S�W�3҆��1�3�:��P��Iד�[~fDL��:�*l���2�Bz�a��JJ������}���*�	Q�E�{��c�L3�*UB�S^w�`"�z���_�?��?��ׯў�{xoW�V8Hy=�q��l��!��G�~6TDe2)0��T�����	 �9�զS�!�*��������h@ڨAWpM��N:fS��aF`m"�w��33��Z0g���h4�Q�b�1���Y�Y��w<�#����A$4ț��t��uZ_]�>j�=�3�0�
�%���(��=_�ʮL��lW<��U}��{0\.]���H@ �D�s����\d:�l���g�yCL
�Z_ ��p�Yq��.Td� JVͮ?�\���*���U3�#�Ai���^�=-L�m:&v�����1*J�\дf] ���q�ߗTF?�=_�a����d�<憩�͎L��0��N7mX�/E�L���u��Y������Ͱ3U��ʹU���o�EF(����0�~�0��m�0�U���\!�*f��x�	ڽ{7�](�_~���#p�=�ݼI��+t��Az�mOң�<F����E%0G\��˹Byg���'�b�[t�͓�ⷿM?��?�y�v��K�Su�U�����@��»��n��'?I�G����i�x8>%b�U'q;3{qE&�B�������ڪʼ]���M�
T��u̳�WJ�Cb��E#VPLU�ں\[V�8�(w�H���Bu�,�935��+�U
g䁏��2���f�����W^K�Z���iZ�7��3e`��
U�,��۠W��$�b������#e0K����C�����5�	,X,[��ʩR*�|���nVS+^������m��"�� C���~��}�s�l�0?.9�^A�R�jUt�dAuQ'^���R�0CP�[�pzF�9��w��`��]��U]}�Y�Ta+��ڜϴ��u߃b�w��!{�2'��h���Z���^;E�'j��<O<6:Ί�~6-�*b@fA�yO��HZ;���r+�B���D�:�9M���}����}sO�$�\]5��e_W:� ���BhW���|ڔ��=���#�i��}�U�ssi����h@(��)���Ȏ]3�:]�f��vdcu���5�@���C�ߜ#t�ģ���.����{�>�v�kVPSh(@��\(��N�8SL� Ե��J�+Vm��R�4��DqE]̳k�i�zKl�N����y}��Υ�L�L�$����a������[���]�+��>�ޖ/F��#z���/dӸ�L�)�/_,��y`�숗�����eၔeNx�6�<]TK�]ԇ�Z���V]��bn�F�L�t�>f����|�M-t�G&ڔ�cm�R(f��VpF���'�~�X�@�1rt_��e�!ͨ�t~& �:b�BH��a�_1mK����&����!�Ԧ �EI|1�uB �n x�?�8��=�{ -o�Y���_���2��u�o79�\��@��;NcS�c���=�����ߣ/�t��4m�&��|*C���wX5�����{w��}�c�z�!k�g�R]�X$c���a<��\j�3Lih�f��'1�Ku��n��8���g��ʀ�����q�JL꘥:{�Y��ޫ:9�ᐁ[�oSx����^c�����zp��V���O�㮖�&e���bE(=3S��+��Dy��zLU̢���^}]�V����A�sy�j*�@K��S�(����sJza��S��E��Ft ;`�8z
d��Z�2���dVX�k+���P�7��IA�����Ԭ��MP�����'���t\͑q�+����k(��b�'�l6��a�i�x`; ��g��,&Qʱ�"G��ٮ
������瞫E�#��*_I�@�!��e�L��9�#W�1�<�6���h�B�����!#'w��]וs���#f[0�F�9��a����\nY��X�6��3�1g6eb��ybzª;P6�j�3�i��T ��xe�䨳��N��Cxlz�h�Z'J7Gg��Q$��H��| � �@�<�d�'�k���uiˍR�z\L}Ћ�{��ssӪ<"� (��
_k��: �&��5s@��6�aD�$f���d�T�I5F}��>������\モ�奄�ƸƼɩؖ`m�F{#l8���(o�"��	;a�*�A��Fvղ*�J�[W(�U����B�>��d񬌅*�f�� ��VԼ���1<U(m�M�O����o5tNk��f
�m�b�6�;�m9f<2oc��6FW����L���Ə���b�O�9j5�km��]��U��(]0�̾}����\x>�Ѓj�	�%F� <X`������%���q�2t�o���u�׎`����Q5Y�Br��%�FP����3{i�{��;���������K������3b?��$>l@���1%#���U�Pk	�Hڪ�8l�2Uqi�I�m��ۨ��}�0����֚���}�ٯ�v9�*�z�2�B�	߱�����rPz�nm}��
���C�:�����XY��Қ��*'eD]g���U=s%��� sQ!� ����1��j�1��j��ɸ���el���c@%���r%�P�nS�D��-�d<S%~3����QЬ�c!�P�B%��K�{�y��@ѳaaw����C�z(5���JlQH�����P�cރጮt�p.��&K���w�J��;�WV�V*B�-�Q�h�%�:B�S��U{��k��3� �_�z��qv&��1�^�5�������]v:Y��x�S�5�
�'<�3\D�P׆6RϲRu��Xl�"�t%25_�my&�5K�_)���aN�t{�������"��ud�ΘЊ�>>1��G��A�����iGy�����w�:�8br �7(�f��������$\��SI�j�h ͘��s����a�^�t���c&Ɨ���7�Sxf�\��Ny�Ve���RV%�1�*	f�qg�X6??�r� |���4�����h$��������C����/w�Ln�j�����~� �7����{.Gz|-eɎXj�(���]8��x�KSɪ�C0Ss\�؉⦎=%���Y���YB�)�����k׭��.���R��V���
�YMbk
 ��8�h��glE���]��f{�U~��]
l���V�t�=
L���r���SaU[�`ؿ8x�y�81�4+��I뉻N���������Tq������{bpu݀�w>���G?B�cl�&M��Q��be�M0�x����U�,��gP7���M��'8n�ԿeN�W��E�@_���]uu�����3%�رc�e������8"x`�J�v�y)@�d�u�ڄ$R*�m����B�yB�r�m��-fk��zNJ���5��}�]���"�Ѻ�t�܄	:L]e�U�`*����3��\@ȝ�:�1��jP�Z�$�Q��v摕�6���g�-/ߦ�{�ѣ?�I�UH�F�ly�Vxܛ�2/�[���B��P�;�(���M�n��QZ!�,��`ήeT�,�O�5��t�|`��9M���!S3iZ	�(w�H!2W�
m]�,Q���n�-h��湧�c���aWj��t��J��"
�G��=~>���R��. ��*RDǨ��iRx�t��I����������VEl�U��_�<=Vs]$�@5�@;w�16�\�H���er���" :`/��B�yX�St�$�B_��waB[4��)��:n(��?G!;�}WV�!�����2ϔ C^wۼH�<ǚ��+����R����)��(؉��������.��Xc�ϩ�{���XPݜ&?��Ν;�%���� �I�-!�O�[��פU���2 �}��LL��=H&/��t�n�z�m�)7�g�w?��M��/�E@��=��/�Y�y������FGG�8bjУls0�:�Y-�&�#�66�T���S�qL''�y^�Q��L�M�(�s/��/�>,��l�ӣe���(�D7��ђ���[t2%�m+
{0zN�x`�(�z
�7���\8�LAAIְfש0B4Kn4�W�X�ۖ�9M���W�ï;��b%�������漘��w�ؔw^���0P4���Ӏ7�L�1m9q�+���ܲ_�:{ޚ"�v�����'�Z����L�.Ȕ���e]7��a���di]��ĺ!�� �;��=�x����?�A:x�(m�����_�n��5+�
����sY��]�N�&ω�G9��W�������o�6��/��h��"K��|��ӧ�����	;���}x�ǘ��D(+�SL��(�!�51lnj��aݯaC�m���Z�q�iX��_�Ͻ.w��`�\�nh��.�`lC �gh��᪗yG*�=+͝��6��~�ð�o�-�3�E�/Du6L��4 ks�I��>����)�E���k����L�^[]1 l�z�a:q�8�ݳ�A��ju�9����IB�E7��oU'W� �5 Hs�+���2�sr�˺뤻P�k�jP�|RY�<m�)ʉ!������"ʌ�m�0���C� x�,J&��(J �b��a
�P�U*��@Yf�B��B�AIL�Ģ=��~�l�KWT�3�z��Բr�����PS���� � �k�WCK\�����s��M�k��wYv옭���S_�Π��֑+����^��4cfT8���a�*���m&-���������'�kE�-N`�u]��J|A\�_�����b"}^�{���HC�_�3(��B�h X?�.��z��]Φff�u2�f�h���<95���c܅�~e�S��ҡIڱ{G�d���7m׈�'���Om`EF f�'�?��7�tԴ@�ݾ뢑�y�G���3��o|�.^��9�'��怬������(t!��k�3��3�5ߏY:��,+\��L���}��a >�S��s6Gx?D,	������8��k7�ӵ�W�����gh������枙l-�h ֜�*�x%�����}M� >>4Uc��d�/e�6�޵Y���D����'�v���%5��(i3T�&
e�3%�?ܺ \{�s�}�#�ڬ�#�������̸��\��a1�P+�j���9
�>��X��Mi�b�Ɣ�y��=?���F��M�@_ �b3B}Be�ܪ �Z�Xp����D�����e:z����GG����U_�J�Q�E���R�hibX����z#&(�,�g�M�5�d�$���[���?���o��ٖU�����:k�f�|`@ f�` �P�`���O3%�2�EU�������t��Vg���]��<�U�"��ƶ�W���ZA'�v�)��5w����N7�`-�N�V�ؙ+�P�z����!g&p��2�KgW�+�!�F��`��>���8@e����u�zbF�[���5�-����+Ǝ~誧�_�34�8Gw��9_7)��������_��ڟ�,cp]R(w�2��@9P �N����1�Tg������̙�˶�R��U��|���f�ʦ�r<��j;��6IQ'�T��H)*��_=���&�����j��-A����WQ���TE�"y�:q!+�r|��w�SeQ�S(�B��,�s5uTS0�6��z's1��nt��&��"�g�qFWk�+����Z����Ӿ}�huy�$��܍�"��*�3<��I@����ziR�`-5[X4�U N5 %��=�c�-�\��T|}��]��,�ϸ��ˀ�͟��km�w��^�޾�h;i]kn3�17Sf� ɸ�� �����Y�>N9�~�����46ǆ�yO�zFm2U����̧��ܽ�����&_?�9�3(���?:_'�ߠ��u�v����:�1��0�eJ�Sx�� �o�^Ι���G3;�d9e�k�F�=�iXzA��M��������|�!H��=lv�-��`����?x������z�2���,_����E����SF�?9J��0�:�>��5HH���h?����/�����?T��T�Mut�$��w��D>X�hmT���!�'���c� z%��\m
u'�l�G|�����>�a�`�����{^�:v�5���p�ak�צx��^VC�v�zq��R%AC�aT�����۹Љ��6Sg˩����;s���S'Oq`Ӂ`�7����A�>� �Bv�ov�&]��J��"�FB�Z 7:M��N�Ǧ͢Z@Ec&)�
�V)�\��8�ů/-P~�G���G�7��ߠ[���|��|x����n ��;�vq����f� i��1,�)��aU�a�a/-�πm%����:�:�3�����W%�jǮ����w��٧�zjj��ݻ._�ڑ�Ra�����s��P�G���#�,%R�����6y�{�V9�BطU�r�����{A���[5  �>�^��*�c��ݜ�cE0t�6�u,�uR'ߺ���lK�
���(�aD?7�����x�Z氼�V��5Sa%����C̊��$TO���+�H<�� pJ���[rGm�\b�#�!p8�����.�C��fg9�sӱ���Z����k�|΀�"g��ܸf�(o&1k��z�t��ϊ誵�8�Y��mӅ�XL �	z'w���ǫ�m��⠃T�rk��8�&�+@�� :z]�n�Zv�f�f�߃�!�M�4y�5��o����M�0OC�[��1�B@��No�;w��<P��)[Y����P�Q� �u�\�����QC�f�6�*��C��]��֋-�4�Sy�a��Ǹ��"!�:��g�!~�5 ��h&����)�����fgw��?�je�m~��p{*+"�"�-���� �ôa�	�����s���8�.خ��8�عc���&�٬{�۩�w��&�s�QN���<L�Ü�؎Q.�5�G��_S����L���Ů�;�wӷ��-z�k�Dk���;�E�"� �v����]"��|~��$��.x�+'�j[d{�d�(!�y@]��E�+�mA�Q@E�Kǻp9��Ijv�R`0W�T���*��	yH�����W�L����� ��*"�{�9��6Z�.y��J���v;z-dc��Ҭ��6�`�?�E�,:a `�a �>m��~$4X�`����K�.Tz��K�J��{�Q����`i�&֮Q��Bhd�5C���XA���gR>���6
����-ut/ ��g�,ڻ��M���"u���F�h� �ޕ���=��G�Wha�&]�z�Εu��g���I�@!p���ix�H��/�0	z�|z[��U�,�RÒ)u��P�c\��(9�U2�\��,�X�ஹ�N��D�ϸQL Y[_�o��o��ʕ;�^�<�����jߩe�Y,�v](�0FW����W���YY/���cde���\��I]Y��[�I �U8� ��b}2�Fumu�t�d6�h�[N��I6t�XW%��\��n����G��aG���$�/����+�b֠�����W��4�Tf}%s��G]�%!P��$�O���P5��k˂ ��V ����W�UJ�.^s�˰P��@?�aϙ�]����) ���U,�d27�=m�_����D��?����,2���j[�^�v����\���w��RD�lXAVP��;�s�<�c�;g����5���?�.L
P &h���A��?�£�oJ�V��18�׀�Z&~�z.I�=��kj�V���l�7�V��+Ҝ���W�7_����DEE��:�Y�}��x��Ϧ�+6a%��qC�nff��=J;�`�ƹ�6aM�A�u�9�#�u�͒	��H�ܳ�y�!/�_�ugV� !��p̻ܷ�bs���*Ga�R��%�~��XuU�v�����VE�^�s֨C@��\+����w� ͍�_��S��SDhvK���P���"ZfB�mw�E:��,jh����9��� @B�,u�,d{UAGJ�цϪ����sVS ���*K�k*�eX�ƙ�G��[�U�lg���^,�)�k�.���We},�}C�B'�����Ȁ�@��.n�E%�������i�$���k���ba��v�!�����T�6�ie���v�6*K ,XA�@�C����trLS���Cў}�o�>��@��[,�a}P�;�F��MS�a�N��/�؅��[㤽c!t�<�39��s�MM��ڼ�H���Ҏ�Iz�m�ҩ��������nnBl�'O�]w��3�޻:����p_�M٬]1-E5��
G�|-�z��TG}��Yj�% k��\D�8��]z��$�^|��_��׏g���.����G���H�ț]ƕ"#���9�����S����e|>�ҍ�E��ASY��c��Pё�(�M}���L�	l�ɝAg�[� C�����7
h|��T��Y��ײ�a��MD��B^�hK~?ueR�a����A|�ԝ:��:�lT��鎥�eB��
��7�֞gTS�����Uc�A>O�8ڊqN)��aI�x����V=x����*N�8xs���ms=��$i��?�H�˾*�0}����#��f
�VC�n�����P�� ';��f����k�r����0�֨����M�� �b���G�Njҵ�)��
�A�|���im�ia�YX��+���^u���e����!���BQ��J�&9���$Fn�e'��߱tZa��cP�Wng��|t� ��9�}Ÿ�Ɗ��v���6�$��9:����5��ǎ[�����k�i�t�̨!���:w�,�T�|�0�ޮψ�c&��=����XY�"�=.�x�l�5F.V��hee��ߘc������Q��}��jF�]7�(�s(�*���
8Q0�R)(�y��V��̠A]���yD<8���~P�$��']"g��"Z��*����ϕj�I3+Rk���L��B�<����|j����t�:�ة;��"���֑{�N�����"���Ԛ��ua�iɢ�),�i�0�M<`V�C5і?�ܐ�B��J�ɪN�%H�_��fա���C~^@X�:��}����'�Q3����o�A�l�+i<ߓۋz���݇(�0��Ez��_���/p�sǮ4e��ŗ�n�K���W��;~����g���>�\�rs�V�_�'v�{�};��ʏ��~ċ���/^d_�0|�޽{�����LY���?��b��x�Y)32��B�p����s�ZXb$D���}[�@� )�^���a�Y��MH,4`��յ��<'�M�
e8�RQ=��AB'�8⪔�*��>�qx�jf' yB��Z�Q-6z�M'%���7Æ��ڐ�G���x�n-ݢ�2%q�T�B
_�:6e�.���˭�*��^Ք;_}�����^�0L�u禊L-��V(���O�Нz{�.�U���Ι���5�����W��#*	)Sg�������>�y�8����5�M47?�^k��y��"���ʴ�u�S(rBj^'O�Y��Ò�^�~����|��CO��uV��vljVI����?�o[�]�TR+	��m���eU7#3I��.�K�+v���붍���aC���)���P�ֵ��#$��Li۬���N�e��1�M�)U��)��R" ��Y\|��p�d=�g*AusG�Z3bگ$��[���+9�}@��ϥ��^,)g�0��u7T����`�0������`��
9e�D��,���Z�0��C�[u�ļ4�2�|��Yz-'�=7B�s���?fy�x)�:�ѐ��|����MZ]Y��G-���T�������7��k��,�3Y��;EY �D �?�� �n'���<��Q���J(��j>�Tqͮ�@��.��^hJ�1�E sϣ	�Ђď��8M���ƅA�7�mf*E�͢bo�?��G���=�2��y�iK�͜ڳ��8�urʥ��{�;y����1�m�U�사��������@��/�����˲ڄ���f��h�3�#�Ez�ߦ�z:i
^|�te�`X|����"?d1Gu�豣�k��Z�Z7oS�������D�9��&Y�g�n�T>6E�������c��ݻv��}{i�J3ӳ|ͬ���?w���g?�4�O�������߾l�*�ߺJ��~��ٳ��´\/�H�ϟ?��`����:`��A�^����$����e=�(`�w�p1��O���|q`P"]!l��(V�R��?����	�&N �����A*�׋�6(��ו2!.��x-Γ$G��H�Y���ꎝ�^���q��t�tp�1�g����1G�õt� 1y�J+]�2��S@��ڄ��hz��9�aQ�D���Y4�MJ���R��Rr�d���K��Мx��`J�<C���ڜ�*EM	A�����g̭���Y$�Z6��7�H�
�
j9�4�B1��˼Mt�� 0�(�˽�Ȏ���+.\���ɩ�;w�<��J�����G��9f�|�V5(�1M7�L�%UhI�*1�v�u�ڬ��9��Z�FʶiΚ����X�j빾,X�e=��W�Y�bz��i����>���Qv����'�7���l��q�\w�j\C1E.�e���,ؾ��޴�z��Ӣ�:�����Vl��5�x6J���zzʊ�����V=D���Ԥ�c�q(Gc���Y*����;������
TI�Z������*�9����1��^>ʠ�R��k�4�����y�R��s��/^yO�u��2.�5"SE�*2d�	{� C��M_����3(tM^#�5�IH��Sw��z����E��0�h����E�:���f�WK�>�X���ކBS�t��4�F�hSO�]�6/�&;&ո�ҍ~����Z���ٶ<�R�oz�=�k��>�ѷ#����O��ol��@X�T�\�	l�Qd�,�L��Ӌ3�P,4�M�����]�X���5�;����,�|O	��K�3ssmJZ�kj]�t����W���w��������<=�Wh5�]�p���o>O�3S��C�C�{ic�2�-^�ٝ���o~�;��/���u�@�D��<��<=�%����ip�&W�����<��1RS�R�py�N:�H���*��+
������m *eD��Z|�7E�=�"��]e�}�?�������������5���\�}%iс]@5���D>S'
������5�ŷ�WJ��.�>�t"$=��U�ڸ^X ت`+���'�\͍�.X��N@����B����}������15҃�<yt��,�?�eMm�@Q	���"�aJP�(x�j֋�@��]�t+H��F �b�&�#�P+z�bM���]���y���{���+�����7#�#�1>61��[E6r&����U�lZQf��������g��A۳5���Y9v��fE��Vru���|o:JR�!UՍ)Z�up��S
��]5)�EG��tƤK&`L����ꮚȪ��M��-3�����T#�tr��b:�M���<�t��f�SQ]���)� ��:΢Y�J�n�#I��ȇ�g�u�&&�����lbD��c/�w�}��'��Gy�-Uzlf=A�&W�2��͚�3��ڎ�;��o�V��-�Z^�u� �Q���z�<gi~��g��Ȍm]^^���+���B�z�����W�<�t}d�I�I����8eeB5��_���b��e�l���Qݺfߣ[2%Ͼ��έ�.R�QK�{��o)$��٬j��$~�\W\4l��ǣ
aa�{u芩ݍQ�Hx�:��tLϮ�V3����w��PRq�m5�6,s- �)���z�����/�	�Anj�%Yidj�OT�s_�D��o��������1xP����I:|@ n��2�������^�j���*�vPi���?�鳧�CŢN��%��F6?_�a�:�k�nޤ�����;�ч���F֗hsm�ʕ9���A�������'�V{mr=77��'N��`X��0�(�BՈGd�J<+%�U�j��:�����NU�g������	Q��r�(���b�sL�Lu�����&)�5}mJ��s"�҉(�t�b�3�"�$"�f����¹�{�o�Y�$H��ݸ X�*֍�7�7lƀx�G��,��l�2����XC�*���T�`�,�a?�wc=�9���R���~�������_�6��*��b���U��4��^�<T��6� ����z�%I$�y�����N+z��`������|��NP� ���iS�xn�ה�
T�D��XLu�̙/�����С��k|�n��dEMJ��,l��U�vS)���� ,m"��z�Қ[o(��n�k�o𽼾��/�E3�z�N��3�ח���6��6�����N�:�tp��>�k�^c�h��uGM�[��ϓ�ṠgV-ޗxP?68��L�\Ǳ"5�ެ��jj8�"ױ�]܉;dZ�>:����S6�m�g}-ql�n����=��S���{�j��Q���:�^!�=(؎��l +��<�k�f<�[��^ohuu�iW���Zc��G��So� �u����6 � ��q�s_bE�����s���_o�������{���LmW��~�3�<芅kW�:V��U�a&�0~V����/R �dq:�4� *h�1�~;1%klk����y��ն^����q��VH��Ĕ{Gq.�,h��s�>�I��T�����34�N�T57�I&�L�i�Y]Wq�T��v[/5),� ���&��,3���m>0ApsÚ�vX��w ��j���I���Ao�q�w�!(��uټж��+K�������6k �Ջ�+_�=r�1zt�A�X���-:z���qtþE��_�3$� a�n+s;��O̝��c��zY*[<���y��J��_�d����d��ʦT�|۹L�$j*b[1���v'��=�m�>Op���Z�D�2������X��ƾ�.����G�S���fѽ�-�''��%!�{J.�&�	�ƹ�y~/�ՈB�����/=OBJ�����:��2~�8�AR!IBS�^��RQK;J�JTѲ��8�'�E1�R���(
�$6��!"�������2���є��Ao�*
��>8�.��~4�y)����'OS��G���E��"�hӄ�X,k�PM�*�EU��76�W/�?���G����I��>�L%�q�Т*�C�j+���R�DFJ%�I�
�U�h٬�
u	���/�!;�Y�����$=��e�3��S�H)�Ƕ���HłC)��D��Z�1V��B����~iX+c�~�uڣ���a��bj�	�Y�����a�5�f��0ɫTq+�Vf������5�(z��4Ǣ`�<�(}���g��,�q���p����LQ��;5��d��h66�ێgږ��ìb���*�IB� ��Ҋgk&�-�-��������ޮ��� �p�̸��3r���99����uWރ��u����Q����U��6�H�;I�(�󰢮�����&���M�]̴���jz����j`�)�ý C`�f�i���6�ѡ�
��ڕ*|5=��(C{�0^��u1U��M�i�T�0�Y۶MG�����u��F��QT���?�r����Z,nr;GK��Q>�N~�&n�/�ZY�ueiC�S�6�(6(C[U<��1���4��3��\�~�v�ǟ�7
��^�5pr��F�l=�B���@y�F&n�����,ҁ=�h���8?��'T��p�F	g$����{ｗ(gt��;�Q�y<%ALW4�n�:��9�\����+nyǝ.��$"��z�[�T"����y,�EJ	y���)TB�f��E\�Sݾ�+Y�_�B�} � ��z '�|"�`.���f5��jp%t���M �}{���`u@%�Y ��{W����zq"Uj�@�ԧ}:�N���y���THe�?�P�c��%*��ʡ�ae�"��?u��T3iڷ�����8�N-s���L^U��oY'V�u�֤z𤥊)�T��2M�-,v���O�JW�/��{����?3ٖ{ne��K.^������2=5u�Dz�&����Pr�[U�BZbX\��IRE����ִ� XG�u$�k��N��`�.! cZp!2�ix��C[�/��[궢�.`��u)!��P�c�2V�=�I��""�������ױNݱM$�q�R3M�������h�6�?hu1=k$��Y�����-��������_�����=��gʸ�ڵ�^8����.
���n�^���EZ1�jme�~���C��{� �%�;.����̴x[бL���:=�,������ˆ�٠����L������w)y�]��q�$�u���21p�6�{텛��|�W��ț�g����2���E�<^�Ju���qZ).�	�5.��3��V�w<�ھ�����a~�)����ۨ�)6�v��밧���N�%<��3�e1D��
�b�K��'�������gs�X���7�	Z'��덚�����H�j��ə���r�ƚbV���,���ﺣ��[,��Ǡ�Z�K|��B�'��	��w;�ګ�ӗG�+o_��s4��Y��Rp�f�,�R�|��+Wx�>f��������E����R��>��R�T������M�68���qoS<.?�+�o�>>� � *�J���1�����J��A�m��Sc,�7ݥ�DI�N�^ڠ��	r����˶
����\����F��3��6�;��~������I40��E��#*}��W(��R���dj(����>{j���&���m�2Y2��t�]�ט�f���z�Uu�'�����f��j$�^y�S �"3�K<��?��lx��R&�B3jV �(y���U� ,po��ʭ�K���cLA6�s�AX�K�$� ����c��덾t�����'��z�ۛ��T�Βd=#�63�������^�L�q�ھ��p�t��V���E��.����V��{i�4hӠ@��zN8��-�b�*���K'<��H�RsTqM�|���~zm�3j)���IS��-�r���L�ҔPH,��g�4��j��	pt �i�3Ԣo���<��ݿ@����OO>�V+� W�����7n\�4|��.�E�L�\\<\^d����M.F���e��6�.�*�(�8�b#�d�e�=�f��k,��x�z���]��v!1M-������B� ��Ч2���!�:Hq7U�/Oӧ��q�Zǀ�<a��c�)3�
�%�ajG���(N��R0?����tU]\�iݕn�ҵ���x�`P���`۝0��L:a�n�����r�lﾒ˧em��#��е�0�Z���3A8�f!�9x�$�DdhWl��3�a��"�4�LX&���XL�*���Ha�/�ϝ�j�� P�V���{�����������w�6���r�V{�Z&�@��,�"5��1�P������n��#�F��$�xH����tw*�w�Z+��~ T�������4�@�@�F���"���G��Mgg�`_����<�ŋ���Ia@+�
3��J���"�$7��+���y���L�\u���5���y0t<���3<�ۂ}P� K�e�Ycq���}aLm�����L,��ie"��E3�z�s�38U0DzuIGB:>e�?���
�+�"O.�:	p���P(����ƒ3q�T����W�˹�})��ƀ�w�̽��L�W4�$K�7�pѓD�>k���S�\��R����AQT�$U�vBd�^݌�@�u�������1q}�������>z����t:�n�^r����
z5�2��?��6+ k�T�m�䜝��a�`��D��f���C֤��J���)뀦.jz�t���)�Z=���Γ]�d�u�j�m�T;�7����+�h���R�Z�5��Q�?�]5=���J��M�]�nZ���ʐڃV=�'����
]�v�{�1�����k �E/�A9��-�bط�Wo��k7xVʞ��MZ6����-Z�
":��thG@X�3ڠ�KNLue���Tֶ<��h튯�\)�i��<����},4�g�mL�s��ae���u�B����ޣ�T��sV�h��;K�s�Zn��U[w,5[�Y���~|��k+�ԼmX<(-��{!��XM��r��>E@2��=Ѽ��]���Ǭ�6zwJs�=*s�����������<Xa������f#?��u��do_Y�����K$��c&���^'��[�B��9�vHל�,�M��X��*�Z�̕�p�fշ������
/R2ZJ�I��cj�+6x�Z���3������t�,`@%<�;��`�WqB��;P�"J���Hf B X`�Y{�/�ܒ�0��$���e��]�^:5x�2��)u�\���>��}���������ꫯ�k���s��-]��7o�9r�Ξ=�����@	�@�J)��1���_t�$�b��Aӂ )%+	`��l������9�q<D�	�t�uw] \w];�E4�y�zs]��Fhtl���/=��
`l��5*���9����y8?M��]���h��u�tw2R]�0P�P��[A�31��é�~~������6k�8�����p)��~�a^�rZ@�>aB���xߵ�IOG	s���Ɯ�vp\ӌ�@�0���E��y��O'%��?�E=/�(M��	����g���[��v^#LX���O�k,�|{�ni�����k7+������t���OONLܱcz�������6N��D�)�ߊ�[|μ6�R��g�(� X��ٚ����#�BF�0���z�F��ɀtqb0�g���$�K{
8���j�d�-y��-	M�5���*�m3))Cޘ�����5)�IAS�i���b�cJPd+���K�X��h@>0��&Ǎ���ߤg�}W��u�}f;����o��+�`ֳ��yV���Z���D�{�
[P�r�R�Z+xF����*zUV5L������-?�)G�8����bM�8&:�b��N��SE�}Rs�Ϳi_I�٘)�l[*}��~��C��Q�m�?�I�Q���]�#:7��MJ�+�,�"�/bY%�N*3�ҁ�1�d�Y�a1�BuK�Nm�5��6e�8�i�&�.s-ż�?�s?�NX�cd�hi�2���&�~Ϯ���84>91=�L	'�5~��M�y��9� \����Ir7h@�I�۫(Z����� �<t�2�@rO/�� 12��@a�CG �z��3b����
izr��8aA/���oи9�G�!kG#�-H��2 c��`X�E�������1��g�$�H��ƍ���|]�t�Μ9�$�P$ŏJw��9S0��ۉ�!�7�Ѓ糧������x�ܸ�`�}��?|~�퓁m�2+��K�w+�.����� A<b�	���☭������]�8�1��{�c��
 ��L��0�q�;��i�l����4��R�1�,��b_�O���^D���o�Q��1��s�B��P�]5{|
�jP~�J�v�)]-��|� '��:(k��x�'�����с��t��� ���;��nc�A{����tu ��N餹��z��2���PzߛMgm��4����H���g��O�(�7˼�`�ƽ�YPD�!r�*��2�T�F������ڵ�g��T�ݼq��ũ���k�w�G���EkmH�a�'�V�%�%ǽ7�05�te9�ph����A����,g1ˇ��u}���t�R��z��i
]<��`&�M�gz.-��� ac"6�F{l�@�Q�����;���������u�L�<JWMh���kd�=��o�b���a�b�~�>H����ZYRp�~�����G��t��%ZX���pk�j/<�0p.����J�gADK�3�k� �R�*�K�?�gP@�gE3�=M�a��ˇ���}�Es�Uाo���bj��>�tǸ���l��QEZQ8�m��r�����b����q#k1�nZpH\,���
 Jb�������u�~�0N7i�����U�6��a��X�@�1� �9	+V�jX��b��O��X�"fucyye���/OO�y�ĉ���ξu��;���}EU�8qH>���_���	�~�*�?��^�Hׯ^�����u�g�T��JU�:X�����o�+�L5�2���mo�L��T�,b�&w�@�CG���N���z���*��L~J ��|�N��AIM�BI c{�*���U�,��	��?LO?�4S�?�]"}�	@�Ő�nVx- rx>(�N�������=@���m4ː��JP�����'��ߡ�����Y4D��?�+���ܹ��]:gxO<O�䳥K���*��'��6��q��j�� @ ��Z!���������G�1 l�9Fc4
޼H�c�.�	d��}��7���Ӆ�
:����fP5 � ;�C�ct���)�A�_a��t���<p�F'-}Q��窫�qU�)ҝ |ഋ���y�҉^���g���`89!?)e��8囤M7-��|pMǳ���jg�qwǋ�P=�&�$��5����D��/j���T��6iI�D�|�ℶts�Y�9Ӭ�6��y�U���^�C��y�	��y^��x��m�k���Ο���W._HČ�L}��o�xp��;�\�||�i���l���8�{I¤���:ϲ,�Y�OL��8L9HD��JW�����6���o���	�'b/�k,̤mO$�Ƴh���q'-)W�'�!&I�v���5 BQ� � k7b��{j�L��i���D4�Q?4P�ݿ�?-�W���������{fue�� Cn���D�>5��uGz4�a6�/����y�[<��5�XS�ʔ��tƔ�f��1{L�z��+Ŗh��
��u�y�歝`]H�d	�a���J����PP�
�c���ܪ�����b�fRXea�8��'nx�/(H3+��U���N׮]����ʬ<�e��Bm�n���:]�z�Ν;˯��9fե��8���s�e9���6(��I����5f�Y��Θǅ#G�~��{�}x׮�Ϙ��n���a�����$�ݷ�z�-�У����
-�Z��/�w��"���W- s�M2w$4
�� -�Dw}s����2��dU�%ߙ� � ���3�c��z�}0�VU�
u�Ir��� ?P��vj ��F ��jԭ�]x�~aN��}/=��3����/79�w�������� 1�C"��Δ���v�w�^"o��}�ߤo|����ݲ�ZU&V��@��
�:��B�`%�'*������0}���)����T5=�����t���x�� \؆���т����զ���'������o����:+pv8�ERh�kl�v���Gp^YZ�K���^z����o�i�p,�-Xp�dnNR 1�Ol3Z���)Ww������1���*�nʳ�_/��bf��K�5EC�_M͌�j^ը�Y0R��[HW�A���{1��b�p(�˧�j�e�X9�&]4٦p�@K�[����L��������MT��::�Z����ϔPr��eYfq�@��w�sU��pY�f;n(*HPh'�uZ;�	뎎���j��/�z��?_X��S���D9?�8}��_��Oݷw��~��+�vP	�\���DH�ʝ!e��[��ʵ����2
~�Y�1"m�Xn�h3rN����1�h�u��K�,�<��J����Z��=�mi�f�w�R`,m��n���Z=�;j�}��Z�J:jB���i"�/�G�b�5�y��g���5�.\O���������Ӳ�9�_8k��-����¶�V�ş�9��s,��u3��f`i�i|ֈc2�*4ˀ"`�0ޫ���A�)�k�Jͪ��T�`X<���IQE�T�-5ז���9A�����Ln�5�����?<�"����ah�WvM19��v��A��;�Z��@11�߹�C��JW_�t5��yC��/�����g5r��d,d;s�͟��+��~�}HU�DAXj6,�A�_�ǅ���L�x���w>r��y�y����_�+��q�:L�짣&�ݽ��vs�^Agā0Y�D�B@XM�0�_ ���`�V�srK��e.�[Ѭ٪Us��<Ā���3&1_���3V=�J����9ڤW3=H�$ O�� z�Z��}f��w��>��O<QS�(t�B��+�0���L�s�5���=�� 6QY �{��y����3 ����ַҷX��w�K�O�����J��/<��x�sB%� ,�	x`�彴�V	L��ST�����@'��B��g�A^��O��>�+1`�	�0�L>X�|�:ek�)�\3�k��R:Hp ��A�Y�F'������.�=���=�Vzࡇ��=M��/�?}�y� �x ���} H>v�{l��mGw,��Yeq��qzf�6`�U!JG�8I�f��=��ҝ���R��j����
T��)��QOs�����J��e�\y`�)M�q��2����,�P�|�*�W��Ӗ#�D��z�~���qUw��<�M0�@Q����"�" �)�����)�I��
eG��ㅖ�2�܎C�ƀ��+W�}��������8��	�OZ^^��p���OMN�����Y���td"�]lL�T��2�mt�/ú`��T5��$mG
A�26WkM�ڨu�Lԫ-޻��=L1R���kc "��x$�H��Z�h��%�e}GL���>iZ�Bwt�O%�)�4�k3�_�z������0�f�$�#�kOS���o}�t�
����{���;l���n
����
-�,3q�ؘ��F\�9�#N�m5��2��О���v�o`E���a���ZvDBQ��������HQ�$�����x��k+ݹ6��6�_\��=(�p�+k�Z%F(Yl���;�X��w���׍K���"�7�Cp�#è��C[̰�s\w�y���!-85���{����ȑ��d@����6i��Ù>�A�}�홰��׫#V���&�J=
`�t������^=io�ڵ{v��?�0�щ���;�k��;vv�q����k�k��{�%�ol���&�n��Q2ᨖ�q�p� ���ތ�dxdҀ0$����f~0?�_���G�'�����c1>9N#�bX�\�L�,��"*��4�M����EtX�z�ѣG�C�}��d\K$�/��S!v�%JMIu��!������� ��`����N�GW�@l����'e�D]
�ЩA���hj�t�d����	n�a������E�J*��+@��3���4��}�O|�N�s�9�&ɘ;G�����PV��o��]�"�Y� �����$�}�c;��5՞C�֧���'�����_�]�t��c����ۆ�� m�]3 a\�����k�?|�v���t��Q�瓘��k�:�&!��u-�����qG�%�����kYzOM)��o�3��+9ЖU�CY%��.�*��k��Te��JU��4�v,���q�+�+�B��4�A�W^{H ��L[��Q@� Tm Vf}��)�ITa��]�x3�2C&�Xv�9���?
-}
�B���U�,�_E/f�V �S�W/^>�_�x��/�ugӭ�e�R ���˗N�LM�����:������SZ���w�z�qտn-��^Y�\>��-��#M-
�ÜUQ0�D���E*��l5/���t��^��G�=)��I�k�	єE�Y��:�ųkq�M
x)�aJ.%C�F9M������{3Mm
���4��ԽX����〹z�}�������P�����W�[Y��7��­�#�Qf���M163�6�
/���5��)�U.N(�_���˔{PX�'��{�c�b)�B.6d�\R�����h���S��9�}��-�ܬ��1��)�Qt<�v�Yi
�#EJǆD�׶Uyg��� P����ʒ�%���k[����2Qh�tG�����ks�tD�Ї���V"����c
�A��/i�ꈈ�?홰�O'����u~~*_6�(WV4	��7�=p�̛���Ǒ�Mq��A��DpLNNpB��Y˶
J�v�*�'u�Rv�.�)ǅg5�d���%�6���=�錄���kׯ���{�Dt_
]���jwp��o� ���'l��oHd�Lf� �>��O1���g�!�R_���?��c�� ��V�/A�0� �YT҄���չs���x��3����g ������ϳc��}�k_��3�Id�� �)}������d[���:�����
ղ��kHu�-y|h8B�Эm����p,~��~���}ܾN�[i|m�����y�0�΀�ʁ���mg�byn�d �Q^l�o�`}���Gh��c�o>�k��~����?��S��������2��G��*�Q�<��0j�+W�П�����_��� Iv�c~��H��%������1ɏh�c#��r!�g�mdt�r������,��aUH��%�3��ro(���r���[��\ͤ1��)�V�+�2p+k�F_a�A�?�˵��Hp�*J8d�s?��SZզĕ�jCeQ����m0�._�ä���O����&cK�yBX"W*�q��Z0E+>j���	��~�+�9i˲�ԔNm����CU�����O�?��^{��R����X���O�>��S�3Ǐ=�)�"t+���y�Z�Uе�{��@A������Z��r,�'�u"%)��
tڼ�h��J%�mjf��4r��a�8B�J��WK��1NVS��'M��� M{��*�qu?�nu�؆u��:1p!�x�F&�>,t�xf����	���΃�0C��9�/ܑ�Q˚��>V��?�YD�
�����zj�>�bR斆��~a��
���)�p���@T$�XR�R�\ŃN$JU)jc�fg�̜��o10M���a^3?�⤦�����_6�nS�_2��9.;��&���S�|��*��K���C-,`fI�i���G|̶����a�ʢ�>��Ƀ���`�`)s�\=���fI/on~4Rt����四g���ݑ�=�r�Z�ٙ��e��w2���ŋv1wTA$�.^���K4u� ��[,�Q�z��6�*7h�r���w�^Z�y����W��:95ɠ�Bbƪs^���J�WN�NJ���!��?I�\���� �-�^ �~����}�K_�n�F t	�^>O:�Eѯ%�3W=Fb>� g�V�J��@�1��:/  � ���_��_c0��|�m�^�~)nxl���~�u��s%�H�n�þ�y�6��	_�8�	H�����k�`|�T^D��!����y܀�_���yߋ[�i��Y�mܲ]ͼ˔Ì��ci~Y%�8��+�,���d�����O#+7�ve@��������ٯQ���?�ɓ���������(�kr�?x���50��<�����J47O,#޳ ��w�lb�ep�	p��pu��D`����FG<��|�{���e5�
���9���T[�5�б��:����$�v�e;�*�s��O7�����̩q�|t��&� ��ՔO?.e���ə\�>7>���D3�J+[�W���`P2��е�z������m�ʚ"�C|�b��徴��Z����W��F�4;��՞,6�Qu��⋗.]��N�y�e[�0R ��)�?O�z�f�9�g��g�f����3w_���񉤱���Y���E� �֒ Pk�گ��
_wkе�9�a����jK��6;�zߔls칳5��I-�;Tz�W�R���؊;i��`MTtc�T5}{BU+��
��Mk�>NEI�󴲶Lǎ����Ղ)��306�haq���5�+XW�A�,d
(����j�R��@��]��B�K���y�J=;��T�5<�g����Z���Ȕ���L��e�p�k���VT�T';.��.t���<�s��γ>��//�*Y��K�p"�����X�%L�Z�K���#� R]�UZ��Ɉ���I+{����WVb� ���'��2�t�� Ӡ-W���:f�核n_^�_?��@�?��$MYUu�c��Es�0�8 ` ��A��ƃW�ҕK�I���Y�/�8$�y��U*J;�2�_����h����?��_g���o~����k\]GB:53��1�.�ۉ�P*4�N_|£衇��`��` ����9}� B���/��	y�<����`�W{g`��,����N��Q�@<���a.�s��6���(�F>��3 ����+����K'/5��ɬ�����u��f��\��v�1�QW��1=���8@#�	��*TN��y���p<�������}>H��"������|X2 s�з����r�JYD�Æ�=�������Y�vz�U�-��sُ�������������kWk� *�\o�*0kJ�P,q�ggg���s�9��y��u�}_��g��E�hKᨴ�y�ћ�͹(l� 	���� '��t,��F�[{��c�e��a��u7Й���]�E�����G]��c@/�F{�w-h��(  �A�s������Яz���M�l�Юw�Z�n���'��r�s�CFR�wE���.	L�30����9+�\��(��Fg%��5����s�$��ta"�	��^x%:_�����b���?�z���m���Q�K�X��X\����u��o-Ν9{�����821>q�p���F�*s��Si�o=���Q�{�fX���T�,wU�+dC�H�/�͈�ޣM�k���V%m��=�u�RsS�9u�H(q$>�Ի�G�]���Zw�4P�sl)񐶮�V@k�9�T��v>e����bQX��8k�\�-3�V�,� ���Z�c�������*�Z�`
|�n�N���Tt@/�Q���ݰ�{kOE,B�3,S, ?�#�l���c~�r�dZ��[�H���
��t{�fQ&��i&�7���n�gw�J����0#�t�E�Vd`˂s���G�޾3�6UB��E������4�x��)O��򦭋��d��.��ǘ	�Ɂ�xF��(%)F	����*+c�y�С�/^(66ֺH@Yn~��b@T 
dY`�繳s�#����,m��q���p���N�$m\��Q���1�������'���^�.���)c@��m�&��jJJ�-���<���L����;���_�e���?�cV*D���"qFrn%˻�{�N�ݻ�ҴW�c���l���*��Z`%H~^�v�E!� c3\B���?D?Љ�l�x}����O~��@`
@LSHb����:nBY��@ �t��Z�y��z'^��8N9�C�m��N�E�R��>�/�8	�f��&���r�.]7�T��X�13��3� ����\_=�H��ż�s��@C� a�ܤѕK4�i���}����"�^\���'J7�o��k��.@������@���G����}4���9�ly��$5�ctT<�s��|߇j%�j�d�?�kVW-]�`��`p�w�N��\g��_3��]E�`kl �F�v��������e�fB����K&s%�Uv���`�i�=hxn��{2[2���ۄ�E�ƚ�ȡ���n�E���Q�z$9�֍�����mA��?�k�<�3�H[0��tM�X�ŀu�^+x�7<V+���k��"+.ٱ;K鰝�I�.����"�E��J�����"2c!�@x��_�z��O�z㿘��FDA�N� 1σ5<VΝ;�����g���g�ј��R��~a6��� 1T��"�XSd`�<P�k�|����&Q���u���Ò�(�;5�����o��)c:n�:�|��#"�؂�c͊g�H	���USc�F�=J���;j1�1�qf���`�0���������>�F�nf��t���a(\ddm1+s{�9n�Vie�x���i��.FTU(%��x�Ӭ����)��M	�gf��Z����D}�����y��!!�Rf|���Y�z���	�j:�V���PDD{[�3�mʇm��)>>�9-�����E���bu�a�n۵��0ɰN<��.������X������,u�ʪ��*�eY�T@X���J�q��E �D�8���5	g�Jl��9)�g$ ��J�dPf� �^y�Uz��3��[��ͩ]�>X���-�ay�� 6[hd�2m��Ү���/}����3�7���7����u�Pr5^��[:9m�l��&ʉ0^�Ar�����r �=�}�[�b�!�"���rǎ��~��1�q���&I�ȼ����V����u���~p��Yz� ��^{��r�Yܵ�&�8� b %���g�X��f1+���}�;Z�I����^���x�� &�<p.�w�?:p �Hz����n*�2`��m�q�:�t��M/���x��BW��q�q��3VWW�>��;���(�;M����|Į`�>����m�`?b ��[A]�0v�qE���~�Nc�zlr��#7,��+s��^���(M��~���3���_��_��j.�6��2��c�q��;�z� �t���N�'G��V��>���]|dbW?$��\ǳ��n�>P���8�k� �o�l<�E��qe{t� �������������oX�徳� 0��kKG粯��_+0�ɝ=��]��@�ED��5`{�FÙ]v�3�Z���؈�����d��.��X�K;�x�Lʹ��i�݌;n=�qP�l�8:u ^̱Q=�݈l�#]����z���! �Nn�!��HX:h���7ʟ�B�G��9�Nn�A!�㸮�x��*���<p>������K�^�+:�����ݺ|���_y�G�]EI���DtDy�:a�MZ��o������]f����e�}(�ŉFS�K��z	K��Lۡ��ۃn��m$�úV���� �V��öc�����̶9<�^
>��J%���$E�X(C3)�0%�X�T�U��2R�v�fp�Tu'M�_w�4�K�ȭL|�:�bčmޱc�ۻ�S�J�����'�팕6���mn��fŒ�S}�.��Y�Lv��:�mŅ&}��;H�Yo���x���۲��J��!�O��LϹ�Õ;p$yq'�����ճ�~�8�i|!�_�a�����]�2Q��p�-TrM�a�r��������-W� �iu�T(�I���6g�tn�Vȉ}S�J�S�F���,ns�ȏ&x Z�S^�1��B"�ׁ�*��L�i�X��W'�103�h��j � 9ErEA�O�`A3�ʥK����~���M��ՍU[5�qi�9�%R(_�����f1߸F4�3;�>O'Ng�o~��􍍏r�]/���"=���D �4�˻��nz�����^��ۿ�r���������B��8�$T�ן3�y��ȱ;i���0�i^�Sgc���s�Gҟ�S����Y���w��s�x�N�:E�}�����5�p�A�o �. c_����������mo㿁���BD�b��'tI1�<{�,	�u�ۃ�	����ߥw���~[��5s\��K/�D�?�u�я^���n�ׁx���mx�P%����t� fp&��u�s��4�P�|�����s`�$��:3�>������0w���z=̗���`����!�V�(ۘ��9?�5;'F�1�QY�D��\�9L��G���L���:ς������}���pL񽈲�����3�03Ё���y=m̝F��Vl =b��@��vZ2�tTߑ���x��U��C��/[ݭ����1I�v evȞ��(}n���\�`��9����� ne�����U��'��M'�\0���� �ShЕ�$�Ҋ�ށF�K���*7L?.7��끣�tXM�[' Qґ#�zb��@W��.�cat�zv���ӵTΉ�q�k^�]�Ity����䎤]�p�t]u�p�^v�Nd�e���׹������+KWΜ;���_{���]��A4VF�"k���﫯��ڧ;�{ƙ��
h"�o����9�Ȱ��]iڋ��^[��'�v�ˀ��N�Ku����5�ZU�Ll���0ﱶ9���0LIp���f���m5��)��|KL�c��FX+,+U�zm�-�r��Χ(���cLwl�h�OM��=P���,�_dN��ieEު�[�p���S��іTי����s~9�LIJ �1!��dIƖmٮ�U�jW{u��ow�V�{��Uj{��h JBh$���r�rNr|���N}�}Ύ8qn�}/���usݼ��7�g�o�o�ǣ��0���E�05��1榸�<��E��Z�X*I��h�_�Y�*��[���&Yu]F��,��E��v��x�ad��L��[��-	D��UJ�5�YFW���c��	��%ӥ��� `*�Ì�m&r[�$�CL���vA#7�F)̢{�Z
�m7��}��8S��/�,Iց۵\-S�r6j�ꜳa�*FN&��x�^�5S Xh��Pu�	"K������ �L!�Z�{c�v:��������4�P�z>�1*�6=��`�T�RBO�q���u�Z��+/��<���Qi�
�l�۾���<u��o�;３�72����ڵk;�86l �0(7�x=}�w>A�|�:��������(ט�|c�|�"Ò3���9z���
�+��+/��
謼�n��k�n�g�}����&A��` ����K|\دk���k����AAQ��{�����8>���8LA��E�YAt7Gv
7Β%�i��8C����B?{�Y���i�֋��a�����Z:,'��+7#�Far�6l�D}KQ~z���)
p�����g����d�J:7:E��F��y�F��:j�&�4mr�a�?�a���[i��+�13@�ѓT�������� ��Y��,��6o�{��;������O�����N����C��jz�- i�(59_d�)I�К���H��Z�����B/��	��`���{f�6m����
���`�vtf*W(�j��2ak[B���e�&����f�|��5X��:�_5��< h;���W6=9�rY���uָή�@~�4�g��N�7���Ζ"s�#��z�9K��4�(mȚs�_����T���n��0�NV�� �4e5 IS�]w�!��LU�;�믽^�����ڥ�0�x����D��b�ȑ�ёу���āo�J�[=����Ȇ]������sG�y���g}GWG_��!��YșV���
2�Śh�a�JM�!0�3�Rp��6��]�(6|�DR�Y���jW���xe�Rd�z����Ed.Bi`J�0o��_�֓�������3Q`L�9��F����.[_��F@�ˀ�k�mq[�ߖ޷����e]��\��$�ɱ �����U�&��	� �񚚧|�I�P���C����K�7��l���*�e�<�����<���v�)V�%H�r�%�=��I�ԋ�8�3n�]qc7����%j��S�cn?8?Qs���.-Sf����U!$��",�\�67	��`t�Vv�k���]�-y�m[Z�4:��3yٴ�0U����@��7���0���#f5j&�j�;�� ,+�e�����!�m(09�1��:� & P�.��rz��I��^UW�r�;�ӊf�Ͽ�즫�R ����C�2`	�"+ "��S�۫t���rYM�4F��|��{����]Q����ŸH͑m]�]8���@��}��5ax��g�qDa;��{}泟��6Q Z��I*OR��A=!�����,�2���Q
�穙�pj1�{����+�O<D�����C��֭[Ox��	�~c�!Y�:�|���(ɮ@	�ufr�k#���ˁ��^�z�V ����+���\G��r;�r�-��ÿ��䷾�8>�n��S�_1�o8�B;��ı�}����}+��� ��gH��zA?�)�V\D��5t��YzY���{vS����ԥ�3P�Y�s�O�������'?�9�Z��=T:L�q�Y���~�H���9�X��n��Vzq�Kt����N�Ơa��;�4�y}��;��N?���id�ˆ�F����*�9��[�aZq��;�'Y� �D)<S�n�EB���Ah2�~�[G��9Z>2�
����Lܑ�oHĜ�B��zF�"RB�MM�H��Pk��P�)�4ֵd�V�7R��q��'���(�uĸ�U2�,� �p.LD�A��\0rf��QL͝�����F�>͙<��W� �bh�X?� $
�S���	�&���&O�nf����7^��#�ɂ�~B?sV���z�ȈW�=�P�y��ٷ�����}wo� ^�֫KG��h����ww�.�}��k������\^hz6����̹�TT���%��=�t䜅�|�	���h����J�!�Ye�#z+_{!g>IzH��Fe�,zdŲ��C�]wV��v"s�Z���K��6 ri�Y�Is�e��l�KPfp[��F��������:�zW�ѕ�w\�Ɍ��q�rwwts�;����X��M�Y��h�,&!�I���l��Q���{;k������4'+[G^�ȇo��^B�C��̖P���\J�&I��ر����=�q�I/��'�f�����D
^o������d���젋o��z�,�7��"�x�� �y�+-9k�q�Ϻ`�n힧vc�hj7�$[i$0�b*�*� K/%1�JM��fͳ�C+/kY�n�Y�4�em|�I��G�?�a�Y\�A��+� �Zʱ)�I�}��ٵ{��g��#KSϢ�4������C�x�C�dң@�;zp'�_���s�HM��	���+��Ui�H2CX}=Pc%'͓�z�)3�CfGg������~����?�U
�L�Ri�4��S�1�]� 4r*?r9ˍwuT��o�rK���r�F�� ���t��Wӿ��_����?� `k�b�W�
���������gp�]2.�.hu��Et Mlk��e����>���I���Ԃc�L�zG�߼��:?���g� �.\D����<�Y;i�,E����6p�,hO:+G
�tSO�*���Q��)��hkP�\�:�?N/=����&gL�,[B�]=
�.�񀓌F�rA��+/o���Q*�k�֭[�z���1��XU=dgf����S@��k���d���D@��ؑ#t��quN�M5g�C2t�d��(�P4��B�$#ϙ�L;E��A1P2.����g�
F�"g ���	�&g�Iӿ�{��ŉ�i>�s
M挣�,da"���R�3|�P@�v�C�G`�oL��`(TL�*��	����&U\+��D?e�dY-���C�`��e��Q�b!}��acl:���6`�f��C�py��!�4��JS���!z����Y�P*!�2>:��Հ�#[)+����'Q����?ybۮ�;}����j\@��E'mH*Q��y��۷����+�شa����Q�;p�O�];y�-P�rj��A��("|�1_(D��̐nX'rf�F�.�H��z�tdDz����7�9�qQ|6��8H>YNr��c�lQ������ݿ,G*��� �V�,X��@����9�/+�g;��<�]3�f�\J�ۓ�=V[��������)������r��̟�3��4�̊M��ΠK঩�W��'s�������Q�:. u5\$zz�i��u��ܔ��������_�D��Od�b��Y�q�ȸ��~O����	�̚	��&�<Ţ#Al����$ ��m� &i�IR�6��(QW+�;�׋i�n���߶�Iz�<�✔��D�]]6MA2���,'߇�u����=�X�q!��Ѹt͚mP���<J*"��!
˧�0�JGV�Q�:�@E�;d� � �T��ࠣ��/^|����~��h���45�@�t����T��9��X�/���}�iۛo+��IzJZ��\r�lg�ئY�*�1�""�%$s���sO0S`19K�ޛn��>��ߧ��6����?I]
�� ���Z������0�~"x�s�i��(�����'NS5��A<���@��/���o~����ݴq#�B�j�@[�DV
c���h� �L�d�"���Y R����� �n�����WY���c�f ��ƾ3
�����N) ��_�ſcє��1��W�O�/�yH�P��q���R ��1(U����9s�樴x��ݴ{��t��!���Q����F�:��S���E�r�3h�r��+P����������-WoQ�_#o漦יL��ĝ�@⮮n�l��
о��p�$�
 )ʚ:P�u9VJe���dښ�i0`�Z%z��S��ŽS�:�����HZ�3����+�`��9��ή��_��G)�(���ͮQcT��4p#-z�`���u��#cI�S�r��V��ʃ^�0���/	w�8�X6���)�Y M�0���FL/�8��y�0wZC=�Z�
��g�n^��L͝/}�L]A,�P�p/⸑����1A>o�e?qo�ٳ��:qO���
c��W�d���4�F&��C�{��'��ϝ��&̍9 �v͚��XԮ��{tttlϾ��]�h����+>����X�
�!�(��M�Ԥv����8�a�]�y߰B����uo#t���:\���!�obL��-���QȪ{J���R9lG�K���-�4[f,-ce�ii��zd��݈�Y�I-�ΰ��������vjoi"ZY�e;��B����}<]&Yp�����a�c(c_U����~���e�(sh��M9�}� L��z6wo�)��xCZ�O�֮9w-�5�3#L�E}���:˸�aR=�sq�j�&-�o�e���`1-_z�5��h g���=
[��3K1�1�@��	�_���	��%��0�_���r$���b�0*�AdL�L���d�2w%���6��b'�pR��KEj�J�e�������\_�V[b?+ �13"�,����L��s�l3:K�`�a9J�ׇ�y���{��;dg�����6mbywP��� ��A��G?�)�+�QY�b5M���457G����;5�;�4=6N�~�:~�*�0�j䄉�/�[�I&,!�,J��o���/2O�-���\�r%}ⓟ�+�l����ߣ��5@o�4:;�׷��{7�`Md&;�%���� �oʜ��4�ִd�:���	�����/h��� #�����sF�}x  �]10=��h'���g��/�ڵk��4Bo��2�� X���B1�����M��7��N6l��$�O�۷�}�Qv2���%�*�`��mc�� I�ٱ��M�26T�J�=��̱:~�(g����4Sk���4S����X �w��ήmȂ��Lk֮U㳊�!��*���H������Xe!�V�p�B��|�9. 0i�QѾe}�����D2�a�����k6D�&j�vb��-�Z#!�)cHC�x	�HCa�]�`&ZO�s~kD8�K3iP�
\O����L9� r;��u0]��W�x�C7��]�L�8+�3���X��5�~{Ţna�i� u�����������5���Ř�@���I`ċ�<_(j���K�A=sZ���Mh�;L~�5�.�ubD|������o9����>�����k&g���w�}�ɝ�w>9�ok��+E_��p���c#Ҳ`���G�[޷����md])��s���IyUfJ|�I�}m�~O���w$Ԋ��z����#G([ޘ���Q���J��\;9�z��pde�f��zd�ŉ�<;���+�͸�p�-	\�z�uK�q�Z�,1�4��4�؎^���'�]V�0I�kf���Qm1���Z��(jd_� ��KX�(0""��M�3ށNA��m�k�����A�&��^v���X���z�do���-�􈘄d��g&��K �n=�^�I)|I��gdQmq[��U S3bv�?^ƋD:&��^N�!+�����&�2�����7j�,A�E4$8ah����T[ӳ[~�Pb1�ڶt���c�d�s�}|�\u˸�\,US,ۋ��	^���
�z���Ͼ4��0#�e�L'��b-�P�h(�'L���B��- ��o��� �t�{
������������ٖ��a��W�R�MQmf���SǼ�G�w�m��c�Owg%R�kMa�)�F�a�=���*���D:��� H��q�ŭ�ߩNF�
����-n�t�dm@e�U�[0�W��%O �9�7�TkT���r��L$���rm�j�Gi}ɖ��?��?��'ߣ߼�J$
�1XB���nS �^��n��{��ݻW;�F��5>���2`�ssL��'N��֭�H�V,W ���Q��uttq�V�B��k�NZ�~��;������P�D&N�,"��m�)tE��^p� ��t1x��1�|G'�x:}���G�#PV��U̛�蜁��ڲR���.Μ��~����+t�=w��w�N~�B
���X�����u���(�YƳg�D�'�S[�K���(\�G�t���%�r�r�sZ�/�5>�-^���3"�	�P��L�V�Lr	I2�n��7���c-�Y�Ds�>�,&i%J��#5-��i�!5�M��;��z��S$k'TJ�qBf>��|��Je��ǽ���Y.ꋣ�^>�eFپ�4�s&��9��`S��3���>v�����d9;\@H��ۣ�����㱋��b{��M�G��F���Ğ�{~2�pzX;%Ĭ,�{����V��յ]߱��{zz����;���R*��&y:H�&�����
=9�X�
�u� �Z�fAD-�G���a9j�
���u�Q	S�v5T��{e�fewک!�٣v
h���~��k0�9�s�=l1�b�=��>>�!-�2��4��#�v4pu�s������ ^����˂���z���u�R��3�W�C�41�tD���F��6C-*�|	܄N� ���'�z��Ϫ]�AN6p��q��$@���d���q��	*6��0(�(�ʇv�(�v�d�ϳ��(�_�s���L���Ŵ=G+L�5px,�Z�#�r�����Y.��aL��M?�5e��Ā1lQ�k�j!���|����1[3�I��8���a��Z�^l@����]�R3yC�4Ѫ5��ہ.�R�KBGT�dh��� �,ο[�- �Ҍ�'#�L�v6�����e?��0��`Y8� h+W��A"~�çiPM��z��t�M7Ҳ��Suz�꓃������ =��[t��)���I���~D?L3lB���_�'
�jפ�1�  췖�g�a�z�T�>�:��:f�tF�zjXr|uՙ23��P]9�T��VΆY\D��6=�&�Q�h�ɻC�a������ru���Gh�\��/�����@�N�d�(����1����� `y��2c���q�hy��b�N�>���I��N���h���Y)s�0j�za��g�����|����GFe`��M"��s:#2�cqD�c���N@�Gz������+��\���e��M�Ojah�"{�1����P��6DD�T颮�nu���}{��vU:�s2�E$�\i��
8�]=��/D��%�*�6ME��-�"�����ӝb5'���=�/O^:e Kq-1ɚY@2q���ܢiW�(�YH�Vk����D��������#G�و��)1�\\fh�&놾q\�`Is�5W�W�)0��=��d��j'Y�BNG�8C�fѨie�&$� x�m�'�>5G6d ���j���n���q�0�)rM�Z�����}��}k��/VuZ�1���f
�KE�bSxw���=�s?�s�g7nذ�CW�>P�gf������|$Y-]����!����t�0l���t2`�Pj}Qe����u?��݄���U��]���Vc�����K�4���d������Þ�!+W">�e��X�v���k7f�2w�מ;�0�?�C Y��C�gSӲm`"��ۃ��[H��퉝[7v�~��S��@Oj68L����	b9}ϋ�y�*mg��,�����۳ƍM�Bߑf�:*��|�i߃Ip�L�������8���B]f���r�P"�H�#) c�\�hE�:�*��8�UL-��������(�)�Y� uNl�'(jMcg�Z�rg�!L�G<w�5zMʂ�v�K�(����4����@U4�ql֛M�{6���#�sI@�P�R�bi`,���y�2�LGt��28p60I��S��&,��ٳ'rRA�[�x1�\���@Ĺ���w�a��+6o���kx���j���Ue :��lꔝq*�E���p��m�e�H��@� ��rRw�.�p�>���� ���M�e�`C9�~@=lB���xq)5��R5��S�i����@`��e��o9-^��j���Cԭ֛/w��ώc�Ġ�T���T��;���5[?�����:�~d�����@��_�b"&f��9��'@	@��w�sv�q�Y��^��5[h�5\|�k�Qڱ�-:{�<gF��e�ѱ�G��7ߤ�o���.��iSZ��7@$�@E$����AsC6kH�OMݼ]��N�!���lA�<W��'#4"t'�?\[�Fv�c�������75A�N�d��²^��mxT#�IK~D��8�R*�u-����(���)5p�x�)����;Y��2�!�VY�e[�.�}Z�o���(�
m�Z�=΢ ��RE�%��$�cQ%�(#�	�AV�4c��3��M��#�uTdF�.��=;�G�"���ψvpt7�f�q�L�>��8(��V�K�Кo��f���j\7�Պ�8 �a�O�8�Ͼ=�r���=�ϥX�G�BCS�)+�AQ��gN��ͫ�~{���}W\����IӔۋz�ٔ�,������J�\.Q�4'���Rd��G^&j�+̥��M��d��݇s!ٙ���$�}�����`/^{�5�u��c���h�;,��\q�lO���9|�pd��#YtP�,+H4Pͬ	���Ri����ߴso�Ϸ�G�$�}f9�:���b���!�0���<��N/+�&�2
mTz�
&�J��d�r���ph��t5%��*�R�8c&�(����:�;)yɲ4#&E���xRj�Lӷ�m�3�_������8[�mH�3[1�K�Pb��5슜ؿ�,�cR�#y=z����h��b7de�Y�g�m�l{��W�8ɀY��U8�x܋-���M��N�����]�f����5� ���ܹӛe����VT��2L� �ŏ�`���!���uJ�ܷo��)&���Έ!����s���X�=�X���o���]_xqK�wt����4��Й�#�hҕv?��-�!����l�7�!��@`Z9�}�z��[����#�kN�Ӭ@�F���M�y�s5Mw,��'ޣ�;v��S���L"cp�:�X����-�n��V��L���49��pf������T����y�]�����=�s�:q��H2�#�j�~q��"Ç'�QD��-���� ���ael�c\��}�!uad�9�i\a��@?���.�Z?r�2�������9ÉP9�P(1� ��[$�+��B��ǧ��[Z/5QHPG1G�]�̙�����Q�AB�ԭ���!z�y� ���'d?8E�k�8�҈#P:KD��.���`�O�<�o�|s.u'�Ю��rt���.Ҟ�,��S��Xd�����/U9]2ˁ�	B��C	5��Z"�X�^6�3��r�A����Da
���3<��X(��.��,z�("rˢ5�ߡ�_}c��|���C�^�#�Ԫ��V�UG<%1�Tsӻ�=���׷�/ʥ�u ��z3��i�ηj��L�B��gJ�E��$Rت��e�8Z**[a{�Ү��~�w �$��1lھ�1�3�vO�v�p�>P�#��0��&�`�($b�t���c�o���7�����Ϣ��'f�#ہ����N�����%KgoKd��ҁ2�c:�������F0)m��� r;���th���{I%3iM�C�~}nM�E�Cr��Zio��%�b*��sؠ$7~"��4�/�IR)1�eey�l]��������J����1�s�R�l@��(M���c����3G�2����v��D�"
�����E�5W�>��u�5�2W�� U!i@�Y�q���r�/��R cX�-R�YҧҸ�6�px������o6boF�x���~�����3g����K����=�8��2ĵa�^�"�~�5� �����FF�q�/�B�}�uT��a��*�s�*�R��w9��ηv�?���S1���Jj��%݈zbh�ϝ����Ӿ]��S��4}�(��R@�0uQC;g���AѮ�5X���`1]q�Ut�5�sg��	���� � c�c���0��B@
� 5�	"��m��^~��
�����S���s!���e�WӒE������֯@3ַP]w�����5���PΟlW�y��B��Oi��W�?�S
���<�����P��A��K�vuy�j�r�O8����1��R��b$���4�9��Js������
:+½ݢ�U�YR��3%�m�d��x;C:[]�K'��:@m�Ӯ~e6��4�Q2+z-`)e9BiR�n�]"�A�:�i���h���I��X;;�� L@���8q&T]�B%�{�V�e�)
� (�gߞ����k��#%�]����(�a K�#)��f �>l۶�vW*��C��'je[�j�-�O�9t�l��3�xn��'���uB��X�d�Z�}kGL�v��\�/��v�Ȣ��M��8�=Bo�k�Ҝ/W�b�{]�Y�e�������ː�%.U\�S���v���ϳ�S;ᓴ@NZ �U�Lː�9��������i�u� �3ms�C-���c4>1L+�.�%��Qu�A����E}��vh yF&h�8�ה���	�׎'nQl��� ��50��N�'�+��<t3�/���}��M�B��/��M��jv-����&9D�Dz���E�
`�R��/ه�Cv��5�0[�=���A,��E���kp�ź}�'	�m�v��>n�����A�7�znJ*:%6�����t���]w��G�m۶v�1���PIDMXf$��%���D"@E���7;w�d�8��!�0��ˣ������]��ڢHbF$̋��ucV��p��y^�Pװ�髵h�"����U
��\;1����X�R
�}�o�Nz�?����i�B,ʠ&�{yܠUˈ C�C���7h|d�/�[o��/���	*"�����&�i�M�QO7��>Lo��z�(�$��A1������-T���0Ƞ1/U`����wW^u�9�t~`;g�Px<��z�Xg�ߓܿ������������oF@��D 0�+
ę���� ��ˠ^�_������+�� W�6IAm�Ja�6�[M�׭����vtt�8���z�fP��tZ�|Y_�vw�Hψ�o�^V��b|� � � I4Xh�Ͷ#�6H�)��$%�Y�r��l��v�,�b�DwV�ٹ�bdE���v"�FV��u�\�"����?����"�e�h�e+�Pj�,���lq�Oj���};99�����~��<1
p��aZ�WV�4��p=Y�vQ�Z�����?}gbb��6_�b��u�a�(�����V�ui{���Ϊ]�cS�����KN^"r?�/+��u���;�祉;��Ķ�P���5*Yu�I����g;��6�v#b�q�{���=�-mט�]4=+�1�� 3+�5�����y�1J���3���kT�w��s����P��-��=4��<5�w�E�.��%�38�җJ7��(h�[�X��-p�i�pr�0PJ�*G�#�y����l�l-�����+ք�%����K��V�^���Y��ǽ��c��.IA�P�^X����)נ0�~h$�W�G�U)��Rܥ��,k�I��5 ��\���i��mSAdV����R�L�^�2&���F>�!d�2���v��}M ٰl���>7Ǭ����>R��	ͪH��2�UT�0QK�?8䘸!/jr bp6����e�a�c���D��D���4C��MCˡ���f��<-O(dB/��0�f��� ��@�خ�T�\K����_m{Q�(�x`�c�y��Pt+U�[���g!ѿ�Co��w���<A�=�t�W����1�'_F9��T�c��^B��o���Wp��U<0ސ�ǅ�1D�2R��o0�T�eR�w�}7m��.zc�v��7�E�|�6m\G�z�T��wxh��?���OS
��\��V�\�3 @,�9�z�-�1����Z x@�Ƹ���*��J� ��w�[o�]������3�M������n�������X������D�b`�ڰ��iZ��oˇ�p�XX�PsϽ�׹��B
�`�yE��w&tN1R�(#tͨ�V�w�c+��)����wE���g	��9Nn]�+ќZ��F�kGy�*Zo�w��]4<M���K4[Խ]�I�"�pN��,������.q<P4j�9_�`�a�GS�I���c�[?U�����$��a;�|�AK�fɆ����^{�@����E��t��f�k�hR���WҩX3�ăF�3;�q!M��� �_�s�hBl�%_9Va+� �h�o����h�ڔp�L �['l�{�e�m��.�dܬ�׳�mdQ�l��� ��1m?f�+���\�����ý��+(��V���w)�6��+n�M�Ќ7N��42�O�I�-(�Q3*�F<&�23���Υ���m��z�%�1pI�(���V?+/���JM���V2�agA�qf)p��ɹ���ˁC��m��k]R�&j��l\<�E��NvJ�Y��(!Y���&�79�=�b*�rA��A�Mu��t6�Oͤ�����%L�h��Bjiq�=7RT�OI�	*5�%��{�uk��(��\晚�Z�6000x��s�>j|i@Xx�+޺uk���/g�s�D�0+b$�V���s�	uV�P�2�%�������j� ��.c�`� �$���ܹQ�����H��Ql�}MT�T�p�0в��'��)߽���N:� K��Ӵj�jZ�t��pa���udQ�p��7Z705^j�( �g���+�Pߒ>jNT�	�B���kA��5��,[���OP�e+�a�1ވ���(�E��R3��1���g��-[�0�{��{�^��Kt^�o�մpQ/��ɉIQ��B��ei���t�D?�g�yD�5'�������d��:@3�O����	cv`�nzs�~���T�Y�#�
��f鶏\Ag~�w�;O<��-��YL3)5�r�����^b�^}��u���0��x�8
ɓp�K�4����U�e;E6`o]G�ʙ�����n�\I}�W����W}���E�$���� 5 6�?�[�v�VR��G0�V1 N@�%���um;a�ԁ$�k�tOm��vQ�4ГtZ�9���З�Ҁw6�f�Z�Y"��m�QVF�X�
��>x�W��on����N=����V���ͷ��_��*j�þ|�[_�R�XH�5�^��d��;w�����/]���at�G�=�NFܽ"B��B|f=d�o2�N��K�geJ����k'��5�.}���ƹo\3����͏���2K�k�8�v�X�-�zc.�1��ڷd�si<��_Ji�,��$�<e[��璹�
�����#�>�#X�{��j-+6W��$���&-Sv�����������*-��}���SX7
$��A?K����f��3/%�&��Lw�C�%���?�m��l�2�v������X��,�c����ԥ�"%��j��<���n=VdR�Xy�k���9;#P%���m�Dl&���}R-0=V�9��K�^R"��~�Xh��01��xfX�;?Q#�d��a�K�
&��� ���F���1=16�����N��g����:� @h��`&�Н�0Q#�L��<���  1L\� �E�C�_:�YD��K#\�ib;'�'t$�u��*�h�c�I�p1����4w3�[?GM��!�^��q:y����"�pԹǕ6`uS�����*��zW-[���m�z����;h�G�&�c1y�A��|.�G�&_��p.U@c��y��� �I�[-P��n���s�=���?��?e�ï�����������:t�e��P��]��a��
-Y��&F�t�\D�z�]��ϱ?�C�5lP��{\�Q�Z��.e����_�����r����T�MQur�ôxA�>u�ݜ���w����:
�vvVL�AG�9���{||D��)�����K�g�f�*
&OSPg~��'��\��D�gO�����1�B崥�E�Þ���URǒ?|��9GsR�1���
�~�:��y�F�rf������/��� n� �*���� �i�_�,�`s��<}�E`�KqYNAZ�-�7�a�"�s��Ns"���%�:/Q4�u2*��'�l<t�ضm/�þ��v��ɝ[�ׅ����~��+���w�]w�3�j�ؿ�G��|�o�ÌHˊQ
=1�}���ݻw~�k�	��ҵ� �)��SO�\g����_,�x��u!{�GѺb|b\*<�t
	�Q��u{/�~��!�
6����s�P��HZjH�Ll�}�
�\�i�ӥ:K S�G�$��lp&6��k��v��ML��E��{,���v}�.$8=�pP��N�{t|����/�r���r5J5z{b������B��wSǒ��/d`��$�Q7*�e7w�U�ee��i��$B�O��v��y8��X^�t|�<Gq/G��:	>BJ
u�yl F�"�2è7e��n�m�/��Ok�U+�l�-�Y��q�fY����S�ARh���Z�H5y�l��D��tܽ�l���e�B���مu\`�q�\�窘��u����\019y�豣/�?�:Gf�E?.I&�[n�%|�׼Yv>�7��d�&G���C?jĐ��� �"p̑�A6G�$q�8������#K/����U�SJ���A�ʞ�TU>"���HXT�P��Z�#4>6���wrr��*S
%��
}&ۇ�S�J'��L��hhd����E��~+u�@�dJ95�3B��3��Л����(
Vې�~�^����r�����@6����7��H7�|�:'k�;���t��witd���X�v-]wݵ<���O�A��D͙庰�)�=D� ��Ld� �eG�� ����T @uߞ���gF+�?Bk�m :s�jP���������/[F?�яi���XF�󋹋�Y���Y�K���������֛n&�9C��S,G�&��Âc��IN�j��<<Q1��7���1JD!��ң�F�^Wc<q!������s�H�wBu�x��,�F'��|�e��J�:�H�� k�b��l���b2u�`O@]��=e[rܾ{y�Ӌ�i�`�\ӶA�j��"�,JaZMά�uƨ)��J?�꠱�qz���{����|�����CXV�W KH��t�-�z��{XD[b�\���-Yo{l^F}9�D~���'��7��ΚЄ��4g �o�[��PW�Σ�����B!_��K#��3�Ϝ�X��>��UX.�`�^pqO�����M����Ki�{m��]�,��E�D ����TD�x%�u�h|�6���-E�s+��d��^�.8�:m,k��=�d�6��pv���|dQ8g���3w}6��ʨ���4j�|=���Zg�0auH�{n�&�Eb��`]�n���p V�Z�`-�,%U��>765a��%�n+�E��%y�w�bb�i� �-������l�Țp�Vq{[Y7��̞���]��oe���4��c��Uk`�8I�M�X��a��u�܏�m����\�@p:gzR�cJ�LK˂�Z�R�F��
v��ȏ�l)J&de�u�q]�ZG��΃{��>��S!��w����?](�������]�]i Q2�`E5�;��X�fI�GVd�r��@Wë1ٞK��#s6�V��߉�` c'N3�����H��D�'���M����j��C���*�1S���Tٖ�H�ݦ;J�L�2=�`%��Jg��q��x��/]H~��ʋ2��a#q��l���C*�$�S�IIe�ۏ� ��կ~������/)�����?cz��Ç�\� P*/�l��{��n�<�i��,� q�a\+�CC] @�_y�t��׳ ��v1X�+c��_<KK����S��o#g�c�Qc�,-�]F���[i��o^��u���Ϊs6�����V����p#�u�=�q�jeOQ}�=n�jb�mV�1�q�]����
���?��"�4㼊C#EٶD�d m��@�z�lu*6ڮ����w L>k:�䅬#���Kr6"`g*+���s3|E :�P�`VQ� x��u�������#SpǴL����
��΅���2�2�o��[�;�m�]k�4W91���9�������0+���ol�W����ϙ3��)[��ǜ뿮��0���x+����|%��׾�R�ɡ%�r���j�I)6����u�Ԓ���vTc*]؁1|�.-��Eu�����q,%ўnM��1"�V��,'���L �\>�r�,��`��[4'i���%vs��lJ��
��Q�:���5ktB������e���~,g���yז÷ke퀥-d#4Ga\��L޻Y���0$��.t@�]K�_V�(-�=WEٴ온%�ZU�D�y��T.B��%��y�-RߒQ��L��3�΋f��ٸ,�{�	:�\$��Hg
̈́������Vݶ�h��"�C"��g�m�3��m�VH/�㬘�2�L�8�\|�r����e��l�Y$7C�g�y$�t�Vj��5K�LCGy�w(�a��6.��?(P��1�f�s��̢S��;�{+�����4#K�n��k�(Q�j�o&~#�އgϝ;���#��S������J��e�Z���s0���o��M��/)>���|="}h�u��`�1h.E�vl܈�;YH���rÈa�6AV �ED|�ttd��7̭�� ��4_iU�E������STj4�Vopj8���c�0��2˫mU��kh�l �%�˧�!��~��@k)J��r���b�!�!�,�Q?��������:y���G�؊+�z;kԑm۶M�MH ��`[wd�dK�.��c[/�����ø�~��t��q�@�O��g�.���~z���P�:?����Խң��GԹ�Su�kStݚ�t������~�Ν��)-�]�K+�C&x	�5GSs��VY�f��L)̫������>:{������X�ԑqu=bߣl�� \���CcGO��/V��8�i
us��x���w� �1�^�Q�3�3��ud�:n�M+s5�GF K9G pE�w�������L]�:w%�:�!Cg�v���l^ �p�6A���!������NΝ����}��"�Ϟ������=��3��2G �E?����z�.4�g17P\ �-��� Xs3l�����M�R�ו�N�ZI��ժ5��+iɒ?'u����s442H�c�z:6>Jcj������J��,�} -�ui �m�RJ}��F[�C@�2��}Bs3 ���,4�׊�`#��#*������4,�a{`B[�38n�d6@V�-�`;dn6ˮC��l�̭�Ns��:9;�-,���)��Q�m���̺�R�sQ1N\"�JvB��Z�~]~�,n5�}�6^��:z+����U��a�l�� ��S~B�;Mp$-�>�"
�>ق-`�{�,��@������bg[t풟 *\���Z e�1�����Dݭ+�-�x��)��g�b�����:_��$��s�'�=x���8n��v������~��.cb�f���v� ���NFd��&�l�g�>����0��m��oM��E��$T(m�-B+|�|6�Ϝ9�wߞ=�Xqf����� ,�>�NtY=[d�8�a��A�u`�EZ�}�:����z_Tߕ��k�l���}���J"��H5Msel{L-ß��|���cr}�ha�B�!�Fҹ|.s�6R�1��N�@�SL~�;d�rF�c\�ϑ\n4��F%XprE���+80�Bs���x�Nߣi6�T7�t��� �e��~��}�{L���"�	����8v�����_����/~��0�F 4<1�]]�X9-�
�=��G�K�ه��:����S�TU�$�U���Kkh[�l��E�.YP7rS���'Բ�j8k\���PЬj�i�J*,ZOCã��'�;���/�1U��J�@ �PB%�Ҝ0.�<���.S��o�"�M���M�.�o.��2��\@"�	�e�%�����W������u�W獳t w�����ѕ$[g���Գb�z9s-��R9?95�}��/o{��NS@���/<��zO8�B��s�a�CM��MH���AJ&l��X�Yww�2��R���n� ����Z�r}������+��,MLN0 �ehhp�FF�itd�F�0S c3f��78���^����1p�v���s&�i�@�9��_���W_%��<�9�}Q��4���Ʋ؋��`�������a�[+������B���gbcm�eZ���M��kvi�-��
���e{�iQw�)��5���"����3�X�OY�}̡Fa̜�=(o���ԣ���H?�A����wJ"C�Ƈ�|�3V�k�f$�/^+ �k�<���3�.�����G�$�zN���J��Xp�E����ͱ�;+%�-%�~Nm��0�K(�����]�eR8�R2��ivY*�1�1@���D���}j�݋��5`�@	�����0A�6��x_)9���g	f ca}�ڌ���,ad��D	��.��s a�Qr�X�6s�r� �&P-d���V�@�������=/P�=���7���۟��c�\�ҁ��N��7f��\�%[iK�
��{Lnp��@I�`L���D�/oIԧ������{��k�c �l������]�v���ڟR����;v�(�M�P_������ ��i��%�b�*z�՗Ph�Zj6Ȕ0����8>Dm��[�@`�2�,��!����X_�%�j�S�& �Y"�bT�g���p|J�2� 
���3P] � ��{�7u %�D�����ou�L�+W�DF�g?�S�n�ʟ�~���O���[��x�R��{T��̧��+�Pi��������2�P���h�g�'��_9Ӷ���ia����k�:��ԙ���c��S���V�TF׈���� N�8eBձU5B�mT���=��<S���dü��.���u�(��!�6��[�K��[K�<���]  f
ȭ�#�������x��u��X��v"U������xX�7.z�Ϡ%�5b�EI fg��s�$�6�������-�]�@�_G<�4��ٰ��N�;�j�^��y�U�w����:5��o�z!��ǰ��j�b&����MZlJEn��:��ʡ��x�3Z� Pa>�\���.P�ni�"�}�/��db�vZ�&���1����aa 0�@�ǘ��k�a�ϱ~�N�I�Nv�	�]���1���\��]��֡�>��G[@��=l��-�o,����4GW��E$h�B��R���\!��a���5��LO��Z��X��}��%"����A�uNI��3�<�iP����,�(ӓϷ�G^�D9�%@O*��ȮÊU
��Z�lę�,��[���3�4�@�}\i�WH&�v��oe��I�����	ʣ��H�o�2�]C^�S��R	��Ke�
qK?�E�^�wL-���H ��`d��  aS������ ��0�tG I-���Ky��s�@�sA�OH��pJM>jN@(�f�j�U�L٩zM9��F���9��6\���3j+5���j��Z~F]�'��8�|�j� �@ټ�08ϗ|�/&f)���an�"w����r! ��'и�8�z�;�2a.�[�x6��dX��i:����҆�HU����t��YZ��
ɫ���P�(Qs�V(�v�7�K�x�N=B]����4����T,�64����nڼ�j��q4_��Y�ц\�o�Q5V
Ș��^p�<��(��4���b�t`\p�GA��XV� F�Ĳ ���L�D{�7����.���9����� 2�x�v�m� �XҴ���.Z�R�?���ʉ9E����t�u�iъeT�)`:9BMunXʺ�^�:�R��+FW52\^�����*˨�h��]���Ӌ�|�\�:sF39� ���@^�*i��auua
�V���$�Ɇ�(k�[�}��ŀ��j��2��Х9.K)`�M�����2`�6ٯ�u�4��7�tK������͜ӌ�}�����������{zV+��������3sm�ߛ������Դ�41�D}�4�Izlff&y���^@K��z1no����6 @�L���M���8�ٲw�}�~�ꫤ۹�-�Nn�P2G��A� 17"�ۤۙ����W���D@�+��N�>06m��`�Q����5a9 2��؞dð��\��a��=��p�W 4�7�<�����v�VD�l�&Ac[0D�daU�Y2dB����ɫK�����ۮ{���F��S�+�	u���v���'v��F�����4�z�jͦi{CQ��:j`׾��R�cۗ���vmQk�".Z�/H��a����wx�w��w�ld�d��ĵ>Ҡ�L��г�y-�U�`��4@Ľk�xQ�*}�����JQpt�����7qo�g�|/�����II�1�G	a��/`q�B���s ��"u_7kՙf���N�O��P4ͺ:�̀/�@��� ��b��T��Z������"3u��7�4"���[��IX��`��>Ӌ� ��3U|Xm��x
����F�~�i��T�}s��)T��V�e��Dm�a;L3�  �R�/�����ړ��H��fZ:6�(`I����Z`�SgW�mT��t�r,�/Y
����0, 0, }00<��;�C�ҧ�O���o�k�\E��+�q���1U��Rc�n����w����U@��ߴ�Je#K�k��cSG���Oc#��ҍ��H7�x3U�j<'xC�*D͸8n�B'��ı�LY���86�4�M��&�x� �x�	�3 �*0r>ŐJ]���#���y#�_z�
�I[�ݞ�E�`5`��ַ�������<�� bCj�u+ ��ѥ�_�7�xU��1�~����[i���hђ��fi���j��{e�ؠ��_�����:f�_'���_��%z��g����z,�/ L;n&�DFA���4�/�	� ��%���T�7-�1[�� T�L}��bۅ��|Q4i���kX�m2_�e� �v�����[����L���f�����LuB9�������Tmbf�Ք�̼OŲV�,��Z)��U�k_`&0�V����K/%`;��H��K��%�R]�>�j]۷���}���Ȍ����q�9�b�C L(㢮��D��|''�
5Z���w`+`^�-�-�{l�� Y�k�����c{ zo��6Q�E�R �	h�|;#�g�y���c�(X���Y1�]c.+;�%B6���f��!�W"�o���7�A����2�C�0���H��xv�D�S*)��~�/��	�����M�U�?K����W�" �ޚCv̀B	f����"i����YrY
�f�I�A]WZ�m�g7��:�v���q����]fuB?�����쨎���"�?���{[�Ǔ�DSA�fY�j]�Ajb��$�z��z��0�S��Pm������Xh�V(��@
�z��8�H�LMM����u,�0�ZW]�� 5Pb@��׀����gH(5���3
� ��QX�. ̄��l*{�ͳ]P����G� 1> 5"��e&�&L�)�M�E��I�ذ�ˤVL��p�����`eu�wA� 1�/��:t��C��6�`2B�ʐ��$\,�hbj�^y������뮠�� 5��ܰ�19H+u����444HO}�	n��lyJe�(�[���5h�I��R�ҹ������_|�.��r��8�ܷJBWMq^����E�S�o�^V�	�c!Y%PRĐ { &�W��9���X���  �E����H�}>]�b[�Fm�>tn*_��c �`���e�z�!���	ga`����������/��v��E[6oQ��ju\ki钅���r�
y�0(#�@��T��#죝;ޤ}�����(A}Q˱��(�'`Ǆ1��Ȁ�р�a���2�b��>u��5?,MT�hn�a�*�u)�׿�}��`�bA�\���X;#�	���zwX�g 6#`�>�c�,�w� �����o?���P]�a�]j���T*�
łeY�$y���V-���nn�s�/Y��y������8��٥y�&;3=3i옱3&���Ⱥ7Ta���DSd���`���@f�\.'�,�uR�$�$�e��z���n.�º1������{lA2��`|a} n���B�������-��,��8	�OX+�ϥ�
���d��[	� �"-f��ۆ������0N6 s��>�&]$�kF�Y���g(���F�����vj�n�R�KD��J�Hv�'�g2~:uC"/���h|��������O3(����iD��q�燞�?]�d����`�9E�~X�C�������"J�0Y%��9U�^Q7'�BM��Q��g5w4Q�09�ɘJ��3Bx44�����DR	 �� zԵȋNOOa{�ɩ)^? �BHX�L��F`�
�E���Lx�~��o�663��!�K�dgJbtʡW�����x'Զz��Э&���U�Ԅ����4=�<yȝ�,)Z�Z έL��8GZ7{{R�'/���eD	Y�뮻���n -|�_��;+��ޱ��-ٸ~-Z����o
ț8KW��@��_Q�z/��駨_��X,+CU�l"��*|Zѱ�Q|�?�/t��<H��2�cg���\����M],YZȯ�Xػo/K�O��q���"�'�����îa�^' b��`��!���7�Ԧz��E1Fb�p�@w�����je�x��~��'�I��e���ާ^x�3� �X/;C(�T�={�=:w����und��O�!B*��|`[Sj܆F���3�y�U��v،h90�"�/�	 L�c���Ps�*E��_���2��c��rn��8���ۮ��m��kY�=n��A�-����
�hw�~�%S��\z��*"6S(��h�v������_=�z��_����^�v�=j�:_, � �bE�ս���Ł/���j�-���kVSG�sEf/@���0#O�F�9�vB�P����=j.ChE �.�0#�%u���B;v��pYs,��P���U@���z�� KR�*��'5����@���a} e���[P�Qr�:ả3�6�`��v$� s�id��8���
�!7�ݤ�.��"�8^�9��j�2g\���$�j���AIڠ��V�L�pM��*R׈��� [h#<���$mQoG����"��WJ�b�PS�� hqٗ[��`*�,���musY��K����$�Pkj0�R�I�G�5G�:��
U����ʥR=����/)`�֢�GM����"0���U�]l�d������1j�z��}� � �R2E���� ��V�=/ ��ig'[��_���\�����9BjS\� K��?����$�+uSv�ɾW��<�&yv��Ԅ٥n �.��|���,�YrЉ��9#�#�ծ�\�R�]fg�db�����|a0�T:(3��zMA5��W^���7�>�)�,^GSC��,�3���-� �ǯ�O��k��_��<ط���Y0���Z�֭��[�Ч�,}�c�Β2�c��e��k�D��~%����ԭ�0���Kt��)6T0,�ñ�f#�">si�
%�g0:0�B	uJ����/E߈�
�&���K�Z"�'%����?��?��ڧ����t�UW���<�!�{s!"፱�.�?r�0�!�c�/D�kd	�d�2�޿Ш�L�/_9m�|���* "@�z,����pm��8vW9%E5����t�}�%���qѲ�4�b�]�X��~)��*ۗ�LX�j�K��~��r���"[�&�����,eĬ,X��>���'���_����s�=w�۰��R��m	��3��.?�'j�t}R��㺤R��.^e�Fǆh��<�m�j3��L�Դ|}����P� ��U:*ԙ�*��oW�)Fm�h�o�M��鋶|������ 0$�$��2"�$�L@�d�dYن�%ې�4y�1�� �F���<&��|�4�/<�Q(�< e��Ga;pl2�ʸHNh��M�u�\Z��\�i� �mU#�uQ2�6XNk��ג�����,>� u�γ4�4@ݷ90�'�	vE/MB<K�#����4�
���Tk��.*���z'�:�()(U�aƜ5��k�e�"�����7/p���)��I�~RK��!լ�@�^���&�&kg %�:�}`����0��u�7(/�q��`沎4�H%�A��ҳ��]v	X4jBD�&�:������,��FTM�95���k������a�+�~6`�� 5 6~���w+'|��K6���0eQm��|"�#2騍����͛9j����.n��o�~�d(C���E�3S�ӟ��/]L��.�� w�qC19I}�K�3���n��Z:x�9z����qϚ���!]�a�W�ڕ�ԥ3J͑����
���:0|���Xƽ~��_*������c���X��a��U�S�����M	��-�� 1<�h�y�q���)�}���(���GD1|�����0@��~�an��ƣG�h�ɨ��c�� �9�"����L"#��&����3�/D�qMȱ�X#{�1r�톙�\�uB-�L��KKZT�B�/���X�5߿��گ�6.+f �,��L�!�?�@��,6��~��iD������������O�x�G�oݺ���k�ݧ �r/�J�+�=�}��zduߣ52�� {608DCÃ��_D��2-P��09��r�G�� �ƍ���g%�R��h�,N�-k/��m,k�!O�Dn�෠���Q �h��͒a�eS�l�&�+[���-W!N�]@�s �z���;��U8��k�g�4a߱��a��� �v��$;(5�X��M � 5��) �c����c�g9Yަ �C�K�5O��p}�i�]ȫ��C�tX�#2_��C�P-��U�o�N��+�]�-6������ܵk�wO�:u�����G���K H�Z����(�/����H�/�2��?���/`6߀��C8��΁���[�|pt�KHEt M^�6��yS?���}��#�,XNM� i5�V����\�h�'�D|�[�d	W��M��g5��c�Ǥ#��_��� ��9$���~Ά��G�|�:hD��;ߦ�2�w�}UJe��4�e�F���1E�����Z��I=���)�|�|�ʕ�Ʊ��Q�:�$ �y����uR�{5�<���+��>���(�nH��-��W�GTr�޽�- �Q��K�1t�sB���p3c��)p3=v�T���>~b����7ɨ�������3c�J~�s���'@#z�A��R#���{���e���� &;R����[0���b�����i8� 5	��TQ$3(Qp��S�J��jl۩��6ay����x�)Q?�J����9�; ���������}0|�ٟx����o�6�b����ʖ�'J�h�)��s�裏�����#���;�k��5k�U�iq��b��)v<+�|C���.@�k�=n'��WJz�!�E��M���ZAM1!�۰�V��}��N���g�*;�$tC[�ݶe��`l�M��  ʱ��o�Q�P�0ہ9[��W6��n�,TD�	8:�d�l�x5�O 2�o��� ^$b",�o������xʆ�5	�^��c����-�/�E��F��îx�������AWDʞ�]�`���DQۄB��`��Çit|���n3-[���FjLEmV�#׮���Ɋr ��^sk���i�\���9p8S�۽g��Ç�S{������[ &�	�> 4�`�RK8�c�b3�.3���CE��A��s��Jv���w��.�$����Mv��K5A{w޹u����;Q��{=�Gz܈�-"�*5!#3g�'?�	�/8���Q�����)@R5Ү>C�9}���G�D>I��G�s�
�ߣ����zm֪��J�b�*e���c�O��:wvd� OL�V��l�����uTo����ҿ�˿Dr�0^0�����(�U�� �(�ť��4;#fG� F�kl��!C�R�۲���|��BcPE_}�U�Ӈ@�7��F�	���_=׉�z��rl�s�
ejG�x�g^E�\��*��-�]��vcQ�!4 <$�j��2��P���꺪Rz��\R��.6cv��� 5� k��qs,Y��0t�'Z�C��4K+��[`6ë%����Zk�fk�LN�,GI��L#;22~���ھ'���/���v��;�����:55��lԋ!7L�Y0M�sV�GԐ� X�󦺷�DA�H` �����G�� ��G��_`e\yu���P��a� P�
�s���$�%Bm��Ј�P�(��v��`��Qr��%K&s�Ԅ�.�`+J�N �I�?�([0D�^|�~��)|��J�1�|C�h���R� 5D��*�B	�&vcY˰o��h����ƭ�%���9�so:����?w�F�~Z�l�LG��F��(QoW���9r�J���e��d�����d�����v��	��uhĹ�s��_�z���4�'�md�>����c���{�d��/ �� �o��o¿�ۿ�2��i��V��O���s��r�T���,G::+c�zs��Ow��D���G`N7&�_|��!
��\��|�3��w�:� �s�0|���O���O~R�˩�=H�Ȁ�V#����LM���HCBc���򮠹`��wR����ҧ�5����300X�:"X��O|�H`� \�$�%���4^����s����c"�iu�o]c�nOƽ}Fm< �qI��׿N�w�O�q���[�Xc���Ȝ!#����0NBO����#Y/d�Z �؁V�l�� ]ŭ1��0�$+B���������:k�g����m����|w� ̛����8�H3.A������ox����`a
 ��v�L�Wn�/a��\�_�����ޓ�{����+
�ܹnݺ뻺;;'�'
�Z����B�Z�!z+�q�T(���gIj	8��K';+!�	�H�+QQ��%�c�BMp��Q^ �O�7 %x���K;��~'s��n�� �Ll�;g��A���]l2��������q����)R���3���~Ap
@�?�s>����'�H��m۶����B@M��p:�-b��5��4�v�Zv�Pzo�k�Կ�i;蜤w�ޠ��8-.�!��i�q��C?lm�c�z\����1Ǭ�n�O_(�(j\�d�(�t��R�o�w�c7_٩K	��iv3�d�.���Ae�lE6�I �l���	g���l̩&n����D������1��՝�[j����zq�Ǹ��뀁LbX
3� 1����%D�@	Y�,JHb�=���FJ���!��W��ޫ��k�����;���{^���w߻��Uw��;���ޭ�����~g��L�oi�g�R�@2${����|����Q���O������K/�DJ]��ZQn�Ҭw�ߟ�H��;�>����n�U�w\�j<R¹eR�h��3:�"�\��ir!4xL�i�UӦ�V�:�W����I��޽:���C��Nx@��CT@e߾}�(I6Φ'L����gI'l�ky�e�N�SQcK0���fo�U� E��{��^�D2ցх���@��rZ�*sZmQcT��b�/��, �8<Y�a0���e���?�no��F�!�o�����ƃ�u(�D���	�𪕂Y���:��Ͱ(U�ZW���}̟�n/G1(����/Y����*�0�������?���5��z�}w���ݻڛ���;:��m�Ҳ���v;�f�	R��o�>���0K.'���p�~�G�$��V�N�)�6�3�I��M�5�.��S����01�c���u8GԸ�����s
��z�u���2�ykt�3'�3O�TI+&���\#��3%>� ���<�n|�("�7n��}2qd20q������V�����<�!t�W%�6]�+����Ry�YYR����ۚUr9��V1S�=�>�j﫨�¨̎⨗��RA�NU,�VG������6�5ۨ�U��T;jUM`R����,�y+rXn�~�uI�e5�`�ɋ7��= �j�i���lF���s�,O�b�E��:���m�uQ}4d��(¤Ȼ�������`H�q�S�����Æ�s
�a�:��_������uǻߥn�s���jU�iU��t�f{�êۤ���E�o&��^Y5p�W:|@���?u��m����h�ah�����6�?���!�1y��t������9S��?�=5�V&��m�a�0��F��8�'��a\#�\H��o~���:�����X����Y0�P��>#�M�����G�7bΌY��c@�~��I6g]M���yl����I�����\b�����z�0Վ�mֺ�2z��1S-��n|����ﲋ�Ō��r
��0�����jr����<��i�14������ܾ�������������ڎ��]�;�_6᳚��Ʀ���Lr~~V��4R���#���i\��K��I�Ȏ&��4���/�j�>8	�0A/�ݖ�9�<�23��� 2S��h��#�]��rI�����se���hL��N�d'*���q\�4���L�!ϙS�9J�u�|/�Y�L'���)���^*�#D����-jێmjqhF��׫��n�㙃�8�:;�C� �R�nP4	��P��H�,ͭ	���FV��v_ ,_&R�@D�#9�nk� K��z�e뽞r6�(�z��K	�T��V���8�4�J�`&�,�ɩɩ�ƛ�P ͊�,����@�/�۰r�G�=�l���7�2� � E��'�#fHM�G�F"$(4�U��ܳ����j�uoQ�]��o���t�ֶMȑF_+����W���ԴN�8u�$m{���	���b���4 ��?�aMV���5��{��%��ˆŬ��e&x��BzO͆��Q���^ifTҌ�q] ' ��B�%� ��fu �X�SYp�x Ã#�`����#҆�;�}�^b��mq<f�2���Y�j��<�ab<�L&��D7рo���H6��{|y��5��!*�k�����>fU��D��
��o��.���z�K�zw�}��Nը7�0� d��'_E��_)a�R���߼w������,����;v�hjo�{ۍ7^w�-�~����=Y���m�hR�l��C&�ky�_�T5��K�4=�yŠ�t�H���A>3+-G�$%�$�`�%0����6'f����C2Ꚁ�Se/II`$A�Yw�Ǒ�fL����y]n*���TEN��J��YN��H��w���ƺl�-
��^5�d�y�L'�[o�^�;AK���-t�F`t�	���t��"J��W>�7�y>6[�ϒ{`Jb����	ΨU�oiP�o���6��q/&@��p�P�ָ ����V좀0Qf��W�%��:���_�&Q��I�,�,����"�o��F�m���2A�%r�)~P�H�{�G��?�yĠ�{��߭��� ��K7�$Є��؈U�;�Zh���I �]min�ut!x� ��R}��"����'�)�`w L��  `���N�����g?�{k��G?�׃�4imm
�v���fZ�YGfK-4�D�&�����rP��0� YH�AZ
�ADr��I�ŵ�{�e<0a0�߂n�=��t1]24�-{w9�f�����<���.b����7�y5�-B������^�=�c >l����K j���mK���ܧ�P�0IV����+�ja]箻����~�dm0SΞ~��8@�+3���16�m�vliy	4��x�v�t�M����~+]���۶o�k-�,���1�-�lA�0��-+@�f���%�%s="��t�a.�H�4Df���뭘E�S��O�-ήH�8O��J�K �g'#r�0]�L9��O	���M��d�#V�"��bzy8��l��'�� �1� 4 _����)�,ݮ8�^XB�����ڔ�������&{�+�̝��u���jy)��[Pc腵_�v�����}!�Vba~��f�k��Q8�RIP&���Ԍ���IN� x� b��6�lVϮj�1u	�a3#m~�yU���	3�`R��5�,Ǆ%'���E�͟��[&9C"kzL� �2��?C��Ńm(x�w@i#҂����TP?��� Q( �_|�P��)$��҈z��%�524H
�.)b���AQg�s���f��}�SL�1G�}�@N���M2q��,��5r��q��-��H��Os;��N����n��Mz3y ���ʅ�B�p��oY|� �M�`=�9�u���&�2�G�T����u^� ����p��(	����sFk�fV�Q{,ٹs���$i�͔#�3��6DmϜ9�^�T�KT�Xl�E.�߷�� �����y��b�������9ɖ*)U��� �n��m����=w�u��vl�ywSC�V��w.���'SjzfJ�~���ax��	�k������A	 �.��t�pZ��bp� F�=3�� M��\��b�Q��dhu��H�23
T�_�_��&��\b���A�TI� kh%I���3����
�b������%2K���H6�H	L�l��tMP���,�� �%� �����OR��&m�S��jD�_s=�m�kq��9�z���qB~�g�z�"`k���(�<��kF�V������	+�W��Q�oFt�ZѨj�߯���&�6h�Ⱦ7%�� 좁0#�� 1ӕ��1!*U�Q��{qqq���TcC�E�\	�TP�h���٬{����K"���C��� E�\���������=�:�!K-�U-���L�ȩ�4��G!��������-�	<y~��@��`A3  �G}�����@���1���J	�4�(��5�3`��@I.��� ���EE�L�^u�s� ({D����,���}d�yo8�F���4�^ia�����>>>�#�3�<�yIe��!
��Y��n�e�U���QG��&XB��cǎ%6�H�J�S���בK4���S������O���<a'l�PI��1�g��a��%���^��<���{?�]������i�v>l�T�XO:vN�q�u���k��{�����o�y�/�~Y�0���g�%�o�z�HH�r�'r��m�NF�g�'��Az��L�Л�i�F�|1p���K�QI�i��sd��)�l/��^`l/D �� �s�[&�Y4+�J������{�U��L 5�*y8C�P;�L�>B:��J��s,�36}����;Qxs�8Z	֬.S����{ �t�~F�k].�e:�l�^Ї�q�
i#0+.�(D=���T�^L�7�C�	��	�6mԾ�y�����_�:��@�Q�_JE�T�h��)'G�V���&H�fh�Z��C)3bc�!��Q�^'=c�oѣ������5{"&(9���Q24F�"��6!�Y`���"�C/�� ��g����]�:x���X�����?��fs�g 0l'�HK�k�밧LFecQL��$�����6�r�s��W؊�9F�4e�'����(�<_ާd ������$)���/o"<z_������/٫�l��|�;$^1�0� XF��ź�Q�渜�D����~��m10׾v��}^L�(�޽{mM�%e�� c�,��ֈ2,x�w�}���_ocS�;��l� �H��#0؝>uJ����Z }�s�v�}�:e��xG�z1v��������?\���|J$a���0��m�8b}�s�`K�#vб�Xm@��{�E�k� �~�&I�!i��=��d����.�/�+�`�}�}��!��sD� ��:��G$�}�/�1Y�u�ڠ��*�3�������}��L�|��5=�iZ���jҭEz�+�ݖ���
�]�M�S�v�����~_94���ˉ �U�����P�[�=����(�ȷ���@׬Q�����!ǵ"Rj� �� ��B����R&]Q ��HX��L���f��KH6��x�,RE��l�u�A��3�b� X�7�f�'H���r� �2OJ��4�fdL�i��[$5��/9��Bu`��� }�x]�d!"��;�S�+�>	`����)0nkQ`AUܨ��0� ���7��n�If�
�x��q�@�g?��6�HSĹ�2�%��������yɚ9	��GӤg��%�7��s2��蚌x�ue
�ym��ٌ����\�|y�'-�犍�D��Є�����������D:y�ȭ����4L�����w������][�Pp\͂�	3�A��������( &�c�w�Q1�?�я�|�3���o��Cm�-�#�՜�e��8��.4e��hCҢ��]:�]�Yp�ap��� o���≁3�I�v�R'��CU��d��L�f�����e��s
�R�TX��㥊�(�&	�$�cpL�c>����q�E ɴ=��y�42��9��p3e8� e��e�!	�x߈X!��'�q���m[G���ڭ�\��h^�5 ��� ʆ�38�e�P�s��	-bh���9�Θa�cQ3O�t��ֈ�"A��}[��~����\�{���vVx����M�I~/�fhY������jm*����J#����b��7㶗m�|�_����Z[�U[K�.��/ҩ^�H������e X�|18#吘��'c8�N�:$X��a����1Ԧ�4#j��/H9D����^���a��
��߮�j0�3<x��0ɦ��
���7��&x[a�9
�/���������p8� �$StOl}�Lo��@آV��6��y�M�e�4[�<�(]��� V+�2?K�eKQ5#~�0k����dc6��e�y@���Ç{U�=V�8�b��h
�	���=���=�Tb�FT��^z��;��;��g�oo�喏��w~�@�v�'�s(�Y����2}ǀ��ߦ�BA�[N����Ҳ�C���UGT$���g�`�-���Le��ì�5Y~ q�O��?�6L"u:�p}��P�Dn���weQ��`yg�V�_5�1��@�'´=�`Qp?���Mj@��8�#� � _ ½��r���(���P ��J.��u�2$�{NG�j�=�y]X\SӦ�/U���õ./��:7�g�|����d��g������=۫v�ܡ�پ��&k��ۚP��X�Ͳ�q��y�-����x����>���vҹ.-,,���M�_=��G�~g-�+�J3$^΀Ŀ��ӂ�R���絎�t=�v*y�K��%d�ܥ�D���,��^�T'�V���c�ភ"���s����#@,��5�T1@Y�M�iffz���uE��H&$ 0�[2%C�0�,A+2��2}=��Dh����ϫ��K��=�����X�S�O,P�ܯ��;8g����O����D!86����~�z�l`-�G��	2L+k�Lo/�1�IPez�llN2Ȓ�@��K�DH %���.m�����εe������{��A�-�_�9~� �eϥ��ƨd�8y�	���hdH�'����/�w�ygϺg����K���w_��>����v�m��h�ݺ�ڛ
=��Q�	}2 J��W�Jx��v1$ BdaQ�������jllD�`�����F����Q:�x��eI}/utGP�h=�E_rb;@%��I�
3%���YQ�� ���qm�i_ f �ج�f9ԓ�G6��Z*�"�L6koq~�^�b:�58�Ps�㧒5���a{W2adZ��T�I����@!@7>� � L�MM[�vCGt�*]>��JzI>|D���	� @I*e�gF/x�|���dQ��9d��l����6�dƕ�t��>�:::z���������A����R鈗#��j 䑿�;? -�Nfs:��H��kw�R=��4HQL�0y_��H����K����T۰�X@�{Ao<D��&�5a�an�1e�Z�D�ar�� `��zxxdr��kΓ򼁽�ý	�Lo��tɂg�#��H8�]����� \��`$<t�f�����-��w�K{N�f�P�T�`po #��qD�`�b�:��7��4�f.`����|	¢sF�WW��
�S	�x;�����n(#x�1��@l�%��!��ȥ\ƃ ~��<��������c���ܜ����@�q��U�li�\4�c" x'N��`�!D��)�}�Z��\�&|��rQ1��$��?�����mmm�G����C)r�B�:0�a �AL�́����_`�Ɣ�"�5���HG#�a8�ج���zQ�� M66XSW���R��4�������g��1Hc�%��=B���[C�y�Q����[ X"���^b�B4qe%�A ]�{��i�L�!�ȤSM�sJ{��t���9fs�Z+4UM��=x�hf=�l��$*�oq��Y�^	���w6dRLզUkں��\��+���s���_;.Q��L�Nk��V��<��eM!��e�^>g���X���<D��[�qE�B��)�uD®HP����/��5�%���<���k�C��o��_��xA��N�<�a��D�������|�#�JG���������({����t9��@�	��c��W����?胝�ȑ#�2�%JOY&���۱c�3��6���h��dv&i�l�ÌxH��x��  o�>KF��i0��0��TG��`���E�i0j��B�
d0Y0��Ć�����'H{�Rŀ�憟l�"X6&C�k��IϬ4&0�]	\��4�% ��Pz9�w۳5?� DF�L��Z.co*G�x�b0������`�#p�l��qZ�}_��Xg���L��J��+�T���e�ш:Jp~Ha� 2��ˉ�������>R���]����{��#�N�.�~�IF-ǎ��o��u��[跹�������-�Z(�3f+�@'&5�n5�B�� B���o�k����i�^n���I,�⶞�Q�R�pт�P�FˆȬ�e��GӸM�C�熆z�x���
�����G����	�5�`D}4������F���e�Ho��Uf0�ځ�Z+��q��3���l��M*��C����L�y�ҫ���~�?�+��4L%��
;&� C� �,.4������K�Z��d���W��|&x�}/��8p_0^	�ǋa���~�����>�Ѹ�����Q^��w1�:0a�r1#`��ׂ]y����=*������m�����r���0��^q���ipA��|X�,�	����v�zF�p���[�#� ���VN���?�S>�;��N_˨�����F�dѵLQ�?���ɕ�}�{�n��ݻw���R�[���L[��MV?���J�

��0��#6bX i�ܳ�ġw��3&Dư.���IZxFx�x{�0�;���q}���<Z�j`�� ���Ɍv���t>��e�RIo�Y�&�_�@C�+���#A�̟�PKjz�L^���w��s���9�i����R�0����yzF�ht�m�E䋎��i����g��I���=��Y�D(g���M=���e)�1P�{�^q�9�܅3�6n�x�����}�?��Qu��wD�y�W��թ'N|����/���n��t���b�F˶�F��.����m��4v�I����A���ſ;n���&B`��y8.ЬKE��d�J��2S���Z��&k�$+����}�ܹM�����"G�b��`���5�j�}�TX뵨#xk�A�� ҕ� ������6E������;�K����vWg�&	
��B�͓����h�6.:C*C�
&�:?"�#�k�Ʉ�,�vp0.   &
Ͳ����QGD]�P���M�q}����:�G��5�)��xl��S�FTq�W���F��ا�{�A�(�w�ѾDN���UAĐ{��4:�q����# ��:z�<�^N�Rvw�R��8��@X%�|������}N+2��bje��M%��W�.\���w�q��������,~.%P�y�b�2���a�d��g�u�Յ1bv,�$���E#Z��o��)&���izz:��q�Gk�Ȕ��-�.k�Xћ���`��~&03��f�ʌ�IJpϒJ\F�x`#SdIcƠ���#�*D��C�{=��\s��x��0%��.�}�Jd�r��l��[�;6دO�p�'?�I��gyO��Y[Qs���d*��8qr��pm�����'�x�d�-�����r4��<M�j�gN u�׶�Եm�6L��#����Z �zzz��]�!���DkCCcSssS�tI��CLU��� 8`��Ȍ�K`�@�L��M'�Y�#�g&��]v�05���3�t���v��9�xiT�#�h�1���X�S��Y][������!��LkJ��J;i6��)��Zx�N+D����M��c#z�{qqsjԬ%���%�PE����1�7R���2k�l5`�<���f�+0�m�,��p������W�n�}���.�?~�ő������;4000��E�'��pM����Q``P������)8'����G�-@�FC,�n�����³�>���[o=GF����=�V>l�l��ذHv=6ZP` >��#*��*��4��a?2�8	 �`s�=�Yx�k�H$��Ғ�4&��yX�T@���v�Z^zs%}7(�>ȹ	�L�|6ll�ɘHM�|�J S9XX�U���Avtt���gϾA��Ϣ���<t<���}�<�䓧UtJ`��ŕs��3#c�9;q򦗨�j�Z��}���߿@Ӳ h��I��u�v�j���j#0�J���ι��P[GGGOgg�V�/=�:��H���<E�O�~�\�����]2�ũv2%��"O��4�ףI�a��2�^��H'��E���z�b�#�Ps�*�9�{!\�m9�o�P���P^�3=�dz�Hm���l5�:��߲�E����H��Q+����5`�����%k֦���&�e���r����;�k9��)�ܠ�{�rDS����2�%�F�:������s�=wtxxxV؛��$4�`��0�~����ɉI�Ԝ8�&bQ��3�XB�ǎ{mbbb��o�YR���.�GH��t �?��n��-3rfKs��������T���,Vz+e:�́��n�Oب�m�fL�G�P��KT/.��J/�L	4��o7Y	\�q�������i�Ҕ���)�����m���6MB���@!�N���1���_~���3g�,D ��t����T4,3�ĉ��1[K���'l�b G�`�ԩS�4�����4O&	�m���n!��L���tR=��7=���[��H���Vm�Aq}2��?jHg%��l�8�?��H��`c���	�s٦�l��v�l�,k�͚2iۤӒ#/l#��L}g���#%H�3���&n2�@Ӭy�DKH ��sϞ:]�681�n��V��C�R����Kx�x#H%L��}NUDZ�����Mgx�8��_���&�Eu��f5�b�&�#v���Kt _(M��5k��sx�r�N?��%�w��_|chhh� ^�lRܞ`N�8v�Ni(�S�nlppp|jj��~��d ?A��	�%1�J�F�.A�Y�$#:Q�͢h��-�&\q��*m�j� �M5S�̚+���d8dCf�]��6Y%� I��z�|��B�_X+0F��	 +D�h���Wh;|��8::z��0�/777�+�B��P�Vk|||�ȑ#�1@������aQ�;����0nQ�/�����/9������I�s�V̶��� �0��K��v��iUL(��{C{{{#MͤߚHOՓ��B��f� g4m%�J����;�#���GF�����H���O�S;em�ipDKL�[+	|�Ȏɸ'�_�X��tv��XL[#q�x�<L;*m8�U���m�]���g��₎j�%��!�
����5_��,���V����)U���u^�S�F�����%���� �/�;��sIGTe�6q�ggg��;�/ _�%��T��qF9	��{�{��''�]��4�y��,x.���_~�����s�n8E��?��k��a�`z�d����b���qs�i($�b�d���}H�b��JO���X9�pI�dF�8b%��