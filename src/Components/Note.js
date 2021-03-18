import React from 'react';

class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'set': false,
            styles:{
            backgroundColor:'white'}
        };

        this.printData = this.printData.bind(this);
    }

    

    printData()
    {
        console.log(this.props.noteType, this.props.quarter);
    }

    render() {

        const preventDefault = (e)=> e.preventDefault();

        const handleClick= (event)=>{
            event.preventDefault();
            if(event.button===0){
                this.props.playFn(this.props.note);
                this.setState({"set":1,styles:{backgroundColor:"#f500567a"}});
            }
            else if(event.button===2){
                this.setState({"set":0,styles:{backgroundColor:"white"}});              
            }
        }
        
        return (<div onContextMenu={preventDefault} onMouseDown={handleClick} style={this.state.styles}>

        </div>);
    }
}

export default Note;