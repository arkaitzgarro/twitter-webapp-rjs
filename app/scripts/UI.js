define('UI', ['jquery', 'handlebars'], function($, Handlebars){
    'use strict';

    console.log('UI module started');

    var showTweetsList = function(tweets) {
        var $list = $('#twitter-list');

        var listTpl = $('#list-tpl').html();
        var template = Handlebars.compile(listTpl);
        var html = template({tweets : tweets});

        $list.html(html);
    };

    return {
        showTweetsList : showTweetsList
    };
});