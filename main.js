import { Tree } from "./Tree.js";

const inputArr = [];
for (let i = 0; i < 10; i++) {
  inputArr[i] = Math.round(100 * Math.random());
}
console.log(inputArr)
const tree = new Tree(inputArr);

prettyPrint(tree.root);

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
