# Overview

Enables oracle chatbot to create Autonomous database while chatting with the bot.

1. A custom component is invoked to start provisioning a database.

2. You need to supply the parameters like compartment OCID, user OCID and tenancy OCID.

3. Once everything is setup then we can create a database over the chat.

API implementations are packaged as npm modules. If you want to run your implementation locally:
* download and install the OMCe command-line tools included in the SDK
* run "npm install" on your module
* start your API using the offline custom code container

To deploy your implementation to OMCe:
* use the deployment tool included in the SDK
* manually zip the custom code so that is resembles the scaffold file (the base directory appears at the base of the zip file)
  and upload the zip via the API Implementations page in the OMCe UI.

