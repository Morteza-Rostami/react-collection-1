import { useState } from "react";
import { RegisterFormState } from "../types/types";

const useRegisterForm = (toast: any) => {
  const [state, setState] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
  })

  function validate() {
    const errors: { [key: string]: string } = {}

    // name
    if (!state.name.trim()) {
      errors.name = 'name is required'
    }

    // email
    if (!state.email.trim()) {
      errors.email = 'email is required'
    } 
    else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = 'email is invalid'
    }

    // password
    if (!state.password.trim()) {
      errors.password = 'password is required'
    }
    else if (state.password.length < 6) {
      errors.password = 'password must be at least 6 characters long'
    }

    // confirm password
    if (!state.confirmPassword.trim()) {
      errors.confirmPassword = 'confirm password is required'
    }
    else if (state.confirmPassword !== state.password) {
      errors.confirmPassword = 'passwords do not match'
    }

    // set errors state to errors object
    setState(c => ({ ...c, errors: errors }))
    return errors
  }

  // handle from submit:
  function handleSubmit(
    event: any, 
    navigate: any,
    registerAct: any,
    ) {
    event.preventDefault()
    
    // validate form fields:
    const errors = validate()
    
    // if no error: make request
    if (Object.keys(errors).length === 0) {
      registerAct(state, navigate, toast)
    }

    console.log('register errors:: ', errors)
  }

  return {
    name: state.name,
    email: state.email,
    password: state.password,
    confirmPassword: state.confirmPassword,
    errors: state.errors,
    handleSubmit: handleSubmit,
    setState: setState,
  }
}

export default useRegisterForm