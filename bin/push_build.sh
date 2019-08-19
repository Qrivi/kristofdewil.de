#!/bin/bash

push_build() {
  if [[ $TRAVIS_COMMIT_MESSAGE == *"Travis production build"* ]]
  then
    echo "Last commit was a Travis build: not taking any action."
  else
    echo "Last commit was not a Travis build: pushing this build."

    echo "Professional debug 0"
    GH_USER="$(echo ${TRAVIS_REPO_SLUG} | cut -d / -f 1)"

    echo "Professional debug 1"
    git config --global user.name "${GH_USER}'s Build Bot"
    git config --global user.email "travisbuildbot@krivi.be"
    echo "Professional debug 2"

    git checkout master
    git remote rm origin
    git remote add origin https://${GH_USER}:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git | sed "s/${GH_TOKEN}/FILTERED_TOKEN/"

    git add .
    git commit -m "Travis production build: $TRAVIS_BUILD_NUMBER"
    git push origin master | sed "s/${GH_TOKEN}/FILTERED_TOKEN/"
  fi
}

push_build
