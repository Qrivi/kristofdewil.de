#!/bin/bash
set -e

push_to_master() {
  GH_USER="$(echo ${TRAVIS_REPO_SLUG} | cut -d / -f 1)"

  git config --global user.name "${GH_USER}'s Build Bot"
  git config --global user.email "travisbuildbot@krivi.be"

  git remote rm origin
  git remote add origin https://${GH_USER}:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git | sed "s/${GH_TOKEN}/FILTERED_TOKEN/"

  git add .
  git commit -m "Travis production build: $TRAVIS_BUILD_NUMBER"

  git merge origin/master | sed "s/${GH_TOKEN}/FILTERED_TOKEN/"
  git push origin master | sed "s/${GH_TOKEN}/FILTERED_TOKEN/"
}

push_to_master
