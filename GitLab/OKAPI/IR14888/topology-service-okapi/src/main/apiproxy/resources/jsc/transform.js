var body = JSON.parse(response.content);

function validate(a, b) {
  // create a list of properties that are undefined
  return b.filter(function (elem) {
    return a[elem] === undefined || a[elem] === null;
  });
}

function toEnum(val) {
  if (val !== undefined && val !== null)
        return val.toUpperCase().replace(/[()]/g, "").replace(/[ -]/g, "_");
  else
    return null;
}

if (response.status.code !== "200" || body === null || body.graph === null || body.graph.nodes === null || body.graph.relationships === null) {
  var error = {
    "error": "CRAMER-LI sent invalid response",
    "statusCode": response.status.code
  };
  context.setVariable("response.content", JSON.stringify(error));
  context.setVariable("response.status.code", "500");

} else {

  var newNodes = body.graph.nodes.map(function (node) {
      var n = {
        "id": node.id,
        "type": node.properties.class.toUpperCase()
      };
      if (n.type === "SERVICE") {
        n.service = {
          "type": toEnum(node.properties.type),
          "name": node.properties.name,
          "provisionStatus": toEnum(node.properties.provisionStatus),
          "useStatus": toEnum(node.properties.useStatus)
        };
        cramerLiError = validate(n.service, ["type", "name", "provisionStatus"]);
        if (toEnum(node.properties.type) === "EIS_EVC_SERVICE") {
          n.service.eisEvcService = {
            "evcId": node.properties.alias1,
            "type": node.properties.eisType,
            "ceVlanIdListAEnd": node.properties.ceVlanIdListAEnd,
            "ceVlanIdListZEnd": node.properties.ceVlanIdListZEnd,
            "cosType": node.properties.cosType,
            "titanClassCombination": node.properties.titanClassCombination,
            "pir": node.properties.pir,
      "redundancyRole": toEnum(node.properties.redundancyRole),
            "maintenanceAssociation": {
              "id": node.properties.maId,
              "maintenanceDomainLevel": node.properties.maintenanceDomainLevel,
            }
          };
        } else if (toEnum(node.properties.type) === "EIS_UNI_SERVICE") {
          n.service.eisUniService = {
            "fnn": node.properties.alias1,
            "type": node.properties.eisType,
            "accessType": toEnum(node.properties.accesType),
            "redundancyRole": toEnum(node.properties.redundancyRole)

          };
        } else if (toEnum(node.properties.type) === "EIS_BDSL_UNI_SERVICE") {
          n.service.eisBdslUniService = {
            "fnn": node.properties.alias1,
            "redundancyRole": toEnum(node.properties.redundancyRole)
          };
        }

      } else if (n.type === "TOPOLOGY") {
        n.topology = {
          "type": toEnum(node.properties.type),
          "name": node.properties.name,
          "provisionStatus": toEnum(node.properties.provisionStatus),
          "behaviour": node.properties.behaviour,
          "useStatus": toEnum(node.properties.useStatus)
        };
        switch (n.topology.behaviour) {
        case "1":
          n.topology.behaviour = "RING";
          break;
        case "2":
          n.topology.behaviour = "LINEAR_CHAIN";
          break;
        case "3":
          n.topology.behaviour = "INTERCONNECT";
          break;
        case "4":
          n.topology.behaviour = "DEVICE_SET";
          break;
        case "5":
          n.topology.behaviour = "TOPOLOGY_SET";
          break;
        case "6":
          n.topology.behaviour = "DEVICE_MESH";
          break;
        case "7":
          n.topology.behaviour = "TOPOLOGY_MESH";
          break;
        }
        if (toEnum(node.properties.type) === "EIS_VPLS") {
          n.topology.eisVplsTopology = {
            "vcId": node.properties.alias1,
            "function": toEnum(node.properties.function )
          };

        }
      } else if (n.type === "PORT") {
        if (toEnum(node.properties.type) === "ATM_VC_INTERFACE_T") {
          n.type = "LOGICAL_PORT";
          n.logicalPort = {
            "type": toEnum(node.properties.type),
            "name": node.properties.name,
            "provisionStatus": toEnum(node.properties.provisionStatus),
            "useStatus": toEnum(node.properties.useStatus)
          };
          n.logicalPort.atmVcInterfaceT = {
            "vpi": node.properties.vpi,
            "vci": node.properties.vci
          }
          cramerLiError = validate(n.logicalPort, ["type", "name", "provisionStatus", "useStatus"]);
        } else if (toEnum(node.properties.type) === "VLAN_INTERFACE_T") {
          n.type = "LOGICAL_PORT";
          n.logicalPort = {
            "type": toEnum(node.properties.type),
            "name": node.properties.name,
            "provisionStatus": toEnum(node.properties.provisionStatus),
            "useStatus": toEnum(node.properties.useStatus)
          };
          n.logicalPort.vlanInterfaceT = {
            "vlanFunction": toEnum(node.properties.function),
            "vlanId": node.properties.alias1
          }
          cramerLiError = validate(n.logicalPort, ["type", "name", "provisionStatus", "useStatus"]);
        }
        else {
          n.port = {
            "name": node.properties.name,
            "type": toEnum(node.properties.type),
            "relativeName": node.properties.relativeName,
            "frontOfBoxId": node.properties.alias1,
            "role": toEnum(node.properties.role),
            "provisionStatus": toEnum(node.properties.provisionStatus),
            "useStatus": toEnum(node.properties.useStatus)
          };
          cramerLiError = validate(n.port, ["name", "relativeName", "frontOfBoxId", "role"]);
        }
      } else if (n.type === "DEVICE") {
        n.device = {
          "type": toEnum(node.properties.type),
          "model": {
            "subType": node.properties.modelSubType
          },
          "name": node.properties.name,
          "elementId": node.properties.alias2,
          "networkType": toEnum(node.properties.networkType),
          "provisionStatus": toEnum(node.properties.provisionStatus),
          "useStatus": toEnum(node.properties.useStatus)

        };
        cramerLiError = validate(n.device, ["name", "elementId", "networkType"]);
        if (toEnum(node.properties.type) === "EXT_NETWORK_DEVICE") {
          n.device.type = "NETWORK_DEVICE";
          n.device.networkDevice = {
            "role": node.properties.role
          };
        } else if (toEnum(node.properties.type) === "EXT_DEVICE_MRV900") {
          n.device.type = "MRV900_DEVICE";
          n.device.mrv900Device = {
            "role": node.properties.role,
            "backboneAccessTopology": node.properties.backboneAccessTopology
          };
        } else if (toEnum(node.properties.type) === "EXT_DEVICE_MRV9000") {
          n.device.type = "MRV9000_DEVICE";
          n.device.mrv9000Device = {
            "role": node.properties.role,
            "backboneAccessTopology": node.properties.backboneAccessTopology
          };
        } else if (toEnum(node.properties.type) === "EXT_DEVICE_SDH") {
          n.device.type = "SDH_DEVICE";
          n.device.networkType = "Transmission";
        }
      }

      return n;
    });

  var newRelationShips = body.graph.relationships.map(function (rel) {
      var r = {
        "id": rel.id,
        "type": rel.type,
        "startNode": rel.startNode,
        "endNode": rel.endNode
      };

      if(r.type === "MEMBER_OF" ) {
        r.sequence = rel.properties.sequence;
      }
      else if (r.type === "CONNECTS_TO" || r.type === "MONITORS") {
        r.connectionType = toEnum(rel.properties.class);
        if (r.connectionType === "LINK") {
          r.link = {
            "type": toEnum(rel.properties.type),
            "name": rel.properties.name,
            "provisionStatus": toEnum(rel.properties.provisionStatus),
            "tracId": rel.properties.alias1,
            "aEndLagId": rel.properties.aEndLagId,
            "zEndLagId": rel.properties.zEndLagId
          };
          cramerLiError = validate(r.link, ["type", "name"]);
        } else if (r.connectionType === "CIRCUIT") {
          r.circuit = {
            "type": toEnum(rel.properties.type),
            "name": rel.properties.name,
            "provisionStatus": toEnum(rel.properties.provisionStatus),
          };
          if (r.circuit.type === "GFP_TRAC") {
            r.circuit.gfpTrac =
            {
                "tracId": rel.properties.alias1,
                "digitalCircuitId": rel.properties.digitalCircuitId
            };
          }
          else if (r.circuit.type === "PW_ROUTED_PATH") {
            r.circuit.pwRoutedPath =
            {
                "vcId": rel.properties.alias1,
                "redundancyRole": toEnum(rel.properties.redundancyRole)
            };
          }
          cramerLiError = validate(r.circuit, ["type", "name"]);
        } else if (r.connectionType === "PERF_MGMT") {
          r.perfMgmt = {
            "mepType": rel.properties.mepType,
            "cosName": rel.properties.cosName,
            "localMepId": rel.properties.localMepId,
            "remoteMepId": rel.properties.remoteMepId
          };
        }
      }

      return r;
    });

  if (cramerLiError.length === 0) {
    var newBody = {
      "topologies": [{
          "nodes": newNodes,
          "relationships": newRelationShips
        }
      ]

    };
    context.setVariable("response.content", JSON.stringify(newBody, function (k, v) {
        if ((v !== null))
          return v;
      }))
  } else {
    var error = {
      "error": "CRAMER-LI sent invalid parameters: " + cramerLiError,
      "statusCode": response.status.code
    };
    context.setVariable("response.content", JSON.stringify(error));
    context.setVariable("response.status.code", "500");
  }

}
