# Brightspace - BSI Sync Jobs

A [trigger-lms-sync](https://github.com/Brightspace/brightspace-integration/blob/master/.github/workflows/trigger-lms-sync.yml) workflow has been configured to run whenever a new BSI release occurs. This workflow triggers an LMS workflow called [bsi-sync](https://github.com/Brightspace/lms/blob/master/.github/workflows/bsi-sync.yml) that automatically updates the LMS to reference the latest BSI version. The `bsi-sync` workflow will automatically create and merge the PR containing this change. Currently, you will need to self-approve the PR.

**Important:** If you have other dependent LMS changes, please make sure you merge those before bumping BSI.

## Release Branches

The `bsi-sync` workflow will only update the configuration to the latest BSI version. Updates to release branches via hotfixes or cert fixes will require a manual update to the `endpoint` entry in [D2L.LP.Web.UI.Html.Bsi.config.json](https://github.com/Brightspace/lms/blob/master/lp/_config/Infrastructure/D2L.LP.Web.UI.Html.Bsi.config.json) on the appropriate branch.
