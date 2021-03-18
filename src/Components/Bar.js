import React from 'react';
import Line from './Line';

class Bar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        }

    }




    render() {
        return (
            <div  className="bar z-depth-1" id={'bar' + this.props.number}>
                <Line note="C3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="B3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="A3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="G3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="F3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="E3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="D3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="C3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="B3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="A3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="G3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="F3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="E3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="D3" bar={this.props.number} playFn={this.props.playFn}/>
                <Line note="C3" bar={this.props.number} playFn={this.props.playFn}/>
            </div>
        );
    }
}

export default Bar;