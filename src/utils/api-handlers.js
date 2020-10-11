import { SERVER_URL } from '../utils/constants';

async function loginApi({ email, password }) {
  try {
    const response = await fetch(`${SERVER_URL}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

async function registerApi({ email, password }) {
  try {
    const response = await fetch(`${SERVER_URL}/api/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

async function getCustomers(pageNumber) {
  console.log(`inside getCustomers`);
  try {
    const response = await fetch(`${SERVER_URL}/api/users?page=${pageNumber}`);
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

async function createCustomer(newCustomer) {
  console.log(newCustomer);
  const payload = {
    email: newCustomer.email,
    name: newCustomer.name
  };
  try {
    const response = await fetch(`${SERVER_URL}/api/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

async function updateCustomer(newCustomer, id) {
  console.log(newCustomer);
  const payload = {
    email: newCustomer.email,
    name: newCustomer.name
  };
  try {
    const response = await fetch(`${SERVER_URL}/api/users/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return await response.json();
  } catch (error) {
    throw Error(error);
  }
}

export { loginApi, registerApi, getCustomers, createCustomer, updateCustomer };