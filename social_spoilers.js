// ==UserScript==
// @name          Social Spoilers
// @namespace     http://justingarrison.com
// @description   Hide spoilers on twitter
// @include       http://www.twitter.com/
// @version       0.1
// ==/UserScript==

// Regex to match what I need /\^[a-zA-Z0-9:.,?! ]+[^#|^|@|\$]/g

// A sample text to match <p class="js-tweet-text tweet-text">RT <a href="/NetAppGeek" class="twitter-atreply pretty-link" dir="ltr" ><s>@</s><b>NetAppGeek</b></a> I enjoy ^filenames with the dotted circle ( ? ) the interrobang ( ? ) and^ my fave: irony punctuation ( ? ) &lt; This = The worst!</p>