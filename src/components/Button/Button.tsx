import React from 'react'

type Props = {
  text:string,
  size:number,
  _border_color:string,
  _text_color:string,
  _hover_bg_color:string,
  _hover_text_color:string,

}

const Button = (props: Props) => {
  return (
    <>
      <div className={`w-${props.size} text-center border-2 border-${props._border_color} rounded-lg px-3 py-2 text-${props._text_color} cursor-pointer hover:bg-${props._hover_bg_color} hover:text-${props._hover_text_color}`}>
          {props.text}
      </div>
    </>
  )
}

export default Button