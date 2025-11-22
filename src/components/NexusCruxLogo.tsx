interface NexusCruxLogoProps {
  variant?: 'primary' | 'compact' | 'horizontal' | 'inverse' | 'monochrome';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function NexusCruxLogo({ 
  variant = 'primary', 
  size = 'md',
  animated = false,
  className = '' 
}: NexusCruxLogoProps) {
  const sizeMap = {
    sm: 32,
    md: 36,
    lg: 48
  };
  
  const dimension = sizeMap[size];
  
  // Color schemes for different variants
  const colorSchemes = {
    primary: { line: '#2AD1C8', lineOpacity: 0.6, core: '#2AD1C8', nodes: '#A6F750' },
    compact: { line: '#2AD1C8', lineOpacity: 0.6, core: '#2AD1C8', nodes: '#A6F750' },
    horizontal: { line: '#2AD1C8', lineOpacity: 0.6, core: '#2AD1C8', nodes: '#A6F750' },
    inverse: { line: '#2AD1C8', lineOpacity: 1, core: '#2AD1C8', nodes: '#A6F750' },
    monochrome: { line: '#0A1A2F', lineOpacity: 0.6, core: '#0A1A2F', nodes: '#0A1A2F' }
  };
  
  const colors = colorSchemes[variant];

  return (
    <svg 
      width={dimension} 
      height={dimension} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? 'animate-fade-in' : ''}`}
      style={{ display: 'block' }}
    >
      {/* Connection lines (Nexus) */}
      <line x1="50" y1="50" x2="50" y2="10" stroke={colors.line} strokeWidth="2" opacity={colors.lineOpacity}/>
      <line x1="50" y1="50" x2="84.64" y2="25" stroke={colors.line} strokeWidth="2" opacity={colors.lineOpacity}/>
      <line x1="50" y1="50" x2="84.64" y2="75" stroke={colors.line} strokeWidth="2" opacity={colors.lineOpacity}/>
      <line x1="50" y1="50" x2="50" y2="90" stroke={colors.line} strokeWidth="2" opacity={colors.lineOpacity}/>
      <line x1="50" y1="50" x2="15.36" y2="75" stroke={colors.line} strokeWidth="2" opacity={colors.lineOpacity}/>
      <line x1="50" y1="50" x2="15.36" y2="25" stroke={colors.line} strokeWidth="2" opacity={colors.lineOpacity}/>
      
      {/* Core node (Crux) */}
      <circle cx="50" cy="50" r="18" fill={colors.core}/>
      
      {/* Orbiting nodes (Brands/Contractors) - 6 nodes */}
      <circle cx="50" cy="10" r="9" fill={colors.nodes}/>
      <circle cx="84.64" cy="25" r="9" fill={colors.nodes}/>
      <circle cx="84.64" cy="75" r="9" fill={colors.nodes}/>
      <circle cx="50" cy="90" r="9" fill={colors.nodes}/>
      <circle cx="15.36" cy="75" r="9" fill={colors.nodes}/>
      <circle cx="15.36" cy="25" r="9" fill={colors.nodes}/>
    </svg>
  );
}