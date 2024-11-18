"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Ellipsis } from "lucide-react";
import { fetchAllActivities } from "@/lib/activitiesAPIrequest";
import { formatDate } from "@/lib/formatFunctions";
import ActivityCard from "@/components/ActivityCard";
import ArchiveAllBtn from "@/components/ui/ArchiveAllBtn";
import ToggleBtn from "@/components/ui/ToggleBtn";

const Activities = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayArchived, setDisplayArchived] = useState(false);
  const [activities, setActivities] = useState(null);
  const handleDisplayArchived = (event, value) => {
    setDisplayArchived(value);
  };
  let previousDate = null;
  useEffect(() => {
    const getAllActivities = async () => {
      setIsLoading(true);
      const result = await fetchAllActivities();
      if (result.error) {
        console.log(result.error);
      } else {
        setActivities(result);
      }
      setIsLoading(false);
    };
    getAllActivities();
  }, []);

  return (
    <div className="p-5 h-[500px]">
      <div>
        <div className="absolute right-6 ">
          <ArchiveAllBtn
            setActivities={setActivities}
            archive={!displayArchived}
          />
        </div>
        <ToggleBtn
          displayArchived={displayArchived}
          handleDisplayArchived={handleDisplayArchived}
        />
      </div>

      <div className="flex-1 h-[98%] overflow-y-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-5/6">
            <Ellipsis className="h-20 w-20 animate-spin text-gray-500" />
          </div>
        )}
        {!isLoading &&
          (activities ? (
            activities
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .filter((activity) => activity.is_archived === displayArchived)
              .map((activity) => {
                const currentDate = formatDate(activity.created_at);
                const isNewDate = currentDate !== previousDate;
                previousDate = currentDate;

                return (
                  <div key={activity.id}>
                    {isNewDate && (
                      <div className="px-4 py-2 text-xs text-muted-foreground">
                        {currentDate}
                      </div>
                    )}
                    <ActivityCard activity={activity} />
                  </div>
                );
              })
          ) : (
            <div className="flex justify-center mt-12 text-lg">
              Data is not founded.
            </div>
          ))}
      </div>
    </div>
  );
};

export default Activities;
