import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Footer = ()=>{
    return (
        <div class="container border-top">
            
            <footer class="py-3 my-4">
            <b><p class="text-center text-muted">Developers</p></b>
            
            <ul class="nav justify-content-center pb-3 mb-3">
                <li class="nav-item"><a href="https://github.com/nithin-bharadwaj-369-NEU" target="_blank" class="nav-link px-2 text-muted">Nithin Bhardwaj</a></li>
                <li class="nav-item"><a href="https://github.com/kaustubh9702" target="_blank" class="nav-link px-2 text-muted">Kaustubh</a></li>
                <li class="nav-item"><a href="https://github.com/akhileshkavitkar99" target="_blank" class="nav-link px-2 text-muted">Akhilesh Kavitkar</a></li>
                <li class="nav-item"><a href="https://github.com/sstej88" target="_blank" class="nav-link px-2 text-muted">Sai Tej Sunkara</a></li>
            </ul>

            <b><p class="text-center text-muted">&copy; 2023 NU-Events Hub, Educational Webpage</p></b>
            </footer>
        </div>
    );
};

export default Footer;