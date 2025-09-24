## 🧭 Debugging Checklist – Key Points

# 1. Understand the Problem

-> Read the error message carefully → Don’t skip it.
-> Reproduce the bug consistently before trying to fix it.
-> Clarify expected vs actual behavior → What should happen vs what is happening.

# 2. Isolate the Issue

-> Debug one thing at a time.
-> Use binary search debugging → check halfway in the logic.
-> Simplify the code (comment out/remove unrelated parts) until the bug becomes clear.

# 3. Observe Closely

-> Print/log important variables → check if they hold what you expect.
-> Check inputs & outputs at every step.
-> Don’t assume any line works—verify it.

# 4. Use the Right Tools

-> Breakpoints & step-through debugging (VS Code, IntelliJ, Chrome DevTools).
-> Stack trace analysis → understand the call chain.
-> Network tab / Postman for API debugging.
-> git bisect to find which commit introduced a bug.

# 5. Think About Common Pitfalls

-> Off-by-one errors in loops.
-> Null / undefined / null pointer errors.
-> Wrong scoping (this in JS, shadowed variables in Java).
-> Async issues (callbacks, promises, multithreading).
-> Misconfigured environment variables / API URLs.

# 6. Stay Systematic

-> Change one thing at a time.
-> After each change, re-test → did it solve the bug or not?
-> Don’t “shotgun debug” (randomly changing code everywhere).

# 7. Mindset & Habits

-> Stay calm → debugging is problem-solving, not panic.
-> Explain your code (rubber duck debugging).
-> Write small, testable functions → easier to debug.
-> Keep notes of solved bugs → patterns repeat.