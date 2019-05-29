import { useState, useEffect } from 'react';

function useWindowHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return height;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
}

export default function useAvailableHeight(containerElement: any) {
  const [availableHeight, setAvailableHeight] = useState(0);
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();

  useEffect(() => {
    const container = containerElement.current;
    const offsetTop = container ? container.offsetTop : 0;
    setAvailableHeight(windowHeight - offsetTop);
  }, [containerElement, windowHeight, windowWidth]);

  return availableHeight;
}
