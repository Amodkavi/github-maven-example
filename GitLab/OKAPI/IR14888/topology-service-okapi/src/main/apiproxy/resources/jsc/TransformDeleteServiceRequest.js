// Get the request
var body = JSON.parse(request.content);

// Perform the data mappings on the request from Topology-Service API format to CRAMER-LI API format

try {
    switch(body.context.priority) {
        case 'NORMAL':
            body.context.priority = 'Normal';
            break;
        case 'HIGH':
            body.context.priority = 'High'
            break;
    }
}
catch (e) {}

//To clear the request payload
request.content = '';

// Set the request body/content to the updated request with mapped values
request.content = JSON.stringify(body, undefined, 2);