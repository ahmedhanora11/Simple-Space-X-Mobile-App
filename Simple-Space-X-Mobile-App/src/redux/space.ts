import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const space = createStore( applyMiddleware(thunk))

export {space}