# This is becasue running the same shit in npm scripts is fucking up double qoutes :/

version=$(git rev-parse HEAD)
rm -f ./src/git_commit.json
echo {\"commit\": \"$version\"} >> ./src/git_commit.json