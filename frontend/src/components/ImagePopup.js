import React from 'react';

function ImagePopup(props) {
  return (
    <div id='popup-zoom' className={`popup popup_zoom ${props.card? 'popup_opened':''}`}>
      <div className="popup__container">  
        <button onClick={props.onClose} aria-label="Закрыть" type="button" className="popup__exit"></button>
        <img className="popup__image" src={props.card?.link} alt={`Фотография места ${props.card?.name}`}/>
        <h4 className="popup__title-zoom">{props.card?.name}</h4>
      </div>
    </div>
  );
}

export default ImagePopup;