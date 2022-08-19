# Objective
A simple set of games for my son. Some I coded from scratch, others I edited from open-source-repos. The list of games are found below. More explanation and learnings are described in the folders.

- [Youtube Kids Simulator](./ytkids)
- [Tic-Tac-Toe](./xoxo)

# Learnings

#### 1. Using `submodule`s
The intent was to keep this repo organised, since each "game" is quite standalone and should have its own repo to track its own lifetime.

However, it turns out it entails more steps for my use case. For the Youtube Kids Simulator, we often add new photos which thus require code change (until I link this directly to a S3 bucket which I feel is an overkill at this point). The old steps (without using submodules) are listed below.
1. add image to directory
2. `npm run start` so we start playing on `localhost` (I configured this command to automatically run `tsc` and `webpack-dev-server`)
3. `git push` the code so that it gets released to Github Pages.

With submodules, we now have to straddle between 2 repos and perform additional steps (4) and (5)
1. on ytkids repo, add image to directory 
2. on ytkids repo, `npm run start` so we start playing on `localhost`
3. on ytkids repo, `git push`
4. on this repo, pull latest changes from ytkids repo with `git submodule update --remote`
5. `git push` this update so that it gets released to Github Pages.

Depending on how often I make changes to the submodules, I will re-evaluate the usefulness of this strategy again at a later time. In the meantime, the implementation can be found on the `use-submodules` branch [here](https://github.com/chongzixin/chongzixin.github.io/tree/use-submodules).
- [Youtube Kids Simulator Repo](https://github.com/chongzixin/ytkids-simu)
- [XOXO (Tic-Tac-Toe)](https://github.com/chongzixin/xoxo)

##### UPDATE: automating deployments from submodule changes
Referencing this [StackOverflow thread](https://stackoverflow.com/questions/64407333/using-github-actions-to-automatically-update-the-repos-submodules), I implemented a GitHub Actions workflow on the `ytkids` repo, which automatically triggers a submodule update on this branch whenever a push on the child repo's `main` branch is detected. This essentially skips additional steps 4 and 5 mentioned above, and deploys any changes immediately to live.