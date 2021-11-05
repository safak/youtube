const Circle = ({ top, left, bottom, right, backgroundColor }) => {
  return (
    <div
      style={{ top, left, bottom, right, backgroundColor }}
      className="circle"
    />
  );
};

export default Circle;
