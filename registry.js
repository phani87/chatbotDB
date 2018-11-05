module.exports = {
  components: {
   'startadbprovision': require('./autodb/createAdb'),
   'startdbprovision': require('./autodb/createDb'),
   'listAllAdb' : require('./autodb/listAllAdb'),
   'listAvailabilityDomains': require('./autodb/listAvailabilityDomains'),
   'listDbShapes': require('./autodb/listDbShapes'),
   'listDbVersion': require('./autodb/listDbVersion'),
   'listSubnets': require('./autodb/listSubnets'),
   'getAdb':require('./autodb/getAdb'),
   'killAdb': require('./autodb/killAdb'),
   'scaleAdb': require('./autodb/scaleAdb'),
   'getAdbWallet': require('./autodb/getAdbWallet'),
   'sendEmail' : require('./autodb/sendEmail'),
   'createDb': require('./autodb/createDb')
  }
};
