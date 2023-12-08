# MAC

```js
// usage
chance.mac()
chance.mac({ delimiter: "-" })
chance.mac({ upperCase: false })
chance.mac({ oui: "AB:CD:EF" })
```

Create a random [MAC address](https://en.wikipedia.org/wiki/MAC_address).

```js
chance.mac();
=> 'A7:D0:C4:8E:95:AE'

chance.mac();
=> 'FF:ED:17:06:3F:88'
```

Optionally define the delimiter between the hex characters. Default is `:`

```js
chance.mac({ delimiter: "-" })
=> '7D-DA-4E-F2-0F-8E'
```

Optionally define the case of the hex characters. Default is upper case.

```js
chance.mac({ upperCase: false })
=> '7d:da:4e:f2:0f:8e'
```

Optionally define the MAC OUI (organizationally unique identifier) which are the first 3 octets of the mac address
```js
chance.mac({ oui: "AB:CD:EF" })
=> 'AB:CD:EF:84:27:B4'
chance.mac({ oui: "AB:CD:EF:" })
=> 'AB:CD:EF:A6:5A:16'
```

