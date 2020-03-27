import React, { useState, useEffect } from "react";
import { Pack } from "@potion/layout";
import { Svg, Circle, Rect, Line, LineRadial, Area, AreaRadial, Ribbon } from "@potion/element";
import { Lines } from 'react-svg-textures';

const Texture = () => (
  <svg width={200} height={200}>
    <Line
      id='pattern'
      strokeWidth={10}
      stroke='purple'
      size={10}
      orientation='diagonal'
      background='blue'
    />
    <circle cx={100} cy={100} r={5} fill='url(#pattern)' />
  </svg>
);


const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Rect
                      key={key}
                      x={x}
                      y={y}
                      height={r * 2}
                      width={r * 1.3}
                      fill={colors[i].code.hex}
                    />
                    
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
