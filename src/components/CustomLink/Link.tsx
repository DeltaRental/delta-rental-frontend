import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  to: any;
  children: any;
  className?: string;
  state?: any;
  onClick?: (tabName: string) => void;
};

const Link = (props: Props) => {
  const navigate = useNavigate();

  const handleClicked = () => {
    const bars = document.getElementById("bars");
    bars?.classList.remove("show", "hide");
    bars?.classList.add("show");

    setTimeout(() => {
      bars?.classList.remove("show");
      bars?.classList.add("hide");
      navigate(props.to, { state: props.state });
    }, 800);
  };

  return (
    <div>
      <a
        onClick={handleClicked}
        className={`${props.className} cursor-pointer`}
      >
        {props.children}
      </a>
    </div>
  );
};

export default Link;
