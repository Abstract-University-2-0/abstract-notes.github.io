#!/bin/bash

if [[ $2 == pull ]]; then
  echo "pulling from remote..."
  git pull
fi

echo -ne "copying diff_eq/ \r"
echo 

cp ../zimch_git/diff_eq/ ./diffury/ -r

echo -ne "diff_eq copied..." 
echo

echo -ne "copying math_anal/ \r"
echo

cp ../zimch_git/math_anal/ ./matan/ -r

echo -ne "matan copied..."
echo

echo "copying finished"
# git things
if [[ $1 != "git" ]]; then
  exit 1
fi

git status
echo "Wanna push everything? (y/n)"
read answer

if [[ $answer == "n" ]]; then
  echo "k nevermind"
  exit 1
fi 

echo "nice"

git branch -d bash_copy
git branch bash_copy
git checkout bash_copy
git add --all
git commit -m "notes updated"
git push origin bash_copy
echo "done. please visit github to merge newly created branch"
