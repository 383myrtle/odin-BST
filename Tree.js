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
