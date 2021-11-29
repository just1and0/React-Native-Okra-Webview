#!/bin/bash

function bump {
	output=$(npm version ${release} --no-git-tag-version)
	version=${output:1}
	search='("version":[[:space:]]*").+(")'
	replace="\1${version}\2"
	
	sed -i ".tmp" -E "s/${search}/${replace}/g" "$1"
	rm "$1.tmp"
}

function help {
	echo "Usage: $(basename $0) [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]"
}

if [ -z "$1" ] || [ "$1" = "help" ]; then
	help
	exit
fi

release=$1

if [ -d ".git" ]; then
	changes=$(git status --porcelain)
	
	if [ -z "${changes}" ]; then
		bump "bower.json"
		git add .
		git commit -m "Bump to ${version}"
		git tag -a "${output}" -m "${version}"
		git push origin --tags
		npm publish ./
	else
		echo "Please commit staged files prior to bumping"
	fi
else
	bump "bower.json"
fi