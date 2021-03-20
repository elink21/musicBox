import React from 'react';

class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'set': false,
            styles: {
                backgroundColor: 'white'
            }
        };

        this.printData = this.printData.bind(this);
    }



    printData() {
        console.log(this.props.noteType, this.props.quarter);
    }

    render() {

        const preventDefault = (e) => e.preventDefault();

        const handleClick = (event) => {
            event.preventDefault();
            if (event.button === 0) {
                this.props.playNote(this.props.note);
                this.setState({ "set": 1, styles: { backgroundColor: "#f500567a" } });
                this.props.addNote(this.props.bar, this.props.quarter, this.props.note);
            }
            else if (event.button === 2) {
                this.setState({ "set": 0, styles: { backgroundColor: "white" } });
                this.props.removeNote(this.props.bar, this.props.quarter, this.props.note);
            }
        }

        return (<div onContextMenu={preventDefault} onMouseDown={handleClick} style={this.state.styles}>

        </div>);
    }
}

export default Note;