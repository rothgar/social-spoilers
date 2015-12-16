$(function(){

  // save blacklist click handler
  $('#saveBlacklist').click(function(event){
    var blacklist = $('#blacklist').val().split(/\n/);
    console.log(blacklist);
    chrome.storage.sync.set({'blacklist': blacklist}, function() {
      console.log('blacklist saved');
      window.close();
    });
  });
});
