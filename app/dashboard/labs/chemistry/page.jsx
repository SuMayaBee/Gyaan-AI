"use client";
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ChemistryVirtualLab = () => {
  // Acid-Base state
  const [ph, setPh] = useState(7);
  const [acid, setAcid] = useState(0);
  const [base, setBase] = useState(0);
  const [solution, setSolution] = useState('neutral');
  const [reactionStatus, setReactionStatus] = useState('idle');
  
  // Atomic state
  const [activeTab, setActiveTab] = useState('titration');
  const [selectedElement, setSelectedElement] = useState('hydrogen');
  const [electronSpeed, setElectronSpeed] = useState(5);
  const [showElectronCloud, setShowElectronCloud] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [animationActive, setAnimationActive] = useState(true);
  
  // Elements data
  const elements = {
    hydrogen: {
      symbol: 'H',
      name: 'Hydrogen',
      atomicNumber: 1,
      color: '#b3e5fc',
      electronConfiguration: '1s¹',
      shells: [1],
      description: 'The lightest element, hydrogen is the most abundant chemical substance in the universe.'
    },
    helium: {
      symbol: 'He',
      name: 'Helium',
      atomicNumber: 2,
      color: '#ffcc80',
      electronConfiguration: '1s²',
      shells: [2],
      description: 'A colorless, odorless, tasteless, non-toxic, inert, monatomic gas.'
    },
    lithium: {
      symbol: 'Li',
      name: 'Lithium',
      atomicNumber: 3,
      color: '#ef9a9a',
      electronConfiguration: '1s² 2s¹',
      shells: [2, 1],
      description: 'A soft, silvery-white alkali metal, used in batteries and mood-stabilizing drugs.'
    },
    carbon: {
      symbol: 'C',
      name: 'Carbon',
      atomicNumber: 6,
      color: '#212121',
      electronConfiguration: '1s² 2s² 2p²',
      shells: [2, 4],
      description: 'The basis of organic chemistry, carbon is the 15th most abundant element in the Earth's crust.'
    },
    oxygen: {
      symbol: 'O',
      name: 'Oxygen',
      atomicNumber: 8,
      color: '#ff5722',
      electronConfiguration: '1s² 2s² 2p⁴',
      shells: [2, 6],
      description: 'A highly reactive nonmetal that readily forms compounds with most elements.'
    },
    sodium: {
      symbol: 'Na',
      name: 'Sodium',
      atomicNumber: 11,
      color: '#8d6e63',
      electronConfiguration: '1s² 2s² 2p⁶ 3s¹',
      shells: [2, 8, 1],
      description: 'A soft, silvery-white, highly reactive metal that is essential for animal life.'
    }
  };
  
  // Calculate color based on pH
  const getColorForPh = (phValue) => {
    if (phValue <= 3) return 'bg-red-500';
    if (phValue <= 6) return 'bg-orange-400';
    if (phValue === 7) return 'bg-purple-300';
    if (phValue <= 10) return 'bg-blue-400';
    return 'bg-blue-700';
  };
  
  // Get pH status description
  const getPhStatus = (phValue) => {
    if (phValue < 7) return 'Acidic';
    if (phValue === 7) return 'Neutral';
    return 'Basic';
  };
  
  const addAcid = () => {
    if (ph > 0) {
      setPh(Math.max(0, ph - 1));
      setAcid(acid + 1);
      setSolution('acidic');
      showReaction();
    }
  };
  
  const addBase = () => {
    if (ph < 14) {
      setPh(Math.min(14, ph + 1));
      setBase(base + 1);
      setSolution('basic');
      showReaction();
    }
  };
  
  const resetSolution = () => {
    setPh(7);
    setAcid(0);
    setBase(0);
    setSolution('neutral');
    setReactionStatus('idle');
  };
  
  const showReaction = () => {
    setReactionStatus('reacting');
    setTimeout(() => {
      setReactionStatus('idle');
    }, 2000);
  };

  // Generate electrons for atomic structure
  const generateElectrons = (element) => {
    const data = elements[element];
    if (!data) return [];
    
    let electrons = [];
    let electronIndex = 0;
    
    // Create electrons for each shell
    data.shells.forEach((count, shellIndex) => {
      const shellRadius = (shellIndex + 1) * 30;
      
      // Add electrons to this shell
      for (let i = 0; i < count; i++) {
        // Calculate position based on angle
        const angle = (i / count) * Math.PI * 2;
        // Add some randomness to the initial position if animation is active
        const randomOffset = animationActive ? Math.random() * 0.2 : 0;
        
        electrons.push({
          id: `electron-${electronIndex}`,
          shellIndex,
          shellRadius,
          angle: angle + randomOffset,
          speed: 0.002 * electronSpeed * (1 / (shellIndex + 1)),
        });
        
        electronIndex++;
      }
    });
    
    return electrons;
  };
  
  // Animation for electrons
  useEffect(() => {
    if (!animationActive || activeTab !== 'atomic') return;
    
    const electrons = document.querySelectorAll('.electron');
    if (electrons.length === 0) return;
    
    const atomElectrons = generateElectrons(selectedElement);
    
    const animateElectrons = () => {
      atomElectrons.forEach((electron, index) => {
        if (index >= electrons.length) return;
        
        // Update angle for rotation
        electron.angle += electron.speed;
        
        // Calculate new position
        const x = Math.cos(electron.angle) * electron.shellRadius;
        const y = Math.sin(electron.angle) * electron.shellRadius;
        
        // Apply new position
        electrons[index].style.transform = `translate(${x}px, ${y}px)`;
      });
      
      animationId = requestAnimationFrame(animateElectrons);
    };
    
    let animationId = requestAnimationFrame(animateElectrons);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [selectedElement, electronSpeed, animationActive, activeTab]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chemistry Virtual Lab</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex space-x-4 border-b pb-4">
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'titration' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('titration')}
          >
            Acid-Base Titration
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'atomic' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('atomic')}
          >
            Atomic Structure
          </button>
        </div>
      </div>
      
      {activeTab === 'titration' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Acid-Base Titration</h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Current pH: {ph.toFixed(1)}</span>
                <span className={`px-3 py-1 rounded-full text-white ${ph < 7 ? 'bg-red-500' : ph > 7 ? 'bg-blue-500' : 'bg-purple-500'}`}>
                  {getPhStatus(ph)}
                </span>
              </div>
              
              <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${getColorForPh(ph)}`} style={{ width: `${(ph/14)*100}%` }}></div>
              </div>
              
              <div className="flex justify-between text-xs mt-1">
                <span>0 (Acidic)</span>
                <span>7 (Neutral)</span>
                <span>14 (Basic)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium mb-2">Beaker</h3>
                <div className="relative h-60 w-full bg-gray-100 rounded-lg border border-gray-300 flex items-end justify-center">
                  <div className={`w-4/5 rounded-t-lg transition-all duration-500 ${getColorForPh(ph)}`} 
                    style={{ height: '80%' }}>
                    {reactionStatus === 'reacting' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bubbles">
                          {[...Array(15)].map((_, i) => (
                            <div key={i} className="bubble" 
                              style={{ 
                                left: `${Math.random() * 100}%`,
                                animationDuration: `${1 + Math.random() * 2}s`,
                                animationDelay: `${Math.random() * 2}s`,
                                opacity: Math.random() * 0.7 + 0.3
                              }}>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Reagents</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="h-20 w-16 bg-red-500 rounded-lg mx-auto mb-2"></div>
                      <button 
                        onClick={addAcid}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Add Acid
                      </button>
                      <p className="mt-1 text-sm">Added: {acid}ml</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-20 w-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                      <button 
                        onClick={addBase}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Add Base
                      </button>
                      <p className="mt-1 text-sm">Added: {base}ml</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={resetSolution}
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Reset Solution
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reaction Info</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Current Solution</h3>
                <div className={`p-4 rounded-md ${
                  solution === 'acidic' ? 'bg-red-100' : 
                  solution === 'basic' ? 'bg-blue-100' : 
                  'bg-purple-100'
                }`}>
                  <p>{solution === 'acidic' ? 'Acidic solution (pH < 7)' : 
                     solution === 'basic' ? 'Basic solution (pH > 7)' : 
                     'Neutral solution (pH = 7)'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Reaction Equation</h3>
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-center">HCl (acid) + NaOH (base) → NaCl + H₂O</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">pH Indicators</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-red-500 inline-block mr-2 rounded-full"></span>
                    <span>Red: Strongly acidic (pH 1-3)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-orange-400 inline-block mr-2 rounded-full"></span>
                    <span>Orange: Weakly acidic (pH 4-6)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-purple-300 inline-block mr-2 rounded-full"></span>
                    <span>Purple: Neutral (pH 7)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-blue-400 inline-block mr-2 rounded-full"></span>
                    <span>Light blue: Weakly basic (pH 8-10)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-blue-700 inline-block mr-2 rounded-full"></span>
                    <span>Dark blue: Strongly basic (pH 11-14)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Atom Visualizer</h2>
            
            <div className="relative h-[400px] w-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Nucleus */}
              <div className="relative w-16 h-16 rounded-full flex items-center justify-center z-10" 
                style={{ backgroundColor: elements[selectedElement].color }}>
                <span className="text-2xl font-bold" style={{ color: parseInt(elements[selectedElement].color.substring(1), 16) > 0xffffff / 2 ? '#000' : '#fff' }}>
                  {elements[selectedElement].symbol}
                </span>
                
                {showLabels && (
                  <div className="absolute -top-7 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    Nucleus
                  </div>
                )}
              </div>
              
              {/* Electron shells */}
              {elements[selectedElement].shells.map((count, index) => (
                <div 
                  key={`shell-${index}`}
                  className="absolute rounded-full border border-gray-500 border-opacity-50"
                  style={{ 
                    width: `${(index + 1) * 60}px`, 
                    height: `${(index + 1) * 60}px`,
                  }}
                >
                  {showLabels && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black bg-opacity-50 px-1 rounded">
                      Shell {index + 1}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Electrons */}
              {generateElectrons(selectedElement).map((electron, index) => (
                <div
                  key={electron.id}
                  className="electron absolute w-3 h-3 rounded-full bg-blue-400 shadow-glow"
                  style={{
                    transform: `translate(${Math.cos(electron.angle) * electron.shellRadius}px, ${Math.sin(electron.angle) * electron.shellRadius}px)`,
                  }}
                >
                  {/* Electron cloud effect */}
                  {showElectronCloud && (
                    <div className="absolute inset-0 animate-pulse rounded-full bg-blue-400 opacity-50 transform scale-150"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Element:</label>
                <Select value={selectedElement} onValueChange={setSelectedElement}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Select element" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(elements).map(key => (
                      <SelectItem key={key} value={key}>{elements[key].name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Electron Speed: {electronSpeed}</label>
                <Slider 
                  value={[electronSpeed]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={(value) => setElectronSpeed(value[0])} 
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showElectronCloud"
                    checked={showElectronCloud}
                    onChange={() => setShowElectronCloud(!showElectronCloud)}
                    className="mr-2"
                  />
                  <label htmlFor="showElectronCloud">Show Electron Cloud</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showLabels"
                    checked={showLabels}
                    onChange={() => setShowLabels(!showLabels)}
                    className="mr-2"
                  />
                  <label htmlFor="showLabels">Show Labels</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="animationActive"
                    checked={animationActive}
                    onChange={() => setAnimationActive(!animationActive)}
                    className="mr-2"
                  />
                  <label htmlFor="animationActive">Animation</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Element Information</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-md">
                <h3 className="font-medium text-lg mb-1">{elements[selectedElement].name}</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="font-semibold pr-3">Symbol:</td>
                      <td>{elements[selectedElement].symbol}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-3">Atomic Number:</td>
                      <td>{elements[selectedElement].atomicNumber}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-3">Electron Configuration:</td>
                      <td>{elements[selectedElement].electronConfiguration}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-3 text-sm">{elements[selectedElement].description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Electron Shells</h3>
                <ul className="space-y-1 text-sm">
                  {elements[selectedElement].shells.map((count, index) => (
                    <li key={`shell-info-${index}`} className="flex justify-between">
                      <span>Shell {index + 1}:</span>
                      <span className="font-mono">{count} electron{count !== 1 ? 's' : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-gray-100 rounded-md mt-4">
                <h3 className="font-medium mb-2">Atomic Structure Concepts</h3>
                <ul className="text-sm space-y-2">
                  <li><strong>Nucleus:</strong> Contains protons and neutrons, making up most of the atom's mass.</li>
                  <li><strong>Electron Shells:</strong> Represent energy levels where electrons orbit the nucleus.</li>
                  <li><strong>Electron Configuration:</strong> Describes the arrangement of electrons in atomic orbitals.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .bubbles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .bubble {
          position: absolute;
          bottom: 0;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          animation: bubble-rise linear forwards;
        }
        @keyframes bubble-rise {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120px) scale(1.5);
            opacity: 0;
          }
        }
        .shadow-glow {
          box-shadow: 0 0 5px 2px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ChemistryVirtualLab;