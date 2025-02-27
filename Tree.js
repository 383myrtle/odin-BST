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
    arr = this.removeDuplicates(arr);
    arr.sort(this.sortAscending);
    return arr;
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
    const queue = [];
    queue.push(node);
    queue.push(null);
    let height = 0;

    while (queue.length > 0) {
      let current = queue.shift();
      if (current === null) {
        height++;
        if (queue.length > 0) {
          queue.push(null);
        }
        continue;
      }
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return height - 1;
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

  inOrder(callback) {
    if (!callback) {
      throw new Error("Error: please provide a callback function.");
    }

    this.inOrderRecursive(this.root, callback);
  }

  inOrderRecursive(root, callback) {
    if (root.left) {
      this.inOrderRecursive(root.left, callback);
    }
    callback(root);
    if (root.right) {
      this.inOrderRecursive(root.right, callback);
    }
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Error: please provide a callback function.");
    }

    this.preOrderRecursive(this.root, callback);
  }

  preOrderRecursive(root, callback) {
    callback(root);
    if (root.left) {
      this.preOrderRecursive(root.left, callback);
    }
    if (root.right) {
      this.preOrderRecursive(root.right, callback);
    }
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Error: please provide a callback function.");
    }

    this.postOrderRecursive(this.root, callback);
  }

  postOrderRecursive(root, callback) {
    if (root.left) {
      this.postOrderRecursive(root.left, callback);
    }
    if (root.right) {
      this.postOrderRecursive(root.right, callback);
    }
    callback(root);
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

  removeDuplicates(arr) {
    const copy = [];
    arr.forEach((element) => {
      if (!copy.includes(element)) {
        copy.push(element);
      }
    });
    return copy;
  }

  sortAscending(a, b) {
    return a - b;
  }
}
