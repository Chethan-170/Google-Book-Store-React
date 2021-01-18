export  const Column = (props)=>{
    let classes = props.className + " mt-4"
    return(
        <div className={classes}>
            {props.children}
        </div>
    )
}

export const Row = (props)=>{
    let classes = "row " +props.className 
    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}