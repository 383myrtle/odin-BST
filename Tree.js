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
