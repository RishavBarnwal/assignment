const BASE_URL = 'http://localhost:4000';

export const signUp = async (name, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();
  return { userId: data.userId, message: data.message };
};

export const logIn = async (name, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();
  return { userId: data.userId, message: data.message };
};


export const getAllUserDetails = async () => {
  const response = await fetch(`${BASE_URL}/getUserDetails`);

  return response.json();
};

// Edit user details function
export const editUserDetails = async (userId, age, dob, contact) => {
  try {
    const response = await fetch(`${BASE_URL}/editUserDetails/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age, dob, contact }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Edit user details error:', error.message);
    throw error;
  }
};


// Get user name by ID function
export const getNameById = async (userId) => {
  const response = await fetch(`${BASE_URL}/getNameById/${userId}`);
  return response.json();
};

