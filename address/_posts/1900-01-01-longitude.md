---
title: longitude
signature: |
    chance.longitude()
    chance.longitude({fixed: 7})
---

Generate a random longitude.

{% highlight js %}
chance.longitude();
=> 149.41549
{% endhighlight %}

_range: 0 to 180_

By default includes 5 fixed digits after decimal, can specify otherwise.

{% highlight js %}
chance.longitude({fixed: 7});
=> 51.4549925
{% endhighlight %}

