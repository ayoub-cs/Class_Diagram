import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function RelationshipEditor({ addRelationship, classes }) {
  const [sourceClass, setSourceClass] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [sourceCardinality, setSourceCardinality] = useState('');
  const [targetCardinality, setTargetCardinality] = useState('');
  const [relationshipType, setRelationshipType] = useState('Association');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRelationship = {
      sourceClass,
      targetClass,
      sourceCardinality,
      targetCardinality,
      relationshipType,
    };
    addRelationship(newRelationship);
    // Réinitialiser les champs après soumission
    setSourceClass('');
    setTargetClass('');
    setSourceCardinality('');
    setTargetCardinality('');
    setRelationshipType('Association');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="sourceClass">Source Class:</Label>
        <Input 
          type="select" 
          id="sourceClass" 
          value={sourceClass} 
          onChange={(e) => setSourceClass(e.target.value)}
        >
          <option value="">Select Source Class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls.className}>{cls.className}</option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="sourceCardinality">Source Cardinality:</Label>
        <Input 
          type="text" 
          id="sourceCardinality" 
          placeholder="e.g., 1..1" 
          value={sourceCardinality} 
          onChange={(e) => setSourceCardinality(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="targetClass">Target Class:</Label>
        <Input 
          type="select" 
          id="targetClass" 
          value={targetClass} 
          onChange={(e) => setTargetClass(e.target.value)}
        >
          <option value="">Select Target Class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls.className}>{cls.className}</option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="targetCardinality">Target Cardinality:</Label>
        <Input 
          type="text" 
          id="targetCardinality" 
          placeholder="e.g., 1..*" 
          value={targetCardinality} 
          onChange={(e) => setTargetCardinality(e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="relationshipType">Relationship Type:</Label>
        <Input 
          type="select" 
          id="relationshipType" 
          value={relationshipType} 
          onChange={(e) => setRelationshipType(e.target.value)}
        >
          <option>Association</option>
          <option>Composition</option>
          <option>Aggregation</option>
          <option>Inheritance</option>
          <option>Dependency</option>
        </Input>
      </FormGroup>

      <Button color="primary" type="submit">Add Relationship</Button>
    </Form>
  );
}

export default RelationshipEditor;
