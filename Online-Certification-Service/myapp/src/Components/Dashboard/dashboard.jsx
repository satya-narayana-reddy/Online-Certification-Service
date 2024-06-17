import './dashboard.css';
import { useState, useEffect} from 'react';
import Certificate from './certificate';
import HomeDashboard from '../homeDashboard';

function Dashboard() {
    let [certificate,setCertificate] = useState(false);
    useEffect(() => {
        const handleArrowClick = (e) => {
            const arrowParent = e.target.parentElement.parentElement;
            arrowParent.classList.toggle("showMenu");
        };

        const arrow = document.querySelectorAll(".arrow");
        for (let i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener("click", handleArrowClick);
        }

        const sidebar = document.querySelector(".sidebar");
        const sidebarBtn = document.querySelector(".bx-menu");

        const handleSidebarBtnClick = () => {
            sidebar.classList.toggle("close");
        };

        sidebarBtn.addEventListener("click", handleSidebarBtnClick);

        return () => {
            for (let i = 0; i < arrow.length; i++) {
                arrow[i].removeEventListener("click", handleArrowClick);
            }
            sidebarBtn.removeEventListener("click", handleSidebarBtnClick);
        };
    }, []);

    return (
        <> 
            <div class="sidebar close">
                <div class="logo-details">
                    <i class='fa-solid fa-building-columns'></i>
                    <span class="logo_name mt-2">SASI</span>
                </div>
                <ul class="nav-links">
                    <li>
                        <a href="#">
                            <i class='bx bx-grid-alt' onClick={()=>setCertificate(false)}></i>
                            <span class="link_name" onClick={()=>setCertificate(false)}>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class='bx bx-compass' onClick={()=>setCertificate(true)}></i>
                            <span class="link_name" onClick={()=>setCertificate(true)}>Certification Form</span>
                        </a>
                        <ul class="sub-menu blank">
                            <li><a class="link_name" href="#">Explore</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i class='bx bx-history'></i>
                            <span class="link_name">History</span>
                        </a>
                        <ul class="sub-menu blank">
                            <li><a class="link_name" href="#">History</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i class='bx bx-cog' ></i>
                            <span class="link_name">Setting</span>
                        </a>
                        <ul class="sub-menu blank">
                            <li><a class="link_name" href="#">Setting</a></li>
                        </ul>
                    </li>
                    <li>
                        <div class="profile-details">
                            <div class="profile-content">
                                <img src="image/profile.jpg" alt="profileImg"/>
                            </div>
                            <div class="name-job">
                                <div class="profile_name">Client</div>
                                <div class="job">Certificate Issue</div>
                            </div>
                            <i class='bx bx-log-out' ></i>
                        </div>
                    </li>
                </ul>
            </div>
            <section class="home-section">
                <div class="home-content">
                    <i class='bx bx-menu' ></i>
                    <span class="text">Clerk dashboard</span>
                </div>
                {certificate ? <Certificate/> :
                    <HomeDashboard />
                }
            </section>
        </>
    );
}
export default Dashboard;
