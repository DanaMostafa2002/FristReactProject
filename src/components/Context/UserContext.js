import { useState } from "react";
import { createContext } from "react";
export let UserContext=createContext();
export default function UserCotextProvider(props){
    
    let [userToken,setuserToken]=useState(null);
    let [userData,setuserData]=useState(null); 
    return <>
    < UserContext.Provider value={{userToken,setuserToken,setuserData,userData}}>
     {props.children}
    </UserContext.Provider>
    </>
}