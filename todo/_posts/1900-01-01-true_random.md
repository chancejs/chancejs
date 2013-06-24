---
title: True Random
---

By default, the underlying random() is based on the Mersenne Twister. This is rad for repeatability, so given a seed a "random" sequence can be recreated, but it's only pseudo-random.

There is nothing that would prevent this library from choosing, on instantiation, another random underbase though so in theory this whole library could work with a "true" random base.

Getting it to be true random would require some external entropy somehow and this gets tricky when putting this in Node or something. The usual "move your mouse to generate entropy" won't work. I considered integrating with [http://www.random.org](http://www.random.org) but that would involve network latency which may be undesired and may work differently in Node or in the browser.

Anyway, none of these are insurmountable, but are tricky.
