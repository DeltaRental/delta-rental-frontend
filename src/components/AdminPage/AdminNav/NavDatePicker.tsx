import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";


const NavDatePicker = () => {

  return (
    <div className=' '>
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DesktopDatePicker"]}>
          <DemoItem >
            <DateTimePicker
              defaultValue={dayjs(new Date())} className='text-white bg-delta-green-400 rounded-md'
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default NavDatePicker;
