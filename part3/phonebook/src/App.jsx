import { useState, useEffect } from "react";
import AddContactForm from "./components/AddContactForm";
import FilterContacts from "./components/FilterContacts";
import Persons from "./components/Persons";
import contactService from "./services/contacts";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  if (!persons) {
    return null;
  }

  const addName = (event) => {
    event.preventDefault();

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
      const person = persons.find(
        (p) => p.name.toLowerCase() === newName.toLowerCase()
      );
      const changedNumber = { ...person, number: newNumber };
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        contactService
          .updateContact(person.id, changedNumber)
          .then((returnedContact) => {
            setNotificationMessage(`Number for ${person.name} has been updated`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedContact))
            );
          })
          .catch((error) => {
            console.log(error);
            setNotificationMessage(
              `${person.name} has already been removed from contacts`
            );
            setNotificationColor("red");
            setTimeout(() => {
              setNotificationColor("green");
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      contactService
        .create(nameObject)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact));
          setNotificationMessage(`${nameObject.name} added to contacts`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setNotificationMessage(error.response.data.error);
          setNotificationColor("red");
          setTimeout(() => {
            setNotificationColor("green");
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      contactService.deleteContact(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        style={{ color: notificationColor }}
      />
      <FilterContacts
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />

      <h2>add a new</h2>

      <AddContactForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
