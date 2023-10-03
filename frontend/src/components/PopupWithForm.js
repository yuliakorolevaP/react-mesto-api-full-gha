import React from 'react';
function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__exit" type="button" onClick={props.onClose}></button>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__button">{props.textSubmit}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;