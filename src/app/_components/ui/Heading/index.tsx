import React from 'react';

const Heading = ({ text, classes }: { text: string; classes?: string }) => {
  return <p className={`text-2xl font-medium ${classes}`}>{text}</p>;
};

export default Heading;
