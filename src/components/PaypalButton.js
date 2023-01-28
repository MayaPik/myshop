import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// This values are the props in the UI
const amount = "2";
const currency = "USD";
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, showSpinner, dispatch]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={async function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
          });
        }}
      />
    </>
  );
};

export default function PayPalButton() {
  return (
    <div style={{ maxWidth: "750px", minWidth: "280px", margin: 4 }}>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AUbS7KOW3r6uzsXyRzzC5iBNweVfZyKTds_10UbTKDdHbY2lhQ2SVWMXJY0LOhIMN9chZN5T8da1_RiK",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={currency} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
