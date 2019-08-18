
#!/bin/sh

push_build() {
  if [[ $(git log -1 | cat) == *"Travis build"* ]]
  then
    echo "Last commit was a Travis build. Not taking any action."
  else
    echo "Last commit was a code change. Pushing the build."
    git add .
    git commit --author "Build Boy <travis@krivi.be>" --message "Travis build: $TRAVIS_BUILD_NUMBER"
    git push --quiet
  fi
}

push_build
