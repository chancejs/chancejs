---
title: street_suffixes
signature: |
    chance.street_suffixes()
    chance.street_suffixes({full: true})
---

Unlike many of the other functions, this is just a helper function and
does not have any random component.

It just returns the list of available street suffixes that we have.

It is intended to be used by the street_suffix() function, but seemed
worth exposing in case it's useful for anyone else in other contexts.

{% highlight js %}
  chance.street_suffixes();
  => ['Ave', 'Blvd', 'Ctr', 'Cir', ...]
{% endhighlight %}

Can optionally specify that it ought to return full suffixes:

{% highlight js %}
  chance.street_suffixes({full: true});
  => ['Avenue', 'Boulevard', 'Center', 'Circle', ...]
{% endhighlight %}

