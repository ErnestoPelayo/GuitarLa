
import { useReducer} from 'react'
import '../src/index.css'
import GuitarItem from './components/GuitarItem'
import Header from './components/Header'
import { cartReducer, initialState } from './reducers/cart-reducer'

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  return (
    <>
    <Header cart={state.cart} dispatch={dispatch}/>
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {/* Aqui va las guitarras */}
            {
                state.data.map((item)=>{
                    return <GuitarItem key={item.id} guitar={item} dispatch={dispatch} />
                })
            }
        </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer> 
    </>
  )
}

export default App
