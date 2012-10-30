
// A Little Function to Make Values Constant
// http://stackoverflow.com/a/8596808/237904
function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

// Basic Regexes
// =============
//
define('letters_only', /^[a-zA-z]+$/i);

// URL Regexes
// ===========
// Based off [Gruber's](http://daringfireball.net/2010/07/improved_regex_for_matching_urls). 
// Changes I made:
// 1. Move `(?i)` to `/i` for JS.
// 2. Escape all `/`s.
// 3. Made non-capturing groups capturing.
// 4. Added `^` and `$` anchors instead of `\b`.
define('url', /^(([a-z][\w-]+:(\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)([^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))$/i);
define('web_url', /^((https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)([^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))$/i);
