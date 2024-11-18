"use client";

import React from "react";
import { useState, useEffect } from "react";
import ActivityCard from "@/components/ActivityCard";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { fetchAllActivity } from "@/lib/activitiesAPIrequest";

const Activities = () => {
  const [displayArchived, setDisplayArchived] = useState(false);
  const [activities, setActivities] = useState(null);
  const handleDisplayArchived = (event, clicked) => {
    setDisplayArchived(clicked);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toUpperCase();
  };

  useEffect(() => {
    const getAllActivities = async () => {
      const result = await fetchAllActivity();
      if (result.error) {
        console.log(result.error);
      } else {
        setActivities(result);
      }
    };
    getAllActivities();
  }, []);

  return (
    <div>
      <div className="p-5 h-[500px]">
        <div className="flex items-center justify-center mb-3">
          <ToggleButtonGroup
            className="stick"
            value={displayArchived}
            exclusive
            onChange={handleDisplayArchived}
          >
            <ToggleButton className="h-6 w-24 text-xs px-2 py-1" value={false}>
              Activity
            </ToggleButton>
            <ToggleButton className="h-6 w-24 text-xs px-2 py-1" value={true}>
              Archive
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="flex-1 h-[98%] overflow-y-auto">
          {activities ? (
            activities
              .filter((activity) => activity.is_archived === displayArchived)
              .map((activity, index) => (
                <div key={activity.id}>
                  {(index === 0 ||
                    formatDate(activities[index - 1].created_at) !==
                      formatDate(activity.created_at)) && (
                    <div className="px-4 py-2 text-xs text-muted-foreground">
                      {formatDate(activity.created_at)}
                    </div>
                  )}
                  <ActivityCard activity={activity} />
                </div>
              ))
          ) : (
            <div className="flex justify-center mt-12 text-lg">
              Data is not founded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;
