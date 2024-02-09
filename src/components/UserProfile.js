import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { editUserDetails, getNameById } from './api';

const UserProfile = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({
    name: '',
    age: '',
    dob: '',
    contact: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    getNameById(id)
      .then((response) => {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          name: response.userName,
        }));
      })
      .catch((error) => {
        console.error('Error fetching user name:', error.message);
      });
      
      
  }, [id]);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const update = () => {
    const { age, dob, contact } = userDetails;
    console.log(userDetails);
    editUserDetails(id, age, dob, contact)
      .then((response) => {
        console.log(response);
        setStatusMessage('User details updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user details:', error.message);
        setStatusMessage('Error updating user details');
      });
  };

  return (
    <div>
      <div>
        <div className='login-container'>
          <div className='img'><img height="120px" width="120px" src="https://as2.ftcdn.net/v2/jpg/05/62/02/41/1000_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg" alt="" /></div>
          <p className='usn'>Username: {userDetails.name}</p>
          {userDetails.name && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  name="age"
                  placeholder='Age'
                  value={userDetails.age}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  name="dob"
                  placeholder='Date of Birth'
                  value={userDetails.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <input
                  type="number"
                  name="contact"
                  placeholder='Contact'
                  value={userDetails.contact}
                  onChange={handleChange}
                />
              </div>

              <button onClick={update}>Update</button>
            </>
          )}
        </div>
      </div>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default UserProfile;
