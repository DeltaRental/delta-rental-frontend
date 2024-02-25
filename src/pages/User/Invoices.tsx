import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import invoiceService from '../../services/invoiceService';
import InvoiceListByUser from "../../components/InvoiceListByUser/InvoiceListByUser";

type Props = {}

function Invoices({}: Props) {
  const userState = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (userState.rentals.id) {
      invoiceService.getAllInvoiceDetails(userState.users.id).then(
        (response) => {
          console.log(response);
          setInvoices(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [userState.users.id]);

  console.log("invoices listelendi", invoices);
  console.log(userState);



  return (
    <div className="">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {`Merhaba ${userState.users.name} ${userState.users.surname}`}
      </h3>
      <p className="mb-2">
        Bu sayfadan tüm faturalarını görüntüleyebilirsin.
      </p>
      <hr />
      {invoices.map((invoice:any) => 
<InvoiceListByUser key={invoice.id} invoice={invoice}/>
        
      )}
    </div>
  )
}

export default Invoices