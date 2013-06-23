---
title: character
signature: |
    chance.character()
    chance.character({pool: 'abcde'})
---

Return a random character.

{% highlight js %}
  chance.character();
  => 'v'
{% endhighlight %}

By default it will return a string with random character from the following
pool.

{% highlight js %}
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
{% endhighlight %}

Optionally specify a pool and the character will be generated with characters
only from that pool.

{% highlight js %}
  chance.character({pool: 'abcde'});
  => 'c'
{% endhighlight %}
