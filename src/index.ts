// Practise with structures in JS/TS

//================ ARRAY ================

let arr1 : number[];
let arr2 : Array<number> = [1, 2, 3];
arr1 = [1, 2, 3, 4, 5];
console.log(arr1);

// INSERT
arr1.unshift(0);                    // O(n) into the begining
arr1.splice(1, 0, 12, 13, 14, 15);  // O(n) into the middle
arr1.push(6);                       // O(1) into the end (if there is no available place = O(n))

console.log(arr1);


// OBTAIN
arr1[0];                // O(1) into the begining
arr1[5];                // O(1) into the middle
arr1[arr1.length - 1];  // O(1) into the end (if there is no available place = O(n))
//obtain by index O(1)


// DELETE
arr1.shift();      // O(n) into the begining
arr1.splice(0, 4); // O(n) into the middle
arr1.pop();        // O(1) into the end (if there is no available place = O(n))

console.log(arr1);

// Additional methods

let tempArr = arr1.concat(arr2);
let sum : number = 0;
arr1.forEach(elem => {
    sum += elem;
});
arr1.fill(4, 1, 3);
tempArr = arr1.map(elem => elem * 2);
tempArr = arr1.filter(elem => elem > 3);
let tempVal = arr1.find( elem => elem == 2);
let index = arr1.findIndex( elem => elem == 2);
arr1.includes(5);
arr1.reverse();
arr1.at(5);
arr1.slice(); // copy of original array
arr1.sort(); // in aumenting order


//================ List ================

class MyNode {
    data: any;
    next: MyNode | null = null;
    
    constructor(data: any) {
        this.data = data;
    }
}

class LinkedList {
    head: MyNode | null = null;

    // Вставка в начало
    insertAtBeginning(data: any) {
        let newNode = new MyNode(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    // Вставка в конец
    insertAtEnd(data: any) {
        let newNode = new MyNode(data);
        if (this.head === null) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            current = current.next as MyNode;
        }
        current.next = newNode;
    }

    // Вставка в середину
    insertAt(index: number, data: any) {
        if (index === 0) {
            this.insertAtBeginning(data);
            return;
        }
        let newNode = new MyNode(data);
        let current = this.head;
        let count = 0;
        while (current !== null && count < index - 1) {
            count++;
            current = current.next;
        }
        if (current === null) return;
        newNode.next = current.next;
        current.next = newNode;
    }

    // Получение элемента по индексу
    getElementAt(index: number): any {
        let current = this.head;
        let count = 0;
        while (current !== null) {
            if (count === index) return current.data;
            count++;
            current = current.next;
        }
        return null;
    }

    // Удаление элемента по индексу
    deleteAt(index: number): void {
        if (this.head === null) return;
        if (index === 0) {
            this.head = this.head.next;
            return;
        }
        let current = this.head as MyNode | null;
        let prev = null;
        let count = 0;
        while (current !== null && count !== index) {
            prev = current;
            current = current.next;
            count++;
        }
        if (current === null) return;
        prev!.next = current.next;
    }

    // Метод forEach
    forEach(callback: (data: any) => void) {
        let current = this.head;
        while (current !== null) {
            callback(current.data);
            current = current.next;
        }
    }
}

let list = new LinkedList();
list.forEach((data) => console.log(data));


// INSERT
list.insertAtBeginning(1);  // O(1) into the begining
list.insertAtEnd(2);        // O(n) into the middle
list.insertAt(1, 1.5);      // O(n) into the end (if there is link to end = O(1))

list.forEach((data) => console.log(data));


// OBTAIN
let first = list.getElementAt(0);   // O(1) into the begining
let middle = list.getElementAt(1);  // O(n) into the middle
let last = list.getElementAt(2);    // O(n) into the end (if there is link to end = O(1))
//obtain by index O(n)


// DELETE
list.deleteAt(0); // O(1) into the begining
list.deleteAt(1); // O(n) into the middle
list.deleteAt(2); // O(n) into the end (if there is link to end = O(1))

list.forEach((data) => console.log(data));

// Additional methods
// -same as array



//================ Double-linked List ================
// Use links to next and previous

// INSERT
// O(1) into the begining
// O(n) into the middle
// O(1) into the end


// OBTAIN
// O(1) into the begining
// O(n) into the middle
// O(1) into the end 
//obtain by index O(n)


// DELETE
// O(1) into the begining
// O(n) into the middle
// O(1) into the end 


//================ Heap ================

class MaxHeap {
    heap: number[] = [];

    // Получение индекса родителя
    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    // Получение индекса левого потомка
    private left(i: number): number {
        return 2 * i + 1;
    }

    // Получение индекса правого потомка
    private right(i: number): number {
        return 2 * i + 2;
    }

    // Поменять местами два элемента
    private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Вставка в кучу
    insert(value: number) {
        this.heap.push(value);
        this.heapifyUp();
    }

    // Удаление из кучи
    extractMax(): number | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop() || null;

        const root = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();

        return root;
    }

    // Поднятие элемента вверх
    private heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0 && this.heap[this.parent(index)] < this.heap[index]) {
            this.swap(index, this.parent(index));
            index = this.parent(index);
        }
    }

    // Спуск элемента вниз
    private heapifyDown() {
        let index = 0;
        while (this.left(index) < this.heap.length) {
            let largerChildIndex = this.left(index);
            if (this.right(index) < this.heap.length && this.heap[this.right(index)] > this.heap[largerChildIndex]) {
                largerChildIndex = this.right(index);
            }

            if (this.heap[index] >= this.heap[largerChildIndex]) break;

            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }

    // Метод forEach для итерации
    forEach(callback: (data: number) => void) {
        this.heap.forEach(callback);
    }
}

let heap = new MaxHeap();

// INSERT
heap.insert(10); // O(log n) into the heap
heap.insert(20); // O(log n) into the heap
heap.insert(5);  // O(log n) into the heap

heap.forEach((data) => console.log(data));

// OBTAIN
let max = heap.extractMax(); // O(log n)
console.log(max); // Extracts and prints the max element from the heap

// DELETE
// Deleting from specific positions (beginning, middle, end) is N/A as heaps don't support direct index-based deletion




//================ Set ================

// INSERT
let set = new Set<number>();
set.add(1); // O(1)
set.add(2); // O(1)
set.add(3); // O(1)

set.forEach((value) => console.log(value)); // O(n)

// OBTAIN
console.log(set.has(1)); // true (O(1))
console.log(set.has(2)); // false (O(1))

// DELETE
set.delete(2); // O(1)

set.forEach((value) => console.log(value)); // O(n)

// Additional methods
// - same as array
