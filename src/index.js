import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Component/App';

import { Provider } from 'react-redux';
import Store from './Store/Store';
var root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <>
<BrowserRouter basename="/Mern">
  <App />
</BrowserRouter>
    </>
)
