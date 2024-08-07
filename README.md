# lit-store

This was a proof of concept with a couple of goals.

1. Create a state management framework that existed somewhere between Redux and unistore.
    - I felt that Redux tends to have too much boilerplate.
    - I liked that unistore commbined actions and reducers into just functions that modified the state.
2. Create a state management framework specifically designed for LitElement.
3. Get more experience with LitElement and develop some common patterns.
4. Get more experience with Vite.

## Results

-   I eventually came to the same complexities that I did with unistore. Keeping the action functions bound to the store state requires a lot of complexity.
-   While case statements in Redux reduces seems a bit silly, having actions as data instead of functions solves a lot of problems.
-   The Redux Toolkit does a lot of removing the boilerplate code that I was once worried about.
-   This ends my quest to come up with a "better Redux".
