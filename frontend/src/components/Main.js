import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;
  return (
  <main className="content">
    <section className="profile">
      <img className="profile__image" src={avatar} alt={name} />
      <button className="profile__avatar-btn" onClick={props.handleEditAvatarClick}></button>
      <div className="profile__info">
        <div className="profile__edit">
          <h1  className="profile__title">{name}</h1>
          <button aria-label="Редактирование" type="button" className="profile__button-pensil" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{about}</p>
      </div>
      <button aria-label="Добавить" type="button" className="profile__button-plus" onClick={props.onAddPlace}></button>
    </section>
    <section className="elements">{props.cards.map((card) => {
      return (
        <Card key={card._id} card={card} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDeleteClick={props.onCardDeleteClick}/>
        );
      })}
    </section>
  </main>
 );
}

export default Main;