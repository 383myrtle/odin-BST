class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const treeArr = this.reformat(arr);
    return this.buildTreeRecursive(treeArr, 0, treeArr.length - 1);
  }

  buildTreeRecursive(arr, start, end) {
    if (start > end) {
      return null;
    }
    const midIndex = Math.floor((start + end) / 2);
    const mid = arr[midIndex];
    const root = new Node(mid);
    root.left = this.buildTreeRecursive(arr, start, midIndex - 1);
    root.right = this.buildTreeRecursive(arr, midIndex + 1, end);
    return root;
  }

  reformat(arr) {
    return [...new Set(arr)].sort((a, b) => a - b);
  }

  insert(value) {
    this.insertRecursive(this.root, value);
  }

  insertRecursive(node, val) {
    if (val > node.data) {
      if (!node.right) {
        node.right = new Node(val);
        return;
      }
      this.insertRecursive(node.right, val);
    } else if (val < node.data) {
      if (!node.left) {
        node.left = new Node(val);
        return;
      }
      this.insertRecursive(node.left, val);
    }
  }

  deleteItem(value) {
    let current = this.root;
    let prev = null;
    let isLeft = false;
    while (current) {
      if (value === current.data) {
        if (!current.right && !current.left) {
          // No children
          if (isLeft) {
            prev.left = null;
          } else {
            prev.right = null;
          }
        } else if (!(current.right && current.left)) {
          // One child
          const child = current.left ? current.left : current.right;
          if (isLeft) {
            prev.left = child;
          } else {
            prev.right = child;
          }
        } else {
          // Two children
          const nextSmallest = this.findNextSmallest(current);
          this.deleteItem(nextSmallest.data);
          current.data = nextSmallest.data;
        }
        return;
      } else if (value > current.data) {
        prev = current;
        current = current.right;
        isLeft = false;
      } else {
        prev = current;
        current = current.left;
        isLeft = true;
      }
    }
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (current.data === value) {
        return current;
      } else if (value > current.data) {
        current = current.right;
      } else {
        current = current.left;
      }
    }
    return null;
  }

  height(node) {
    if (!node) {
      return -1;
    }
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, depth = 0) {
    if (!current) {
      return -1;
    }
    if (current.data === node.data) {
      return depth;
    }
    return node.data < current.data
      ? this.depth(node, current.left, depth + 1)
      : this.depth(node, current.right, depth + 1);
  }

  isBalancedRec(root) {
    if (root === null) {
      return 0;
    }

    const heightLeft = this.isBalancedRec(root.left);
    const heightRight = this.isBalancedRec(root.right);
    if (
      heightLeft === -1 ||
      heightRight === -1 ||
      Math.abs(heightLeft - heightRight) > 1
    ) {
      return -1;
    }
    return Math.max(heightLeft, heightRight) + 1;
  }

  isBalanced() {
    return this.isBalancedRec(this.root) > 0;
  }

  rebalance() {
    const arr = [];
    this.inOrder((node) => {
      arr.push(node.data);
    });
    this.root = this.buildTree(arr);
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Error: please provide a callback function.");
    }
    const queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  traverse(root, callback, order) {
    if (order === "pre") {
      callback(root);
    }
    if (root.left) {
      this.traverse(root.left, callback, order);
    }
    if (order === "in") {
      callback(root);
    }
    if (root.right) {
      this.traverse(root.right, callback, order);
    }
    if (order === "post") {
      callback(root);
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("Error: please provide a callback function.");
    }

    this.traverse(this.root, callback, "in");
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Error: please provide a callback function.");
    }

    this.traverse(this.root, callback, "pre");
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Error: please provide a callback function.");
    }

    this.traverse(this.root, callback, "post");
  }

  findNextSmallest(root) {
    let current = root.right;
    if (!current) {
      return null;
    }
    while (current.left) {
      current = current.left;
    }
    return current;
  }
}
