const buttompensil = document.querySelector('.profile__button-pensil');
const buttomavatar = document.querySelector('.profile__avatar-btn');
const text = document.querySelector('.popup__input_type_text');
const type=document.querySelector('.popup__input_type_status');  
const buttomplus = document.querySelector('.profile__button-plus');
const formElement = document.querySelector('.popup__form');
const formElementAdd = document.querySelector('.popup__form_image');
const formElementAddAvatar = document.querySelector('.popup__form_avatar');
const configValidation={
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }; 

export {buttompensil, buttomavatar, text, type, buttomplus,formElement, formElementAdd, formElementAddAvatar, configValidation};