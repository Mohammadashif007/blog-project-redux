// /* eslint-disable @typescript-eslint/no-explicit-any */
// import config from "../../config";
// import { AppError } from "../../errorHelpers/AppError";
// import { ISSLCommerz } from "./sslCommerz.interface";
// import axios from "axios";
// import httpStatus from "http-status-codes";

// const sslPaymentInit = async (payload: ISSLCommerz) => {
//   try {
//     const data = {
//       store_id: config.ssl_store_id,
//       store_passwd: config.ssl_store_pass,
//       total_amount: payload.amount,
//       currency: "BDT",
//       tran_id: payload.transactionId,
//       success_url: `${config.ssl_success_backend_url}?transactionId=${payload.transactionId}`,
//       fail_url: config.ssl_fail_backend_url,
//       cancel_url: config.ssl_cancel_backend_url,
//       // ipn_url: "http://localhost:3030/ipn",
//       shipping_method: "N/A",
//       product_name: "Tour",
//       product_category: "Service",
//       product_profile: "general",
//       cus_name: payload.name,
//       cus_email: payload.email,
//       cus_add1: payload.address,
//       cus_add2: "N/A",
//       cus_city: "Dhaka",
//       cus_state: "Dhaka",
//       cus_postcode: "1000",
//       cus_country: "Bangladesh",
//       cus_phone: payload.phoneNumber,
//       cus_fax: "01711111111",
//       ship_name: "N/A",
//       ship_add1: "N/A",
//       ship_add2: "N/A",
//       ship_city: "N/A",
//       ship_state: "N/A",
//       ship_postcode: 1000,
//       ship_country: "N/A",
//     };

//     const response = await axios({
//       method: "POST",
//       url: config.ssl_payment_api,
//       data: data,
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     });

//     return response.data;
//   } catch (error: any) {
//     console.log("Payment error occur", error);
//     throw new AppError(httpStatus.BAD_REQUEST, error.message);
//   }
// };

// export const SSLService = {
//   sslPaymentInit,
// };
