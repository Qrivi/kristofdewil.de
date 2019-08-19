
#!/bin/sh

push_build() {
  git checkout master

  if [[ $(git log -1 | cat) == *"Travis build"* ]]
  then
    echo "Last commit was a Travis build. Not taking any action."
  else
    echo "Last commit was a code change. Pushing this build."

    git remote rm origin
    git remote add origin https://Qrivi:${GH_TOKEN}@github.com/Qrivi/website.git > /dev/null 2>&1

    git add .
    git commit --author "Build Boy <travis@krivi.be>" --message "Travis build: $TRAVIS_BUILD_NUMBER"
    git push origin master --quiet > /dev/null 2>&1
  fi
}

push_build
