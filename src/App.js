import React, { Component } from 'react';
import './App.css';
import ClefIcon from './Components/ClefIcon';
import WomanIcon from './Components/WomanIcon';
import MusicSheet from './Components/MusicSheet';
import SimpleModal from './Components/SimpleModal';
import * as Tone from 'tone';

class App extends Component {

  constructor(props) {
    super(props);
    this.addBar = this.addBar.bind(this);
    this.removeBar = this.removeBar.bind(this);

    this.state = {
      bars: 1,
      song: [{ time: "0:0:0", note: ["C5"] }],
      prettySong:""
    }

    this.playNote = this.playNote.bind(this);
    this.playSong = this.playSong.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.addNote = this.addNote.bind(this);
    Tone.Transport.bpm.value = 160;
    this.song = []//format [["bar:quarter",note]];

    this.notes = ["A4"]

    this.urls = {}
    for (let note of this.notes) {
      this.urls[note] = note + ".ogg";
    }


    this.sampler = new Tone.Sampler({
      urls: this.urls,
      release: 1,
      baseUrl: `${process.env.PUBLIC_URL}/instruments/musicBox/`,
      onload: () => {
        console.log("loaded");
      }
    }).toDestination();

    this.part = new Tone.Part();
    this.synth = new Tone.PolySynth().toDestination();

  }


  /*Song logic */
  playSong() {
    Tone.Transport.position = 0;
    Tone.Transport.start();

  }

  playNote(note) {
    this.sampler.triggerAttackRelease(note, "1n");
  }

  updatePart() {
    this.part.clear();

    this.part = new Tone.Part(
      (time, value) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        this.sampler.triggerAttackRelease(value.note, "1n", time);
      }, this.song
    ).start(0);
    this.setState({ song: this.song, prettySong: JSON.stringify(this.song) });
  }

  removeNote(bar, quarter, sixteenth, note) {
    let position = `${bar}:${quarter}:${sixteenth}`;

    /*Search if the note is already on a chord */
    for (let i = 0; i < this.song.length; i++) {
      let notes = this.song[i].note;
      if (position === this.song[i].time && note.includes(note)) {
        this.song[i].note = notes.filter((value, index) => index !== notes.indexOf(note));
        this.song = this.song.filter((el, index) => el.note.length !== 0);

        this.updatePart();

        console.table(this.song);
        return;
      }
    }
  }

  addNote(bar, quarter, sixteenth, note) {
    let position = `${bar}:${quarter}:${sixteenth}`;

    //Looking if there is already an array to puttin in
    for (let i = 0; i < this.song.length; i++) {
      if (position === this.song[i].time) {
        if (!this.song[i].note.includes(note)) {
          this.song[i].note.push(note);
        }

        this.updatePart();
        console.table(this.song);
        return;
      }
    }

    this.song.push({ time: position, note: [note] });

    this.updatePart();
    console.table(this.song);
  }

  /*Ui bar logic */


  addBar() {
    this.setState({ bars: this.state.bars + 1 });
  }

  removeBar() {
    if (this.state.bars > 1)
      this.setState({ bars: this.state.bars - 1 });
  }

  //File logic

  adjustBarNumber()
  {
    let maxBar=1;
    for(let note of this.song)
    {
      let bar= parseInt(note.time[0]);
      if(bar>maxBar)
      {
        maxBar=bar; 
      }
    }
    this.setState({bars:maxBar+1});
  }

  loadFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      let text = (e.target.result);
      text = JSON.parse(text);
      console.table(text);
      this.song = text;
      this.adjustBarNumber();
      this.updatePart();
    };
    reader.readAsText(e.target.files[0]);
  }

  onInputClick = (event) => {
    event.target.value = ''
  }

  showFile() {
    let something = window.open("data:text/json," + encodeURIComponent({ "2": 3 }), "_blank");
    something.focus();
  }

  render() {
    return (
      //Modal for JSON display


      <div className="App">
        <div></div>
        <div id="mainApp">


          <div id="editor" className="z-depth-1">
            <div id="clefIcon">
              <ClefIcon />
            </div>

            <div id="sheet">
              <MusicSheet song={this.state.song} bars={this.state.bars} playSong={this.playSong}
                playNote={this.playNote} addNote={this.addNote} removeNote={this.removeNote} />
            </div>
          </div>


          <div id="buttons">
            <div></div>
            <div id="middleButtons">
              <SimpleModal prettySong={this.state.prettySong}/>
              <a onClick={this.playSong} className="btn-floating btn-large"><i className="material-icons">play_arrow</i></a>
              <a onClick={this.showFile} className="btn-floating btn-large red" ><i className="material-icons">save</i></a>

            </div>
            <div id="rightButtons">
              <a onClick={this.addBar} className="btn-floating btn-large red"><i className="material-icons">add</i></a>
              <a onClick={this.removeBar} className="btn-floating btn-large red"><i className="material-icons">remove</i></a>
            </div>
          </div>



          <div id="player" className="z-depth-1">
            <div id="womanIcon">
              <WomanIcon />
            </div>
            <div id="musicBox">

            </div>
          </div>

          <input type="file" onClick={this.onInputClick} accept=".json" onChange={(e) => this.loadFile(e)}></input>


        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
