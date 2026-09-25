import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const AuthContext = createContext(null)

const API_URL = 'http://127.0.0.1:8000/api'

const STORAGE_KEY = 'kec_smart_campus_user'
const ACCESS_TOKEN_KEY = 'kec_access_token'
const REFRESH_TOKEN_KEY = 'kec_refresh_token'


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)


  // ==================================================
  // CHECK EXISTING LOGIN
  // ==================================================

  useEffect(() => {

    const initializeAuth = async () => {

      const token =
        localStorage.getItem(
          ACCESS_TOKEN_KEY
        )

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


        const data =
          await response.json()


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

    const response = await fetch(
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


    let data

    try {

      data = await response.json()

    } catch {

      data = {}

    }


    if (!response.ok) {

      const message =
        data.detail ||
        data.non_field_errors?.[0] ||
        'Invalid username or password.'


      throw new Error(message)

    }


    // ----------------------------------------------
    // SAVE ACCESS TOKEN
    // ----------------------------------------------

    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      data.access
    )


    // ----------------------------------------------
    // SAVE REFRESH TOKEN
    // ----------------------------------------------

    if (data.refresh) {

      localStorage.setItem(
        REFRESH_TOKEN_KEY,
        data.refresh
      )

    }


    // ----------------------------------------------
    // SAVE USER
    // ----------------------------------------------

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data.user)
    )


    setUser(data.user)


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

    // ----------------------------------------------
    // CLEAN ROLE
    // ----------------------------------------------

    const selectedRole =
      String(role || '')
        .trim()
        .toLowerCase()


    // ----------------------------------------------
    // CHOOSE REGISTRATION ENDPOINT
    // ----------------------------------------------

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


    // ----------------------------------------------
    // REQUEST BODY
    // ----------------------------------------------

    const body = {

      username:
        username.trim(),

      email:
        email.trim(),

      password,

      first_name:
        first_name || '',

      last_name:
        last_name || '',

      phone:
        phone || '',

    }


    // ----------------------------------------------
    // STUDENT / FACULTY
    // ----------------------------------------------
    //
    // Admin does NOT send role.
    //
    // Django AdminRegisterSerializer automatically
    // creates:
    //
    // role = admin
    //
    // ----------------------------------------------

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


    // ----------------------------------------------
    // SEND REQUEST
    // ----------------------------------------------

    const response = await fetch(
      registerUrl,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(body),
      }
    )


    let data

    try {

      data =
        await response.json()

    } catch {

      data = {}

    }


    // ----------------------------------------------
    // HANDLE ERROR
    // ----------------------------------------------

    if (!response.ok) {

      const firstError =
        Object.values(data)[0]


      const message =
        Array.isArray(firstError)
          ? firstError[0]
          : firstError ||
            'Registration failed.'


      throw new Error(message)

    }


    // ----------------------------------------------
    // VERIFY ADMIN ROLE
    // ----------------------------------------------

    if (
      selectedRole === 'admin' &&
      data.user?.role !== 'admin'
    ) {

      throw new Error(
        'Admin registration failed: the server did not create an Admin account.'
      )

    }


    // ----------------------------------------------
    // VERIFY STUDENT / FACULTY ROLE
    // ----------------------------------------------

    if (
      selectedRole !== 'admin' &&
      data.user?.role !== selectedRole
    ) {

      throw new Error(
        `Registration failed: server created this account as ${data.user?.role || 'unknown'}.`
      )

    }


    // ----------------------------------------------
    // SAVE ACCESS TOKEN
    // ----------------------------------------------

    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      data.access
    )


    // ----------------------------------------------
    // SAVE REFRESH TOKEN
    // ----------------------------------------------

    if (data.refresh) {

      localStorage.setItem(
        REFRESH_TOKEN_KEY,
        data.refresh
      )

    }


    // ----------------------------------------------
    // SAVE USER
    // ----------------------------------------------

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data.user)
    )


    setUser(data.user)


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


    const response = await fetch(
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


    const data =
      await response.json()


    if (!response.ok) {

      throw new Error(
        data.detail ||
        'Unable to update profile.'
      )

    }


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
  // CONTEXT
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


// ====================================================
// USE AUTH
// ====================================================

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