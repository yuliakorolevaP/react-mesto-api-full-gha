import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  const handleDeleteClick = () => {
    props.onCardDelete(props.card._id);
  };
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `element__button ${isLiked && 'element__button_active'}` 
  );;
  const handleLikeClick= () => {
    props.onCardLike(props.card);
  }; 
  const handleClick = ()=>{
    props.onCardClick(props.card);
  }
  return (
    <li className="element__item">
      {isOwn && <button  aria-label="Удаление" type="button" onClick={handleDeleteClick} className="element__button-delete"></button>}
      <img onClick={handleClick} className="element__image" src={props.card.link} alt={props.card.name}/>
      <figcaption className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button onClick={handleLikeClick} aria-label="Лайк" type="button" className={cardLikeButtonClassName}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </figcaption>
    </li>
  );
}

export default Card;