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

try {
    switch(body.service.mobilityVoiceService.provisionStatus) {
        case 'CREATED':
            body.service.mobilityVoiceService.provisionStatus = 'Created';
            break;
        case 'IN_PROGRESS':
            body.service.mobilityVoiceService.provisionStatus = 'In Progress'
            break;
        case 'ACTIVE':
            body.service.mobilityVoiceService.provisionStatus = 'Active'
            break;
        case 'CANCELLED':
            body.service.mobilityVoiceService.provisionStatus = 'Cancelled'
            break;
        case 'DISCONTINUED':
            body.service.mobilityVoiceService.provisionStatus = 'Discontinued'
            break;
    }
}
catch (e) {}

try {
    switch(body.service.mobilityVoiceService.fwNtu.provisionStatus) {
        case 'PLANNED':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'Planned';
            break;
        case 'DESIGN_APPROVED':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'Design-Approved'
            break;
        case 'BUILT_INSTALLED':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'Built-Installed'
            break;
        case 'IN_SERVICE':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'In-Service'
            break;
        case 'PENDING_DECOMISSIONING':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'Pending Decommissioning'
            break;
        case 'LEFT_IN_SITU':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'Left in Situ'
            break;
        case 'UNAVAILABLE':
            body.service.mobilityVoiceService.fwNtu.provisionStatus = 'Unavailable'
            break;
    }   
}
catch (e) {}


//To clear the request payload
request.content = '';

// Set the request body/content to the updated request with mapped values
request.content = JSON.stringify(body, undefined, 2);
