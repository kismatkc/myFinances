
import {  create } from "zustand";



type NewAccountState= {
isOpen: boolean,
onOpen: ()=> void;
onClose: ()=> void;
}
//use on prefix before methods to change the state 
 const useNewAccount =  create<NewAccountState>((set)=>({
isOpen: false,
onOpen: ()=> set({isOpen: true}),
onClose: ()=> set({isOpen: false})

}))

export default useNewAccount

