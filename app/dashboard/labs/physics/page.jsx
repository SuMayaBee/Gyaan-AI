"use client";
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2, Plus, Battery, Lightbulb, Cpu } from "lucide-react";

const PhysicsVirtualLab = () => {
  // Pendulum state
  const [gravity, setGravity] = useState(9.8);
  const [pendulumLength, setPendulumLength] = useState(1);
  const [simulationActive, setSimulationActive] = useState(false);
  const [angle, setAngle] = useState(30);
  
  // Circuit state
  const [activeTab, setActiveTab] = useState('pendulum');
  const [circuitComponents, setCircuitComponents] = useState([]);
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(10);
  const [current, setCurrent] = useState(0.5);
  const [circuitState, setCircuitState] = useState('off');
  const [draggedComponent, setDraggedComponent] = useState(null);
  
  // Calculate pendulum period: T = 2π√(L/g)
  const pendulumPeriod = 2 * Math.PI * Math.sqrt(pendulumLength / gravity);
  
  // Animation frame for the pendulum
  useEffect(() => {
    if (!simulationActive) return;
    
    let animationFrameId;
    const animate = () => {
      // Force re-render for animation
      setCurrent(prev => {
        const fluctuation = (Math.random() * 0.1) - 0.05;
        return circuitState === 'on' ? prev + fluctuation : 0;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [simulationActive, circuitState]);
  
  const toggleSimulation = () => {
    setSimulationActive(!simulationActive);
  };
  
  const addComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      type,
      x: 50 + Math.random() * 150,
      y: 50 + Math.random() * 150,
    };
    setCircuitComponents([...circuitComponents, newComponent]);
  };
  
  const toggleCircuit = () => {
    // Check if circuit has at least a battery and one component
    const hasBattery = circuitComponents.some(c => c.type === 'battery');
    const hasComponent = circuitComponents.some(c => c.type !== 'battery');
    
    if (hasBattery && hasComponent) {
      setCircuitState(circuitState === 'on' ? 'off' : 'on');
    } else {
      alert('Your circuit needs at least a battery and one component!');
    }
  };
  
  const clearCircuit = () => {
    setCircuitComponents([]);
    setCircuitState('off');
  };
  
  // Calculate current based on Ohm's Law: I = V/R
  useEffect(() => {
    setCurrent(voltage / resistance);
  }, [voltage, resistance]);
  
  const handleDragStart = (e, id) => {
    setDraggedComponent(id);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    if (draggedComponent === null) return;
    
    const component = circuitComponents.find(c => c.id === draggedComponent);
    if (!component) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCircuitComponents(circuitComponents.map(c => 
      c.id === draggedComponent ? {...c, x, y} : c
    ));
    
    setDraggedComponent(null);
  };

  const renderComponentIcon = (type, size = 24) => {
    switch(type) {
      case 'battery': return <Battery size={size} className="text-green-600" />;
      case 'bulb': return <Lightbulb size={size} className="text-yellow-400" />;
      case 'resistor': return <Cpu size={size} className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-6">
        <div className="mr-4">
          <Image 
            src="/physics-logo.svg" 
            alt="Physics Lab Logo" 
            width={60} 
            height={60} 
            className="rounded-full bg-indigo-100 p-2"
          />
        </div>
        <h1 className="text-3xl font-bold">Physics Virtual Lab</h1>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex space-x-4 border-b pb-4">
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'pendulum' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('pendulum')}
          >
            Pendulum Simulation
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${activeTab === 'circuit' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('circuit')}
          >
            Circuit Builder
          </button>
        </div>
      </div>
      
      {activeTab === 'pendulum' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pendulum Simulation</h2>
            
            <div className="bg-slate-100 rounded-lg h-64 mb-4 relative overflow-hidden">
              {/* Simple pendulum visualization */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full flex justify-center">
                <div className="w-0.5 h-[calc(80%*var(--pendulum-length))] bg-gray-800" 
                  style={{ 
                    '--pendulum-length': pendulumLength, 
                    transformOrigin: 'top center',
                    transform: `rotate(${simulationActive ? 
                      `${Math.sin(Date.now() / (pendulumPeriod * 100)) * angle}deg` : 
                      `${angle}deg`})`
                  }}>
                  <div className="w-6 h-6 rounded-full bg-blue-600 absolute -bottom-3 -left-3"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gravity (m/s²): {gravity.toFixed(1)}</label>
                <Slider 
                  value={[gravity]} 
                  min={1} 
                  max={20} 
                  step={0.1} 
                  onValueChange={(value) => setGravity(value[0])} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Pendulum Length (m): {pendulumLength.toFixed(1)}</label>
                <Slider 
                  value={[pendulumLength]} 
                  min={0.1} 
                  max={2} 
                  step={0.1} 
                  onValueChange={(value) => setPendulumLength(value[0])} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Initial Angle (degrees): {angle.toFixed(0)}</label>
                <Slider 
                  value={[angle]} 
                  min={0} 
                  max={60} 
                  step={1} 
                  onValueChange={(value) => setAngle(value[0])} 
                />
              </div>
              
              <button 
                onClick={toggleSimulation}
                className={`w-full py-2 px-4 rounded-md ${simulationActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-medium transition-colors`}
              >
                {simulationActive ? 'Stop Simulation' : 'Start Simulation'}
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Calculations</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="font-medium mb-2">Pendulum Period</h3>
                <p className="mb-2">T = 2π√(L/g)</p>
                <p className="text-lg">T = {pendulumPeriod.toFixed(2)} seconds</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="font-medium mb-2">Frequency</h3>
                <p className="mb-2">f = 1/T</p>
                <p className="text-lg">f = {(1/pendulumPeriod).toFixed(2)} Hz</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="font-medium mb-2">Maximum Velocity</h3>
                <p className="mb-2">v<sub>max</sub> = ω × L × sin(θ<sub>max</sub>)</p>
                <p className="text-lg">v<sub>max</sub> = {(Math.sqrt(gravity/pendulumLength) * pendulumLength * Math.sin(angle * Math.PI / 180)).toFixed(2)} m/s</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Circuit Builder</h2>
              <div className="space-x-2">
                <Button onClick={toggleCircuit} variant={circuitState === 'on' ? 'destructive' : 'default'}>
                  {circuitState === 'on' ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {circuitState === 'on' ? 'Turn Off' : 'Turn On'}
                </Button>
                <Button onClick={clearCircuit} variant="outline">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg h-[400px] bg-gray-50 relative"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* Circuit visualization */}
              {circuitComponents.map(component => (
                <div 
                  key={component.id}
                  className={`absolute cursor-move ${circuitState === 'on' && component.type === 'bulb' ? 'animate-pulse' : ''}`}
                  style={{ 
                    left: `${component.x}px`, 
                    top: `${component.y}px`,
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.id)}
                >
                  <div className="bg-white p-2 rounded-full shadow-md">
                    {renderComponentIcon(component.type)}
                  </div>
                  <p className="text-xs text-center mt-1">{component.type}</p>
                </div>
              ))}
              
              {circuitState === 'on' && circuitComponents.length >= 2 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {circuitComponents.map((component, index) => {
                    // Only draw lines from batteries to other components
                    if (component.type === 'battery') {
                      return circuitComponents
                        .filter(c => c.type !== 'battery')
                        .map(target => (
                          <line 
                            key={`${component.id}-${target.id}`}
                            x1={component.x + 12}
                            y1={component.y + 12}
                            x2={target.x + 12}
                            y2={target.y + 12}
                            stroke={circuitState === 'on' ? "#3b82f6" : "#9ca3af"}
                            strokeWidth="2"
                            strokeDasharray={circuitState === 'on' ? "0" : "5,5"}
                          />
                        ));
                    }
                    return null;
                  })}
                </svg>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Components</h2>
            
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div 
                  className="bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 text-center"
                  onClick={() => addComponent('battery')}
                >
                  <Battery className="mx-auto text-green-600" />
                  <p className="mt-1 text-sm">Battery</p>
                </div>
                <div 
                  className="bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 text-center"
                  onClick={() => addComponent('bulb')}
                >
                  <Lightbulb className="mx-auto text-yellow-400" />
                  <p className="mt-1 text-sm">Light Bulb</p>
                </div>
                <div 
                  className="bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 text-center"
                  onClick={() => addComponent('resistor')}
                >
                  <Cpu className="mx-auto text-blue-500" />
                  <p className="mt-1 text-sm">Resistor</p>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div>
                <h3 className="font-medium mb-2">Circuit Properties</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Voltage (V): {voltage.toFixed(1)}</label>
                    <Slider 
                      value={[voltage]} 
                      min={1} 
                      max={12} 
                      step={0.1} 
                      onValueChange={(value) => setVoltage(value[0])} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Resistance (Ω): {resistance.toFixed(1)}</label>
                    <Slider 
                      value={[resistance]} 
                      min={1} 
                      max={100} 
                      step={1} 
                      onValueChange={(value) => setResistance(value[0])} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-md bg-gray-100">
                <h4 className="font-medium">Ohm's Law: V = I × R</h4>
                <p className="mt-2">Current (I): <span className="font-bold">{current.toFixed(2)} A</span></p>
                <p>Power (P): <span className="font-bold">{(voltage * current).toFixed(2)} W</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Physics Concepts</h2>
        {activeTab === 'pendulum' ? (
          <>
            <p className="mb-4">
              The simple pendulum demonstrates several important physics principles:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Conservation of energy between kinetic and potential energy</li>
              <li>Harmonic motion</li>
              <li>The effect of gravity on period</li>
              <li>How pendulum length affects oscillation</li>
            </ul>
          </>
        ) : (
          <>
            <p className="mb-4">
              The circuit builder demonstrates these electrical principles:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Ohm's Law:</strong> V = I × R, the relationship between voltage, current, and resistance</li>
              <li><strong>Series and Parallel Circuits:</strong> How components connected affect current flow</li>
              <li><strong>Power Consumption:</strong> P = V × I, how electrical energy is converted to other forms</li>
              <li><strong>Conductors and Insulators:</strong> How materials affect electrical current</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PhysicsVirtualLab; 