import React from 'react';
// import HeaderSunlife from '../components/Header.sunlife';
// import Footer1 from '../components/Footer1';
// import '../styles/styles.scss';
// import ActionContainer from '../components/ActionContainer';
import Header from '../components/Header';
import DataAnonymization from '../components/Data Anonymization';
import Footer from '../components/Footer';
 
// import '../styles/DataSynthesizerContainer.scss';
function DAHomePage() {
    return(
    <>
<div className='DataNexus'>
<Header/>
<DataAnonymization/>
<Footer/>
{/* <div ><ActionContainer/></div>   */}
 
{/* <DataSynthesizerContainer/> */}
 
{/* <div  style={{backgroundColor:'#fff8e0'}}><Footer1/></div>   */}
</div>
</>
    )    
};
 
export default DAHomePage;