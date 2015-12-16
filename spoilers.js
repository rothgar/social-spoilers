// ==UserScript==
// @name          Social Spoilers
// @namespace     http://justingarrison.com
// @description   Hide spoilers on twitter
// @include       http://www.twitter.com/
// @version       0.1
// ==/UserScript==

// Regex to match what I need /\^[a-zA-Z0-9:.,?! ]+[^#|^|@|\$]/g

var blacklist = ["#StarWars","#TTY","foo"];

function loadBlacklist() {
  chrome.storage.sync.get('blacklist', function(list){
    blacklist = list.blacklist;
  });
}

// loadBlacklist();

// Save all tweets
a = $('.stream-container li[id|="stream-item-tweet"]');

// read tweet content
a.each(function() {
  var $content = $(this).find('div > div.content > p');
  var text = $content.text();
  if(text.match(/\^.+\^/)) {
    var newText = text.replace(/\^.+\^/g, ['<span class="spoiler">', text.match(/\^.+\^/), '</span>'].join(''))

    // target this class if you want to do something with the whole tweet
    $content.addClass('tweet-spoiler')
    $content.html(newText)
  };
  // loop blacklist
  blacklist.forEach(function(regex) {
    if(text.toLowerCase().match(regex.toLowerCase())) {
      var newText = text.replace(/.*/, ['<span class="spoiler">', text, '</span>'].join(''))
      var newnewText = newText.toLowerCase().replace(regex.toLowerCase(), ['</span>', regex, '<span class="spoiler">'].join(''))
      $content.html(newnewText)
      $content.addClass('tweet-spoiler')
    };
  });
});
