import React, { Component, useState, useEffect, useRef } from 'react';
import './App.css';
import ClefIcon from './Components/ClefIcon';
import WomanIcon from './Components/WomanIcon';
import MusicSheet from './Components/MusicSheet';
import SimpleModal from './Components/SimpleModal';
import BirthdayMessage from './Components/BirthdayMessage'
import * as Tone from 'tone';

import InteractionContext from './Context/InteractionContext';


Tone.Transport.bpm.value = 180;


let urls = { "A4": "A4.ogg", "D5": "D5.ogg", "F5": "F5.ogg" }


let sampler = new Tone.Sampler({
  urls: urls,
  release: 1,
  baseUrl: `${process.env.PUBLIC_URL}/instruments/musicBox/`,
  onload: () => {
    console.log("loaded");
  }
}).toDestination();

let part = new Tone.Part();
let song = [];

function App(props) {

  const [bars, setBars] = useState(1);
  const [stateSong, setSong] = useState([]);
  const [prettySong, setPrettySong] = useState("");
  const [loading, setLoading] = useState(false);


  /*Song logic */
  const playSong = () => {
    Tone.Transport.position = 0;
    Tone.Transport.start();

  }

  const playNote = (note) => {
    sampler.triggerAttackRelease(note, "1n");
  }

  const updatePart = () => {

    setSong(song);
    part.clear();

    part = new Tone.Part(
      (time, value) => {
        // the notes given as the second element in the array
        // will be passed in as the second argument
        sampler.triggerAttackRelease(value.note, "1n", time);
      }, song
    ).start(0);



    setPrettySong(JSON.stringify(stateSong));
  }

  const removeNote = (bar, quarter, sixteenth, note) => {
    let position = `${bar}:${quarter}:${sixteenth}`;

    /*Search if the note is already on a chord */
    for (let i = 0; i < song.length; i++) {
      let notes = song[i].note;
      if (position === song[i].time && note.includes(note)) {
        song[i].note = notes.filter((value, index) => index !== notes.indexOf(note));
        song = song.filter((el, index) => el.note.length !== 0);

        updatePart();

        return;
      }
    }
  }

  const addNote = (bar, quarter, sixteenth, note) => {
    let position = `${bar}:${quarter}:${sixteenth}`;

    //Looking if there is already an array to puttin in
    for (let i = 0; i < song.length; i++) {
      if (position === song[i].time) {
        if (!song[i].note.includes(note)) {
          song[i].note.push(note);
        }
        /*Ensure song updating */
        song = song.filter((el, index) => el.note.length !== 0);
        updatePart();

        return;
      }
    }

    song.push({ time: position, note: [note] });

    updatePart();
    return;
  }

  /*Ui bar logic */


  const addBar = () => {
    setBars(bars + 1);
  }

  const removeBar = () => {
    if (bars > 1)
      setBars(bars - 1);
  }

  //File logic

  const adjustBarNumber = () => {
    let maxBar = 1;
    for (let note of song) {
      let newBar = parseInt(note.time[0]);
      if (newBar > maxBar) {
        maxBar = newBar;
      }
    }
    setBars(maxBar + 1);
  }

  const loadFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      let text = (e.target.result);
      text = JSON.parse(text);
      song = text;
      adjustBarNumber();
      updatePart();
    };
    reader.readAsText(e.target.files[0]);
  }

  const onInputClick = (event) => {
    event.target.value = ''
  }


  useEffect(() => {
    setLoading(true);
    adjustBarNumber();
    updatePart();
  }, []);

  return (
    //Modal for JSON display


    <div className="App">
      <div></div>
      <div id="mainApp">

        <div id="editor" className="z-depth-1">
          <div id="clefIcon">
            <ClefIcon />
          </div>

          <div className="sheet">
            <InteractionContext.Provider value="true">
              <MusicSheet key="1" song={stateSong} bars={bars} playSong={playSong}
                playNote={playNote} addNote={addNote} removeNote={removeNote} />
            </InteractionContext.Provider>
          </div>
        </div>


        <div id="buttons">
          <div>
            <div class="file-field input-field">
              <div class="btn pink accent-3">
                <span>File</span>
                <input type="file" onClick={onInputClick} accept=".json" onChange={(e) => loadFile(e)} />
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>
          <div id="middleButtons">
            <SimpleModal prettySong={prettySong} />
            <a onClick={playSong} className="btn-floating btn-large"><i className="material-icons">play_arrow</i></a>



          </div>
          <div id="rightButtons">
            <a onClick={addBar} className="btn-floating btn-large red"><i className="material-icons">add</i></a>
            <a onClick={removeBar} className="btn-floating btn-large red"><i className="material-icons">remove</i></a>
          </div>
        </div>



        <div id="player" className="z-depth-1">
          <div id="womanIcon">
            <WomanIcon />
          </div>

          <div className="sheet">
            <InteractionContext.Provider value="false">
              <MusicSheet key="2" song={stateSong} bars={bars} playSong={playSong}
                playNote={playNote} addNote={addNote} removeNote={removeNote} />
            </InteractionContext.Provider>
          </div>

        </div>

      </div>
      < div ></div>
    </div >
  );
}

export default App;
