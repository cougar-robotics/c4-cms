C4
===

[![Build Status](https://secure.travis-ci.org/digitxp/c4-cms.png?branch=master)](http://travis-ci.org/digitxp/c4-cms)

Basically, C4 is a CMS designed to make several common tasks easier for my
robotics team. The basic premise of the CMS is 1) for bragging rights, and 2)
because I see a lot of people that don't use our existing Wordpress
installation because the login system is just plain dumb, the interface
designed for the administrators of the site rather than the writers, etc. etc.

Goals
-----

- To make writing content and uploading photos as fun as possible
- To make the site easier to organize by introducing a simpler page model
- To impress people :-)

The Name
--------

There's not much to it. I named it C4 because, CMS, Cougar, Camping, all start
with C. More importantly, I named it for good luck. Like an actor is wished
a broken leg for good luck, this app is named C4 in hopes that it won't explode
into a million pieces in production.

Installing
----------

1. Install [node.js](nodejs.org)
2. Install dependencies (`npm install`)
3. Create a CouchDB database (this is the hard part)
4. Run (`npm start`)

Testing
-------

`npm test`

License
-------

Copyright (C) 2012 Casey Chow. Licensed under the MIT license on the condition
that this software is not used for evil.
