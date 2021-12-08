import React from "react";
import "./menulink.css";

export default function MenuLink({ icon, text }) {
  return (
    <div className="menulink">
      {icon}
      <span className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">
        {text === "Logout" && "( John )"}
      </span>
    </div>
  );
}
