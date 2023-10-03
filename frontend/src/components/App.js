import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Union from '../images/Union.svg';
import Unionx from '../images/Unionx.svg';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [infoImage, setInfoImage] = useState("");
  const [infoText, setInfoText] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };
  const [selectedCard, setSelectedCard] = React.useState(null);
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(null);
  };
  function onRegister(email, password) {
    auth.register(email, password).then(() => {
      setInfoImage(Union);
      setInfoText("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setInfoImage(Unionx);
      setInfoText("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function onLogin(email, password) {
    auth.login(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmail(email);
      navigate("/");
    }).catch(() => {
      setInfoImage(Unionx);
      setInfoText("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmail(res.data.email);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function onSignOut() {
    setIsLoggedIn(false);
    setEmail("");
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()]).then(([userProfileData, initialCards]) => {
        setCurrentUser(userProfileData);
        setCards(initialCards);
      })
        .catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) })
    };
  }, [isLoggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
  const handleUpdateUser = (newUserInfo) => {
    api.sendUserData(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  const handleUpdateAvatar = (newUserInfo) => {
    api.sendAvatarData(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  const handleAddPlaceSubmit = (newCard) => {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            } />
            <Route path="/sign-up" element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            } />
            <Route exact path="/" element={
              <>
                <Header title="Выйти" mail={email} onClick={onSignOut} route="" />
                <ProtectedRoute component={Main} isLogged={isLoggedIn} handleEditAvatarClick={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                <Footer />
              </>
            } />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />} />
          </Routes>
          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <PopupWithForm textSubmit="Да" name="delete-form" title="Вы уверены?" />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip image={infoImage} title={infoText} isOpen={infoTooltip} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;