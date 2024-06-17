import React, { useState, useEffect } from 'react';
import './student.css';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestore } from 'firebase/firestore';
import { database } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function StudentInformation({ student }) {
    const [formData, setFormData] = useState({
        regdno: '',
        name: '',
        fathername: '',
        mobileNo: '',
        email: '',
        date: '',
        certificate: '',
        purpose: '',
        program: '',
        branch: '',
        yearSem: '',
        joiningYear: ''
    });

    const [showPreview, setShowPreview] = useState(false);
    const [addToFirebase, setAddToFirebase] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                regdno: student.regdno,
                name: student.name,
                fathername: student.fathername,
                mobileNo: student.mobileNo,
                email: student.sasiMail,
                date: getCurrentDate(), 
                certificate: student.certificate,
                purpose: student.purpose,
                program: student.program,
                branch: student.branch,
                yearSem: student.yearSem,
                joiningYear: student.joiningYear
            });
        }
    }, [student]);

   
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
        },
        title: {
            fontWeight: 'bold',
            color: 'black',
            textDecoration: 'underline',
            marginBottom: '20px',
            alignSelf: 'center',
            alignContent: 'center',
            textAlign: 'center'
        },
        container: {
            flexDirection: 'row',
            justifyContent: 'flexStart',
            alignItems: 'center',
            marginBottom: '10px'
        },
        container2: {
            lineHeight: '1.5px',
            marginBottom: '10px'
        },
        container3: {
            lineHeight: '1.5px',
            marginBottom: '30px'
        },
        textContent: {
            lineHeight: '1.5px',
            letterSpacing: '1px',
            wordSpacing: '15px',
            marginTop: '5px'
        },
        highlight: {
            fontFamily: 'Helvetica-Bold',
            fontWeight: 'extrabold'
        }
    });

    const handlePreviewClick = () => {
        setShowPreview(true);
    };

    const handleSubmit = async () => {
        if (addToFirebase) {
            try {
                const docRef = await addDoc(collection(database, 'ConfirmedStudents'), {
                    regdno: formData.regdno,
                    name: formData.name,
                    fathername: formData.fathername,
                    mobileNo: formData.mobileNo,
                    email: formData.email,
                    date: formData.date,
                    certificate: formData.certificate,
                    purpose: formData.purpose,
                    program: formData.program,
                    branch: formData.branch,
                    yearSem: formData.yearSem,
                    joiningYear: formData.joiningYear
                });
    
                alert('Data successfully submitted to Firebase!');
            } catch (error) {
                console.error('Error adding document: ', error);
                alert('Error occurred while submitting data to Firebase.');
            }
        } else {
            alert('Please check the checkbox to confirm data submission.');
        }
    };
    

    return (
        <>
            <div className="studentCard">
                <h1 className='title'>Student Information Card</h1>
                <h5 className='successnote'>[ Note : You can edit this Form ]</h5>
                <div className='formContainer'>
                    <div className='flexcard'>
                        <div className='inputfieldContainer'>
                            <div className="inputContainer text-center">
                                <input id="inputField" name="regdno" placeholder="RegdNo" type="text" value={formData.regdno} onChange={handleChange} />
                                <label className="usernameLabel" htmlFor="inputField">Enter Your RegdNo</label>
                            </div>

                            <div className="inputContainer usernamecontainer">
                                <input required name="name" id="inputField" placeholder="Enter Your Name" type="text" value={formData.name} onChange={handleChange} />
                                <label className="usernameLabel" htmlFor="inputField">Enter Your Name **as per SSC**(In Blocks)</label>
                            </div>

                            <div className="inputContainer namecontainer">
                                <input required id="inputField" name="fathername" placeholder="Father Name" type="text" value={formData.fathername} onChange={handleChange} />
                                <label className="usernameLabel" htmlFor="inputField">Enter Your Father Name</label>
                            </div>

                            <div className="inputContainer namecontainer">
                                <input required id="inputField" name="mobileNo" placeholder="Student Mobile Number" type="number" value={formData.mobileNo} onChange={handleChange} />
                                <label className="usernameLabel" htmlFor="inputField">Enter Your Student mobile Number</label>
                            </div>

                            <div className="inputContainer usernamecontainer">
                                <input required id="inputField" name='sasiMail' placeholder="Enter your sasi mail" type="email" value={formData.email} onChange={handleChange} />
                                <label className="usernameLabel" htmlFor="inputField">Sasi Email</label>
                            </div>

                            <div className='dateContainer'>
                                <label htmlFor='inputField'>Enter your Date Of Birth : </label>
                                <input required type="date" className='dateInput ml-3' name='date' value={formData.date} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='dropdownsContainer'>
                            <div className='dropdown'>
                                <label htmlFor='dropdownId2'> Certificate : </label>
                                <select className='dropdown-select ml-2' id="dropdownId2" value={formData.certificate} name='certificate' onChange={handleChange}>
                                    <option selected disabled hidden value="">Type of Certificate</option>
                                    <option>Bonafide Certificate</option>
                                    <option>Study Certificate</option>
                                    <option>TC Certificate</option>
                                    <option>Custodian Certificate</option>
                                    <option>Loan Estimation Certificate</option>
                                    <option>Course Completion Certificate</option>
                                    <option>Medium of Instruction Certificate</option>
                                </select>
                            </div>
                            <div className='dropdown'>
                                <label htmlFor='dropdownId3'>Purpose : </label>
                                <select className='dropdown-select ml-2' id="dropdownId3" value={formData.purpose} name='purpose' onChange={handleChange}>
                                    <option selected disabled hidden value="">Purpose of Certificate</option>
                                    <option>Passport</option>
                                    <option>Bank Loan</option>
                                    <option>Hackthon</option>
                                </select>
                            </div>
                            <div className='dropdown'>
                                <label htmlFor='dropdownId4'>Degree : </label>
                                <select className='dropdown-select ml-2' id="dropdownId4" value={formData.program} name='program' onChange={handleChange}>
                                    <option selected disabled hidden value="">Type of Degree</option>
                                    <option>B.Tech</option>
                                    <option>M.Tech</option>
                                    <option>M.B.A</option>
                                </select>
                            </div>
                            <div className='dropdown'>
                                <label htmlFor='dropdownId5'>Branch : </label>
                                <select className='dropdown-select ml-2' id="dropdownId5" value={formData.branch} name='branch' onChange={handleChange}>
                                    <option disabled selected hidden value="">Select your branch</option>
                                    <option>CSE</option>
                                    <option>CST</option>
                                    <option>ECE</option>
                                    <option>ECT</option>
                                    <option>IT</option>
                                </select>
                            </div>
                            <div className='dropdown'>
                                <label htmlFor='dropdownId6'>Year & Sem:</label>
                                <select className='dropdown-select ml-2' id="dropdownId6" value={formData.yearSem} name='yearSem' onChange={handleChange}>
                                    <option selected disabled hidden value="">Select your Current Semester</option>
                                    <option>I-I</option>
                                    <option>I-II</option>
                                    <option>II-I</option>
                                    <option>II-II</option>
                                    <option>III-I</option>
                                    <option>III-II</option>
                                    <option>IV-I</option>
                                    <option>IV-II</option>
                                </select>
                            </div>
                            <div className='dropdown'>
                                <label htmlFor='dropdownId7'>Joining Year :</label>
                                <select className='dropdown-select ml-2' id="dropdownId7" value={formData.joiningYear} name='joiningYear' onChange={handleChange}>
                                    <option selected disabled hidden value="">Select your Joining Year</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-5 mb-2'>
                        <label>
                            <input type="checkbox" checked={addToFirebase} onChange={() => setAddToFirebase(!addToFirebase)} /> Add to Firebase
                        </label>
                        <button className='btn btn-primary ml-3' onClick={handlePreviewClick}>Preview</button>
                    </div>
                </div>
                {showPreview && (
                    <div className='previewContainer'>
                        <PDFViewer style={{ width: '100%', height: '80vh' }}>
                            <Document>
                                <Page size='A4' style={styles.page}>
                                    <View>
                                        <Text style={styles.title}>TO WHOM SO EVER IT MAY CONCERN</Text>
                                        <View style={styles.container}>
                                            <Text style={styles.textContent}> This is to certify that <Text style={styles.highlight}>{formData.name.toUpperCase()} D/o {formData.fathername.toUpperCase()}
                                                </Text> bearing a University Regd. No. <Text style={styles.highlight}>{formData.regdno.toUpperCase()}</Text> was a Bonafide student
                                                studying I to IV year B.Tech in <Text style={styles.highlight}>{formData.branch}</Text> during the period <Text style={styles.highlight}>{formData.joiningYear} - {parseInt(formData.joiningYear)+4} </Text>in our college.</Text>
                                        </View>
                                        <View style={styles.container2}>
                                            <Text> <Text style={styles.highlight}>{formData.name.toUpperCase()}</Text> has cleared all his examinations up to <Text style={styles.highlight}>{formData.yearSem}</Text> and has obtained a CGPA of 8.72. </Text>
                                        </View>
                                        <View style={styles.container3}>
                                            <Text> This certificate is issued at the request of <Text style={styles.highlight}>{formData.name.toUpperCase()}</Text> to facilitate her <Text style={styles.highlight}>{formData.purpose}</Text> </Text>
                                        </View>
                                    </View>
                                </Page>
                            </Document>
                        </PDFViewer>
                        <div className='text-center mt-5 mb-3'>
                            <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default StudentInformation;
