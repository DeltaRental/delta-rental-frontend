import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCity,
  faCogs,
  faGasPump,
  faGaugeHigh,
  faGaugeSimple,
  faGaugeSimpleHigh,
  faGears,
  faLocationDot,
  faPalette,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../../components/CustomLink/Link";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import invoiceService from "../../services/invoiceService";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
type Props = {
  rental: any;
};
type InvoiceInfoType = {
  name?: string;
  date?: string;
  amount?: number;
  address?: string;

  // Diğer property'ler buraya eklenebilir
};
function RentalListByUser(props: Props) {
  const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfoType>({});

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleRentalInfo = (rentalId: number) => {
    invoiceService.getInvoiceDetails(rentalId).then(
      (response) => {
        console.log(response);
        setInvoiceInfo({ ...response.data[0] });
        setOpen(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  console.log(invoiceInfo);

  return (
    <div>
      <div className="flex flex-col mt-10 border-2 border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 flex justify-between items-center">
          <span className="text-xl font-bold text-white">
            SİPARİŞ DETAYLARI
          </span>
          <span className="text-3xl text-white font-bold">{`${props.rental.totalPrice} TL`}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 p-4 gap-4">
          <div className="lg:col-span-3 flex justify-center items-center">
            <img
              className="object-contain w-80 h-40"
              src="https://www.avis.com.tr/Avis/media/Avis/Cars/n-citroen-c-elysee.png"
              alt="Araç Resmi"
            />
          </div>
          <div className="lg:col-span-9 lg:grid-cols-3 grid grid-cols-1  gap-4">
            <div className="lg:col-span-1 col-span-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
              <div className="text-center font-semibold">{`Sipariş No: ${props.rental.id}`}</div>
              <div className="flex items-center whitespace-nowrap">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Başlangıç T.:
                <span className="font-semibold ms-2">{`${props.rental.startDate}`}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Bitiş T.:
                <span className="font-semibold ms-2">{`${props.rental.endDate}`}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                Teslim T.:
                <span className="font-semibold ms-2">{`${props.rental.returnDate}`}</span>
              </div>
            </div>
            <div className="col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="text-lg text-center font-semibold mb-2">
                {`${props.rental.car.model.brandName} ${props.rental.car.model.name}`}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-red-500 w-5 h-5 mr-2"
                    icon={faPalette}
                  />
                  {`${props.rental.car.color.name}`}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-gray-700 w-5 h-5 mr-2"
                    icon={faGasPump}
                  />
                  {`${props.rental.car.fuelType}`}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-yellow-500 w-5 h-5 mr-2"
                    icon={faCogs}
                  />
                  {`${props.rental.car.gearType}`}
                </div>
                <div className="flex items-center">
                  <img
                    className="w-5 h-5 object-cover mr-2"
                    src="https://www.svgrepo.com/show/232243/license-plate.svg"
                    alt="Plaka"
                  />
                  {`${props.rental.car.plate}`}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-blue-500 w-5 h-5 mr-2"
                    icon={faGaugeSimple}
                  />
                  Başlangıç KM: {`${props.rental.startKilometer}`}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-green-500 w-5 h-5 mr-2"
                    icon={faGaugeSimpleHigh}
                  />
                  Teslim KM: {`${props.rental.endKilometer}`}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-purple-500 w-5 h-5 mr-2"
                    icon={faCity}
                  />
                  {`${props.rental.car.branch.city}`}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-orange-500 w-5 h-5 mr-2"
                    icon={faLocationDot}
                  />
                  {`${props.rental.car.branch.name} Şubesi`}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon
                    className="text-pink-500 w-5 h-5 mr-2"
                    icon={faPhone}
                  />
                  {`${props.rental.car.branch.gsm}`}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-12 mt-4">
            <button
              onClick={() => {
                handleClickOpen("paper"); // Dialog'u açacak state'i günceller
                handleRentalInfo(props.rental.id); // Rental ID'yi günceller
              }}
              className="w-full flex justify-center bg-gradient-to-r from-purple-800 to-pink-700 hover:from-purple-700 hover:to-pink-600 text-white p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-300"
            >
              Fatura Detayı
            </button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Fatura Detayı</DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                className="w-[600px] h-[1000px] "
              >
                {invoiceInfo && (invoiceInfo.name || invoiceInfo.date || invoiceInfo.amount || invoiceInfo.address) ? (
                  <div className="text-black">
                    <p>{`İsim: ${invoiceInfo.name}`}</p>
                    <p>{`Tarih: ${invoiceInfo.date}`}</p>
                    <p>{`Toplam Fiyat: ${invoiceInfo.amount} ₺`}</p>
                    <p>{`Kimlik Numarası: ${invoiceInfo.address}`}</p>
                  </div>
                ) : (
                  <p>Faturası kesilmedi.</p>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default RentalListByUser;
