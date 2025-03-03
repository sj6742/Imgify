import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./Context/Appcontext.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <AppContext>
        <App />
      </AppContext>
    </BrowserRouter>
  
);
