import React from 'react'
import CryptoJS from 'crypto-js';
const secretKey = "e93f08c5a7d2e234b7fae1b4c8f1a3d9b6c2d4e5f8a9c3d7e1f2b3c4d5e6f7g8"; 

// Encrypt Data (Before Sending to API)
export const encryptData = (data) => {
    try {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return encrypted;
    } catch (error) {
        console.error("Encryption error:", error);
        return null;
    }
};

// Decrypt Data (After Receiving from API)
export const decryptData = (encryptedData) => {
    try {
        if (!encryptedData) return null;

        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        return JSON.parse(decryptedText); 
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};

export async function apiCallWithoutAuth(endpoint, params) {
    // console.log(endpoint)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log('Response:', data);
        return data;
      } else {
        console.error('Error:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);  
      return null;
    }
  }

  export async function apiGetCallWithoutAuth(endpoint) {
    // console.log(endpoint)
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log('Response:', data);
        return data;
      } else {
        console.error('Error:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);  
      return null;
    }
  }


  export async function apiDeleteCallWithoutAuth(endpoint) {
    // console.log(endpoint);
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE', // Standard HTTP method (uppercase)
            headers: {
                'Content-Type': 'application/json',
                
            },
        });
        if (response.ok) {
            const data = await response.json();
            // console.log('Response:', data);
            return data; // Return the response data
        } else {
            const errorData = await response.json(); // Capture server-side error message
            console.error('Error:', response.status, response.statusText, errorData);
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}



export async function apiPutCallWithoutAuth(endpoint, data) {
  // console.log(endpoint);
  try {
      const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),  // Sending the updated data as the request body
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data; // Return the response data
      } else {
          const errorData = await response.text();
          console.error('Error:', response.status, response.statusText, errorData);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}



export async function apiPostCallWithAuth(endpoint,params, token) {
  // console.log(token)
  try {
    // console.log("apiPostCallWithAuthParams:-------------------   "+JSON.stringify(params))
      const response = await fetch(endpoint,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`, 
          },
          body: JSON.stringify(params),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data;
      } else {
          console.error('Error:', response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}

//-------------------------form data post method --------------------------------

export async function apiPostCallWithAuthFormData(endpoint, formData, token) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Directly pass FormData
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Response:', data);
      return data;
    } else {
      console.error('Error:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}


export async function apiGetCallWithAuth(endpoint,token) {
  
  // console.log(endpoint);
  try {
      const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
      });
      if (response.ok) {
          const data = await response.json();
          // console.log('Response-------555---------:', data);
          return data;
      }else {
          console.error('Error:', response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}
//--------------------------------------get call by send response--------------------------------------
export async function apiGetCallWithRersponseAuth(endpoint, params, token) {
  // console.log(endpoint);
  try {
      const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data;
      } else {
          console.error('Error:', response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}


export async function apiDeleteCallWithAuth(endpoint, token) {
  // console.log(endpoint);
  try {
      const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Add Bearer token
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data;
      } else {
          console.error('Error:', response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}
//-----------------------------------------------------------apply for both for form and raw data , put api --------------------------------------------------

export async function apiPutCallWithAuth(endpoint, data, token) {
  // console.log(endpoint);
  try {
    const headers = {
      'Authorization': `Bearer ${token}`, 
    };
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
      data = JSON.stringify(data);
    }
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: headers,
      body: data, 
    });
    if (response.ok) {
      const responseData = await response.json();
      // console.log('Response:', responseData);
      return responseData;
    } else {
      const errorData = await response.text();
      // console.error('Error:', response.status, response.statusText, errorData);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}




export default function apiUtils() {
    
  return (
    <div>apiUtils</div>
  )
}


