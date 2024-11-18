"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Archive,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Voicemail,
} from "lucide-react";
import { format } from "date-fns";
import { fetchActivity, updateArchiveStatus } from "@/lib/activitiesAPIrequest";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function Datail({ params }) {
  const { toast } = useToast();
  const callID = params.id;
  const [call, setCall] = useState(null);

  useEffect(() => {
    const getActivity = async () => {
      if (callID) {
        const result = await fetchActivity(callID);
        if (result.error) {
          console.log(result.error);
        } else {
          setCall(result);
        }
      }
    };
    getActivity();
  }, [callID]);

  const handleArchive = async () => {
    const isArchived = call.is_archived;
    try {
      console.log(await updateArchiveStatus(callID, isArchived));
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
      setCall((prevCall) => ({ ...prevCall, is_archived: !isArchived }));
    }
  };

  return (
    <div className="flex flex-col">
      <nav className="flex items-center px-4 h-14">
        <Link href="/activity" variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </nav>
      {call && (
        <main className="flex-1 px-10">
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-primary/10 rounded-full">
              {call.direction === "inbound" ? (
                call.call_type === "answered" ? (
                  <PhoneIncoming className="w-8 h-8" />
                ) : call.call_type === "missed" ? (
                  <PhoneMissed className="w-8 h-8 text-red-500" />
                ) : (
                  <Voicemail className="w-8 h-8 text-yellow-500" />
                )
              ) : (
                <PhoneOutgoing className="w-8 h-8" />
              )}
            </div>

            <h2 className="text-center text-lg font-bold">
              {call.direction === "inbound" ? "Inbound" : "Outbound"}{" "}
              {call.call_type} call
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{format(new Date(call.created_at), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span>{format(new Date(call.created_at), "h:mm a")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{call.duration} seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span>{call.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">From</span>
                <span>{call.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Via</span>
                <span>{call.via}</span>
              </div>
            </div>

            <Button
              onClick={handleArchive}
              className="bg-green-500 hover:bg-green-600 w-full"
            >
              <Archive className="mr-2 h-4 w-4" />
              {call.is_archived ? "Unarchive" : "Archive"}
            </Button>
          </div>
        </main>
      )}
    </div>
  );
}
