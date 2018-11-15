import urllib2
import json

qaData = [
    {
        "domain_name": "qa",
        "deployment_user": "Fahimul Haque",
        "service_name": "web-qa-build",
        "branch_name": "ruc-352-add-versioning-to-widgets",
        "deployment_date": "2018-11-15T00:00:00-0800"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Jing Tao",
        "service_name": "active-events-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Jing Tao",
        "service_name": "batch-file-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Isaiah Houston",
        "service_name": "batch-push-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "bk-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "cms-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "collectors-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "config-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Bertrand Vidal",
        "service_name": "data-export-qa",
        "branch_name": "ei-1092-remove-hard-coded-url",
        "deployment_date": "2018-11-13T00:00:00-0800"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "import-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "lambda-clienttwitterconfighandler-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "lambda-dataexportresultlistener-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "lambda-segmentation-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "lambda-surveystatshandler-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "lambda-tweethandler-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "live-push-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "log4j-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Fahimul Haque",
        "service_name": "passive-events-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-23T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "pcapi-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Fahimul Haque",
        "service_name": "points-expiration-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "pos-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Fahimul Haque",
        "service_name": "publisher-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "receipt-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Fahimul Haque",
        "service_name": "scheduler-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "segapi-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "segfile-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "segprocess-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "sftp-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Isaiah Houston",
        "service_name": "survey-qa",
        "branch_name": "epr-336-implement-survey-lambdas",
        "deployment_date": "2018-10-17T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Fahimul Haque",
        "service_name": "tier-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    },
    {
        "domain_name": "qa",
        "deployment_user": "Daniel Song",
        "service_name": "twitter-qa",
        "branch_name": "epr-329-survey-foundation-rebuild",
        "deployment_date": "2018-10-25T00:00:00-0700"
    }
]

stagingData = [
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "web-staging",
        "branch_name": " ei-941-remove-columns-rollup",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "active-events-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "batch-file-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "bk-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "cms-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "collectors-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "config-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "data-export-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "import-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "lambda-dataexportresultlistener-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Isaiah Houston",
        "service_name": "lambda-segmentresultlistener-staging",
        "branch_name": "epr-336",
        "deployment_date": "2018-10-17T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "live-push-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "log4j-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "passive-events-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "pcapi-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "points-expiration-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "pos-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "publisher-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "receipt-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "scheduler-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "segapi-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "segfile-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "segload-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "segprocess-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "sftp-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    },
    {
        "domain_name": "staging",
        "deployment_user": "Daniel Song",
        "service_name": "tier-staging",
        "branch_name": "epr-345-save-tag-history",
        "deployment_date": "2018-11-14T00:00:00-0800"
    }
]

i = 0
while i < len(qaData):
    url = 'http://localhost:5002/status'
    req = urllib2.Request(url, json.dumps(qaData[i]), {'Content-Type': 'application/json'})
    f = urllib2.urlopen(req)
    for x in f:
        print(x)
    f.close()
    i += 1

i = 0
while i < len(stagingData):
    url = 'http://localhost:5002/status'
    req = urllib2.Request(url, json.dumps(stagingData[i]), {'Content-Type': 'application/json'})
    f = urllib2.urlopen(req)
    for x in f:
        print(x)
    f.close()
    i += 1