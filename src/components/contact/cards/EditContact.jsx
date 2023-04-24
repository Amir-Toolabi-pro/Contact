import React from 'react';

//router
import { useNavigate, useParams } from "react-router-dom";

//hooks
import { useEffect, useState } from "react";

//axios
import { getAllGroups, getContact, getGroup, updateContact } from "../../../services/contactServices";

//style
import "../../../styles/editcontact.css"

//helpers like img
import prof from "../../../images/img-placeholder.png"



const EditContact = () => {

  const [contact , setContact] = useState({});
  const [getGroups , setGetGroups] = useState([]);
  const [loading , setLoading] = useState(false);
  const {contactId} = useParams();
  const navigate = useNavigate();




  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const {data : contactInfo} = await getContact(contactId);
        setContact(contactInfo);
        const {data : groupsinfo} = await getAllGroups();
        setGetGroups(groupsinfo);
      }catch(err){
        console.log(err);
      }
    }
    fetchData()
  },[]);

  const setContactInfo = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value,});
  };

  const changeContactForm = async (e)=> {
    e.preventDefault();
      try{
        const {status} = await updateContact(contact , contactId);
        console.log(status);
        if(status===200){
          setLoading(false)
          navigate("/")
        }
        
      }catch(err){
        console.log(err);
      }
  }


  return (
    <>
      <section className="edit_content">
        <h3>تغییر اطلاعات مخاطب</h3>
        <div className="edit_content_container">
          <div className="form_holder">
            <form onSubmit={changeContactForm} action="">
              <input onChange={setContactInfo} value={contact.fullname} type="text" placeholder="نام و نام خانوادگی" required={true} name="fullname" />
              <input onChange={setContactInfo} value={contact.photo} type="text" placeholder="آدرس تصویر" name="photo" />
              <input onChange={setContactInfo} value={contact.mobile} type="number" placeholder="شماره موبایل" required={true} name="mobile" />
              <input onChange={setContactInfo} value={contact.email} type="email" placeholder="آدرس ایمیل" required={true} name="email" />
              <input onChange={setContactInfo} value={contact.job} type="text" placeholder="شغل" required={true} name="job" />
              <select onChange={setContactInfo} value={contact.group} name="group" required={true}>
                <option value="">انتخاب گروه</option>
                {getGroups.length > 0 && getGroups.map(group=>(
                  <option key={group.id} value={group.id} >
                    {group.name}
                  </option>
                ))
                }
              </select>
              <div>
                <button>تغییر اطلاعات</button>
                <button onClick={() => navigate("/")} >انصراف</button>
              </div>
            </form>
          </div>
          <div className="prof">
            <img src={contact.photo || prof} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default EditContact;