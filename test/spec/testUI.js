/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl : '../../app/scripts/',
        paths : {
            jquery: '../bower_components/jquery/dist/jquery',
            handlebars: '../bower_components/handlebars.js/dist/handlebars',
        },
        shim : {
            handlebars: {
                exports : 'Handlebars'
            }
        }
    });

    describe('UI module', function () {
        var UI, ctrl, DB, $;

        before(function(done){
            require(['UI', 'Controller', 'Data', 'jquery'], function(ui, Controller, data, jQuery){
                UI = ui;
                ctrl = Controller;
                DB = data;
                $ = jQuery;

                DB.init();
                DB.clear(function(){
                    done();
                });
            });
        });

        // afterEach(function(done){
        //     $.ajax.restore();
        //     done();
        // });

        describe('#showTweetsList', function () {
            it('One tweet is correctly printed', function () {
                UI.showTweetsList([
                    {id : 1, text : 'Testing showTweetsList method'}
                ]);
                assert.equal($('#twitter-list').children().length, 1);
            });
            it('All tweets are correctly printed', function () {
                ctrl.getTweetsFromTwitter(function(){
                    DB.getTweets(function(tweets){
                        UI.showTweetsList(tweets);
                        assert.equal($('#twitter-list').children().length, 100);
                    });
                });
            });
        });
    });
})();
