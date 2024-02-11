import React from 'react'


type Props = {
    toggle: boolean
}

const UserProfile = (props: Props) => {
  return (
    <div className={`flex gap-5 items-center ${props.toggle ? "bg-none transition-all duration-300 delay-200" : "rounded-xl p-2"}`}>
      <div className='min-w[3.3rem] h-[3.3rem] '>
        <img className='h-full rounded-full object-cover' src="https://c0.klipartz.com/pngpicture/831/88/gratis-png-perfil-de-usuario-iconos-de-la-computadora-interfaz-de-usuario-mistica-thumbnail.png" alt="" />
      </div>
      <div className={`${props.toggle ? "opacity-0 delay-200" : ""}`}>
        <p className='text-sm '>Merve Keser</p>
        <span className='text-[0.75rem] opacity-60'>merve@mail.com</span>
      </div>
    </div>
  )
}

export default UserProfile