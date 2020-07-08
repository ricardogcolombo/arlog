# Problem:

A customer has asked you for a way to provide on-demand monitoring of various unix-based
servers without having to log into each individual machine and opening up the log files 
found in /var/log. 

The customer has asked for the ability to issue a REST request to a machine in order to retrieve logs from /var/log on the machine receiving the REST request.
Nice To Have: The customer has a stretch goal for the ability to issue a REST request to one “master” server in order to retrieve logs from a list of machines provided in the request. For this, there’s no requirements for the protocol between the master server and other servers.
Requirements:Customer interface is a HTTP REST requestCustomer must be able to query the following:
for a specific file in /var/loglast n events of specified filebasic text/keyword filtering of events The results returned must be reverse time ordered
Must not use any pre-built log aggregation systems - this must be custom, purpose-built software.Minimize the number of external dependencies in the business logic code path (framework things like HTTP servers, etc are okay)Please commit and push code changes as you normally would - your thinking and working style is an important part for us to understand.

# Install and run
Run in the root of the project 
`npm install`

create an environment file (.env.dev or .env.prod) in the client server and if you need to use the server create one there with the different variables as the .env.sample file. i.e.
##Client 
`
PORT=3000
HOST=0.0.0.0
BASE_DIR=/var/log/
`

##Server
`
PORT=3000
HOST=0.0.0.0
`
after this steps you're ready to run each server with `npm run start:dev` or `npm run start:prod` for each environment

#Testing
create a .env.test file specified as above and run tests with `npm run test`

#TODO
[] add tests for server
[] modify server api to requests more clients at once
