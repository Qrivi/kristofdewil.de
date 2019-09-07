#!/bin/bash
set -e

 push_master() {
  GITHUB_USER="$(echo ${GITHUB_REPOSITORY} | cut -d / -f 1)"

   # Set git user credentials
  git config --global user.name "${GITHUB_USER}'s Build Bot"
  git config --global user.email "buildbot@krivi.be"

   # Restore origin remote
  git remote rm origin
  git remote add origin https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git | sed "s/${GITHUB_TOKEN}/FILTERED_TOKEN/"

   # Push the production build to a temporary branch
  git add .
  git commit -m "Switched to a Vue production mode build"
  git branch build-local

   # Merge that branch into master
  git fetch
  git checkout master
  git merge --no-ff -s ours build-local
  git push origin master | sed "s/${GITHUB_TOKEN}/FILTERED_TOKEN/"
}

 if [[ $GITHUB_REF == *"master"* ]]
  then
    npm run build:vue
    push_master
  else
    echo "We did not come from master: no further actions required."
fi
