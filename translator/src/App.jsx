/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const TranslationForm = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleTranslation = async () => {
    if (!text) return;
    try {
      const response = await axios.post('https://text-translate.onrender.com/translate', { text });
      console.log(response.data.data.translatedText);
      setTranslatedText(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextToSpeech = async () => {
    if (!text) return;
    try {
      const response = await axios.post('https://text-translate.onrender.com/text-to-speech', { text: translatedText });
      console.log(response);
      const audioFile = new Blob([response.data], { type: 'audio/mp3' });
      console.log(audioFile);
      const audioUrl = URL.createObjectURL(audioFile);
      console.log(audioUrl);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='app'>
      <h1>Text Translator</h1>
      <textarea
        rows={4}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate..."
        className='textArea'
      />
      <button onClick={handleTranslation} className='btn'>Translate</button>
      <div>
        <h2>Translated Text:</h2>
        <h3 className='translatedText'>{translatedText}</h3>
      </div>
      <div>
        <button onClick={handleTextToSpeech} className='btn'>Text to Speech</button>
        {audioUrl && <audio src={audioUrl} controls />}
      </div>
    </div>
  );
};



export default TranslationForm;