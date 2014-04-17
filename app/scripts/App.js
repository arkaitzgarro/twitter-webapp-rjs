define(['Controller', 'Data'], function(Controller, Data) {
    console.log('App started');

    // Init Data module
    Data.init();
    // Subscribe to data changes
    Data.subscribe(Controller);
});