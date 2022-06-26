// event loop phases
const fs = require('fs');


setImmediate(()=>console.log(1));             // Guess: 3  wasCorrect: ❌ I got this and the one below mixed up by forgetting promises exist in their own microtask queue
Promise.resolve().then(()=>console.log(2));   // Guess: 4  wasCorrect: ❌
process.nextTick(()=>console.log(3));         // Guess: 2  wasCorrect: ✅
fs.readFile(__filename, ()=>{
    console.log(4);                           // Guess: 5  wasCorrect: ✅
    setTimeout(()=>console.log(5));           // Guess: 8  wasCorrect: ✅
    setImmediate(()=>console.log(6));         // Guess: 7  wasCorrect: ✅
    process.nextTick(()=>console.log(7));     // Guess: 6  wasCorrect: ✅
})

console.log(8);                               // Guess: 1  wasCorrect: ✅