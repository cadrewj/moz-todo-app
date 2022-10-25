import React from "react"


const FilterButton =(props)=>{
	// console.log("filters: ", props)
	return (
	  	<button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={()=>props.setFilter(props.name)}>
	  		<span className="visually-hidden">Show </span>
			<span>{props.name} </span>
	  		<span className="visually-hidden">task </span>
	  	</button>
	)
}

export default FilterButton