import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

function ClassEditor({ addClass }) {
  const [className, setClassName] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [methods, setMethods] = useState([]);

  const addAttribute = () => {
    setAttributes([...attributes, { visibility: 'Public', name: '', type: 'String' }]);
  };

  const addMethod = () => {
    setMethods([...methods, { visibility: 'Private', name: '', returnType: 'void' }]);
  };

  const handleSave = () => {
    addClass({ className, attributes, methods });
    setClassName('');
    setAttributes([]);
    setMethods([]);
  };

  return (
    <div className="p-3 border rounded">
      <h3 className="text-center">Edit Class</h3>
      <Form>
        <FormGroup>
          <Label>Class Name:</Label>
          <Input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter class name"
          />
        </FormGroup>

        <Label>Attributes:</Label>
        {attributes.map((attr, index) => (
          <div className="d-flex mb-2" key={index}>
            <Input type="select" value={attr.visibility}>
              <option>Public</option>
              <option>Private</option>
              <option>Protected</option>
            </Input>
            <Input
              type="text"
              placeholder="Attribute name"
              className="mx-2"
            />
            <Input type="select" defaultValue="String">
              <option>String</option>
              <option>int</option>
              <option>float</option>
              <option>boolean</option>
            </Input>
            <Button color="danger" className="ms-2">Remove</Button>
          </div>
        ))}
        <Button color="primary" onClick={addAttribute}>Add Attribute</Button>

        <Label className="mt-3">Methods:</Label>
        {methods.map((method, index) => (
          <div className="d-flex mb-2" key={index}>
            <Input type="select" value={method.visibility}>
              <option>Public</option>
              <option>Private</option>
              <option>Protected</option>
            </Input>
            <Input
              type="text"
              placeholder="Method name"
              className="mx-2"
            />
            <Input type="select" defaultValue="void">
              <option>void</option>
              <option>int</option>
              <option>String</option>
              <option>float</option>
            </Input>
            <Button color="danger" className="ms-2">Remove</Button>
          </div>
        ))}
        <Button color="primary" onClick={addMethod}>Add Method</Button>

        <div className="text-center mt-3">
          <Button color="success" onClick={handleSave}>Save</Button>{' '}
          <Button color="danger">Delete</Button>{' '}
          <Button color="secondary">Cancel</Button>
        </div>
      </Form>
    </div>
  );
}

export default ClassEditor;
