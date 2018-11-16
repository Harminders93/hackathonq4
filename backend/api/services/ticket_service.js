'use_strict';

function getTicketNumber(branchName) {
    var words = branchName.split('-');
    return words[0].toUpperCase() + '-' + words[1];
}

exports.getTicketArrayFromStatuses = function(statuses) {
    var finalStatuses = [];

    statuses.forEach(function(status) {
        var isExisting = false;

        // Get ticket number
        var statusTicketNumber = getTicketNumber(status.branch_name);

        var statusToAdd = {
            "name": status.service_name,
            "deployment_date": status.deployment_date,
            "deployed_by": status.deployment_user,
            "branch": status.branch_name
        };
        finalStatuses.forEach(function(existingStatus) {
           if (existingStatus.name === statusTicketNumber) {
               existingStatus.services.push(statusToAdd);
               isExisting = true;
           }
        });

        if (!isExisting) {
            finalStatuses.push(
                {
                    "name": statusTicketNumber,
                    "services": [
                        statusToAdd
                    ]
                }
            );
        }

    });

    return finalStatuses;
}
