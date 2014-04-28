/* global describe, it */

(function () {
    'use strict';

    require.config({
        baseUrl : '../../app/scripts/',
        paths : {
            jquery: '../bower_components/jquery/dist/jquery',
            handlebars: '../bower_components/handlebars.js/dist/handlebars',
            'ydn-db' : '../bower_components/ydn-db/jsc/ydn.db-dev',
        },
        shim : {
            handlebars: {
                exports : 'Handlebars'
            },
            'ydn-db': {
                exports : 'ydn'
            }
        }
    });

    describe('Events module', function () {
        var events, ctrl, DB, $;

        before(function(done){
            require(['Events', 'Controller', 'Data', 'jquery'], function(Events, Controller, Data, jQuery){
                events = Events;
                ctrl = Controller;
                DB = Data;
                $ = jQuery;

                DB.init();
                DB.clear(function(){
                    done();
                });
            });
        });

        beforeEach(function(done){
            sinon.spy(ctrl, 'showLatestTweets');
            done();
        });

        afterEach(function(done){
            ctrl.showLatestTweets.restore();
            done();
        });

        describe('#showLatestTweets', function () {
            it('Event datachange is fired', function (done) {
                var errTimeout = setTimeout(function () {
                    assert(false, 'Event never fired');
                    done();
                }, 1000);

                $(document).on('datachange', function(){
                    clearTimeout(errTimeout);
                    assert(true);
                    done();
                });
                document.dispatchEvent(new Event('datachange'));
            });
        });
    });
})();
