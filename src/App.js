import React, { useState } from 'react';
import axios from 'axios';
import TranslateIcon from '@material-ui/icons/ArrowDownwardRounded';
import './App.css';
import { Button } from '@material-ui/core';

function App() {
  const [ sentence, setSentence ] = useState('');
  const [ vector, setVector ] = useState('');
  const [ resSentence, setResSentence ] = useState('');
  const [ resVector, setResVector ] = useState('');

  async function str2vec() {
    console.log(sentence.length);
    if (sentence.length !== 0) {
      const res = await axios.post(
        "https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/preprocess",
        { "context": sentence }
      );
      setResVector(JSON.stringify(res.data));
    } else {
      setResVector('');
    }
  }

  async function vec2str() {
    if (vector.length !== 0) {
      const str2arr = vector.split(', ').map(str => Number(str));
      for (const elem of str2arr) {
        if (!Number.isInteger(elem)) {
          setResSentence('Format error!');
          return;
        }
      }
      const res = await axios.post(
        "https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/postprocess",
        [ str2arr ]
      );
      setResSentence(res.data[0].text);
    } else {
      setResSentence('');
    }
  }

  return (
    <div className="App">
      <div className="AppHeader">
        {`API Reference: `}
        <a href={'https://ainize.ai/gkswjdzz/gpt-2-server?branch=main'}>
          https://ainize.ai/gkswjdzz/gpt-2-server?branch=main
        </a>
      </div>
      <div className="AppBody">
        <div className="TextareaDiv">
          <div className="Title">{"Sentence -> Vector"}</div>
          <textarea className="Textarea"
            value={sentence}
            onChange={async (e) => {
              setSentence(e.target.value);
            }}
            type="text" />
          <Button variant="contained" color="primary" onClick={str2vec}>
            <TranslateIcon />
          </Button>
          <textarea className="Textarea"
            disabled={true}
            value={resVector}
            type="text" />
        </div>
        <div className="TextareaDiv">
          <div className="Title">{"Vector -> Sentence"}</div>
          <textarea className="Textarea"
            placeholder={"3666, 1438, 318, 685, 3672, 286"}
            value={vector}
            onChange={async (e) => {
              setVector(e.target.value);
            }}
            type="text" />
          <Button variant="contained" color="primary" onClick={vec2str}>
            <TranslateIcon />
          </Button>
          <textarea className="Textarea"
            disabled={true}
            value={resSentence}
            type="text" />
        </div>
      </div>
    </div>
  );
}

export default App;
