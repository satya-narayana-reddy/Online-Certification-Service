
import { useState,UseRef} from 'react';
import './maincertificate.css';
import { database } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import * as Yup from 'yup';
import SASI from '../../assets/SASI.png'
import firebase from 'firebase/compat/app';


const collectionRef = collection(database, 'users');

const Certificate = () => {
    const [data, setData] = useState({
        certificate: "",
        newlyAdded:"",
        purpose: "",
        regdno: "",
        program: "",
        branch: "",
        name: "",
        yearSem: "",
        fathername: "",
        mobileNo: "",
        joiningYear: "",
        email: "",
        date:""
    });
    const [preview, setPreview] = useState(false);
    const [errors, setErrors] = useState({});
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#fff',
            padding: 10,
        },
        title: {
           fontWeight:'bold',
           color:'black',
           textDecoration:'underline',
           marginBottom:'20px',
           alignSelf:'center',
           alignContent:'center',
           textAlign:'center'
        },
        container:{
            flexDirection: 'row',
            justifyContent:'flexStart',
            alignItems:'center'
        },
        container2:{
            marginTop:'10px',
            lineHeight:'1.5px'
        },
        container3:{
            marginTop:'30px',
            lineHeight:'1.5px'
        },
        textContent:{
            lineHeight:'1.5px',
            letterSpacing:'1px',
            wordSpacing:'15px',
            marginTop:'5px'
        },
        highlight:{
            fontFamily: 'Helvetica-Bold',
            fontWeight:'extrabold'
        }
    });

    const PDFPreview = ({ formData }) => (
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
            <Document>
                <Page size='A4' style={styles.page}>
                    <View>
                        <Text style={styles.title}>TO WHOM SO EVER IT MAY CONCERN</Text>
                        <div style={styles.container}>
                               <Text style={styles.textContent}> This is to certify that <Text style={styles.highlight}>{formData.name.toUpperCase()} D/o {formData.fathername.toUpperCase()}
                                </Text> bearing a University Regd. No. <Text style={styles.highlight}>{formData.regdno.toUpperCase()}</Text> was a Bonafide student
                                studying I to IV year B.Tech in <Text style={styles.highlight}>{formData.branch}</Text> during the period <Text style={styles.highlight}>{formData.joiningYear} - {parseInt(formData.joiningYear)+4} </Text>in our college.</Text>
                        </div>
                        <div style={styles.container2}>
                            <Text> <Text style={styles.highlight}>{formData.name.toUpperCase()}</Text> has cleared all his examinations upto <Text style={styles.highlight}>{formData.yearSem}</Text> and has obtained a CGPA of 8.72. </Text>
                        </div>
                        <div style={styles.container3}>
                            <Text> This certificate is issued at the request of <Text style={styles.highlight}>{formData.name.toUpperCase()}</Text> to facilate her <Text  style={styles.highlight}>{formData.purpose}</Text> </Text>
                        </div>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        //Added contrains...
            // Check if a user with the same register number and certificate type already exists
            // const query = collectionRef
            //     .where('regdno', '==', data.regdno)
            //     .where('cerficate', '==', data.certificate)
            //     .get();
        
            // query.then((querySnapshot) => {
            //     if (!querySnapshot.empty) {
            //         alert('You have alredy submitted for this submit.');
            //     } else {
            //         // If no such user exists, add the new user document
            //         addDoc(collectionRef, data)
            //             .then(() => {
            //                 alert('Data Added');
            //             })
            //             .catch((error) => {
            //                 console.error("Error adding document: ", error);
            //                 alert("Error adding document: " + error.message);
            //             });
            //     }
            // }).catch((error) => {
            //     console.error("Error querying document: ", error);
            //     alert("Error querying document: " + error.message);
            // });
        


        addDoc(collectionRef, data)
            .then(() => {
                alert('Data Added');
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("Error adding document: " + error.message);
            });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Student Name is Required"),
        regdno: Yup.string()
        .matches(/^..[kK].{7}$/, "Invalid RegdNo")
        .required("RegdNo is Required"),
        fathername: Yup.string().required("Father's Name is Required"),
        mobileNo: Yup.string()
        .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
        .required("Mobile number is required"),
        email: Yup.string()
        .matches(/@sasi\.ac\.in$/, "Email must end with @sasi.ac.in")
        .email("Invalid email format")
        .required("Email is required"),
        certificate: Yup.string().required("Certificate Type is Required"),
        purpose: Yup.string().required("Purpose of Certificate is Required"),
        program: Yup.string().required("Program Type is Required"),
        branch: Yup.string().required("Branch is Required"),
        yearSem: Yup.string().required("Year and Semester is Required"),
        joiningYear: Yup.string().required("Joining Year is Required"),
        date:Yup.string().required("Date of birth is required")
    });
      
    const handleform = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            await validationSchema.validate(data, { abortEarly: false });
            console.log("Form submitted");
            setPreview(true);
        } catch (error) {
            let errorMessages = {};
            error.inner.forEach(err => {
                errorMessages[err.path] = err.message;
            });
            setErrors(errorMessages);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };

 
    return (
        <div className='background'>
            {/* <h1 className='head pt-3'>Online Certificate Service</h1> */}
            
            <div className='card'>
            <img src={SASI} alt="sasilogo" />
            <h1 className='head pt-1'>Online Certificate Service</h1>
                <form id={'myForm'}>
                    <div className='flexcard'>
                        <div className='inputfieldContainer'>
                            <div className="inputContainer text-center">
                                <input id="inputField"  required="required" placeholder="RegdNo" type="text" name="regdno" onChange={handleChange} />
                                <label className="usernameLabel" htmlFor="inputField">Enter Your RegdNo</label>
                                <svg viewBox="0 0 448 512" className="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                                {errors.regdno && <div className="errorMessage">{errors.regdno}</div>}
                            </div>
                            
                            <div class="inputContainer usernamecontainer">
                   <input  id="inputField"  required="required" placeholder="Enter Your Name" name="name" type="text" value = {data.name} onChange={handleChange}/>
                    <label class="usernameLabel" for="inputField">Enter Your Name **as per SSC**(In Blocks)</label>
                    <span className="errorMessage">{errors.name}</span>
                    <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
             </div>
            
            <div class="inputContainer namecontainer">
                     <input  id="inputField" required="required" placeholder="Father Name" type="text" name="fathername" onChange={handleChange}/>
                    <label class="usernameLabel" for="inputField">Enter Your Father Name</label>
                    <span className="errorMessage">{errors.fathername}</span>
                <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                </div>

           <div class="inputContainer namecontainer">
                    <input required="required" id="inputField" placeholder="Student Mobile Number" name='mobileNo' onChange={handleChange}/>
                    <label class="usernameLabel" for="inputField">Enter Your Student mobile Number</label>
                    <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                    {errors.mobileNo && <div className="errorMessage">{errors.mobileNo}</div>}
            </div>
            
            <div class="inputContainer usernamecontainer">
                    <input required="required" id="inputField" placeholder="Enter your sasi mail" name='email'onChange={handleChange}/>
                    <label class="usernameLabel" for="inputField">Sasi Email</label>
                    <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                    {errors.email && <div className="errorMessage">{errors.email}</div>}
            </div> 

            <div className='dateContainer'>
                 <label for='inputField'>Enter your Date Of Birth : </label>
                 <input required type="date" className='dateInput ml-3'name='date' onChange={handleChange}/>
                 {errors.date && <div className='errorMessage'>{errors.date}</div>}
            </div>
    

        </div>
        <div className='dropdownsContainer'>
            <div className='dropdown'>
                <label htmlFor='dropdownId1' className='droplabel'> Certificate : </label>
                <select className='dropdown-select ml-2' id="dropdownId1"  onChange={(event)=>{
                     let name = document.getElementById('dropdownId1');
                     name.classList.add('dropdownSelected');
                     setData({...data,certificate:event.target.value})
                }}>
                    <option selected disabled hidden value="">Type of Certificate</option>
                    <option>Bonafide Certificate</option>
                    <option>Study Certificate</option>
                    <option>TC Certificate</option>
                    <option>Custodian Certificate</option>
                    <option>Loan Estimation Certificate</option>
                    <option>Course Completion Certificate</option>
                    <option>Medium of Instruction Certificate</option>
                </select>
                {errors.certificate && <div className='errorMessage'>{errors.certificate}</div>}
            </div>
            <div className='dropdown'>
                <label htmlFor='dropdownId2' className='droplabel'>Purpose : </label>
                <select className='dropdown-select ml-2' id="dropdownId2" onChange={(event)=>{
                     let name = document.getElementById('dropdownId2');
                     name.classList.add('dropdownSelected');
                    setData({...data,purpose:event.target.value})
                }}>
                    <option selected disabled hidden value="">Purpose of Certificate</option>
                    <option>Passport</option>
                    <option>Bank Loan</option>
                    <option>Hackthon</option>
                    <option></option>
                </select>
                {errors.purpose && <div className='errorMessage'>{errors.purpose}</div>}
            </div>
            <div className='dropdown'>
                <label htmlFor='dropdownId3' className='droplabel'>Degree : </label>
                <select className='dropdown-select ml-2' id="dropdownId3" onChange={(event)=>{
                    let name = document.getElementById('dropdownId3');
                    name.classList.add('dropdownSelected');
                    setData({...data,program:event.target.value})
                }}> 
                    <option selected disabled hidden value="">Type of Degree</option>
                    <option>B.Tech</option>
                    <option>M.Tech</option>
                    <option>M.B.A</option>
                </select>
                {errors.program && <div className='errorMessage'>{errors.program}</div>}
            </div>
            <div className='dropdown'>
                <label htmlFor='dropdownId4' className='droplabel'>Branch : </label>
                <select className='dropdown-select ml-2' id="dropdownId4" onChange={(event)=>{
                    let name = document.getElementById('dropdownId4');
                    name.classList.add('dropdownSelected');
                    setData({...data,branch:event.target.value})
                }}>
                     <option disabled selected hidden value="">Select your branch</option>
                    <option value="Computer Science and Enginnering (CSE)">CSE</option>
                    <option  value="Computer Science and Technology (CST)">CST</option>
                    <option value="Electronics and Communication Engineering (ECE)">ECE</option>
                    <option value="Electronice and Communication Technology (ECT)">ECT</option>
                    <option>IT</option>
                </select>
                {errors.branch && <div className='errorMessage'>{errors.branch}</div>}
            </div>
            <div className='dropdown'>
                <label htmlFor='dropdownId5' className='droplabel'>Year & Sem:</label>
                <select className='dropdown-select ml-2' id="dropdownId5" onChange={(event)=>{
                    let name = document.getElementById('dropdownId5');
                    name.classList.add('dropdownSelected');
                    setData({...data,yearSem:event.target.value})
                }}>
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
                {errors.yearSem && <div className='errorMessage'>{errors.yearSem}</div>}
            </div>
            <div className='dropdown'>
                <label htmlFor='dropdownId6' className='droplabel'>Joining Year :</label>
                <select className='dropdown-select ml-2' id="dropdownId6" onChange={(event)=>{
                    let name = document.getElementById('dropdownId6');
                    name.classList.add('dropdownSelected');
                    setData({...data,joiningYear:event.target.value})
                }}> 
                    <option selected disabled hidden value="">Select your Joining Year</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                </select>
                {errors.joiningYear && <div className='errorMessage'>{errors.joiningYear}</div>}
            </div>
        </div>
        </div>
        <div className='btnContainer'>
            <div className='text-center pt-4'>
                <button className='btn btn-primary pl-3 pr-3'type='submit' onClick={handleform}>Preview</button>
            </div>
        </div>
            {
                preview && 
                <>
                <PDFPreview formData={data}/>
                <div className='text-center pt-4 ml-5'>
                <button className='btn btn-primary pl-3 pr-3' type="submit"onClick={handleSubmit}>Submit</button>
                </div>
                </>
            }
    </form>
           </div>
        </div>
    )
}
export default Certificate;









