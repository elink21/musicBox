import React, { Component } from 'react';
import './App.css';
import ClefIcon from './Components/ClefIcon';
import WomanIcon from './Components/WomanIcon';
import MusicSheet from './Components/MusicSheet';


class App extends Component {

  constructor(props) {
    super(props);
    this.addBar = this.addBar.bind(this);
    this.removeBar = this.removeBar.bind(this);

    this.state = {
      bars: 1
    }
  }

  addBar() {
    this.setState({ bars: this.state.bars + 1 })
  }

  removeBar() {
    if (this.state.bars > 1)
      this.setState({ bars: this.state.bars - 1 });
  }

  render() {
    return (
      <div className="App">
        <div></div>
        <div id="mainApp">


          <div id="editor" className="z-depth-1">
            <div id="clefIcon">
              <ClefIcon />
            </div>
            <div id="sheet">
              <MusicSheet bars={this.state.bars} />
            </div>
          </div>


          <div id="buttons">
            <div></div>
            <div id="middleButtons">
              <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">file_upload</i></a>
              <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">play_arrow</i></a>
              <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">save</i></a>

            </div>
            <div id="rightButtons">
              <a onClick={this.addBar} className="btn-floating btn-large waves-effect waves-red red"><i className="material-icons">add</i></a>
              <a onClick={this.removeBar} className="btn-floating btn-large waves-effect waves-red red"><i className="material-icons">remove</i></a>
            </div>
          </div>



          <div id="player" className="z-depth-1">
            <div id="womanIcon">
              <WomanIcon />
            </div>
            <div id="musicBox">

            </div>
          </div>

        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
