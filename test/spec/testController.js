/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl : '../../app/scripts/',
        paths : {
            // jquery: '../bower_components/jquery/dist/jquery',
        },
        shim : {
            // 'ydn-db': {
            //     exports : 'ydn'
            // }
        }
    });

    describe('Controller module', function () {
        var ctrl, srv, DB;

        before(function(done){
            require(['Data'], function(data){
                DB = data;

                DB.clear(function(){
                    done();
                });
            });
        });

        beforeEach(function(done){
            require(['Controller', 'Service', 'Data'], function(Controller, Service, Data){
                ctrl = Controller;
                srv = Service;
                DB = Data;

                sinon.spy(srv, 'getTweets');
                sinon.spy(DB, 'addTweets');
                done();
            });
        });

        // afterEach(function(done){
        //     done();
        // });

        describe('#getTweetsFromTwitter', function () {
            it('Get all tweets from Twitter and save to DB', function (done) {
                ctrl.getTweetsFromTwitter();
                assert.isTrue(srv.getTweets.calledOnce, 'getTweets not called');
                assert.isTrue(DB.addTweets.calledOnce, 'addTweets not called');
                // DB.getTweets(function(tweets){
                //     assert.equal(100, tweets.length);
                // });
            });
        });
    });
})();
