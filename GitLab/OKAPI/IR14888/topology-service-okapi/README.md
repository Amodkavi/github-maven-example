# Topology Seervice API Proxy Project

This project defines the API proxy for the topology-service.  The proxy is
a simple reverse proy with OAUTH authentication that strictly limits the
inbound requests to those defined in the swagger.

More information on the Topology Service is availabe on the [wiki](https://wiki.ae.sda.corp.telstra.com/display/HPSE/Network+Topology+Service).

## Proxy Deployment

Before the proxy can be deployed to the agigee environment, create a TargetServer called
'topology-service'.

curl -H "Content-Type:text/xml" -X POST -d \
'<TargetServer name="topology-service-cramerli">
  <Host>{host}</Host>
  <Port>{port}</Port>
  <IsEnabled>true</IsEnabled>
  <SSLInfo>
    <Enabled>true</Enabled>
  </SSLInfo>
</TargetServer>' \
-u email:Password https://api.enterprise.apigee.com/v1/o/{org_name}/environments/{slot}/targetservers


## Directory structure

```
/
|-- doc/
|-- config.json
|-- pom.xml
|-- src/
     |-- assembly/
     |-- main/
     |   |-- apiproxy/
     |-- test/
         |-- functional/
```

Note that the 'main' and 'apiproxy' folder will not exist yet - please create them yourself.

More details on the directory structure found [here](http://wiki.eis.in.telstra.com.au/pages/viewpage.action?pageId=30608407#HowtoaccesstheDevOpstools?-GitLab)

## Useful Maven commands
After configuring your POM file, you can try and run a build or deploy to nexus.

Build with:

    mvn -P dev-slot1 clean install

Deploy to Nexus:

    mvn -P dev-slot1,deploy-nexus clean deploy

## Troubleshoot Maven errors:
Refer to the Troubleshooting section in the wiki, found [here](http://wiki.eis.in.telstra.com.au/display/TDEV/Development+workflow)
