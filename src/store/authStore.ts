import {create} from 'zustand'
import { AUTH_USER } from '../constants/consts'
import { LoginFormState, RegisterFormState, User } from '../types/types'
import api from '../routes/api'

type AuthStore = {
  user: {
    id: string,
    name: string,
    email: string,
    createdAt: Date
  } | null,
  isSubmitting: boolean,
  register: any,
  login: any,
  logout: any,
  setUserLs: any,
  getUserLs: any,
  setSubmitting: any,
}

const useAuthStore = create<AuthStore>((set, get): AuthStore => ({
  // auth user:
  // this happens before component runs: so: user will not be null for once.
  user: JSON.parse(localStorage.getItem(AUTH_USER) as string) || null,
  // loading for: register, login, logout
  isSubmitting: false,

  // register
  register: async function(
    formState: RegisterFormState, 
    navigate: any,
    toast: any
    ) {

    // set loading: true
    get().setSubmitting()

    // register a user
    const result: (User | {error?: string}) = 
      await api.register(formState)
    
    // set loading: false
    get().setSubmitting()
    
    if ((result as { error?: string }).error !== undefined) {
      throw new Error('register failed.')
    } else {
      // store authUser: in localStorage
      
      toast({
        title: "success",
        description: 'you signed up successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      // redirect to hompage:
      navigate('/login')

    }
    /* if (!result?.error) {
    } else {
      throw new Error('register failed.')
    } */
  },

  // login
  login: async function(
    formState: LoginFormState, 
    navigate: any,
    toast: any,
    ) {
    try {
      get().setSubmitting()
      // login user
      const result: (User | {error?: string}) = 
        await api.login(formState, toast)
  
      get().setSubmitting()
  
      // check if response is: { error: string }
      if ((result as { error?: string }).error !== undefined) {
        throw new Error('login failed.')
      } else {
        // store authUser: in localStorage
        get().setUserLs(result)
  
        // redirect to hompage:
        navigate('/')
  
        // store authUser: in zustand
        return set((state: any) => ({ ...state, user: result }))
      }

    } catch (err: any) {
      toast({
        title: "Server Error",
        description: 'credentials are wrong',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      console.log('error: authStore/login action')
    }
 
  },

  // logout
  logout: async function(navigate: any) {
    get().setSubmitting()
    // remove cookie
    const result = await api.logout()

    get().setSubmitting()

    // remove user from localstorage
    localStorage.removeItem(AUTH_USER)

    // navigate to home
    navigate('/')

    // remove user from zustand
    return set((state: any) => ({ ...state, user: null }))
  },

  // set auth user to localstorage  
  setUserLs: function(result: User) {
    // unique key, for the value stored in localStorage
    localStorage.setItem(AUTH_USER, JSON.stringify(result))
  },

  // get auth user from localstorage
  getUserLs: function() { 
    if (localStorage.getItem(AUTH_USER)) {
      const authUser: User = 
        JSON.parse(localStorage.getItem(AUTH_USER) as string)
      set({ user: authUser })
    }
  },

  // set loading:
  setSubmitting: function() {
    return set((state: any) => ({
      ...state, isSubmitting: !state.isSubmitting, 
    }))
  }

}))

// subscribe
const unsub = useAuthStore.subscribe((state) => {
  console.log('update: authStore: ', state)
})

// fcade
export const useSelectAuthUser = () =>
  useAuthStore((state: any) => state.user)

export const useSelectIsSubmitting = () =>
  useAuthStore((state: any) => state.isSubmitting)

export const useDisRegister = () => 
  useAuthStore((state: any) => state.register)

export const useDisLogin = () => 
  useAuthStore((state: any) => state.login)

export const useDisLogout = () => 
  useAuthStore((state: any) => state.logout)

export const useDisGetUserLs = () =>
  useAuthStore((state: any) => state.getUserLs)