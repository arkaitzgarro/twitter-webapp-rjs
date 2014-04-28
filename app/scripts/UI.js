define('UI', ['quo', 'handlebars'], function($, Handlebars){
    'use strict';

    console.log('UI module started');

    var showTweetsList = function(tweets) {
        var $list = $('.twitter-list');

        $list.find('.main-loading').remove();

        var tpl = Handlebars.getTemplate('twitter-list');
        $list.find('ul').html(tpl({tweets : tweets}));
    };

    var showDetail = function(tweet) {
        var tpl = Handlebars.getTemplate('twitter-detail');

        $('#twitter-detail').remove();
        $('body').append(tpl(tweet));

        Lungo.Router.section('twitter-detail');
    };

    Handlebars.getTemplate = function(name){
        if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
            var response = $.ajax({
                url : '/app/views/' + name + '.hbs',
                error : function(xhr, type) {
                    console.error('[UI error loading template ' + name + ']');
                    console.error(xhr, type);
                },
                dataType: 'html',
                async : false
            });

            if (Handlebars.templates === undefined) {
                Handlebars.templates = {};
            }
            Handlebars.templates[name] = Handlebars.compile(response);
        }

        return Handlebars.templates[name];
    };

    return {
        showTweetsList : showTweetsList,
        showDetail : showDetail
    };
});