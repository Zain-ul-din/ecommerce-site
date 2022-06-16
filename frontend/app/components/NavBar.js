
import React , { useEffect, useReducer , useState } from "react"
import  {useDetectClickOutside } from 'react-detect-click-outside'
import Image from "next/image"


export default function NavBar () {
    
    // active btn reducer
    function reducer (state , action) {
        switch(action.type) {
          case "home":
            return Object.assign(state , {"home" : "active"})
          
        }
        return state
    }
    
    const [activeBtn , dispatch] = useReducer(reducer , {"home" : "active"})
    const [navBarToggler , setNavBarToggler] = useState ("collapse")
    const [dropDorpToggler , setDropDownToggler] = useState ("")
    
    function closeDropDowns () { setDropDownToggler (""); }
    const onClickOutSide = useDetectClickOutside ({onTriggered : closeDropDowns })
    
    return (<>
        <nav className={`navbar navbar-expand-lg p-4 navbar-light bg-light header_shadow rounded-img`}> <a className={`navbar-brand`} href={`#`}>Ecommerce</a>
        	<button className={`navbar-toggler`} type={`button`} onClick = {(e)=> setNavBarToggler(navBarToggler == "" ? "collapse" : "")}> <span className={`navbar-toggler-icon`}></span> </button>
        	<div className={`navbar-collapse ${navBarToggler}`} id={`navbarNavDropdown`}>
        		<ul className={`navbar-nav  text-center`}>
        			<li className={`nav-item active`}> <a className={`nav-link active`} href={`#`}>Home </a> {/* Link */ } </li>
        			<li className={`nav-item`}> <a className={`nav-link`} href={`#`}>Features</a> </li>
        			<li className={`nav-item`}> <a className={`nav-link`} href={`#`}>Pricing</a> </li>
        			<li className={`nav-item dropdown`}> <a className={`nav-link dropdown-toggle`} href={`#`} id={`navbarDropdownMenuLink`} role={`button`} onClick = {(e)=> setDropDownToggler(dropDorpToggler == "show" ? "" : "show")} ref = {onClickOutSide}>
                    Click
                    </a>
        				<div className={`dropdown-menu ${dropDorpToggler}`}> <a className={`dropdown-item`} href={`#`}>Action</a> <a className={`dropdown-item`} href={`#`}>Another action</a> <a className={`dropdown-item`} href={`#`}>Something else here</a> </div>
        			</li>
        		</ul>
        	</div>
        </nav>
    </>)
}