import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useState, useEffect} from 'react';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: name,
      link: link,
    });
  }
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }
  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);
  return (
    <PopupWithForm onSubmit={handleSubmit} textSubmit="Сохранить" name="image" title="Новое место" isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__label">
        <input value={name} onChange={handleNameChange} id="name" type="text" required placeholder="Название" className="popup__input popup__input_type_name" name="name"/>
        <span className="popup__input-error name-input-error"></span> 
      </label>
      <label className="popup__label">
        <input  id="link" type="url" required placeholder="Ссылка на картинку" className="popup__input popup__input_type_src" name="link" value={link} onChange={handleLinkChange}/>
        <span className="popup__input-error url-input-error"></span> 
      </label>
    </PopupWithForm> 
  );
}

export default AddPlacePopup;