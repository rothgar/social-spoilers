$(function(){

  // save blacklist click handler
  $('#saveBlacklist').click(function(event){
    var blacklist = $('#userBlacklist').val().split(/\n/);
    console.log(blacklist);
    chrome.storage.sync.set({'list': blacklist}, function() {
      if (chrome.runtime.error) {
        console.log("Error saving blacklist");
      }
      console.log('blacklist saved');
    });
    //window.close();
  });
});

document.body.onload = function() {
    chrome.storage.sync.get('list', function(items) {
      if (!chrome.runtime.error) {
        console.log(items.list);
        $('userBlacklist').val(items.list);
      }
      console.log('blacklist loaded');
    });
  };
