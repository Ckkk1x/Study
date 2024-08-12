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

class MyNode<T> {
    data: T;
    next: MyNode<T> | null = null;
    
    constructor(data: any) {
        this.data = data;
    }
}

class LinkedList<T> {
    head: MyNode<T> | null = null;

    // Вставка в начало
    insertAtBeginning(data: T) {
        let newNode = new MyNode<T>(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    // Вставка в конец
    insertAtEnd(data: T) {
        let newNode = new MyNode<T>(data);
        if (this.head === null) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next !== null) {
            current = current.next as MyNode<T>;
        }
        current.next = newNode;
    }

    // Вставка в середину
    insertAt(index: number, data: T) {
        if (index === 0) {
            this.insertAtBeginning(data);
            return;
        }
        let newNode = new MyNode<T>(data);
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
    getElementAt(index: number): T | null {
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
        let current = this.head as MyNode<T> | null;
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
    forEach(callback: (data: T) => void) {
        let current = this.head;
        while (current !== null) {
            callback(current.data);
            current = current.next;
        }
    }
}

let list = new LinkedList<number>();
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



//================ Map ================

// INSERT
let map = new Map<string, number>();
map.set("a", 1); // O(1) insert into map
map.set("b", 2); // O(1) insert into map
map.set("c", 3); // O(1) insert into map

// OBTAIN
let valueA = map.get("a"); // O(1) obtain by key
console.log(valueA); // Output: 1

// DELETE
map.delete("b"); // O(1) deletion from map

//check
map.has("b");

map.forEach((value, key) => console.log(key, value)); // O(n) iteration through the map

// Additional methods
map.clear(); // Removes all elements from the map
let size = map.size; // Returns the number of elements in the map

//================ Stack ================

class Stack<T> {
    private items: T[] = [];

    // Вставка элемента
    push(element: T): void {
        this.items.push(element); // O(1)
    }

    // Удаление элемента
    pop(): T | undefined {
        return this.items.pop(); // O(1)
    }

    // Получение верхнего элемента
    peek(): T | undefined {
        return this.items[this.items.length - 1]; // O(1)
    }

    // Проверка на пустоту
    isEmpty(): boolean {
        return this.items.length === 0; // O(1)
    }

    // Получение размера стека
    size(): number {
        return this.items.length; // O(1)
    }

    // Итерация по стеку
    forEach(callback: (item: T) => void): void {
        this.items.forEach(callback); // O(n)
    }
}

// INSERT
let stack = new Stack<number>();
stack.push(1); // O(1) insert into stack
stack.push(2); // O(1) insert into stack
stack.push(3); // O(1) insert into stack

stack.forEach((value) => console.log(value)); // O(n) iteration through the stack

// OBTAIN
let top1 = stack.peek(); // O(1) obtain the top element
console.log(top1); // Output: 3

// DELETE
let removed = stack.pop(); // O(1) delete the top element
console.log(removed); // Output: 3

stack.forEach((value) => console.log(value)); // O(n) iteration through the stack

// Additional methods
console.log(stack.isEmpty()); // Check if stack is empty (O(1))
console.log(stack.size());    // Get the size of the stack (O(1))



//================ Queue & Deque ================

class Deque<T> {
    private items: T[] = [];

    // Вставка элемента в начало
    addFront(element: T): void {
        this.items.unshift(element); // O(n)
    }

    // Вставка элемента в конец
    addBack(element: T): void {
        this.items.push(element); // O(1)
    }

    // Удаление элемента из начала
    removeFront(): T | undefined {
        return this.items.shift(); // O(1)
    }

    // Удаление элемента из конца
    removeBack(): T | undefined {
        return this.items.pop(); // O(1)
    }

    // Получение первого элемента
    front(): T | undefined {
        return this.items[0]; // O(1)
    }

    // Получение последнего элемента
    back(): T | undefined {
        return this.items[this.items.length - 1]; // O(1)
    }

    // Проверка на пустоту
    isEmpty(): boolean {
        return this.items.length === 0; // O(1)
    }

    // Получение размера deque
    size(): number {
        return this.items.length; // O(1)
    }

    // Итерация по deque
    forEach(callback: (item: T) => void): void {
        this.items.forEach(callback); // O(n)
    }
}

// INSERT
let deque = new Deque<number>();
deque.addFront(1); // O(n) insert at the front
deque.addBack(2);  // O(1) insert at the back
deque.addFront(0); // O(n) insert at the front

deque.forEach((value) => console.log(value)); // O(n) iteration through the deque

// OBTAIN
let firstDeque = deque.front(); // O(1) obtain the first element
console.log(firstDeque); // Output: 0
let lastDeque = deque.back(); // O(1) obtain the last element
console.log(lastDeque); // Output: 2

// DELETE
let removedFront = deque.removeFront(); // O(1) delete the first element
console.log(removedFront); // Output: 0
let removedBack = deque.removeBack(); // O(1) delete the last element
console.log(removedBack); // Output: 2

deque.forEach((value) => console.log(value)); // O(n) iteration through the deque

// Additional methods
console.log(deque.isEmpty()); // Check if deque is empty (O(1))
console.log(deque.size());    // Get the size of the deque (O(1))





//================ Hash-table & Hash-map ================

// INSERT
let hashTable: { [key: string]: number } = {};
hashTable["a"] = 1; // O(1) insert into hash table
hashTable["b"] = 2; // O(1) insert into hash table
hashTable["c"] = 3; // O(1) insert into hash table

// OBTAIN
let valueA1 = hashTable["a"]; // O(1) obtain by key
console.log(valueA1); // Output: 1

// DELETE
delete hashTable["b"]; // O(1) deletion from hash table

// Additional methods
let hasKey = "a" in hashTable;          // Check if key exists (O(1))
let keys = Object.keys(hashTable);      // Get all keys (O(n))
let values = Object.values(hashTable);  // Get all values (O(n))




//================ Some methods ================


// // Array
// let arrSM: number[][];
// arrSM = [[1, 5, 6], [2, 8, 4], [3, 7, 9]];
// arrSM = arrSM.flat();      // Использование метода flat
// arrSM.sort((a, b) => a - b); // Использование метода sort

// // Map
// let mapSM = new Map<string, number>();
// mapSM.set("a", 1);         // Добавление элемента
// mapSM.set("b", 2);         // Добавление элемента
// mapSM.set("c", 3);         // Добавление элемента
// mapSM.delete("b");         // Удаление элемента
// let hasKeyA = mapSM.has("a"); // Проверка наличия ключа
// let sizeMap = mapSM.size;  // Получение размера
// mapSM.forEach((value, key) => {}); // Итерация по элементам

// // Set
// let setSM = new Set<number>();
// setSM.add(1);              // Добавление элемента
// setSM.add(2);              // Добавление элемента
// setSM.add(3);              // Добавление элемента
// setSM.delete(2);           // Удаление элемента
// let hasValue1 = setSM.has(1); // Проверка наличия значения
// let sizeSet = setSM.size;  // Получение размера
// setSM.forEach((value) => {}); // Итерация по элементам

// // String
// let strSM: string = " Hello, World! ";
// let trimmedStr: string = strSM.trim(); // Удаление пробелов
// let upperStr: string = strSM.toUpperCase(); // Преобразование в верхний регистр
// let lowerStr: string = strSM.toLowerCase(); // Преобразование в нижний регистр
// let replacedStr: string = strSM.replace("World", "TypeScript"); // Замена подстроки
// let strArray: string[] = strSM.split(","); // Разделение строки на массив
// let lengthStr: number = strSM.length; // Получение длины строки
