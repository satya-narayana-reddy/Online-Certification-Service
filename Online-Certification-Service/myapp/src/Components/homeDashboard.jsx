import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase';
import StudentInformation from './StudentInformation';
import { useEffect, useState } from 'react';
import './Dashboard/dashboard.css';

function HomeDashboard() {
    const [pendingData, setPendingData] = useState([]);
    const [successfulData, setSuccessfulData] = useState([]);
    const [searchQueryPending, setSearchQueryPending] = useState('');
    const [searchQuerySuccessful, setSearchQuerySuccessful] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleSearchPending = (e) => {
        setSearchQueryPending(e.target.value);
    };

    const handleSearchSuccessful = (e) => {
        setSearchQuerySuccessful(e.target.value);
    };

    const studentSelected = (item) => {
        setSelectedStudent(item);
    };

    useEffect(() => {
        const fetchPendingData = async () => {
            const collectionRef = collection(database, 'users');
            const querySnapshot = await getDocs(collectionRef);
            const newData = querySnapshot.docs.map(doc => doc.data());
            setPendingData(newData);
        };

        const fetchSuccessfulData = async () => {
            const collectionRef = collection(database, 'ConfirmedStudents');
            const querySnapshot = await getDocs(collectionRef);
            const newData = querySnapshot.docs.map(doc => doc.data());
            setSuccessfulData(newData);
        };

        fetchPendingData();
        fetchSuccessfulData();
    }, []);

    const filteredPendingData = pendingData.filter(item =>
        item.name.toUpperCase().includes(searchQueryPending.toUpperCase())
    );

    const filteredSuccessfulData = successfulData.filter(item =>
        item.name.toUpperCase().includes(searchQuerySuccessful.toUpperCase())
    );

    return (
        <div>
            <h4 className='topHeading'>Certificate Requests Status : </h4>
            <div className='cards'>
                <div className='pendingCard'>
                    <h3 className='pendingHead'>Pending</h3>
                    <div className='search'>
                        <div className="input-container">
                            <input
                                type="text"
                                name="text"
                                className="input"
                                placeholder="Search Students..."
                                value={searchQueryPending}
                                onChange={handleSearchPending}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" className="icon">
                                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <rect fill="white" height="24" width="24"></rect>
                                    <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className='container'>
                        <hr className='hr' />
                    </div>
                    <ol>
                        {filteredPendingData.map((item, index) => (
                            <div className='userContainer' key={index} onClick={() => studentSelected(item)}>
                                <i className="fa-solid fa-user icon2"></i>
                                <li className='listData'>{item.name}</li>
                            </div>
                        ))}
                    </ol>
                </div>
                <div className='pendingCard2'>
                    <h3 className='pendingHead'>Successful</h3>
                    <div className='search'>
                        <div className="input-container">
                            <input
                                type="text"
                                name="text"
                                className="input"
                                placeholder="Search Students..."
                                value={searchQuerySuccessful}
                                onChange={handleSearchSuccessful}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="blue" viewBox="0 0 24 24" className="icon">
                                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                                <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <rect fill="white" height="24" width="24"></rect>
                                    <path fill="" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className='container'>
                        <hr className='hr' />
                    </div>
                    <ol>
                        {filteredSuccessfulData.map((item, index) => (
                            <div className='userContainer' key={index}>
                                <i className="fa-solid fa-user icon2"></i>
                                <li className='listData'>{item.name}</li>
                            </div>
                        ))}
                    </ol>
                </div>
            </div>
            <StudentInformation student={selectedStudent} />
        </div>
    );
}

export default HomeDashboard;
