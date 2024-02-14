import React ,{useState} from 'react'
import Education from "./Education";
import Experiences from "./Experiences";
import PersonalDetails from "./Personaldetails";
import Project from "./Project";
import Extras from "./Extras";
import axios from "axios";
import { saveAs } from "file-saver";
import Success from "./Success";

const Form = () => {

  const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        github: "",
        skills: "",
    
        exp1_org: "",
        exp1_pos: "",
        exp1_desc: "",
        exp1_dur: "", 
        exp2_org: "",
        exp2_pos: "",
        exp2_des: "",
        exp2_dur: "",
    
        proj1_title: "",
        proj1_link: "",
        proj1_desc: "",
        proj2_title: "",
        proj2_link: "",
        proj2_desc: "",
    
        edu1_school: "",
        edu1_year: "",
        edu1_qualification: "",
        edu1_desc: "",
        edu2_school: "",
        edu2_year: "",
        edu2_qualification: "",
        edu2_desc: "",
    
        extra_1: "",
        extra_2: "",
      });

      const [page, setPage] = useState(0);

      const FormTitle = [
        "Personal Details",
        "Education",
        "Experience",
        "Projects",
        "Extras",
      ];
      
      const PageDisplay = () => {
        if (page === 0) {
          return <PersonalDetails formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
          return <Education formData={formData} setFormData={setFormData} />;
        } else if (page === 2) {
          return <Experiences formData={formData} setFormData={setFormData} />;
        } else if (page === 3) {
          return <Project formData={formData} setFormData={setFormData} />;
        } else {
          return <Extras formData={formData} setFormData={setFormData} />;
        }
      };
    
      const createPdf = async () => {
        if (page === FormTitle.length - 1) {
          try {
            //Create PDF
            await axios.post("http://localhost:5000/api/resume/create-pdf", formData);
            //Fetch the PDF
            const response = await axios.get("http://localhost:5000/api/resume/fetch-pdf", {
              responseType: "blob",
            });
            //Process and save the PDF
            const pdfBlob = new Blob([response.data], {
              type: "application/pdf",
            });
            setSuccess(response.status === 200);
            saveAs(pdfBlob, "Resume.pdf");
          } catch (error) {
            console.error("Error creating or downloading PDF:", error);
          }
        } else {
          setPage((currPage) => currPage + 1);
        }
        
      };

  return (
    <div>
       <h1>FORM</h1>
        <div>
          <h1>{FormTitle[page]}</h1>
          <div>{PageDisplay()}</div>
          <button 
            disabled={page===0}
            onClick={()=>{
              setPage((currPage)=>currPage-1)
            }}
          >
            Prev
          </button>
          <button onClick={(page) => createPdf(page)}>
            {page === FormTitle.length - 1 ? "Download Pdf" : "Next"}
          </button>
        </div>
        {success && <Success />}
    </div>
   
  )
}

export default Form