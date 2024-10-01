---
slug: "picture-in-picture"
date: "2024-09-10"
title: "🖼️ Everyone get's Picture-in-Picture mode"
tags: ["column", "javascript"]
---


>  *Microbe* :: microscopic, single-celled organisms like bacteria and fungi. That's the most lucid definition and also the first google search result (#SEOmatters).

Welcome to  
 Well keeping the context, a **microbe blog topic is considered as a TIL topic**. Purpose of these type of articles is to be able to read them in even the most busiest of work days in a couple of minutes. So let's get rolling .

## Picture in Picture API

Before we dive into the API, let's see a demo of what we're dealing with here:


<figure>

![PiP in Chrome](assets/blog/gif1.gif)
<figcaption>Fig: Youtube natively supports PIP. right click twice and select PIP mode. </figcaption>

</figure>

>  PS: Song Recommendation: Checkout the fire rap duo *seedhe maut* as well.


### What is It?


The [Picture-in-Picture](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API) API allow websites to create a floating window out of a video, always on top of other windows so that users may continue consuming media while they interact with other content sites, or applications on their device. 

Keyword from above is `<video />` i.e. [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) is the only HTML element on which this interface method is exposed.

Essentially the usecase is to maximize screen-space while navigating away from a page with the restriction of only being able to be played in the minimized window. So mundane apps that we use on a daily basis like google meet, youtube etc. can essentially use this feature. 

Now this feature is not natively supported in all applications. Which brings me to the snippet you can use to make any video go into PIM.. ah, PIP mode:



<p class="codeblock-title">console tricks: selects the first video in the page and shows in PIP</p>

```js
var selectedVideo = document.getElementsByTagName('video')[0]; // selects the first video, can also select by classname/id if multiple videos are playing on the same page
selectedVideo.disablePictureInPicture = false // enable pip mode 
await selectedVideo.requestPictureInPicture() // enjoy PIP
```


<figure>

![PiP in everywhere](assets/blog/gif2.gif)
<figcaption>Fig: Using the snippet on Hotstar (popular Indian streaming platform)</figcaption>

</figure>

---


### Cross browser support

![Can I use](assets/blog/pip-caniuse.png)


> **NOTE:** Support for it is still in it's early stage as of the date of writing the article from the POV of browsers.
> Although latest versions of chrome, safari and edge support it, firefox still has partial support.
