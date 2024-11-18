"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Archive,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Voicemail,
  Ellipsis,
} from "lucide-react";
import { format } from "date-fns";
import { fetchActivity, updateArchiveStatus } from "@/lib/activitiesAPIrequest";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Datail({ params }) {
  const { toast } = useToast();
  const callID = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const getActivity = async () => {
      if (callID) {
        setIsLoading(true);
        const result = await fetchActivity(callID);
        if (result.error) {
          console.log(result.error);
        } else {
          setActivity(result);
        }
        setIsLoading(false);
      }
    };
    getActivity();
  }, [callID]);

  const handleArchive = async () => {
    const isArchived = activity.is_archived;
    try {
      await updateArchiveStatus(callID, isArchived);
      toast({
        title: "Success",
        description: `Successfully ${isArchived ? "unarchived" : "archived"}!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${
          isArchived ? "unarchive" : "archive"
        }. Please try again.`,
      });
    } finally {
      setActivity((prev) => ({ ...prev, is_archived: !isArchived }));
    }
  };

  return (
    <div className="flex flex-col h-[98%]">
      <nav className="flex items-center px-4 h-14">
        <Link href="/activity" variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </nav>

      {isLoading && (
        <div className="flex items-center justify-center h-1/2">
          <Ellipsis className="h-20 w-20 animate-spin text-gray-500" />
        </div>
      )}
      
      {!isLoading &&
        (activity ? (
          <main className="flex-1 px-10">
            <div className="max-w-md mx-auto space-y-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full">
                {activity.direction === "inbound" ? (
                  activity.call_type === "answered" ? (
                    <PhoneIncoming className="w-8 h-8" />
                  ) : activity.call_type === "missed" ? (
                    <PhoneMissed className="w-8 h-8 text-red-500" />
                  ) : (
                    <Voicemail className="w-8 h-8 text-yellow-500" />
                  )
                ) : (
                  <PhoneOutgoing className="w-8 h-8" />
                )}
              </div>

              <h2 className="text-center text-lg font-bold">
                {activity.direction === "inbound" ? "Inbound" : "Outbound"}{" "}
                {activity.call_type} call
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>
                    {format(new Date(activity.created_at), "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{format(new Date(activity.created_at), "h:mm a")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{activity.duration} seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span>{activity.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From</span>
                  <span>{activity.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Via</span>
                  <span>{activity.via}</span>
                </div>
              </div>

              <Button
                onClick={handleArchive}
                className={
                  activity.is_archived
                    ? "bg-red-500 hover:bg-red-400 w-full"
                    : "bg-green-400 hover:bg-green-500 w-full"
                }
              >
                <Archive className="mr-2 h-4 w-4" />
                {activity.is_archived ? "Unarchive" : "Archive"}
              </Button>
            </div>
          </main>
        ) : (
          <div className="flex justify-center mt-12 text-lg">
            Data is not founded.
          </div>
        ))}
    </div>
  );
}
