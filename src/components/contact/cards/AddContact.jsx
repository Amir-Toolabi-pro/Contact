
import React from 'react';

//style
import { useNavigate } from "react-router-dom";
import "../../../styles/addcontact.css"


const AddContact = ({ contact, setContactInfo, groups, createContactForm }) => {

  const navigate = useNavigate()

  return (
    <>
      <section className="add_content">
        <h3>ساخت مخاطب جدید</h3>
        <div className="add_content_container">
          <div className="form_holder">
            <form onSubmit={createContactForm} action="">
              <input type="text" onChange={setContactInfo} value={contact.fullname} placeholder="نام و نام خانوادگی" required={true} name="fullname" />
              <input type="text" onChange={setContactInfo} value={contact.photo} placeholder="آدرس تصویر" name="photo" />
              <input type="text" onChange={setContactInfo} value={contact.mobile} placeholder="شماره موبایل" required={true} name="mobile" />
              <input type="text" onChange={setContactInfo} value={contact.email} placeholder="آدرس ایمیل" required={true} name="email" />
              <input type="text" onChange={setContactInfo} value={contact.job} placeholder="شغل" required={true} name="job" />
              <select onChange={setContactInfo} value={contact.group} name="group" required={true}>
                <option value="">انتخاب گروه</option>
                {groups.length > 0 && groups.map(group=>(
                  <option key={group.id} value={group.id} >
                    {group.name}
                  </option>
                ))
                }
              </select>
              <div>
                <button>ساخت مخاطب</button>
                <button>انصراف</button>
              </div>
            </form>
          </div>
          <div className="logo">

          </div>
        </div>
      </section>
    </>
  );
}

export default AddContact;