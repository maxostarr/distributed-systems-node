const sleep_st = (t) => new Promise((resolve) => setTimeout(resolve, t));
const sleep_im = () => new Promise((resolve) => setImmediate(resolve));

(
    async () => {
        // The actual order of this seems to be indeterminate.
        // I got different orders on different runs
        // The correct answeres were gotten from the book.
        setImmediate(() => console.log(1));   // Guess 2 ✅
        console.log(2);                       // Guess 1 ✅
        await sleep_st(0);
        setImmediate(() => console.log(3));   // Guess 4 ✅
        console.log(4);                       // Guess 3 ✅
        await sleep_im();
        // I messed up here by forgetting that *what* is being awaited here is a setImmediate or setTimeout call
        setImmediate(() => console.log(5));   // Guess 6 ❌
        console.log(6);                       // Guess 5 ✅
        await 1
        setImmediate(() => console.log(7));   // Guess 8 ❌
        console.log(8);                       // Guess 7 ❌
    }
)
()