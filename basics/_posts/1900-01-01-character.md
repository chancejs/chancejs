---
title: character
signature: |
    chance.character()
    chance.character({pool: 'abcde'})
    chance.character({alpha: true})
    chance.character({casing: 'lower'})
    chance.character({symbols: true})
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

Optionally specify alpha for only an alphanumeric character.

{% highlight js %}
chance.character({alpha: true});
=> 'N'
{% endhighlight %}

Default includes both upper and lower case. It's possible to specify one or the
other.

{% highlight js %}
chance.character({casing: 'lower'});
=> 'j'
{% endhighlight %}

*Note, wanted to call this key just ```case``` but unfortunately that's a
reserved word in JavaScript for use in a switch statement*

Optionally return only symbols

{% highlight js %}
chance.character({symbols: true});
=> '%'
{% endhighlight %}
