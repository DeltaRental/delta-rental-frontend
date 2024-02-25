import React, { useState } from 'react';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const NavDatePicker = () => {
 
  return (
    <div className=''>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DesktopDatePicker"]}>
          <DemoItem>
            <DateTimePicker
              defaultValue={dayjs(new Date())}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default NavDatePicker;
