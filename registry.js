module.exports = {
  components: {
   'startadbprovision': require('./autodb/createAdb'),
   'startdbprovision': require('./autodb/createDb'),
   'listAllDatabases' : require('./autodb/listAllDatabases')
  }
};
