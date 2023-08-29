import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export const AdminProfile = () => {
    const[file, setFile] = useState();
    const upload  = () => {
        const formData = new FormData();
        formData.append("file", file);
        axios.post("http://localhost:8000/admin/upload", formData)
        .then(res => {})
        .catch(er => console.log(er));
    }

  return (
    <div >
        {/* <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
        <Button variant="primary" onClick={upload}>Upload</Button> */}
        
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><h4>Upload your avatar here:</h4></Form.Label>
        <Form.Control type="file" onChange={(e)=>setFile(e.target.files[0])} />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button type="submit" onClick={upload}>Upload</Button>
        </div>
    </div>
  )
};
