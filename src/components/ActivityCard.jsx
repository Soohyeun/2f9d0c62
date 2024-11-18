import React from "react";
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail } from "lucide-react";

const ActivityCard = ({ activity }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex items-start gap-4 p-4 m-2 border rounded-lg">
      <div className="mt-1">
        {activity.direction === "inbound" ? (
          activity.call_type === "answered" ? (
            <PhoneIncoming className="w-4 h-4 text-green-500" />
          ) : activity.call_type === "missed" ? (
            <PhoneMissed className="w-4 h-4 text-red-500" />
          ) : (
            <Voicemail className="w-4 h-4 text-yellow-500" />
          )
        ) : (
          <PhoneOutgoing className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {activity.direction === "inbound" ? activity.from : activity.to}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          {activity.direction === "inbound" ? "from" : "to"}{" "}
          {activity.direction === "inbound" ? activity.to : activity.from}
        </div>
      </div>
      <div className="text-sm text-muted-foreground whitespace-nowrap">
        {formatTime(activity.created_at)}
      </div>
    </div>
  );
};

export default ActivityCard;
