define('Controller', ['Data', 'Service'], function(DB, srv){
    'use strict';

    var getTweetsFromTwitter = function() {
        srv.getTweets({}, processTweets, error);
    };

    var processTweets = function(data) {
        var tweets = [];

        if(data && data.statuses && data.statuses.length > 0) {
            for (var i = data.statuses.length - 1; i >= 0; i--) {
                var tweet = {
                    id : data.statuses[i].id_str,
                    text : data.statuses[i].text,
                    created_at : new Date(data.statuses[i].created_at),
                    user : {
                        id : data.statuses[i].user.id_str,
                        name : data.statuses[i].user.name,
                        image : data.statuses[i].user.profile_image_url
                    }
                };
                tweets.push(tweet);
            };
            
            DB.addTweets(tweets);
        }
    };

    var error = function(){

    };

    return {
        getTweetsFromTwitter : getTweetsFromTwitter
    };
});