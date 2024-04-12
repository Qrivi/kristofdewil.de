---
title: Why cats are awesome
description: Hey cat aficionados, let's take a moment to appreciate the majestic wonders that are feline friends.
publishDate: 2020-12-22
readTime: 3
topics:
  - cats
  - awesome
draft: false
---

Hey cat aficionados, let's take a moment to appreciate the majestic wonders that are feline friends. Cats, my pals, are the epitome of cool and class, effortlessly strutting through life with an air of mystery that keeps us hooked. Whether they're lounging on the windowsill, plotting world domination from their cardboard fortress, or executing acrobatic feats that defy gravity, these whiskered wonders are a constant source of entertainment and fascination.

```astro {8}
---
const posts = await Astro.glob('../pages/post/*.md'); // returns an array of posts that live at ./src/pages/post/*.md
---

<div>
{posts.slice(0, 3).map((post) => (
  <article>
    <h2>{post.frontmatter.title}</h2>
    <p>{post.frontmatter.description}</p> // [!code warning]
    <a href={post.url}>Read more</a>
  </article>
  <span></span> // [!code ++]
  <span></span> // [!code --]
))}
</div>
```

Let's talk about independence – cats practically wrote the handbook on it. These self-sufficient furballs are like the James Bonds of the pet world, handling their business with a nonchalant swagger. Need a buddy to binge-watch your favorite series? Cats got you covered. They're the perfect Netflix-and-chill companions, offering companionship without the need for constant attention.

# It is simple

And let's not forget the purr. That soothing, rhythmic hum is like a built-in stress reliever, turning any mundane moment into a therapeutic experience. Cats bring a sense of calm and tranquility to our lives, reminding us that it's okay to take a break, chill out, and embrace our inner zen. So, to the feline overlords that grace our homes, here's a toast to your unmatched charm and the pawsitively awesome vibes you bring to our world!

# Or is it?

And let's not forget the purr. That soothing, rhythmic hum is like a built-in stress reliever, turning any mundane moment into a therapeutic experience. Cats bring a sense of calm and tranquility to our lives, reminding us that it's okay to take a break, chill out, and embrace our inner zen. So, to the feline overlords that grace our homes, here's a toast to your unmatched charm and the pawsitively awesome vibes you bring to our world!
