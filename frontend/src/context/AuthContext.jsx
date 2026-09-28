import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// ==================================================
// AUTH CONTEXT
// ==================================================

const AuthContext = createContext(null)

// ==================================================
// API URL
// ==================================================
//
// Vercel:
// VITE_API_URL=https://kec-fullstack.onrender.com/api
//
// Local development:
// VITE_API_URL=http://127.0.0.1:8000/api
//
// The trailing slash is removed automatically.
// ==================================================

const API_URL = (
  import.meta.env.VITE_API_URL ||
  'http://127.0.0.1:8000/api'
).replace(/\/+$/, '')


// ==================================================
// LOCAL STORAGE KEYS
// ==================================================

const STORAGE_KEY = 'kec_smart_campus_user'
const ACCESS_TOKEN_KEY = 'kec_access_token'
const REFRESH_TOKEN_KEY = 'kec_refresh_token'


// ==================================================
// AUTH PROVIDER
// ==================================================

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)


  // ==================================================
  // CHECK EXISTING LOGIN
  // ==================================================

  useEffect(() => {

    const initializeAuth = async () => {

      const token = localStorage.getItem(
        ACCESS_TOKEN_KEY
      )


      // No token = user is not logged in

      if (!token) {

        setLoading(false)

        return

      }


      try {

        const response = await fetch(
          `${API_URL}/auth/me/`,
          {
            method: 'GET',

            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )


        // Token is invalid / expired

        if (!response.ok) {

          localStorage.removeItem(
            ACCESS_TOKEN_KEY
          )

          localStorage.removeItem(
            REFRESH_TOKEN_KEY
          )

          localStorage.removeItem(
            STORAGE_KEY
          )

          setUser(null)

          return

        }


        const data = await response.json()


        // Save latest user information

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        )


        setUser(data)

      } catch (error) {

        console.error(
          'Authentication check failed:',
          error
        )

      } finally {

        setLoading(false)

      }

    }


    initializeAuth()

  }, [])


  // ==================================================
  // LOGIN
  // ==================================================

  const login = async ({
    username,
    password,
  }) => {

    let response

    try {

      response = await fetch(
        `${API_URL}/auth/login/`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      )

    } catch (error) {

      console.error(
        'Login network error:',
        error
      )

      throw new Error(
        'Unable to connect to the server. Please try again.'
      )

    }


    let data

    try {

      data = await response.json()

    } catch {

      data = {}

    }


    // ==================================================
    // LOGIN ERROR
    // ==================================================

    if (!response.ok) {

      const message =
        data.detail ||
        data.non_field_errors?.[0] ||
        data.message ||
        'Invalid username or password.'


      throw new Error(message)

    }


    // ==================================================
    // SAVE ACCESS TOKEN
    // ==================================================

    if (data.access) {

      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        data.access
      )

    }


    // ==================================================
    // SAVE REFRESH TOKEN
    // ==================================================

    if (data.refresh) {

      localStorage.setItem(
        REFRESH_TOKEN_KEY,
        data.refresh
      )

    }


    // ==================================================
    // SAVE USER
    // ==================================================

    if (data.user) {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data.user)
      )

      setUser(data.user)

    }


    return data.user

  }


  // ==================================================
  // REGISTER
  // ==================================================

  const register = async ({
    username,
    email,
    password,
    first_name,
    last_name,
    role,
    phone,
  }) => {

    // ==================================================
    // CLEAN ROLE
    // ==================================================

    const selectedRole =
      String(role || '')
        .trim()
        .toLowerCase()


    // ==================================================
    // SELECT REGISTRATION ENDPOINT
    // ==================================================

    let registerUrl


    if (selectedRole === 'admin') {

      registerUrl =
        `${API_URL}/auth/admin-register/`

    } else {

      registerUrl =
        `${API_URL}/auth/register/`

    }


    console.log(
      'REGISTER ROLE:',
      selectedRole
    )


    console.log(
      'REGISTER URL:',
      registerUrl
    )


    // ==================================================
    // REQUEST BODY
    // ==================================================

    const body = {

      username:
        String(username || '').trim(),

      email:
        String(email || '').trim(),

      password,

      first_name:
        first_name || '',

      last_name:
        last_name || '',

      phone:
        phone || '',

    }


    // ==================================================
    // STUDENT / FACULTY
    // ==================================================
    //
    // Admin registration does not send role.
    //
    // Django AdminRegisterSerializer creates:
    //
    // role = admin
    //
    // ==================================================

    if (selectedRole !== 'admin') {

      body.role = selectedRole

    }


    console.log(
      'REGISTER DATA:',
      {
        ...body,
        password: '********',
      }
    )


    // ==================================================
    // SEND REQUEST
    // ==================================================

    let response

    try {

      response = await fetch(
        registerUrl,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(body),
        }
      )

    } catch (error) {

      console.error(
        'Registration network error:',
        error
      )

      throw new Error(
        'Unable to connect to the server. Please try again.'
      )

    }


    // ==================================================
    // RESPONSE
    // ==================================================

    let data

    try {

      data = await response.json()

    } catch {

      data = {}

    }


    // ==================================================
    // HANDLE REGISTRATION ERROR
    // ==================================================

    if (!response.ok) {

      const firstError =
        Object.values(data)[0]


      const message =
        Array.isArray(firstError)
          ? firstError[0]
          : typeof firstError === 'string'
            ? firstError
            : data.detail ||
              data.message ||
              'Registration failed.'


      throw new Error(message)

    }


    // ==================================================
    // VERIFY ADMIN ROLE
    // ==================================================

    if (
      selectedRole === 'admin' &&
      data.user?.role !== 'admin'
    ) {

      throw new Error(
        'Admin registration failed: the server did not create an Admin account.'
      )

    }


    // ==================================================
    // VERIFY STUDENT / FACULTY ROLE
    // ==================================================

    if (
      selectedRole !== 'admin' &&
      data.user?.role !== selectedRole
    ) {

      throw new Error(
        `Registration failed: server created this account as ${
          data.user?.role || 'unknown'
        }.`
      )

    }


    // ==================================================
    // SAVE ACCESS TOKEN
    // ==================================================

    if (data.access) {

      localStorage.setItem(
        ACCESS_TOKEN_KEY,
        data.access
      )

    }


    // ==================================================
    // SAVE REFRESH TOKEN
    // ==================================================

    if (data.refresh) {

      localStorage.setItem(
        REFRESH_TOKEN_KEY,
        data.refresh
      )

    }


    // ==================================================
    // SAVE USER
    // ==================================================

    if (data.user) {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data.user)
      )

      setUser(data.user)

    }


    return data.user

  }


  // ==================================================
  // UPDATE PROFILE
  // ==================================================

  const updateProfile = async (
    updates
  ) => {

    const token =
      localStorage.getItem(
        ACCESS_TOKEN_KEY
      )


    if (!token) {

      throw new Error(
        'You are not logged in.'
      )

    }


    let response

    try {

      response = await fetch(
        `${API_URL}/auth/me/`,
        {
          method: 'PUT',

          headers: {
            Authorization:
              `Bearer ${token}`,

            'Content-Type':
              'application/json',
          },

          body:
            JSON.stringify(updates),
        }
      )

    } catch (error) {

      console.error(
        'Profile update network error:',
        error
      )

      throw new Error(
        'Unable to connect to the server.'
      )

    }


    let data

    try {

      data = await response.json()

    } catch {

      data = {}

    }


    // ==================================================
    // UPDATE ERROR
    // ==================================================

    if (!response.ok) {

      throw new Error(
        data.detail ||
        data.message ||
        'Unable to update profile.'
      )

    }


    // ==================================================
    // SAVE UPDATED USER
    // ==================================================

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    )


    setUser(data)


    return data

  }


  // ==================================================
  // LOGOUT
  // ==================================================

  const logout = () => {

    localStorage.removeItem(
      ACCESS_TOKEN_KEY
    )

    localStorage.removeItem(
      REFRESH_TOKEN_KEY
    )

    localStorage.removeItem(
      STORAGE_KEY
    )

    setUser(null)

  }


  // ==================================================
  // CONTEXT PROVIDER
  // ==================================================

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}


// ==================================================
// USE AUTH HOOK
// ==================================================

export function useAuth() {

  const ctx =
    useContext(AuthContext)


  if (!ctx) {

    throw new Error(
      'useAuth must be used within AuthProvider'
    )

  }


  return ctx

}