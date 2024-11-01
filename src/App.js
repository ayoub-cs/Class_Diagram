import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ClassEditor from './components/ClassEditor';
import RelationshipEditor from './components/RelationshipEditor';
import './App.css';

function App() {
  const [isClassModalOpen, setClassModalOpen] = useState(false);
  const [isRelationshipModalOpen, setRelationshipModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [classes, setClasses] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const buttonContainerRef = useRef(null);

  const toggleClassModal = useCallback(() => setClassModalOpen(prev => !prev), []);
  const toggleRelationshipModal = useCallback(() => setRelationshipModalOpen(prev => !prev), []);

  const addClass = (newClass) => {
    const position = { x: 50 + classes.length * 220, y: 50 };
    setClasses([...classes, { ...newClass, position }]);
    toggleClassModal();
  };

  const addRelationship = (relationship) => {
    setRelationships([...relationships, relationship]);
    toggleRelationshipModal();
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setOffset({
      x: event.clientX - event.currentTarget.getBoundingClientRect().left,
      y: event.clientY - event.currentTarget.getBoundingClientRect().top,
    });
  };

  const handleMouseMove = useCallback(
    (event) => {
      if (isDragging && buttonContainerRef.current) {
        buttonContainerRef.current.style.position = 'absolute';
        buttonContainerRef.current.style.left = `${event.clientX - offset.x}px`;
        buttonContainerRef.current.style.top = `${event.clientY - offset.y}px`;
      }
    },
    [isDragging, offset]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const drawLine = (fromX, fromY, toX, toY, relationshipType, sourceCardinality, targetCardinality) => {
    const line = <line x1={fromX} y1={fromY} x2={toX} y2={toY} className="relationship-line" />;
    const textX = (fromX + toX) / 2;
    const textY = (fromY + toY) / 2;

    switch (relationshipType) {
      case 'Aggregation':
        return (
          <g key={`agg-${fromX}-${fromY}-${toX}-${toY}`}>
            {line}
            <polygon points={`${toX},${toY} ${toX - 10},${toY + 10} ${toX + 10},${toY + 10}`} fill="none" stroke="black" strokeWidth="2" />
            <text x={textX} y={textY - 10} textAnchor="middle">{`${sourceCardinality} - ${targetCardinality}`}</text>
          </g>
        );
      case 'Composition':
        return (
          <g key={`comp-${fromX}-${fromY}-${toX}-${toY}`}>
            {line}
            <polygon points={`${toX},${toY} ${toX - 10},${toY + 10} ${toX + 10},${toY + 10}`} fill="black" />
            <text x={textX} y={textY - 10} textAnchor="middle">{`${sourceCardinality} - ${targetCardinality}`}</text>
          </g>
        );
      case 'Inheritance':
        return (
          <g key={`inherit-${fromX}-${fromY}-${toX}-${toY}`}>
            {line}
            <polygon points={`${toX},${toY} ${toX - 10},${toY - 10} ${toX + 10},${toY - 10}`} fill="black" />
            <text x={textX} y={textY - 10} textAnchor="middle">{`${sourceCardinality} - ${targetCardinality}`}</text>
          </g>
        );
      case 'Dependency':
        return (
          <g key={`dep-${fromX}-${fromY}-${toX}-${toY}`}>
            {line}
            <polygon points={`${toX},${toY} ${toX - 5},${toY - 5} ${toX + 5},${toY - 5}`} fill="black" />
            <text x={textX} y={textY - 10} textAnchor="middle">{`${sourceCardinality} - ${targetCardinality}`}</text>
          </g>
        );
      default:
        return (
          <g key={`assoc-${fromX}-${fromY}-${toX}-${toY}`}>
            {line}
            <text x={textX} y={textY - 10} textAnchor="middle">{`${sourceCardinality} - ${targetCardinality}`}</text>
          </g>
        );
    }
  };

  return (
    <div className="App">
      <h1>Class Diagram Editor</h1>
      <div ref={buttonContainerRef} className="button-container" onMouseDown={handleMouseDown} style={{ cursor: 'move' }}>
        <Button color="primary" onClick={toggleClassModal} className="mb-2">Add Class</Button>
        <Button color="primary" onClick={toggleRelationshipModal} className="mb-2">Add Relationship</Button>
        <Button color="info" className="mb-2">Zoom In</Button>
        <Button color="info" className="mb-2">Zoom Out</Button>
        <Button color="primary" className="mb-2">Save Diagram</Button>
        <Button color="primary" className="mb-2">Load Diagram</Button>
        <Button color="success" className="mb-2">Export as PNG</Button>
        <Button color="success" className="mb-2">Export as SVG</Button>
      </div>

      <div className="drawing-area" style={{ position: 'relative' }}>
        <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
          {relationships.map((rel, index) => {
            const fromClass = classes.find(cls => cls.className === rel.sourceClass);
            const toClass = classes.find(cls => cls.className === rel.targetClass);

            if (fromClass && toClass) {
              const fromX = fromClass.position.x + 75;
              const fromY = fromClass.position.y + 100;
              const toX = toClass.position.x + 75;
              const toY = toClass.position.y + 20;

              return drawLine(fromX, fromY, toX, toY, rel.relationshipType, rel.sourceCardinality, rel.targetCardinality);
            }
            return null;
          })}
        </svg>

        {classes.map((cls, index) => (
          <div key={index} className="class-box" style={{ position: 'absolute', left: cls.position.x, top: cls.position.y }}>
            <div className="class-name">{cls.className}</div>
            <hr />
            <div className="class-attributes">
              <strong>Attributes:</strong>
              {cls.attributes.length > 0 ? (
                cls.attributes.map((attr, i) => (
                  <div key={i}>{attr.visibility} {attr.name} : {attr.type}</div>
                ))
              ) : (
                <div>No Attributes</div>
              )}
            </div>
            <hr />
            <div className="class-methods">
              <strong>Methods:</strong>
              {cls.methods.length > 0 ? (
                cls.methods.map((method, i) => (
                  <div key={i}>{method.visibility} {method.name}() : {method.returnType}</div>
                ))
              ) : (
                <div>No Methods</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="footer-container">
        <div className="language-selector">
          <label htmlFor="language-select">Select Language:</label>
          <select id="language-select">
            <option value="java">Java</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
          </select>
        </div>
        <Button color="success" className="generate-code-button">Generate Code</Button>
      </div>

      <Modal isOpen={isClassModalOpen} toggle={toggleClassModal}>
        <ModalHeader toggle={toggleClassModal}>Edit Class</ModalHeader>
        <ModalBody>
          <ClassEditor addClass={addClass} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleClassModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isRelationshipModalOpen} toggle={toggleRelationshipModal}>
        <ModalHeader toggle={toggleRelationshipModal}>Edit Relationship</ModalHeader>
        <ModalBody>
          <RelationshipEditor addRelationship={addRelationship} classes={classes} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleRelationshipModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
