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
        var app, ctrl, srv, DB;

        before(function(done){
            require(['App', 'Controller', 'Service', 'Data'], function(App, Controller, Service, Data){
                app = App;
                ctrl = Controller;
                srv = Service;
                DB = Data;

                DB.init();
                DB.subscribe(ctrl);
                DB.clear(function(){
                    done();
                });
            });
        });

        beforeEach(function(done){
            sinon.spy(srv, 'getTweets');
            sinon.spy(DB, 'addTweets');
            
            done();
        });

        afterEach(function(done){
            srv.getTweets.restore();
            DB.addTweets.restore();

            done();
        });

        describe('#getTweetsFromTwitter', function () {
            it('Get all tweets from Twitter and save to DB', function (done) {
                ctrl.getTweetsFromTwitter(function(){
                    assert.isTrue(DB.addTweets.calledOnce, 'addTweets not called');
                    DB.getTweets(function(tweets){
                        assert.equal(100, tweets.length);
                        done();
                    });
                }, function(err){
                    throw err;
                });
                assert.isTrue(srv.getTweets.calledOnce, 'getTweets not called');
            });
        });
    });
})();
