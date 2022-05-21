import React from 'react';

interface Props {}

const Banner: React.FC<Props> = () => {
  return (
    <>
      <img className="banner" src="/images/subotica-banner.jpg" alt="banner" />
    </>
  );
};

export default Banner;
