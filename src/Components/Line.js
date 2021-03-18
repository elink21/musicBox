import React from 'react';
import Note from './Note';

class Line extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="line">
                <Note bar={this.props.bar} note={this.props.note} quarter="1" playFn={this.props.playFn} />
                <Note bar={this.props.bar} note={this.props.note} quarter="2" playFn={this.props.playFn} />
                <Note bar={this.props.bar} note={this.props.note} quarter="3" playFn={this.props.playFn} />
                <Note bar={this.props.bar} note={this.props.note} quarter="4" playFn={this.props.playFn} />
            </div>
        );
    }
}

export default Line;