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
  const [filter, setFilter] = useState([]);
  const [getGroups, setGetGroups] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [query, setQuery] = useState({ text: "" });
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
        setFilter(contactsData);
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
      console.log(getContact);
      if (status === 201) {
        setForceRender(!forceRender);
        setGetContact({});
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeContact = async (contactId) => {
    try {
      const { response } = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setForceRender(!forceRender);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const confirmAlertModal = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({ onclose }) => {
        return (
          <div
            dir="rtl"
            style={{
              padding: "20px 10px",
              background: "#282a36",
              border: "1px solid #ff79c6",
              borderRadius: "10px",
            }}
          >
            <h3 style={{ color: "#50fa7b", textAlign: "center" }}>حذف مخاطب</h3>
            <p
              style={{
                color: "#ff5555",
                textAlign: "center",
                margin: "5px 0 10px",
              }}
            >
              مطمئنی میخوای {contactFullname} رو حذف کنی؟
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => {
                  removeContact(contactId);
                  onclose();
                }}
                style={{
                  outline: "none",
                  border: "none",
                  padding: "4px 10px",
                  cursor: "pointer",
                  background: "#ff79c6",
                  margin: "0 5px",
                }}
              >
                بله مطمئنم
              </button>
              <button
                onClick={onclose}
                style={{
                  outline: "none",
                  border: "none",
                  padding: "4px 10px",
                  cursor: "pointer",
                  background: "#bd93f9",
                  margin: "0 5px",
                }}
              >
                منصرف شدم
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const filterContacts = (e) => {
    setQuery({ ...query, text: e.target.value });
    const allcontacts = contacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilter(allcontacts)
  };

  return (
    <>
      <Navbar query={query.text} filterContacts={filterContacts} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contact
              confirmAlertModal={confirmAlertModal}
              contacts={filter}
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
        <Route
          path="/Editcontact/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
