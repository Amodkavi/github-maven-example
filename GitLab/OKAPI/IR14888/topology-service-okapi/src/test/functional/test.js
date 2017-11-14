var request = require("request");
var expect = require("expect.js");
var environments = {
  "prod": {
    "authUrl": "https://api.telstra.com/v1/oauth/token?client_id=xxxxxxyyyyy&client_secret=123456&grant_type=client_credentials&scope=OKAPI",
    "apiBase": "https://api.telstra.com/v1/xyz",
    "rejectUnauthorized": "true"
  },
  "staging": {
    "authUrl": "https://staging.api.telstra.com/v1/oauth/token?client_id=xxxxxxyyyyy&client_secret=123456&grant_type=client_credentials&scope=OKAPI",
    "apiBase": "https://staging.api.telstra.com/v1/xyz",
    rejectUnauthorized: "true"
  },
  "qa": {
    "authUrl": "https://cb.test.dev.telstra.com/org003/qa/oauth/token?client_id=v0jrvAXRmn2WkOThPTC85ZVvQuGh1qDI&client_secret=MATd8yAFFILClu8m&grant_type=client_credentials&scope=topology-service",
    "apiBase": "https://cb.test.dev.telstra.com/org003/qa/v1/topology-service/topologies",
    "rejectUnauthorized": "true"
  },
  "dev": {
    "authUrl": "https://slot1.org003.nonprod-api.in.telstra.com.au/v1/oauth/token?client_id=v0jrvAXRmn2WkOThPTC85ZVvQuGh1qDI&client_secret=MATd8yAFFILClu8m&grant_type=client_credentials&scope=topology-service",
    "apiBase": "https://slot1.org003.nonprod-api.in.telstra.com.au/v1/topology-service/topologies",
    "rejectUnauthorized": "true"
  }
};

var authUrl, apiBase;
console.log("Environment is " + process.env.NODE_ENV);
if (process.env.NODE_ENV === "dev") {
  authUrl = environments.dev.authUrl;
  apiBase = environments.dev.apiBase;
} else if (process.env.NODE_ENV === "qa") {
  authUrl = environments.qa.authUrl;
  apiBase = environments.qa.apiBase;
}
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('Testing serviceId=N3754723Q.A', function () {
  it('N3754723Q.A', function (done) {

    var options1 = {
      url: authUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    request.get(options1, function (err, res) {
      expect(err === undefined);
      console.log("statusCode is " + res.statusCode);
      expect(res.statusCode).to.be(200);
      var data = JSON.parse(res.body);
      console.log("access_token is " + data.access_token);
      var options2 = {
        url: apiBase + "?serviceId=N3754723Q.A",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.access_token
        }
      };
      request.get(options2, function (err, res) {
        expect(err === undefined);
        console.log("statusCode is " + res.statusCode);
        console.log(res.body);
        expect(res.statusCode).to.be(200);
        data = JSON.parse(res.body);
        expect(data.fault === undefined);
        console.log(res.body);
        expect(data.topologies[0].nodes[0].service.eisEvcService.evcId).to.contain("N3754723Q.A");

        expect(data.topologies[0].nodes[1].service.eisUniService.fnn).to.contain("N3042696Q");

        expect(data.topologies[0].nodes[1].service.eisUniService.type).to.contain("UNI");

        expect(data.topologies[0].nodes[2].service.eisUniService.fnn).to.contain("N3762820Q");

        expect(data.topologies[0].nodes[3].port.name).to.contain("Gigabit Ethernet e 7");

        expect(data.topologies[0].nodes[4].port.name).to.contain("Gigabit Ethernet e 1");

        expect(data.topologies[0].nodes[5].device.mrv900Device.role).to.contain("EIS NTU Multi-Tenant");

        expect(data.topologies[0].nodes[6].device.model.subType).to.contain("MRV OptiSwitch OS904/AC-1");

        expect(data.topologies[0].nodes[6].device.mrv900Device.role).to.contain("EIS NTU Single-Tenant Only");

        expect(data.topologies[0].nodes[7].port.name).to.contain("Gigabit Ethernet o 1.2.2.12.1");

        expect(data.topologies[0].nodes[8].port.name).to.contain("Gigabit Ethernet o 1.24.1");

        expect(data.topologies[0].nodes[9].device.mrv9000Device.role).to.contain("EIS AS Exchange");

        expect(data.topologies[0].nodes[10].device.networkDevice.role).to.contain("Type 2");

        expect(data.topologies[0].nodes[11].port.name).to.contain("10 Gigabit Ethernet o 1.1.13.1.1");

        expect(data.topologies[0].nodes[12].port.name).to.contain("10 Gigabit Ethernet o 1.16.1");

        expect(data.topologies[0].nodes[13].device.networkDevice.role).to.contain("Type 2");

        expect(data.topologies[0].nodes[14].port.name).to.contain("Gigabit Ethernet o 1.14.1");

        expect(data.topologies[0].nodes[15].port.name).to.contain("Gigabit Ethernet o 1.4.1");

        expect(data.topologies[0].relationships[6].link.tracId).to.contain("J VDHM VDHM K101");

        expect(data.topologies[0].relationships[7].link.tracId).to.contain("J JDKA VEBM K102");

        expect(data.topologies[0].relationships[15].circuit.type).to.contain("PW_ROUTED_PATH");

        done();
      });
    });
  });

});
