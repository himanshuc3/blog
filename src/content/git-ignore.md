---
slug: 'git-ignore'
date: '2025-06-03'
title: '🌲 Git better at ignore-ing'
tags: ['TIL', 'git', 'bash']
---

**Let’s consider a relatable (albeit slightly exaggerated) scenario.**
It’s been a long, chaotic day—packed with _code reviews_, endless _brainstorming sessions_, and a _CI pipeline_ that seems determined to sabotage your simple one-line bug fix for an entire week. If only this were fiction.

Amidst the madness, you finally get a notification—someone reviewed your PR. But to your dismay, it’s just one comment. And not even a meaningful one. It’s about a rogue change in a shared config `file—env`, `config.js`, `playwright.config.js`, or the dreaded `package.json`—one of those files that sneaked into your commit unnoticed.

## 🥁 Enters update-index

The `git update-index` command updates the index - staging area - entries for one or more files. In simpler terms, it helps you git ignore files valid only to your local index - unlike `.gitignore`, which ignores files for every user commiting to that repo.

```bash {numberLines}
# --no-skip-worktree to reverse the command
git update-index --skip-worktree package.json
```

**🧠 What this does:**

- 🛑 Git _stops tracking changes_ to `package.json` (locally).
- ⏳ You can still pull updates from the repo without needing to stash your changes.
- 🙌 Your local changes _won’t show up_ in `git status`, and you won’t accidentally commit them.
- 🛟 _Persists across branch_ changes on your local.

There’s an alternative flag called `--assume-unchanged` which achieves a similar function, they defer slightly in how they work in git internals.

While in 90% of your use cases, you’ll make do with `skip-worktree`, here’s a general brief of they differ:

| Flag                 | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `--assume-unchanged` | **Hint to Git**: "I won’t change this file"   |
| `--skip-worktree`    | **Directive to Git**: "Ignore my local edits" |

> 📝 **Note.** If the file shouldn’t be tracked at all (for everyone), use `.gitignore` instead.
