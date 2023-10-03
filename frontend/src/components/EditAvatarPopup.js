import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const avatar = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      avatar.current.value='';
    }
  }, [props.isOpen]);
  return (
    <PopupWithForm onSubmit={handleSubmit} textSubmit="Сохранить" name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose}>
      <label className="popup__label">
        <input name="avatar" id="avatar" ref={avatar} type="url" required placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" />
        <span className="popup__input-error src-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;