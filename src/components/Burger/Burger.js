import React from "react"
import classes from "./Burger.module.css"
import BurgerIngredients from "./BurgerIngredient/BurgerIngredient"
// import PropTypes from "prop-types"
const Burger = (props)=>{
    // console.log("Burger.js",props.ingredients );
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_,index) =>{
            return <BurgerIngredients key = {igKey+index} type ={igKey}></BurgerIngredients>
        });
    })
    .reduce((arr,el) =>{
        // console.log("X");
        // console.log(el)
        return arr.concat(el);
    },[]);
    // console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type = "bread-top"></BurgerIngredients>
            {transformedIngredients}
            <BurgerIngredients type = "bread-bottom"></BurgerIngredients>
        </div>
    )
}

export default Burger