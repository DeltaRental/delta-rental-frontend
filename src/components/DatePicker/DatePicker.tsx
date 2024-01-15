import { TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

type Props = {}

const DatePicker = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  console.log({selectedDate: selectedDate && selectedDate?.getDate});
  
  return (
    <DateTimePicker 
    value={selectedDate}
    onChange={(newValue:Date | null) => {
      setSelectedDate(newValue);
    }}
    className="w-full cursor-default shadow-md sm:text-sm rounded-[4px] bg-white" />
  )
}

export default DatePicker