import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DAHomePage from './pages/DAHomepage';
// import Login from './pages/LoginPage';
// import HomePage from './pages/HomePage';
// import PreviewData from './pages/PreviewData';
// import DSHomePage from './pages/DSHomePage';
// import JsonState from './context/jsonState';
// import ModelQuality from './pages/ModelQuality';
 
 
 
function App() {
 
  return (
 
     
    <Router>
      <Routes>
 
          <Route path="/" element={<DAHomePage />} />
        {/* <Route path="/generatedData" element={<DataTable />} />  */}
      </Routes>
    </Router>
   
   
  );
}
 
export default App;