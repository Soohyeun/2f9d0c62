import { resetActivities, archiveAllActivities, fetchAllActivities } from "@/lib/activitiesAPIrequest";
import { Archive, ArchiveX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArchiveAllBtn = ({ setActivities, archive }) => {
  const { toast } = useToast();

  const handleArchiveAll = async () => {
    try {
      await archiveAllActivities();
      toast({
        title: "Success",
        description: `Successfully archived all!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to archive. Please try again.`,
      });
    } finally {
      const updatedActivities = await fetchAllActivities();
      setActivities(updatedActivities);
    }
  };

  const handleUnarchiveAll = async () => {
    try {
      await resetActivities();
      toast({
        title: "Success",
        description: `Successfully unarchived all!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to unarchive. Please try again.`,
      });
    } finally {
      const updatedActivities = await fetchAllActivities();
      setActivities(updatedActivities);
    }
  };

  return (
    <button
      onClick={archive ? handleArchiveAll : handleUnarchiveAll}
      size="icon"
      className={archive ? "h-10 w-10 rounded-full bg-slate-500 hover:bg-slate-400 flex items-center justify-center" : "h-10 w-10 rounded-full bg-red-500 hover:bg-red-400 flex items-center justify-center"}
    >
      {archive ? <Archive className="h-6 w-6 text-white" /> : <ArchiveX className="h-6 w-6 text-white" />}
    </button>
  );
};

export default ArchiveAllBtn;
