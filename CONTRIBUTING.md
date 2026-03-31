# Contributing to this project

Before you start contributing, please take a moment to familiarise yourself with the guidelines below. Following these helps keep the project healthy and the team aligned.

## Pull Requests

All changes to this project (whether it's code, documentation, or tests) must go through a pull request. This ensures nothing lands in `main` without a second person reviewing the code, keeping the branch stable and production-ready at all times.

For tips on writing a high-quality PR, check out:
[Atlassian's Guide to Pull Requests](https://www.atlassian.com/blog/git/written-unwritten-guide-pull-requests)

## Issues

Unless it's an emergency fix, all work should be tied to an issue. This keeps efforts visible and makes the intent behind each change clear to everyone on the team.

## Branches

Always branch off `main` when starting new work. A typical workflow looks like:

```bash
git checkout main
git pull
git branch <branch-name>
git switch <branch-name>
```

Use the following naming conventions for your branches:

- With an issue number: `<purpose>/<issue-number>-<short-description>`
  - Example: `feat/123-add-login-button`
- Without an issue number: `<purpose>/<short-description>`
  - Example: `bug/fix-header-alignment`

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit messages. This keeps the git history readable and makes changelog generation straightforward.

Some examples:

```
feat(components): add new Button component
fix(api): correct user authentication bug
refactor(utils): improve performance of data processing
chore(deps): update dependency versions
docs(readme): update installation instructions
```
