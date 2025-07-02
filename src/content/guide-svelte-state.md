---
slug: 'guide-svelte-state'
date: '2025-08-10'
title: 'Guide to svelte state for react devs'
tags: ['svelte', 'react']
seoDescription: 'State of svelte for react devs'
---

Are you a legacy React developer?

Have you heard of the chronicles of a once-mystical creature 👾 known as [class based components](https://react.dev/reference/react/Component) in React?

After spending so long exclusively in the React ecosystem—with only brief forays into Vue.js and Angular—I almost feel confined, as if under house arrest. It's as if React has become a pandemic and developers its captive patients. Attempting to leave this ecosystem — which has admittedly served me well in terms of developer satisfaction and community standards reminiscent of Golang — feels like swimming against the current of [global popularity trends.](https://trends.stackoverflow.co/?tags=reactjs%2Cvue.js%2Cangular%2Csvelte%2Cangularjs%2Cvuejs3)

![Untitled-2024-05-26-2011.png](images/fe-tech-stack-popularity.png)

Wait, let's pause for a moment… we're drifting from the topic. This isn't an angry rant about why you should abandon React and sail off to Svelte land—I'll save those opinions for another day. While I'm not a Svelte advocate (having barely dipped my toes in it), there is some evidence in [Svelte's blog](https://svelte.dev/blog/virtual-dom-is-pure-overhead) and a single [Hacker News thread](https://news.ycombinator.com/item?id=37586203) about the modest runtime performance benefits of Svelte over React —though a 95% decrease in bundle size is nothing to laugh at.

![hbhflwf8qsb91.jpg](images/svelte-size-meme.jpg)

The purpose of this article is to provide an exhaustive guide on the dos, don'ts, and gotchas of local component-level state management in Svelte. I was recently influenced by [this column](https://academypublisher.in/2024/10/07/the-yellow-house/) — while the column explores Van Gogh's artwork and its psychological implications — my takeaways from it gave me the notion ([also](https://www.notion.com/), the _editor of choice_ for writing this article) that drawing parallels from our experiences is the most effective way of learning and moving forward.

![empiricism_2x (1).png](images/empiricism.png)

## Defining the scope

As much as I'd like to cover the intricacies of event handling, idiomatic design patterns, and dive into the internals of Golang, these topics are already well-documented in [Svelte's docs](https://svelte.dev/docs) for those willing to take a deep dive. Instead, we'll focus our exploration on answering these key questions:

- How does state management work and what are runes?
- How does reactivity work?
- What causes dependencies of state to update?
- How to make custom `react-like` hooks in Svelte?

Let's get started.

### Let’s Rune your day

Runes constitute the **primary tools** for **state management** in Svelte. To quote from the [official Svelte docs](https://svelte.dev/docs/svelte/what-are-runes):

> If you think of Svelte as a language, runes are part of the syntax — they are _keywords_.

Our exploration will be limited to the following set of runes: `$state`, `$derived` and `$effect`. Starting with a snippet of code, we have the same functionality implemented in Svelte and React. The annotations highlight the **1:1 mapping** between syntax in the two libraries (Even though svelte is a framework, we’ll refer to it as a library for the purposes of this article).

![new-img.png](images/svelte-react-comp.png)

- Runes were introduced in `v5` — the latest major version at the time of writing this article. All state can be safely migrated to use runes, with the added benefit of improved performance. The official migration guide is available [here](https://svelte.dev/docs/svelte/v5-migration-guide).

We’ll break down the code piece by piece to highlight the key differences and potential gotchas, so you’re not caught off guard at work.

### State reactivity using proxies

In **Fig. 1**, we declare and initialize a local store using `$state(0)` — _new syntax alert_! Under the hood, Svelte sets up a **proxy** to enable reactivity. In simple terms, proxies intercept any read or write operations on the state object. The state is consumed in a way that feels similar to React, although updating state in Svelte often requires a slight mental shift to get used to.

In Svelte, state is **mutable**, whether it's a primitive or an object. This is demonstrated in **Fig. 1** (**Point 3)** using `upvotes++`. This mutation updates the state and triggers a UI re-render in the next animation frame — similar to React’s `setState(upvotes + 1)`.

Sweet! Let’s move on to other syntax features.

### Deprecating `$:` in favor of `$derived` & `$effect`

In Svelte, any variables or functions defined **outside of runes** are declared and run exactly once when the **component is initialized**.

```jsx
const upvotes = $state({
  count: 0,
  completed: false,
});
let derivedDoubled = $derived(upvotes.count * 2);
let doubled = upvotes.count;

$effect(() => {
  let timeout = setInterval(() => {
    console.log(upvotes.count);
  });
  return () => clearInterval(timeout);
});
```

There are a [few points to note above](https://www.notion.so/State-of-svelte-for-react-devs-21f0fa2658158003ab3fc3e89d1f742b?pvs=21):

1. **`$effect`** (_new syntax alert_) — acts as a drop-in replacement for `useEffect`, with runtime fine-grained dependency tracking.
2. **`derivedDoubled`** uses **`$derived`** (_new syntax alert_) — it automatically updates based on variables referenced in the expression `upvotes.count * 2`. According to the Svelte docs, it updates synchronously using _push-pull reactivity_, ensuring that any function accessing derived state receives consistent values in sync with its dependencies.
3. **`doubled`** — remains unchanged when `upvotes.count` updates, behaving similarly to React’s `useRef`.

ℹ️ **Note:** Use [`derived.by(fn)`](http://derived.by/) for more complex logic instead of the shorthand `derived(expression)`.

### Reactivity is fine-grained

```jsx
	const upvotes = $state({
		count: 0,
		completed: false
	})

	$effect(() => {
		console.log(upvotes.completed ? `Voting has completed`: 'Voting not completed')
	})

<button onclick={() => upvotes.count++}>
    clicks: {upvotes.count}
</button>
```

[In the example above](https://svelte.dev/playground/9f44e80e72f24e0baa2a8d9f798afc35), we’ve modified the upvotes `$state` from **number** to **object** . To follow :

1. We’re incrementing the `count` property.
2. Using `$effect` to log whether the voting has completed — similar to `useEffect` in react.

Since only `upvotes.completed` is consumed in the `$effect` block, it is not executed if `upvotes.count` is updated. This check is dynamically done at runtime, similar to useEffect. This is called `key` level granularity.

```jsx
useEffect(() => {
  console.log(upvotes.completed ? `Voting has completed` : 'Voting not completed');
}, [upvotes.completed]);
```

> React offers better visibility into reactive statement while svelte works for the user with cleaner syntax and implicitly takes care of the dependencies.

Key Takeaways:

1. `$effect` **observes the reactive signals** (`$state`, `$derived`, etc.) **while executing** its expression. That means dependencies are dynamically detected during the function call—not inferred during build.
2. **Prevent unncessary re-renders** — The child components consuming `upvotes.completed` will not be re-rendered due to shallow comparison of props.

NOTE: Svelte optimizes away redundant assignments such as `upvotes.count = upvotes.count` or `upvotes.count += 0` will invalidate state updates.

### Synchronous state updates

**Task** — We want to execute `fetchCountLogs` immediately on update of `upvotes.counts` . In React, we couldn’t directly use the next state due to asynchronous updates. Therefore, we are bound to create a new variable called `newUpvotes` which needs to be referenced everywhere if we were to use the updated value of `upvotes.count`.

![Untitled-2024-05-26-2011.png](images/sync-update.png)

Svelte takes a different approach, decoupling state updates from batched DOM re-renders. This allows `fetchCountLogs` to run immediately after incrementing the value of `upvotes.count` , consuming the latest value of the state.

### Overriding immutable reactivity in `$derived`

Coming to the fourth point mentioned in **Fig. 1**, derived state is rarely mutated manually and therefore declared as a `const` in 99% of usecases. A rare case, mentioned in [svelte docs](https://svelte.dev/docs/svelte/$derived#Overriding-derived-values), displays the case of optimistic UI updates, where we want to override `$derived` manually, hence declaring it as `let`.

![svelte-3.png](images/svelte-override.png)

While it helps make the website feel snappy, it should be used in **rare instances** and in features which aren’t critical to write failures. **For Example**, liking a video on youtube can have optimistic updates, since the count is an estimate to begin with, commenting on the post could only be shown as sent when the server request is marked completed.

### An alternative to custom `react-like` hooks

By now, we already have all the tools required for creating custom hooks using `runes`. It’s a straightforward vanilla solution with an uncanny resemblance to react hooks syntax. I’ve implemented a `usePrevious` hook which tracks the previous value of the state variable using runes.

![Untitled-2024-05-26-2011.png](images/svelte-hook.png)

Working version for the above example is present [here](https://svelte.dev/playground/b21a77e18b314f2a85d2a28412ae9d8d). There’s a bunch of commonly used hooks implemented on this [website](https://userunes.com/explore) in both javascript & typescript . Happy hunting :)

> It is worth noticing that `runes` can only be used in files with extension `svelte.{ts,js}` .

### What lies ahead?

Despite having discussed exhaustively about the properties of component state management and reactivity, there’s certain topics necessary to make your life easier working with svelte:

1. Managing global state using svelte stores (next part in the series, hopefully)
2. Updating _parent state from child components_ leveraging `$props` & `$bindable`
3. **Bypassing deep reactivity** using `$state.raw` & `$state.snapshot`
4. Handling [direct DOM mutations](https://svelte.dev/playground/bee667bc01d44d4197322007febc3773) based on state updates using [tick](https://svelte.dev/docs/svelte/lifecycle-hooks#tick)
5. Resetting component and it’s state using [key blocks](https://svelte.dev/docs/svelte/key)

I hope this article helped you understand the basics of runes and state management—and instilled some confidence to support your journey toward becoming a **Svelte wizard**.

Feel free to comment on what you liked, disliked or hated. Or reach out directly on [Twitter](https://x.com/_himanshuc3).

[^1]: Tutorial on Svelte reactivity by Vladimir Klepov
[^2]: Svelte official documentation for deep dive
[^3]: Hows and whats of Object Proxy - MDN docs
[^4]: XKCD comic strip #2341 - Empericism
[^5]: The yellow book by Shymanta Das and Dyutimitra Sarmah
[^6]: Explore custom hooks at userunes.com
