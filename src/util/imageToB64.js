import fs from 'fs';
import path from 'path';

// Function to convert an image file to base64
export const imageToBase64 = (imagePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
      if (err) {
        reject('Error reading the file');
      }
      resolve(data);
    });
  });
};