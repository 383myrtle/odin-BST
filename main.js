import { Tree } from "./Tree.js";

const inputArr = [];
for (let i = 0; i < 15; i++) {
  inputArr[i] = Math.round(100 * Math.random());
}
console.log(inputArr);
const tree = new Tree(inputArr);

prettyPrint(tree.root);
testBalance();
// Run tests
printLevelOrder();
printInOrder();
printPreOrder();
printPostOrder();

console.log("/*** Testing search ***/");
testFind();
console.log("/*** Testing delete ***/");
testDelete();
console.log("/*** Testing height & depth ***/");
testHeight();
testDepth();

console.log("/*** Testing insertion & rebalancing ***/");
tree.insert(101);
tree.insert(102);
tree.insert(103);
prettyPrint(tree.root);
testBalance();
console.log("Rebalancing tree...");
tree.rebalance();
prettyPrint(tree.root);
testBalance();

function printPostOrder() {
  let str = "";
  tree.postOrder((node) => {
    str += node.data + " ";
  });
  console.log("Postorder traversal: " + str);
}

function printPreOrder() {
  let str = "";
  tree.preOrder((node) => {
    str += node.data + " ";
  });
  console.log("Preorder traversal: " + str);
}

function printInOrder() {
  let str = "";
  tree.inOrder((node) => {
    str += node.data + " ";
  });
  console.log("In order traversal: " + str);
}

function printLevelOrder() {
  let str = "";
  tree.levelOrder((node) => {
    str += node.data + " ";
  });
  console.log("Level order traversal: " + str);
}

function testDelete() {
  const randIndex = Math.round((inputArr.length - 1) * Math.random());
  const randValue = inputArr[randIndex];
  tree.deleteItem(randValue);
  console.log("Deleting item " + randValue + "...");
  prettyPrint(tree.root);
}

function testFind() {
  const randIndex = Math.round((inputArr.length - 1) * Math.random());
  const randValue = inputArr[randIndex];
  console.log("Searching for " + randValue + "...");
  console.log(tree.find(randValue));
}

function testHeight() {
  console.log(`Height of tree is ${tree.height(tree.root)}`);
}

function testDepth() {
  const randIndex = Math.round(inputArr.length * Math.random());
  const randValue = inputArr[randIndex];
  const randNode = tree.find(randValue);
  console.log(`Depth of element ${randValue} is ${tree.depth(randNode)}`);
}

function testBalance() {
  if (tree.isBalanced()) {
    console.log("Tree is balanced.");
  } else {
    console.log("Tree is not balanced.");
  }
}

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
