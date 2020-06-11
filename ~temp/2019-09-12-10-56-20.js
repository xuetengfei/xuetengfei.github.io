/* 
https://frontarm.com/courses/async-javascript/
https://www.zcfy.cc/article/will-it-finally-a-try-catch-quiz
https://www.zcfy.cc/article/15-blogs-every-javascript-developer-should-follow-in-2018


try /catch /finally上的finally块都将运行 - 即使你提前catch或'return`。
Will it finally: 关于 try/catch 的一些细节
*/

function example() {
  try {
    fail();
    return;
  } catch (e) {
    console.log(e);
    console.log('Will finally run?');
    // throw e;
  } finally {
    console.log('FINALLY RUNS!');
  }
  console.log("This shouldn't be called eh?");
}

example();
