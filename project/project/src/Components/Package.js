import React, { useState } from 'react';

const Package = ({ id, name, url, price, days, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [personDetails, setPersonDetails] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
  });
  const [peopleList, setPeopleList] = useState([]);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAddPerson = () => {
    setPeopleList((prevPeople) => [...prevPeople, personDetails]);
    setUpdatedPrice(price * (peopleList.length + 1));
    closeModal();
    setPersonDetails({ name: '', age: '', gender: '', contact: '' });
  };

  return (
    <div style={styles.card}>
      <div style={styles.packageDetails}>
        <img src={url} alt={name} style={styles.image} />
        <div style={styles.textDetails}>
          <h4 style={styles.headingText}>{name}</h4>
          <p style={styles.text}>Price per person: ₹{price}</p>
          <p style={styles.text}>Duration: {days} days</p>
          <p style={styles.text}>Total price: ₹{updatedPrice}</p>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button onClick={openModal} style={styles.addPersonButton}>
          Add Person
        </button>
        <button onClick={() => onRemove(id)} style={styles.removeButton}>
          Remove
        </button>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalHeading}>Enter Person Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={personDetails.name}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={personDetails.age}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={personDetails.gender}
              onChange={handleInputChange}
              style={styles.input}
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={personDetails.contact}
              onChange={handleInputChange}
              style={styles.input}
            />
            <button onClick={handleAddPerson} style={styles.submitButton}>
              Submit
            </button>
            <button onClick={closeModal} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

      <div style={styles.peopleListContainer}>
        <h5 style={styles.peopleHeading}>People Added:</h5>
        {peopleList.length > 0 ? (
          <ul style={styles.peopleList}>
            {peopleList.map((person, index) => (
              <li key={index} style={styles.personItem}>
                {person.name} ({person.age}, {person.gender}) - {person.contact}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noPeopleText}>No people added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Package;

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '350px',
  },
  packageDetails: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginRight: '10px',
  },
  textDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  headingText: {
    color: '#333', // Darker color for better visibility
    marginBottom: '5px',
  },
  text: {
    color: '#555', // Medium-dark color for visibility
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '10px',
  },
  addPersonButton: {
    padding: '8px 12px',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
    marginRight: '5px',
  },
  removeButton: {
    padding: '8px 12px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  modalHeading: {
    color: '#333',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    color: '#333', // Dark text color for inputs
  },
  submitButton: {
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
  closeButton: {
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#888',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
  peopleListContainer: {
    maxHeight: '150px',
    overflowY: 'auto',
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    width: '100%',
  },
  peopleHeading: {
    color: '#333',
  },
  peopleList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  personItem: {
    padding: '5px 0',
    borderBottom: '1px solid #ddd',
    color: '#555',
  },
  noPeopleText: {
    color: '#777', // Slightly lighter color for placeholders
  },
};
