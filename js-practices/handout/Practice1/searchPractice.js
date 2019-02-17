"use strict";

function search(input, target) {
  let i = 0;
  for (const item of input) {
    if (item == target) {
      return i;
    }
    i++;
  }
  return -1;
}

module.exports = search;
