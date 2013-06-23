---
title: street_suffix
signature: |
    chance.street_suffix()
    chance.street_suffix({full: true})
---

Return a random street suffix.

Mostly a helper function for chance.street() but may be useful otherwise
hence being offered here alone.

{% highlight js %}
  chance.street_suffix();
  => 'Rd'
{% endhighlight %}

Can optionally specify that it ought to return a full suffix.

{% highlight js %}
  chance.street_suffixes({full: true});
  => 'Street'
{% endhighlight %}

