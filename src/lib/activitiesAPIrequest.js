/**
 * Fetch a specific activity by an id.
 * @param {number} callId - id of a activity
 * @returns activity as an object
 */
export const fetchActivity = async callId => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/activities/${callId}`);
    // a given id activity doesn't exist, return 404 status.
    if (response.status === 404) {
      return { error: 'Acticity not found (404)', status: 404 };
    }

    if (!response.ok) {
      return {
        error: `Failed to fetch an activity (status: ${response.status})`,
      };
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return { error: 'Failed to fetch an activity', details: error.message };
  }
};
