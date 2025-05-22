"use client";
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, RotateCw } from "lucide-react";

const BiologyVirtualLab = () => {
  const [activeTab, setActiveTab] = useState('cell');
  const [cellType, setCellType] = useState('animal');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const [highlightedOrganelle, setHighlightedOrganelle] = useState(null);
  
  // Cell data
  const cellData = {
    animal: {
      name: "Animal Cell",
      description: "Animal cells are eukaryotic cells that lack a cell wall and have unique organelles.",
      organelles: [
        {
          id: "nucleus",
          name: "Nucleus",
          color: "#9c27b0",
          position: { x: 50, y: 50 },
          size: 20,
          description: "Contains genetic material (DNA) and controls cell activities."
        },
        {
          id: "mitochondria",
          name: "Mitochondria",
          color: "#f44336",
          position: { x: 70, y: 35 },
          size: 10,
          description: "Powerhouse of the cell; produces ATP through cellular respiration."
        },
        {
          id: "golgi",
          name: "Golgi Apparatus",
          color: "#4caf50",
          position: { x: 30, y: 35 },
          size: 12,
          description: "Modifies, sorts, and packages proteins for secretion or use within the cell."
        },
        {
          id: "er",
          name: "Endoplasmic Reticulum",
          color: "#2196f3",
          position: { x: 30, y: 65 },
          size: 15,
          description: "Network of membranes involved in protein synthesis and lipid metabolism."
        },
        {
          id: "lysosome",
          name: "Lysosome",
          color: "#ff9800",
          position: { x: 70, y: 65 },
          size: 8,
          description: "Contains digestive enzymes to break down waste materials and cellular debris."
        }
      ]
    },
    plant: {
      name: "Plant Cell",
      description: "Plant cells are eukaryotic cells with a cell wall, chloroplasts for photosynthesis, and a large central vacuole.",
      organelles: [
        {
          id: "nucleus",
          name: "Nucleus",
          color: "#9c27b0",
          position: { x: 50, y: 40 },
          size: 15,
          description: "Contains genetic material (DNA) and controls cell activities."
        },
        {
          id: "chloroplast",
          name: "Chloroplast",
          color: "#4caf50",
          position: { x: 70, y: 35 },
          size: 12,
          description: "Contains chlorophyll and is responsible for photosynthesis."
        },
        {
          id: "vacuole",
          name: "Central Vacuole",
          color: "#03a9f4",
          position: { x: 50, y: 60 },
          size: 25,
          description: "Large fluid-filled organelle that maintains turgor pressure and stores nutrients."
        },
        {
          id: "cellWall",
          name: "Cell Wall",
          color: "#8d6e63",
          position: { x: 50, y: 50 },
          size: 48,
          isOutline: true,
          description: "Rigid outer layer that provides structural support and protection."
        },
        {
          id: "mitochondria",
          name: "Mitochondria",
          color: "#f44336",
          position: { x: 30, y: 35 },
          size: 8,
          description: "Powerhouse of the cell; produces ATP through cellular respiration."
        }
      ]
    },
    bacteria: {
      name: "Bacterial Cell",
      description: "Bacterial cells are prokaryotic, simpler than eukaryotic cells, lacking membrane-bound organelles.",
      organelles: [
        {
          id: "nucleoid",
          name: "Nucleoid",
          color: "#9c27b0",
          position: { x: 50, y: 50 },
          size: 25,
          description: "Region that contains the bacterial chromosome (DNA)."
        },
        {
          id: "plasmid",
          name: "Plasmid",
          color: "#2196f3",
          position: { x: 65, y: 40 },
          size: 8,
          description: "Small, circular DNA molecules separate from chromosomal DNA."
        },
        {
          id: "ribosome",
          name: "Ribosomes",
          color: "#ffeb3b",
          position: { x: 35, y: 60 },
          size: 6,
          multiplePoints: true,
          description: "Sites of protein synthesis."
        },
        {
          id: "cellWall",
          name: "Cell Wall",
          color: "#8d6e63",
          position: { x: 50, y: 50 },
          size: 45,
          isOutline: true,
          description: "Rigid outer layer that provides structural support and protection."
        },
        {
          id: "capsule",
          name: "Capsule",
          color: "#e0e0e0",
          position: { x: 50, y: 50 },
          size: 48,
          isOutline: true,
          opacity: 0.5,
          description: "Protective layer that helps bacteria resist phagocytosis."
        }
      ]
    }
  };
  
  const increaseZoom = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.1);
    }
  };
  
  const decreaseZoom = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };
  
  const rotateCell = () => {
    setRotationAngle(rotationAngle + 45);
  };
  
  const getSelectedCell = () => {
    return cellData[cellType] || cellData.animal;
  };
  
  const renderOrganelle = (organelle) => {
    const isHighlighted = highlightedOrganelle === organelle.id;
    const opacity = organelle.opacity || (isHighlighted ? 1 : highlightedOrganelle ? 0.3 : 1);
    
    // For multiple points (like ribosomes)
    if (organelle.multiplePoints) {
      const points = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const distance = organelle.size * 1.5;
        const x = organelle.position.x + Math.cos(angle) * distance;
        const y = organelle.position.y + Math.sin(angle) * distance;
        
        points.push(
          <div 
            key={`${organelle.id}-${i}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: organelle.color,
              width: `${organelle.size}px`,
              height: `${organelle.size}px`,
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              opacity,
              zIndex: isHighlighted ? 10 : 1,
              transition: 'all 0.3s ease',
              boxShadow: isHighlighted ? `0 0 0 2px white, 0 0 0 4px ${organelle.color}` : 'none'
            }}
            onMouseEnter={() => setHighlightedOrganelle(organelle.id)}
            onMouseLeave={() => setHighlightedOrganelle(null)}
          />
        );
      }
      return points;
    }
    
    // For outlines (like cell wall)
    if (organelle.isOutline) {
      return (
        <div 
          key={organelle.id}
          className="absolute rounded-full border-2"
          style={{
            borderColor: organelle.color,
            backgroundColor: 'transparent',
            width: `${organelle.size}%`,
            height: `${organelle.size}%`,
            left: `${organelle.position.x}%`,
            top: `${organelle.position.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity,
            zIndex: isHighlighted ? 10 : 0,
            transition: 'all 0.3s ease',
            boxShadow: isHighlighted ? `0 0 0 2px white, 0 0 0 4px ${organelle.color}` : 'none'
          }}
          onMouseEnter={() => setHighlightedOrganelle(organelle.id)}
          onMouseLeave={() => setHighlightedOrganelle(null)}
        />
      );
    }
    
    // Regular organelles
    return (
      <div 
        key={organelle.id}
        className="absolute rounded-full"
        style={{
          backgroundColor: organelle.color,
          width: `${organelle.size}%`,
          height: `${organelle.size}%`,
          left: `${organelle.position.x}%`,
          top: `${organelle.position.y}%`,
          transform: 'translate(-50%, -50%)',
          opacity,
          zIndex: isHighlighted ? 10 : 1,
          transition: 'all 0.3s ease',
          boxShadow: isHighlighted ? `0 0 0 2px white, 0 0 0 4px ${organelle.color}` : 'none'
        }}
        onMouseEnter={() => setHighlightedOrganelle(organelle.id)}
        onMouseLeave={() => setHighlightedOrganelle(null)}
      >
        {showLabels && isHighlighted && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded whitespace-nowrap z-20">
            {organelle.name}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Biology Virtual Lab</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Cell Structure Visualizer</h2>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={decreaseZoom}>
                <Minus size={16} />
              </Button>
              <span className="text-sm font-medium">{Math.round(zoomLevel * 100)}%</span>
              <Button size="sm" variant="outline" onClick={increaseZoom}>
                <Plus size={16} />
              </Button>
              <Button size="sm" variant="outline" onClick={rotateCell}>
                <RotateCw size={16} />
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Cell Type:</label>
            <Select value={cellType} onValueChange={setCellType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Select cell type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="animal">Animal Cell</SelectItem>
                <SelectItem value="plant">Plant Cell</SelectItem>
                <SelectItem value="bacteria">Bacterial Cell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div 
            className="relative h-[400px] border rounded-lg bg-gray-100 overflow-hidden"
            style={{
              transformOrigin: 'center',
              transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Cell membrane/cytoplasm background */}
            <div className="absolute inset-4 rounded-full bg-[#f5f5dc] opacity-80"></div>
            
            {/* Render all organelles */}
            {getSelectedCell().organelles.map(organelle => renderOrganelle(organelle))}
          </div>
          
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="showLabels"
              checked={showLabels}
              onChange={() => setShowLabels(!showLabels)}
              className="mr-2"
            />
            <label htmlFor="showLabels" className="text-sm">Show Labels</label>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cell Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{getSelectedCell().name}</h3>
              <p className="text-sm text-gray-600 mt-1">{getSelectedCell().description}</p>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">
                {highlightedOrganelle 
                  ? getSelectedCell().organelles.find(o => o.id === highlightedOrganelle)?.name
                  : 'Organelle Details'}
              </h3>
              
              <div className="bg-gray-100 p-3 rounded-md">
                {highlightedOrganelle ? (
                  <div>
                    <div 
                      className="w-4 h-4 rounded-full mb-2" 
                      style={{ 
                        backgroundColor: getSelectedCell().organelles.find(o => o.id === highlightedOrganelle)?.color
                      }}
                    ></div>
                    <p className="text-sm">
                      {getSelectedCell().organelles.find(o => o.id === highlightedOrganelle)?.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Hover over an organelle to see details
                  </p>
                )}
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">Key Differences</h3>
              <ul className="text-sm space-y-2">
                {cellType === 'animal' && (
                  <>
                    <li>• No cell wall or chloroplasts</li>
                    <li>• Small vacuoles instead of a central vacuole</li>
                    <li>• Typically irregular in shape</li>
                  </>
                )}
                {cellType === 'plant' && (
                  <>
                    <li>• Has a rigid cell wall made of cellulose</li>
                    <li>• Contains chloroplasts for photosynthesis</li>
                    <li>• Large central vacuole for water storage</li>
                  </>
                )}
                {cellType === 'bacteria' && (
                  <>
                    <li>• Prokaryotic (no nucleus or membrane-bound organelles)</li>
                    <li>• DNA is in the nucleoid region (not enclosed)</li>
                    <li>• Cell wall composition differs from plant cells</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cell Biology Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Cell Theory</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>All living organisms are composed of one or more cells</li>
              <li>The cell is the basic unit of structure and organization in organisms</li>
              <li>All cells arise from pre-existing cells</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Cell Functions</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Obtaining nutrition and converting it to energy</li>
              <li>Carrying out specialized functions</li>
              <li>Reproducing</li>
              <li>Responding to environmental stimuli</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiologyVirtualLab; 