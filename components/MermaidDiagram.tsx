import React, { useEffect } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
}

const MermaidDiagram = ({ chart }: MermaidDiagramProps) => {
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default'
    });
    mermaid.run();
  }, [chart]);

  return (
    <div className="mermaid">
      {chart}
    </div>
  );
};

export default MermaidDiagram;