

import { useEffect, useState } from "react";
import { getAllGroups, getContact, getGroup } from "../../../services/contactServices";
import { useNavigate, useParams } from "react-router-dom";

import "../../../styles/showcontact.css"


import prof from "../../../images/img-placeholder.png"



const ShowInfoContact = () => {

  const [Contact , setContact] = useState({});
  const [group , setGroup] = useState({});

  const {contactId} = useParams();
  const navigate = useNavigate()


  useEffect(()=>{

    const fetchData = async ()=>{
      try{

        const {data : contactInfo} = await getContact(contactId);
        setContact(contactInfo);
        const {data : contactgroup} = await getGroup(contactInfo.group);
        setGroup(contactgroup)
        console.log(contactgroup);
      }catch(err){
        console.log(err);
      }
    }

    fetchData()
  },[])

  const {fullname , photo , mobile , email , job} = Contact

  return ( 
    <>
      <section className="show_info">
        <h3>اطلاعات مخاطب</h3>
        <div className="show_info_holder">
          <div className="prof_holder">
            <img src={photo || prof} alt="" />
          </div>
          <div className="infoes">
            <ul>
              <li>نام و نام خانوادگی: {fullname}</li>
              <li>شماره موبایل: {mobile}</li>
              <li>ایمیل: {email}</li>
              <li>شغل: {job}</li>
              <li>گروه: {group.name}
              </li>
            </ul>
          </div>
        </div>
        <div className="show_info_btn">
          <button onClick={()=> navigate("/") } >برگشت به صفحه اصلی</button>
        </div>
      </section>
    </>
   );
}
 
export default ShowInfoContact;