define('Events', ['quo', 'Controller'], function($, Controller){
    'use strict';

    $(document).on('datachange', Controller.showLatestTweets);
    $(document).on('click', '.twitter-list li.arrow', Controller.showDetail);
    $(document).on('singleTap', '.twitter-list li.arrow', Controller.showDetail);
});