import React from "react";
import { Bell, User, Grip, Settings, Voicemail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 w-full rounded-[3px] bg-background border-t p-2">
      <div className="flex items-center justify-between px-4">
        <button variant="ghost" size="icon" className="h-10 w-10 flex items-center justify-center">
          <Bell className="h-5 w-5" color="green"/>
        </button>

        <button variant="ghost" size="icon" className="h-10 w-10 flex items-center justify-center">
          <User className="h-5 w-5" />
        </button>

        <button
          size="icon"
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
        >
          <Grip className="h-6 w-6 text-white" />
        </button>

        <button variant="ghost" size="icon" className="h-10 w-10 flex items-center justify-center">
          <Settings className="h-5 w-5" />
        </button>

        <button variant="ghost" size="icon" className="h-10 w-10 flex items-center justify-center">
          <Voicemail className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
