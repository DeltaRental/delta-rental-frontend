import React from 'react'

const SignedOut = ({signIn}) => {
  return (
    <div>
      <button onClick={signIn} type="button" className="btn btn-primary me-3">Giriş yap</button>
      <button type="button" className="btn btn-primary me-3">Kayıt ol</button>
    </div>
  )
}

export default SignedOut