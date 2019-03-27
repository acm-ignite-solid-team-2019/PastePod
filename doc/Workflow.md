# Workflow
Documentation regarding the workflow for the project.

## Git
The project will use a topic branch git workflow with reviewed pull requests. This means that each feature or bug fix should be developed in a branch of its own which will eventually be merged back into a stable branch by PR with review. Each feature/fix should have a corresponding open issue. For now, our stable branch is `prototype/initial`. This will change.

As an example, let's say you're am assigned to [#2](https://github.com/evanwsun/solid-ignite/issues/2). First ensure that your stable branch is up to date and there are no local changes:
```
$ git status
On branch prototype/initial
Your branch is up to date with 'origin/prototype/initial'.

nothing to commit, working tree clean
```
If you don't see this, there should be instructions to fix it.

Then branch off into your topic branch. The naming should be as follows:
- Feature: `feature/xxx` where `xxx` is a short, descriptive name of the feature (e.g., `login`)
- Bug Fix: `bugfix/xxx` where `xxx` is the issue number of the issue corresponding to the bug (e.g., `2`)

```
$ git checkout -b feature/login
Switched to a new branch 'feature/login'
```

Now push the branch to the remote
```
$ git push -u

Counting objects: 3, done.
Delta compression using up to 12 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 292 bytes | 97.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/evanwsun/solid-ignite.git
 * [new branch]      feature/login -> feature/login
Branch 'feature/login' set up to track remote branch 'feature/login' from 'origin'.
```

Now you can do all the work you need to do to implement the feature. You can have as many commits as you want. Make sure to push your commits to the remote often so others can see what you're doing.

When you think your changes are ready to be merged back to stable, make a pull request into the stable branch from the topic branch. Since we're using a free private repo, we can't enforce protected branches, so we just have to pretend. Request reviews from all other committers and make changes as requested. When you have all approvals, your branch can be merged. It should be merged *with* a merge commit. No rebases or fast forwards. 

We can work through merge conflicts as they occur.

After the branch is successfuly merged, it can be deleted.