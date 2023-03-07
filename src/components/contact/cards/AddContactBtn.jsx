

import { useNavigate } from "react-router-dom";
import "../../../styles/addcontact.css"

const AddContactBtn = () => {


  const navigate = useNavigate()

  return ( 
    <>
      <div className="btn_add_contact">
        <button onClick={() => navigate("/addContact  ") }>
          ساخت مخاطب جدید {" "} {" "} {" "}
          <i className="fa fa-plus-circle" />
        </button>
      </div>
    </>
   );
}
 
export default AddContactBtn;