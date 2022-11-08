# File with content

Generates a file with random name, extention and data
```js
// Usage
chance.fileWithContent({
  fileName: "AwesomeFile",
  fileExtension: "gif",
  fileSize: 1024})

```

Returns an object with fileData as a Buffer and file name as a String
```js
// Returns
{
  fileData: <Buffer 00 00 00... 1998 more bytes>,
  fileName: 'zo.gif'
}
```

Random name and format
```js
chance.fileWithContent({fileSize: 1024})

```
Random format
```js
chance.fileWithContent({
  fileName: "AwesomeFile",
  fileSize: 2048})
```
* Takes the optional fileName and fileExtension, otherwise generates from file()
* 0 Size files are ok


