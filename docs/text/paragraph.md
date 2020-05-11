# paragraph

```js
// usage
chance.paragraph()
chance.paragraph({ sentences: 1 })
chance.paragraph({ linebreak: true })
```

Return a random paragraph generated from sentences populated by semi-pronounceable
random (nonsense) words.

```js
  chance.paragraph();
  => 'Lel fi huepe jupu akse zej ire vesik kojvulom zon is biwuwkef pa. Uv hokivej voh ebu numdogi akolo hik uwlez ta vacev ofdaimi acunetum suvet uhdab ir soglazo ju pafbeb. Pub cezeh fuc kebamnul he ok luumoabi rawkig me fov pin zup biv risugra. Ralpunad apkomgib alnirciw akel wa lus wahfum burog buol vecotihe abadahoj ugolo wovki ucojal fec.'
```

Default is a paragraph with a random number of sentences from 3 to 7.

Optionally specify the number of sentences in the paragraph.

```js
  chance.paragraph({ sentences: 1 });
  => 'Idefeulo foc omoemowa wahteze liv juvde puguprof epehuji upuga zige odfe igo sit pilamhul oto ukurecef.'
```

Optionally specify if each sentence in the paragraph should start a new line.

```js
  chance.paragraph({ linebreak: true });
  => `
      Moku kazkubib adi apo bebiw movarne rab tusa vura nok ji iv otukib dewut.
      Tiwlo orojel vuhhet emluliv loha ma rulical fokuv re dob fabup bit.
      Veza ermethit osgues dohjeci pezlal su ibi cib zerezci bode ca hopmub gigwosut culhoca nubu.
     `
```



