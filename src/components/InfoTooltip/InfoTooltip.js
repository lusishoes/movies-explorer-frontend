import React from "react";
import success from "../../images/success.svg";
import fail from "../../images/fail.svg";
import "./InfoTooltip.css";
function InfoTooltip({ isOpen, onClose, messegeState }) {
  return (
    <section
      className={`popup popup_theme_info-popup ${isOpen ? `popup_opened` : ""}`}
    >
      <div className="popup__container popup__container_theme_infoTooltip">
        <button className="popup__close-icon" type="reset" onClick={onClose} />
        <img src={messegeState ? success : fail} className="popup__info-img" />
        <p className="popup__info-message">
          {messegeState ? "Успех!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;
