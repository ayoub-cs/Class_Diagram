import React, { useState } from 'react';
import { Button, Form, Input, Label } from 'reactstrap';

function CodeGenerator({ classes, relationships }) {
  const [language, setLanguage] = useState('Java');

  const handleGenerateCode = () => {
    // Function to generate code in selected language
  };

  return (
    <div className="text-center mt-5">
      <Form inline>
        <Label className="me-2">Select Language:</Label>
        <Input type="select" value={language} onChange={(e) => setLanguage(e.target.value)} className="me-2">
          <option>Java</option>
          <option>Python</option>
          <option>PHP</option>
        </Input>
        <Button color="primary" onClick={handleGenerateCode}>Generate Code</Button>
      </Form>
    </div>
  );
}

export default CodeGenerator;
