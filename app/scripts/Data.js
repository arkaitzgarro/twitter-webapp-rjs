define('Data', ['ydn-db'], function(ydn) {
    'use strict';
    
    console.log('Data module started');

    var latestData = [],
        lastFilter = {},
        db;

    var cfg = {
        dbName : 'TwitterDB',
        keyPath : 'id',
        tweetTable : 'twitter',
        limit : 50
    };

    var init = function() {
        lastFilter.limit = cfg.limit;
        if(!db) {
            db = new ydn.db.Storage(cfg.dbName, {
                stores : [{
                    name : cfg.tweetTable,
                    keyPath : cfg.keyPath
                }]
            });
        }
    };

    /**
     * Get latest tweets and notify to subscribers
     * @param  Object filter Query conditions
     */
    var prepareData = function(filter) {
        var where = [],
            sql,
            req;

        latestData = [];

        // TODO: prepare the query
        if(filter.search) {
            where.push('text LIKE "%' + filter.search + '%"');
        }

        sql = 'SELECT * FROM ' + cfg.tweetTable;
        if(where.length) {
            sql += ' WHERE ' + where.join(' AND ');
        }

        if(filter.limit) {
            sql += ' LIMIT ' + filter.limit;
        }

        req = db.executeSql(sql);
        req.done(function(results){
            latestData = results;

            // Notify data change to subscribers
            notifyAll();
        });
        req.fail(function(err){
            throw err;
        });
    };

    /**
     * Get latest query data
     * @return Array Results
     */
    var getLatestData = function() {
        return latestData;
    };

    var addTweet = function(tweet, success, error) {
        var req = db.add({name: cfg.tweetTable, keyPath: cfg.keyPath}, tweet);
        req.done(function(){
            // Refresh data according to new earthquakes
            // prepareData(lastFilter);
            notifyAll();
            success();
        });
        req.fail(error);
    };

    var addTweets = function(tweets, success, error) {
        var req = db.add({name: cfg.tweetTable, keyPath: cfg.keyPath}, tweets);
        req.done(function(keys){
            // Refresh data according to new earthquakes
            prepareData(lastFilter);
            success(keys);
        });
        req.fail(error);
    };

    var getTweet = function(id, success, error) {
        var req = db.get(cfg.tweetTable, id);
        req.done(success);
        req.fail(error);
    };

    var getTweets = function(success, error) {
        var req = db.values(cfg.tweetTable);
        req.done(success);
        req.fail(error);
    };

    var updateTweet = function(tweet, success, error) {
        getTweet(tweet.id, function(t){
            if(t) {
                var req = db.put({name: cfg.tweetTable, keyPath: cfg.keyPath}, tweet);
                req.done(success);
                req.fail(error);
            } else {
                error('There is no tweet with id ' + tweet.id);
            }
        }, error);
    };

    var removeTweet = function(id, success, error){
        getTweet(id, function(tweet) {
            if(tweet) {
                var req = db.remove(cfg.tweetTable, id);
                req.done(success);
                req.fail(error);
            } else {
                error('There is no tweet with id ' + id);
            }
        });
    };

    var clear = function(success, error){
        var req = db.clear(cfg.tweetTable);
        req.done(success);
        req.fail(error);        
    };

    var notifyAll = function() {
        var event = new Event('datachange');
        document.dispatchEvent(event);
    };

    return {
        init : init,
        addTweet : addTweet,
        addTweets : addTweets,
        getTweet : getTweet,
        getTweets : getTweets,
        updateTweet : updateTweet,
        removeTweet : removeTweet,
        clear : clear,
        getLatestData : getLatestData
    };
});