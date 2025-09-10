import React, { useRef, useState } from 'react'

const Tilt = ({ children, className = ''}) => {

  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef();

  const handleMouseLeave = () => {
    setTransformStyle('');
  }
  const handleMouseHover = (e) => {
    if(!itemRef.current) return;

    const {left, top, width, height} = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`

    setTransformStyle(newTransform);
  }

  return (
    <div className={className} 
      ref={itemRef} 
      onMouseMove={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      style= {{transform: transformStyle}}
    >
      {children}
    </div>
  )
}

export default Tilt;