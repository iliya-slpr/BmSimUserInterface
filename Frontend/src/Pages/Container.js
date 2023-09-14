
const style = {
    backgroundColor:"#1ebdb4" ,
     padding:'0.5em 4em',
     minHeight: '100vh',
     display: 'flex',
     alignItems:'center',
     justifyContent:'center',
     flexDirection:'column'

}
const Container = ({children})=>{
    return (
    <div style={{...style}}>
        {children}
    </div>
    )
}

export default Container;