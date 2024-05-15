import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={import.meta.env.VITE_TOAST_DURATION} />
      </PersistGate>
    </Provider>
  );
}

export default App;
