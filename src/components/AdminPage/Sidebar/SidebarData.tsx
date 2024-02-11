import { datas } from './Data'

type Props = {
  toogle: boolean
}

const SidebarData = (props: Props) => {
  
  return (
    <div className=''>
      {datas.map(data=>{
        return(
          <div className={`${props.toogle ? "last:w-[3.6rem]" : "last:w-[17rem]"} @apply flex items-center mt-2 p-2 rounded-lg
          cursor-pointer hover:bg-white transition-all duration-300`} >
            <div className='text-gray-600 mr-1'>{data.icon} </div>
            <div className={`${props.toogle ? "opacity-0 delay-200" : ""} 
            text-gray-600 text-[1.2rem] whitespace-pre`} >
              <div>{data.text}</div>  
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SidebarData