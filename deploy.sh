#!/usr/bin/env sh

pnpm build
cd dist
msg = 'xxx'
githubUrl=xxx.git
git config --global user.name "xxx"
git config --global user.email "xx"
git init
git add -A
git commit -m "${msg}"
# Push to github gh-pages branch
git push -f $githubUrl master:gh-pages
cd -
rm -rf dist