---
title: name_prefix
signature: |
    chance.name_prefix()
    chance.name_prefix({full: true})
---

Generate a random name prefix

{% highlight js %}
  chance.name_prefix();
  => 'Mrs.'
{% endhighlight %}

By default, returns the shorter version.

Optionally get back the full version.

{% highlight js %}
  chance.name_prefix({full: true});
  => 'Mister'
{% endhighlight %}
