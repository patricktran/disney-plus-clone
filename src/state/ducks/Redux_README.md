## Reducers

| Arrays | Immutable                                                                     | Redux Toolkit (with Immer) |
| ------ | ----------------------------------------------------------------------------- | -------------------------- |
| Add    | return [...state, payload]                                                    | state.push(payload)        |
| Update | return state.map(el => <br>el.id === payload.id <br>? payload.data <br> : el) | state[i] = payload.data    |
| Remove | return state.filter(el => el.id !== payload.id)                               | state.splice(index, 1)     |

<br>

---

<br>

| Objects | Immutable                        | Redux Toolkit (with Immer)   |
| ------- | -------------------------------- | ---------------------------- |
| Add     | return {...state, new: payload}  | state.new = payload          |
| Update  | return {...state, edit: payload} | state.edit = payload         |
| Remove  | Use lodash.omit or ...           | delete state.toDeletePropery |

<br>

---

<br>

## Pitfalls of using Immer

1. 'mutating' state directly only works BECAUSE of Immer. But you are actually NOT mutating the state.

2. Most importantly, you need to ensure that you EITHER mutate the state argument or return a new state, BUT NOT BOTH.

3. Do NOT try to apply to 'mutate' logic to a state that is a primitive value. Just return the new state value.
