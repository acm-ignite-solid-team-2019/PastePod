# Workflow
Documentation regarding the workflow for the project.

## Git
The project will use a topic branch git workflow with reviewed pull requests. This means that each feature or bug fix should be developed in a branch of its own which will eventually be merged back into a stable branch by PR with review. Each feature/fix should have a corresponding open issue. For now, our stable branch is `prototype/initial`. This will change.

As an example, let's I am assigned to [#2](https://github.com/evanwsun/solid-ignite/issues/2). I will first ensure that my stable branch is up to date and I have no local changes: 
```
$ git status
On branch prototype/initial
Your branch is up to date with 'origin/prototype/initial'.

nothing to commit, working tree clean
```
If you don't see this, there should be instructions to fix it.

I will then branch off into my topic branch. The naming should be as follows:
- Feature: `feature/xxx` where `xxx` is a short, descriptive name of the feature (e.g., `login`)
- Bug Fix: `bugfix/xxx` where `xxx` is the issue number of the issue corresponding to the bug (e.g., `2`)

```
$ git checkout -b feature/login
Switched to a new branch 'feature/login'
```

Now I can do all the work I need to do to implement the feature. I can have as many commits as I want. If I want other people to see and be able to work on my branch, I can push it to the remote:
```
$ git push --set-upstream origin feature/login

Counting objects: 3, done.
Delta compression using up to 12 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 292 bytes | 97.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/GrandPanda/ExampleGit.git
 * [new branch]      feature/login -> feature/login
Branch 'feature/login' set up to track remote branch 'feature/login' from 'origin'.
```

After I've done all my work, I'm going to check that everything is committed:
```
$ git status
On branch feature/login
Your branch is up to date with 'origin/feature/login'.

nothing to commit, working tree clean
```

Now I'll make a pull request into the stable branch from the topic branch. Since we're using a free private repo, we can't enforce protected branches, so we just have to pretend. I request reviews from all other committers and make changes as requested. When I have all approvals, my branch can be merged. It should be merged *with* a merge commit. No rebases or fast forwards. 

We can work through merge conflicts as they occur.

After the branch is successfuly merged, it can be deleted.