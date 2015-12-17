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

function matchHashtag(hashtag) {
  var newText = text.replace(/.*/, ['<span class="spoiler">', text, '</span>'].join(''));
  var $newText = $(newText);
  var hashtags = $newText.find('.twitter-hashflag-container');
  hashtags.each(function(idx, hashtag, arr) {
    var outerhtml = hashtag.outerHTML;
    var newnewText = newText.replace(outerhtml, ['</span>', outerhtml, '<span class="spoiler">'].join(''));
    $content.html(newnewText);
  });
};

// loadBlacklist();

// Save all tweets
a = $('.stream-container li[id|="stream-item-tweet"]');

// read tweet content
a.each(function() {
  var $content = $(this).find('div > div.content > p');
  var regexText = $content.text;
  if(regexText.match(/\^.+\^/)) {
    var newText = regexText.replace(/\^.+\^/g, ['<span class="spoiler">', regexText.match(/\^.+\^/), '</span>'].join(''))

    // target this class if you want to do something with the whole tweet
    $content.addClass('tweet-spoiler')
    $content.html(newText)
  };
  // loop blacklist
  blacklist.forEach(function(regex) {
      // need special selection for hashtags
      if(regex.match(/^#.+/)) {
        var text = $content.html();
        matchHashtag(regex);
      } else {
        var text = $content.text;
        console.log(regex);
        if(text.toLowerCase().match(regex.toLowerCase())) {
      };

      $content.addClass('tweet-spoiler')
    };
  });
});
