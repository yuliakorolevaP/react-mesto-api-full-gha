function InfoTooltip(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
      <button className="popup__exit" type="button" title="Закрыть" onClick={props.onClose}/>
      <form className="popup__info">
        <img className="popup__status" src={props.image} alt={props.title}/>
        <h2 className="popup__text">{props.title}</h2>
      </form>
      </div>
    </div>
  );
}

export default InfoTooltip;