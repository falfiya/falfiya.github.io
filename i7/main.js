// Into The Earth
const fontSize = 14;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext`2d`;
const del = document.documentElement;
const height = del.clientHeight;
const width = del.clientWidth;
/*
const adjustedHeight = height / size;
const adjustedWidth = width / size;
*/
const calibrateC = () => {
  canvas.height = height;
  canvas.width = width;
};
calibrateC(); // Running it just to make sure
// const fillText = str => 
