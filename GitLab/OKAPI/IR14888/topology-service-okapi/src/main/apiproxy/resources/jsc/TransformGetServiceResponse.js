// Get the response body from the CRAMER-LI API
var body = JSON.parse(response.content);

// Perform the data mappings on the response from CRAMER-LI API format to Topology-Service API format
try {
    switch(body.service.mobilityVoiceService.provisionStatus) {
        case 'Created':
            body.service.mobilityVoiceService.provisionStatus = 'CREATED';
            break;
        case 'In Progress':
            body.service.mobilityVoiceService.provisionStatus = 'IN_PROGRESS'
            break;
        case 'Active':
            body.service.mobilityVoiceService.provisionStatus = 'ACTIVE'
            break;
        case 'Cancelled':
            body.service.mobilityVoiceService.provisionStatus = 'CANCELLED'
            break;
        case 'Discontinued':
            body.service.mobilityVoiceService.provisionStatus = 'DISCONTINUED'
            break;
    }
}
catch (e) {}

try {
    switch(body.service.mobilityVoiceService.fwNtu.provisionStatus) {
        case 'Planned':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'PLANNED';
            break;
        case 'Design-Approved':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'DESIGN_APPROVED'
            break;
        case 'Built-Installed':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'BUILT_INSTALLED'
            break;
        case 'In-Service':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'IN_SERVICE'
            break;
        case 'Pending Decommissioning':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'PENDING_DECOMISSIONING'
            break;
        case 'Left in Situ':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'LEFT_IN_SITU'
            break;
        case 'Unavailable':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'UNAVAILABLE'
            break;
    }
}
catch (e) {}

//To clear the response payload
response.content = '';

// Set the response body/content to the updated response with mapped values
response.content = JSON.stringify(body, undefined, 2);