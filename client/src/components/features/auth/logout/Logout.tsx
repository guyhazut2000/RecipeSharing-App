import React from "react";

type Props = {
  onLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Logout = ({ onLogout }: Props) => {
  return <button onClick={onLogout}>Logout</button>;
};

export default Logout;
