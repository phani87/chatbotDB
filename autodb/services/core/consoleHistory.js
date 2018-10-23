var ocirest = require('../../ocirest.js');
var endpoint = require('../../configs/endpoints.js');

function capture( auth, parameters, callback ) {
    ocirest.process( auth,
                     { path : auth.RESTversion + '/instanceConsoleHistories/',
                       host : endpoint.service.core[auth.region],
                       method : 'POST',
                       body : parameters.body,
                       'opc-retry-token' : parameters['opc-retry-token'] },
                      callback )
  };

function drop( auth, parameters, callback ) {
    ocirest.process( auth,
                     { path : auth.RESTversion + 
                      '/instanceConsoleHistories/' + encodeURIComponent(parameters.instanceConsoleHistoryId),
                       host : endpoint.service.core[auth.region],
                       method : 'DELETE',
                       'if-match' : parameters['if-match'] },
                      callback )
  };

function get( auth, parameters, callback ) {
    ocirest.process( auth, 
                     { path : auth.RESTversion + 
                              '/instanceConsoleHistories/' + encodeURIComponent(parameters.instanceConsoleHistoryId),
                       host : endpoint.service.core[auth.region],
                       method : 'GET' }, 
                     callback );
  };

function getContent( auth, parameters, callback ) {
    var query = '';
    if ( 'offset' in parameters )
      query = query + (query==''?'?':'&') + 'offset=' + encodeURIComponent(parameters.offset);
    if ( 'length' in parameters )
      query = query + (query==''?'?':'&') + 'length=' + encodeURIComponent(parameters.length);
    ocirest.process( auth, 
                     { path : auth.RESTversion + 
                              '/instanceConsoleHistories/' + encodeURIComponent(parameters.instanceConsoleHistoryId) +
                              '/data' + query,
                       host : endpoint.service.core[auth.region],
                       method : 'GET' }, 
                     callback );
  };


function list( auth, parameters, callback ) {
    var query = '';
    query = '?compartmentId=' + encodeURIComponent(parameters.compartmentId);
    if ( 'availibilityDomain' in parameters )
      query = query + '&availibilityDomain=' + encodeURIComponent(parameters.availibilityDomain);
    if ( 'page' in parameters )
      query = query + '&page=' + encodeURIComponent(parameters.page);
    if ( 'limit' in parameters )
      query = query + '&limit=' + encodeURIComponent(parameters.limit);
    if ( 'instanceId' in parameters )
      query = query + '&instanceId=' + encodeURIComponent(parameters.instanceId);
    if ( 'sortBy' in parameters )
      query = query + '&sortBy=' + encodeURIComponent(parameters.sortBy);
    if ( 'sortOrder' in parameters )
      query = query + '&sortOrder=' + encodeURIComponent(parameters.sortOrder);
    if ( 'lifecycleState' in parameters )
      query = query + '&lifecycleState=' + encodeURIComponent(parameters.lifecycleState);
    ocirest.process( auth, 
                     { path : auth.RESTversion + 
                      '/instanceConsoleHistories/' + encodeURIComponent(parameters.instanceConsoleHistoryId) + query,
                       host : endpoint.service.core[auth.region],
                       method : 'GET' }, 
                     callback );
  };

function update( auth, parameters, callback ) {
    ocirest.process( auth, 
                     { path : auth.RESTversion + 
                              '/instanceConsoleHistories/' + encodeURIComponent(parameters.instanceConsoleHistoryId),
                       host : endpoint.service.core[auth.region],
                       'if-match' : parameters['if-match'],
                       body : parameters.body,
                       method : 'PUT' }, 
                     callback );
  };
  
  module.exports={
      list: list,
      drop: drop,
      update: update,
      capture: capture,
      getContent: getContent,
      get: get
  }