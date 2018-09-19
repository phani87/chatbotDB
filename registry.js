module.exports = {
  components: {
    // PizzaBot
    //'AgeChecker': require('./pizza/age_checker')

    //autodbbot
   'startadbprovision': require('./autodb/createAdb'),
   'startdbprovision': require('./autodb/createDb'),
   'listAllDatabases' : require('./autodb/listAllDatabases')
  }
};
