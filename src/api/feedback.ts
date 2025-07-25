// TODO: Store feedback in Firestore or email
export async function submitFeedback(feedback: string) {
  // Store feedback
  return { status: "received", feedback };
}
