---
slug: 'git-ignore'
date: '2025-03-06'
title: '🌲 Git better at ignore-ing'
tags: ['TIL', 'git', 'bash']
---

**Let’s take a contrived example:** It’s been a _hectic day_, filled with _code reviews_, _brainstorming sessions_ and _unstable CI builds_ causing your one line bug-fix to be delayed by a week (only if this was fictional).

In the midst of this chaos my friends, you notice you've got nothing but one code review comment on your PR. Low and behold, it’s of those stupid shared config files (`env`, `config`, `playwright.js`, `package.json` etc.) that slipped through the cracks of your commits.

## 🥁 Enters update-index

`update-index` command updates the index - staging area - entries for one or more files. In simpler terms, it helps you git ignore files valid only to your local index - unlike `.gitignore`, which ignores files for every user commiting to that repo.

```bash
# --no-skip-worktree to reverse the command
git update-index --skip-worktree package.json
```

👉Result of running the command:

- Git _stops tracking changes_ to `package.json` (locally).
- You can still pull updates from the repo.
- Your local changes _won’t show up_ in `git status`, and you won’t accidentally commit them.
- _Persists across branch_ changes on your local.

There’s an alternative flag called `--assume-unchanged` which achieves a similar function, they defer slightly in how they work in git internals.

While in 90% of your use cases, you’ll make do with `skip-worktree` , here’s a general brief of hw they differ:

| Flag                 | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `--assume-unchanged` | **Hint to Git**: "I won’t change this file"   |
| `--skip-worktree`    | **Directive to Git**: "Ignore my local edits" |

> NOTE: If the file shouldn’t be tracked at all (for everyone), use .gitignore instead.
