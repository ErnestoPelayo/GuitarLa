import { Dispatch } from "react"
import { guitarItem } from "../types"
import { CartActions } from "../reducers/cart-reducer"

type GuitarProps = {
  guitar : guitarItem, 
  dispatch: Dispatch<CartActions>
}

const GuitarItem = ({guitar,dispatch}:GuitarProps) => {
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
                    <p>{guitar.description}</p>
                    <p className="fw-black text-primary fs-3">${guitar.price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={()=>dispatch({type:"add-to-cart",payload:{item:guitar}})}
                    >Agregar al Carrito</button>
                </div>
    </div>
  )
}

export default GuitarItem