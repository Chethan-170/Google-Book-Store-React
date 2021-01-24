export  const Column = (props)=>{
    let classes = "pt-3 " + (props.className) && props.className;
    return(
        <div className={classes}>
            {props.children}
        </div>
    )
}

export const Row = (props)=>{
    let classes = "row " + (props.className) && props.className; 
    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}