

import "../../../styles/card.css"

import prof from "../../../images/img-placeholder.png"

const Card = () => {
  return (
    <>
      <div className="card">
        <div className="cardbody">
          <div className="imgcard">
            <img src={prof} alt="" />
          </div>
          <div className="infocard">
            <ul>
              <li>نام و نام خانوادگی: امیرحسین طولابی</li>
              <li>شماره تماس: ۰۹۱۶۰۵۳۷۱۳۰</li>
              <li>آدرس ایمیل: amirtoolabi81@gmail.com</li>
            </ul>
          </div>
          <div className="btnscard">
            <button className="showInfo" ><i className="fa fa-eye" /></button>
            <button className="editInfo" ><i className="fa fa-pen" /></button>
            <button className="deleteInfo" ><i className="fa fa-trash" /></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;