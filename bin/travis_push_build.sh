#!/bin/sh

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
    git push origin master --quiet > /dev/null 2>&1
  fi
}

push_build
