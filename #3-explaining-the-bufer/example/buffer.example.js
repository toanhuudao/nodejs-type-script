// const buffer = new Buffer(5);
 
// buffer[0] = 255;
// console.log(buffer[0]); // 255
 
// buffer[1] = 256;
// console.log(buffer[1]); // 0
 
// buffer[2] = 260;
// console.log(buffer[2]); // 4
// console.log(buffer[2] === 260%256); // true
 
// buffer[3] = 516;
// console.log(buffer[3]); // 4
// console.log(buffer[3] === 516%256); // true
 
// buffer[4] = -50;
// console.log(buffer[4]); // 206

// const bufferWithIcon = Buffer.from('🌎');
// console.log(Buffer.byteLength(bufferWithIcon));
// console.log(bufferWithIcon);

// const buffer = Buffer.from('Hello world!');
// console.log(buffer.toString()); // Hello world!

// const buffers = [
//     Buffer.from('Hello '),
//     Buffer.from([0b11110000, 0b10011111]),
//     Buffer.from([0b10001100, 0b10001110]),
//     Buffer.from(' world!'),
//   ];

//   let result = '';
// buffers.forEach((buffer) => {
//   result += buffer.toString();
// });
 
// console.log(result); // Hello ��� world!

// import { StringDecoder } from 'string_decoder';
 
// const decoder = new StringDecoder('utf8');
 
// const buffers = [
//   Buffer.from('Hello '),
//   Buffer.from([0b11110000, 0b10011111]),
//   Buffer.from([0b10001100, 0b10001110]),
//   Buffer.from(' world!'),
// ];
 
// const result = buffers.reduce((result, buffer) => (
//   `${result}${decoder.write(buffer)}`
// ), '');
 
// console.log(result); // Hello 🌎 world!

// import * as fs from 'fs';
// import * as util from 'util'
 
// const readFile = util.promisify(fs.readFile);
 
// readFile('./file.txt', { encoding: 'utf8' })
//   .then((content) => {
//     console.log(content);
//   })
//   .catch(error => console.log(error));

//   import * as fs from 'fs';
// import * as util from 'util'

// const readFile = util.promisify(fs.readFile);

// readFile('./file.txt')
//  .then((content) => {
//    console.log(content instanceof Buffer); // true
//    console.log(content.toString())
//  })
//  .catch(error => console.log(error));