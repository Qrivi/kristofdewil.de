#!/bin/bash
set -e
GITHUB_USER="$(echo ${GITHUB_REPOSITORY} | cut -d / -f 1)"

push_build() {
   # Set git user credentials
  git config --global user.name "${GITHUB_USER}'s Build Bot"
  git config --global user.email "buildbot@krivi.be"

   # Restore origin remote
  git remote rm origin
  git remote add origin https://${GITHUB_USER}:${GITHUB_ACCESS}@github.com/${GITHUB_REPOSITORY}.git | sed "s/${GITHUB_ACCESS}/FILTERED_TOKEN/"

   # Push the production build to a temporary branch
  git add .
  git commit -m "Bundled and minified assets (production build)"
  git branch build-local

   # Merge that branch into master
  git fetch
  git checkout master
  git merge --no-ff --strategy-option theirs build-local
  git push origin master | sed "s/${GITHUB_ACCESS}/FILTERED_TOKEN/"
}

## Don't push commits from the build bot, since those are already production builds
if [[ $(git log -1 --pretty=format:'%an') == *${GITHUB_USER}* ]]
  then
    echo "Last commit contains the latest production build: no further action required."
  else
    push_build
fi
