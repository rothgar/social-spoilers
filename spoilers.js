// ==UserScript==
// @name          Social Spoilers
// @author        @rothgar
// @namespace     http://justingarrison.com
// @description   Hide spoilers on social networks
// @version       0.0.1
// ==/UserScript==

// sample list
var blacklist = ["#StarWars","#TTY","foo","baz"];

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
  var html = $content.html();
  var text = $content.text();

  // only run this match for manual spoiler tagging
  if(text.match(/\^.+\^/)) {
    var newText = text.replace(/\^.+\^?/g, ['<span class="spoiler">', text.match(/\^.+\^?/g), '</span>'].join(''));

    // target this class if you want to do something with the whole tweet
    $content.addClass('tweet-spoiler');
    $content.html(newText);
  };

  // loop blacklist
  blacklist.forEach(function(regex) {
    if(regex.match(/^#.+/)) {
      // slice the hashtag because twitter wraps it in <b>
      if(html.toLowerCase().match(regex.slice(1).toLowerCase())) {
        var newText = html.replace(/.*/, ['<span class="spoiler">', html, '</span>'].join(''));
        var $newText = $(newText);
        var hashtags = $newText.find('.twitter-hashtag');
        hashtags.each(function(idx, hashtag, arr) {
          var outerhtml = hashtag.outerHTML;
          var newnewText = newText.replace(outerhtml, ['</span>', outerhtml, '<span class="spoiler">'].join(''));
          $content.html(newnewText);
        });
        $content.addClass('tweet-spoiler');
      };
    // regular text matching
    } else {
      if(text.toLowerCase().match(regex.toLowerCase())) {
        var newText = text.replace(regex, ['<span class="spoiler">', text.match(regex), '</span>'].join(''));
        $content.html(newText);
      };
    };
  });
});
