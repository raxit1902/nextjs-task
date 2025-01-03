'use client';

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    {children}
    <ToastContainer />
  </Provider>;
}
