#!/bin/bash

push_build() {
  git checkout master

  if [[ $TRAVIS_COMMIT_MESSAGE == *"Travis production build"* ]]
  then
    echo "Last commit was a Travis build. Not taking any action."
  else
    echo "Last commit was a code change. Pushing this build."

    git remote rm origin
    git remote add origin https://Qrivi:${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git > /dev/null 2>&1

    git add .
    git commit --author "Build Boy <travis@krivi.be>" --message "Travis production build: $TRAVIS_BUILD_NUMBER"
    
    if [[ "$(git push origin master --porcelain)" != *"Done"* ]]
    then
      echo "Failed to git push!"
      exit 1
    fi
  fi
}

push_build
