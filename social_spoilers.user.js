// ==UserScript==
// @name         social-spoilers
// @namespace    
// @include      twitter.com
// @author       Justin Garrison
// @description  This userscript hides spoilers on social networking sites.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
  jQ('p.js-tweet-text.tweet-text').filter(function() { return /\^[a-zA-Z0-9:.,?! ]+[^#+^?@?\$]/.test(this.name); });
}

// load jQuery and execute the main function
addJQuery(main);