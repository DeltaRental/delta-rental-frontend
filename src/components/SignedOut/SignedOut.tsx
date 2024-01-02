import React, { MouseEventHandler } from 'react'

type Props = {
  signIn:MouseEventHandler<HTMLButtonElement> | undefined, 
}

const SignedOut = (props: Props) => {
  return (
    <div>
      <button onClick={props.signIn} type="button" className="btn btn-primary me-3">Giriş yap</button>
      <button type="button" className="btn btn-primary me-3">Kayıt ol</button>
    </div>
  )
}

export default SignedOut