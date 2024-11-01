import React from 'react';
import { Button } from 'reactstrap';

function DiagramControls() {
  return (
    <div className="text-center mt-4">
      <Button color="info" className="me-2">Zoom In</Button>
      <Button color="info" className="me-2">Zoom Out</Button>
      <Button color="primary" className="me-2">Save Diagram</Button>
      <Button color="primary" className="me-2">Load Diagram</Button>
      <Button color="success" className="me-2">Export as PNG</Button>
      <Button color="success">Export as SVG</Button>
    </div>
  );
}

export default DiagramControls;
