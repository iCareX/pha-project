import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PDFUpload from "../pages/pdf_upload/pdfUpload";
import QuerySearch from "../pages/search/querySearch";
import LoginPage from "../pages/login/LoginPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "pdf_upload",
        element: <PDFUpload />,
      },
      {
        path: "query",
        element: <QuerySearch />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
