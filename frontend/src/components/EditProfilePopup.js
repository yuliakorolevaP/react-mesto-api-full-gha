import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useState, useEffect} from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
    
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  }
  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} textSubmit="Сохранить" name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__label">
        <input type="text" placeholder="Имя" required value={name ? name: ""} onChange={handleNameChange} id="namecard" className="popup__input popup__input_type_text" name="name"/>
        <span className="text-input-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input  id="description" value={description ? description:  ""} onChange={handleDescriptionChange} type="text" required placeholder="О себе" className="popup__input popup__input_type_status" name="description"/>
        <span className="status-input-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;