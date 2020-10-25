class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class AVL {
    constructor() {
        this.root = null
    }

    getRoot() {
        return this.root
    }

    getHeight(node) {
        let h = 0
        if(node !== null) {
            let left = this.getHeight(node.left)
            let right = this.getHeight(node.right)
            let maxHeight = Math.max(left, right)
            h = maxHeight+1
        }
        return h
    }

    getDiff(node) {
        let left = this.getHeight(node.left)
        let right = this.getHeight(node.right)
        return left - right
    }

    rotateRR(node) {
        let temp = node.right
        node.right = temp.left
        temp.left = node
        return temp;
    }

    rotateLL(node) {
        let temp = node.left
        node.left = temp.right
        temp.right = node
        return temp
    }

    rotateLR(node) {
        let temp = node.left
        node.left = this.rotateRR(temp)
        return this.rotateLL(node)
    }

    rotateRL(node) {
        let temp = node.right
        node.right = this.rotateLL(temp)
        return this.rotateRR(node)
    }

    balance(node) {
        let factor = this.getDiff(node)
        if(factor > 1) {
            if(this.getDiff(node.left) > 0) node = this.rotateLL(node)
            else node = this.rotateLR(node)
        } else if(factor < -1) {
            if(this.getDiff(node.right) > 0) node = this.rotateRL(node)
            else node = this.rotateRR(node)
        }
        return node
    }

    insert(root, data) {
        if(root === null) {
            root = new Node(data)
            return root
        } else if(data < root.data) {
            root.left = this.insert(root.left, data)
            root = this.balance(root)
        } else if(data >= root.data) {
            root.right = this.insert(root.right, data)
            root = this.balance(root)
        }
        return root
    }
}

let array = [1, 5, 2, 10, -99, 7, 5]
function main(array) {
    let test = new AVL()
    let root = test.root;
    for(let i=0; i<array.length; i++) {
        // console.log(array[i])
        root = test.insert(root, array[i])
        console.log(root)
    }
}

main(array)