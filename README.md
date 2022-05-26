A JavaScript library for editing PDF files.

Use
---

For development server-side with node: cpdf.js / cpdflib.js

(Minified versions cpdf.min.js and cpdflib.min.js)

Load with "const cpdf = require('cpdf.js')" if installed in npm, or "const cpdf
= require('./cpdf.js')" to load from current directory.

For development client-side with the browser : cpdf.browser.js

(Minified version for deployment : cpdf.browser.min.js)

Load with <script src="cpdf.browser.js"></script> or similar.


Documentation
-------------

1. cpdfjsmanual.pdf contains the API documentation interleaved with the cpdf.js
   API. This is the primary source of documentation:

   https://coherentpdf.com/cpdfjsmanual.pdf

   The command line tools can be found at:

   https://community.coherentpdf.com/

2. API documentation online at https://www.coherentpdf.com/jscpdf/index.html


Concurrency
-----------

cpdf.js is synchronous and non-re-entrant.


Data types
----------

Arguments are integers, floating point numbers, strings, or arrays of type
UInt8Array. Page ranges are represented by arrays of numbers.


Memory Management
-----------------

A PDF n must be explicitly deallocated with deletePdf(n).


Errors
------

Any function may raise an exception, containing a string describing the problem. 


Examples
--------

Server-side: cpdflibtest.js tests every function in cpdf.js.

Client-side: index.html is an interactive browser example.


Contact
-------

https://www.coherentpdf.com/

For commercial licenses, email contact@coherentgraphics.co.uk
