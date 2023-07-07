import { useState } from "react";
import { LoginFormState } from "../types/types";
import { useDisLogin } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useLoginForm = (toast: any) => {
  const [state, setState] = useState<LoginFormState>({
    email: '',
    password: '',
    errors: {},
  })

  const loginAct = useDisLogin()
  const navigate = useNavigate()

  function validate() {
    const errors: {
      [key: string]: string,
    } = {}

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

    // set errors state to errors object
    setState(c => ({ ...c, errors: errors }))
    return errors
  }

  // handle submit event
  function handleSubmit(event: any) {
    event.preventDefault()

    const errors = validate()

    if (Object.keys(errors).length === 0) {
      // login and get token in cookie
      loginAct(state, navigate, toast)
    }

  }

  return {
    email: state.email,
    password: state.password,
    errors: state.errors,
    handleSubmit: handleSubmit,
    setState: setState,
  }
}

export default useLoginForm