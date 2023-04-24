import React, { useEffect, useState } from "react";

//public style
import "./styles/index.css";

//components
import Contact from "./components/contact/Contact";
import Navbar from "./components/Navbar";
import ShowInfoContact from "./components/contact/cards/ShowInfoContact";
import EditContact from "./components/contact/cards/EditContact";

//Router
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AddContact from "./components/contact/cards/AddContact";

//axios
import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactServices";
import { confirmAlert } from "react-confirm-alert";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filterContacts, setFliterContacts] = useState([]);
  const [getGroups, setGetGroups] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [forceRender, setForceRender] = useState(false);
  const [getContact, setGetContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();
        setContacts(contactsData);
        setFliterContacts(contactsData);
        // console.log(contacts);
        setGetGroups(groupData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const setContactInfo = (event) => {
    setGetContact({ ...getContact, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [forceRender]);

  const createContactForm = async (e) => {
    e.preventDefault();
    try {
      const { status } = await createContact(getContact);
      console.log(status);
      // console.log(getContact);
      if (status === 201) {
        setForceRender(!forceRender);
        setGetContact({});
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: "0",
              left: "0",
              bottom: "0",
              right: "0",
              zIndex: "9",
              background: "rgba(68, 71, 90, 0.1)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(3.6px)",
              webkitBackdropFilter: "blur(3.6px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              dir="rtl"
              style={{
                backgroundColor: "#f8f8f2",
                border: `1px solid #bd93f9`,
                borderRadius: "1em",
                padding: "10px 15px",
              }}
            >
              <h3 style={{ color: "#ffb86c", textAlign: "center" }}>
                پاک کردن مخاطب
              </h3>
              <p style={{ color: "red" }}>
                مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => {
                    removeContact(contactId);
                    onClose();
                  }}
                  style={{
                    backgroundColor: "#ff5555",
                    outline: "none",
                    border: "none",
                    margin: "0 5px",
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                >
                  مطمئن هستم
                </button>
                <button
                  onClick={onClose}
                  style={{
                    backgroundColor: "#bd93f9",
                    outline: "none",
                    border: "none",
                    margin: "0 5px",
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  let filterTimeOut;
  const findContact = (event) => {
    clearTimeout();
    setQuery({ ...query, text: event.target.value });
    console.log(event.target.value);
    filterTimeOut = setTimeout(() => {
      setFliterContacts(
        contacts.filter((contact) => {
          return contact.fullname
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        })
      );
    }, 2000);
  };

  return (
    <>
      <Navbar query={query.text} search={findContact} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contact
              removeContact={confirm}
              contacts={filterContacts}
              loading={loading}
            />
          }
        />
        <Route
          path="/addContact"
          element={
            <AddContact
              createContactForm={createContactForm}
              groups={getGroups}
              setContactInfo={setContactInfo}
              contact={getContact}
            />
          }
        />
        <Route path="/:contactId" element={<ShowInfoContact />} />
        <Route path="/Editcontact/:contactId" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default App;
