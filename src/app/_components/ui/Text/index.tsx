import React from 'react';

const Text = ({ text, classNames }: { text: string; classNames: string }) => {
  return <p className={`text-sm sm:text-base lg:text-lg xl:text-xl ${classNames}`}>{text}</p>;
};

export default Text;
