import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'core' | 'orbit';
}

export function NetworkNodes() {
  const [nodes] = useState<Node[]>([
    // Core node (Crux)
    { id: 0, x: 50, y: 50, size: 16, type: 'core' },
    // Orbiting nodes (Tenant brands/contractors)
    { id: 1, x: 20, y: 25, size: 8, type: 'orbit' },
    { id: 2, x: 75, y: 20, size: 8, type: 'orbit' },
    { id: 3, x: 85, y: 55, size: 8, type: 'orbit' },
    { id: 4, x: 70, y: 80, size: 8, type: 'orbit' },
    { id: 5, x: 25, y: 75, size: 8, type: 'orbit' },
    { id: 6, x: 15, y: 55, size: 8, type: 'orbit' },
  ]);

  const coreNode = nodes.find(n => n.type === 'core');
  const orbitNodes = nodes.filter(n => n.type === 'orbit');

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Define gradients */}
        <defs>
          <linearGradient id="teal-lime" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#2AD1C8', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#A6F750', stopOpacity: 1 }} />
          </linearGradient>
          
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#2AD1C8', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#A6F750', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#A6F750', stopOpacity: 0 }} />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection arcs from core to orbiting nodes */}
        {coreNode && orbitNodes.map((node, i) => {
          const dx = node.x - coreNode.x;
          const dy = node.y - coreNode.y;
          const angle = Math.atan2(dy, dx);
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Create curved arc using quadratic bezier
          const controlDistance = distance * 0.3;
          const perpAngle = angle + Math.PI / 2;
          const controlX = (coreNode.x + node.x) / 2 + Math.cos(perpAngle) * controlDistance;
          const controlY = (coreNode.y + node.y) / 2 + Math.sin(perpAngle) * controlDistance;
          
          return (
            <motion.path
              key={`arc-${node.id}`}
              d={`M ${coreNode.x} ${coreNode.y} Q ${controlX} ${controlY} ${node.x} ${node.y}`}
              stroke="url(#teal-lime)"
              strokeWidth="0.3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                pathLength: { duration: 2, delay: i * 0.2, ease: "easeInOut" },
                opacity: { 
                  duration: 3, 
                  delay: i * 0.2, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  ease: "easeInOut"
                }
              }}
            />
          );
        })}

        {/* Core node with pulsing glow */}
        {coreNode && (
          <g>
            <motion.circle
              cx={coreNode.x}
              cy={coreNode.y}
              r={coreNode.size * 1.5}
              fill="url(#core-glow)"
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={coreNode.x}
              cy={coreNode.y}
              r={coreNode.size}
              fill="url(#teal-lime)"
              filter="url(#glow)"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Inner core ring */}
            <motion.circle
              cx={coreNode.x}
              cy={coreNode.y}
              r={coreNode.size * 0.6}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ 
                scale: [0.8, 1, 0.8],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </g>
        )}

        {/* Orbiting nodes */}
        {orbitNodes.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size * 1.2}
              fill="#A6F750"
              opacity={0.2}
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill="url(#teal-lime)"
              initial={{ scale: 0 }}
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Inner dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size * 0.3}
              fill="#FFFFFF"
              opacity={0.8}
            />
          </g>
        ))}

        {/* Orbital rings around core */}
        {[1, 1.5, 2].map((multiplier, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={coreNode?.x}
            cy={coreNode?.y}
            r={(coreNode?.size || 0) * multiplier * 3}
            fill="none"
            stroke="url(#teal-lime)"
            strokeWidth="0.2"
            strokeDasharray="2 4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [0.8, 1, 1.2],
              rotate: 360
            }}
            transition={{
              duration: 8 + i * 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
}
