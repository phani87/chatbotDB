module.exports = {
  components: {
   'startadbprovision': require('./autodb/createAdb'),
   'startdbprovision': require('./autodb/createDb'),
   'listAllDatabases' : require('./autodb/listAllDatabases'),
   'listAvailabilityDomains': require('./autodb/listAvailabilityDomains'),
   'listDbShapes': require('./autodb/listDbShapes'),
   'listDbVersion': require('./autodb/listDbVersion'),
   'listSubnets': require('./autodb/listSubnets'),
   'createDb': require('./autodb/createDb')
  }
};
