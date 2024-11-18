/**
 * Fetch all activities from the backend API.
 * @returns {Promise<Object|Array>} - all activities as an array
 */
export const fetchAllActivities = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activities`
    );
    if (response.status === 404) {
      return { error: "Acticity not found (404)", status: 404 };
    }

    if (!response.ok) {
      return {
        error: `Failed to fetch an activity (status: ${response.status})`,
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return { error: "Failed to fetch an activity", details: error.message };
  }
};

/**
 * Fetch a specific activity from the backend API by an id.
 * @param {number} callId - id of an activity
 * @returns {Promise<Object>} - activity as an object
 */
export const fetchActivity = async (callId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activities/${callId}`
    );
    // a given id activity doesn't exist, return 404 status.
    if (response.status === 404) {
      return { error: "Acticity not found (404)", status: 404 };
    }

    if (!response.ok) {
      return {
        error: `Failed to fetch an activity (status: ${response.status})`,
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return { error: "Failed to fetch an activity", details: error.message };
  }
};

/**
 * Update a specific activity's archive status.
 * @param {number} callId - id of a activity
 * @param {boolean} isArchived - current archived status of a call
 * @returns {Promise<Object>} - Returns a success message or an error message.
 */
export const updateArchiveStatus = async (callId, isArchived) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activities/${callId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_archived: !isArchived }),
      }
    );

    if (!response.ok) {
      return {
        error: `Failed to update an archived status (status: ${response.status})`,
      };
    }

    return {
      success: true,
      message: "Update an activity archived status successfully.",
    };
  } catch (error) {
    return {
      error: "Failed to update an archived status.",
      details: error.message,
    };
  }
};

/**
 * Reset activities.
 * @returns {Promise<Object>} - Returns a success message or an error message.
 */
export const resetActivities = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reset`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      return {
        error: `Failed to reset all activities (status: ${response.status})`,
      };
    }

    return {
      success: true,
      message: "All activities unarchived successfully.",
    };
  } catch (error) {
    return { error: "Failed to reset all activities.", details: error.message };
  }
};

/**
 * Archives all activities by setting is_archived to true for each activity.
 * @returns {Promise<Object>} - Returns a success message or an error message.
 */
export const archiveAllActivities = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/activities`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }
    const activities = await response.json();

    const archivePromises = activities
      .filter((activity) => !activity.is_archived)
      .map((activity) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/activities/${activity.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_archived: true }),
          }
        )
      );

    const results = await Promise.all(archivePromises);

    const failedUpdates = results.filter((res) => !res.ok);
    if (failedUpdates.length > 0) {
      throw new Error(`Failed to archive ${failedUpdates.length} activities.`);
    }

    return { success: true, message: "All activities archived successfully." };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
