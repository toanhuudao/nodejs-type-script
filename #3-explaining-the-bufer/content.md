
# Buffers

The buffer exists in Node.js to help us manipulate binary data. But what is it exactly?

The computer represents data in binary: ones and zeros. To store a number, the machine first converts it to a binary representation. The conversion is usually pretty straightforward and in most cases does not leave any doubts on what its binary form should be.

Numbers are not the only type of data that we work with: we also have images, text, videos. To represent such data, we need to make up some conventions, because all the data is represented by numbers. When it comes to text, there are multiple character encodings, defining sets of characters and how to represent them using a number. A very popular one is UTF-8, which we use throughout this article.

## The buffer is an array of numbers

The buffer is a chunk of memory and it is similar to an array of numbers. The trick to it is that you establish the size of a buffer when it is created and can’t change it afterward. It is an array of bytes. Since a maximum number saved on a single byte is 255, the buffer element can’t contain bigger numbers:

```js
const buffer = new Buffer(5);
 
buffer[0] = 255;
console.log(buffer[0]); // 255
 
buffer[1] = 256;
console.log(buffer[1]); // 0
 
buffer[2] = 260;
console.log(buffer[2]); // 4
console.log(buffer[2] === 260%256); // true
 
buffer[3] = 516;
console.log(buffer[3]); // 4
console.log(buffer[3] === 516%256); // true
 
buffer[4] = -50;
console.log(buffer[4]); // 206
```
As you can see, if you try to assign a value bigger than 255, it gets divided by 256 and the remainder of the division is assigned to the element.

An interesting thing goes with negative numbers. If you try to assign a negative number to a byte,
it gets converted using the two’s complement system.

```js
-50(10) = 11001110(U2)

parseInt('11001110', 2); // 206
```

When you create the buffer, you can also fill it with a value

```js
// Creates a Buffer of length 5, filled with 1
const buffer = Buffer.alloc(5, 1);
// Creates a Buffer containing 1, 2, 3
const buffer = Buffer.from([1, 2, 3]);
```

## String Buffers

Since Buffers store byte data, you can also use it to operate on strings.

```js
const buffer = Buffer.from('Hello world!');
```

By default, it uses UTF-8 encoding and we need to keep that in mind. You can change it using the second argument
that you pass to the “from” function.

Such Buffer can be easily read using the toString function.

```js
const buffer = Buffer.from('Hello world!');
console.log(buffer.toString()); // Hello world!
```

The things are not always so easy though! There are many UTF-8 characters that take more than just one byte and that might cause you some trouble. Let’s look at this string:

```js
Hello 🌎 world!
```

There is an emoji in the middle that consists of four bytes:  11110000  10011111  10001100  10001110

Let’s save this data in multiple buffers:

```js
const buffers = [
  Buffer.from('Hello '),
  Buffer.from([0b11110000, 0b10011111]),
  Buffer.from([0b10001100, 0b10001110]),
  Buffer.from(' world!'),
];
```

Something like this can happen for example when you are interpreting a big text file. If you parse it in chunks, one of the chunks might contain just a part of the character, just like above. Let’s try to stringify it:

```js
let result = '';
buffers.forEach((buffer) => {
  result += buffer.toString();
});
 
console.log(result); // Hello ��� world!
```

Unfortunately, it doesn’t work good! This is because every buffer is treated separately. We can improve on that using a StringDecoder. It provides an API for decoding Buffer objects into strings while preserving multi-byte characters.

```js
import { StringDecoder } from 'string_decoder';
 
const decoder = new StringDecoder('utf8');
 
const buffers = [
  Buffer.from('Hello '),
  Buffer.from([0b11110000, 0b10011111]),
  Buffer.from([0b10001100, 0b10001110]),
  Buffer.from(' world!'),
];
 
const result = buffers.reduce((result, buffer) => (
  `${result}${decoder.write(buffer)}`
), '');
 
console.log(result); // Hello 🌎 world!
```

==The StringDecoder ensures that the decoded string does not contain any incomplete multibyte characters by holding the incomplete character in an internal buffer until the next call to the  decoder.write() ==.

## Reading a file

In the first part of the series, we read a file specifying the encoding.

 ```js
import * as fs from 'fs';
import * as util from 'util'
 
const readFile = util.promisify(fs.readFile);
 
readFile('./file.txt', { encoding: 'utf8' })
  .then((content) => {
    console.log(content);
  })
  .catch(error => console.log(error));
 ```

 Thanks to that, we receive its contents as a string. If we don’t provide the encoding, we receive a raw buffer that we can stringify.

 ```js
import * as fs from 'fs';
import * as util from 'util'
 
const readFile = util.promisify(fs.readFile);
 
readFile('./file.txt')
  .then((content) => {
    console.log(content instanceof Buffer); // true
    console.log(content.toString())
  })
  .catch(error => console.log(error));
 ```

 ==The readFile function reads the entire contents of a file at once. Because of that, it calls our callback function just once after the whole file is processed – even if it is very big. To perform actions on parts of a file before the whole content is loaded, we need to use the createReadStream function, that returns a stream==.

## Summary

 The buffer is an array of bytes, where an element has a value from 0 to 255. Since every type of data, such as images and text has to be represented as numbers, we also explain the idea of character encodings.