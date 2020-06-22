$bsiVersion = (git describe --tags --abbrev=0);
Write-Host "Latest BSI tag: $bsiVersion"

$commitId = (git rev-parse HEAD)

# Get all "non-branch" commits reachable from master
$masterCommits = (git rev-list --first-parent origin/master)

# Only use tags that are on one of those commits and
# have the right kind of name. We're passing this as
# a variable to the next job
if ($masterCommits -notcontains $commitId) {
  Write-Host "Tag is not reachable from master, we will skip this tag"
  "UseThisTag=0" | Out-File env.properties -Encoding ASCII
} elseif ($bsiVersion -notmatch '^v20\.\d+\.\d+-\d+$') {
  Write-Host "The tag name isn't in the proper format for a release tag, we will skip this tag"
  "UseThisTag=0" | Out-File env.properties -Encoding ASCII
} else {
  Write-Host "Tag looks good: right format and reachable from master"
  "UseThisTag=1" | Out-File env.properties -Encoding ASCII
}

$authorEmail = (git show -s --format='%ae' $commitId)

# write bsiVersion and authorEmail to environment properties file
"BsiVersion=$bsiVersion" | Out-File env.properties -Encoding ASCII -Append
"AuthorEmail=$authorEmail" | Out-File env.properties -Encoding ASCII -Append
