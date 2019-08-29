#!/bin/bash
set -e

push_to_master() {
  GH_USER="$(echo ${TRAVIS_REPO_SLUG} | cut -d / -f 1)"

  # Set git user credentials
  git config --global user.name "${GH_USER}'s Build Bot"
  git config --global user.email "travisbuildbot@krivi.be"

  # Restore origin remote
  git remote rm origin
  git remote add origin https://${GH_USER}:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git | sed "s/${GH_TOKEN}/FILTERED_TOKEN/"

  # Push the production build to a temporary branch
  git add .
  git commit -m "Updated to use Vue production build"
  git branch build-local

  # Merge that branch into master
  git fetch
  git checkout master
  git merge --no-ff -X theirs build-local
  git commit --amend -m "Automerge Travis build $TRAVIS_BUILD_NUMBER from develop into master"
  git push origin master | sed "s/${GH_TOKEN}/FILTERED_TOKEN/"
}

push_to_master
