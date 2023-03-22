import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/ReusableStyles/Footer/footer.css'

const Footer = ()=>{
    return (
        <footer className='container-fluid fixed-bottom applyNUTheme border-top'>
            <div className='container'>
                <div className='py-3 my-4'>
                <b><p className='text-center text-muted'>Developers</p></b>
                
                <ul className='nav justify-content-center pb-3 mb-3'>
                    <li className='nav-item'><a href='https://github.com/nithin-bharadwaj-369-NEU' target='_blank' className='nav-link px-2 nuLink'>Nithin Bhardwaj</a></li>
                    <li className='nav-item'><a href='https://github.com/kaustubh9702' target='_blank' className='nav-link px-2 nuLink'>Kaustubh</a></li>
                    <li className='nav-item'><a href='https://github.com/akhileshkavitkar99' target='_blank' className='nav-link px-2 nuLink'>Akhilesh Kavitkar</a></li>
                    <li className='nav-item'><a href='https://github.com/sstej88' target='_blank' className='nav-link px-2 nuLink'>Sai Tej Sunkara</a></li>
                </ul>

                <b><p className='text-center'>&copy; 2023 NU-Events Hub, Educational Webpage</p></b>
                </div>
            </div>
        </footer>
    );
};

export default Footer;