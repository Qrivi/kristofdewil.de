
#!/bin/sh

push_build() {
  git add .
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER" --author "Build Boy <travis@krivi.be>"
  git push --quiet
}

push_build
