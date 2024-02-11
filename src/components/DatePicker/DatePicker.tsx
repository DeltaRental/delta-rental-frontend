import { TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'

type Props = {}

const DatePicker = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  useEffect(()=>{
    console.log(selectedDate?.format('YYYY-MM-DD HH:mm:ss'));

  },[selectedDate])
  
  return (
    <DateTimePicker 
    ampm={false}
    format='DD/MM/YYYY HH:mm'
    value={selectedDate}
    onChange={(newValue:Dayjs | null) => {
      setSelectedDate(newValue);
    }}
    className="w-full cursor-default shadow-md sm:text-sm rounded-[4px] bg-white" />
  )
}

export default DatePicker