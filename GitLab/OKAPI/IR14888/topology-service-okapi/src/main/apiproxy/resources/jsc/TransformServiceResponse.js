// Get the response body from the CRAMER-LI API
var body = JSON.parse(response.content);

// Perform the data mappings on the response from CRAMER-LI API format to Topology-Service API format
try {
    switch(body.context.priority) {
        case 'Normal':
            body.context.priority = 'NORMAL';
            break;
        case 'High':
            body.context.priority = 'HIGH'
            break;
    }
}
catch (e) {}

//To clear the response payload
response.content = '';

// Set the response body/content to the updated response with mapped values
response.content = JSON.stringify(body, undefined, 2);
