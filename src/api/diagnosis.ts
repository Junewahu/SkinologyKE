// TODO: Connect to Flask API for AI diagnosis
export async function diagnoseSkin(imageFile: File, symptoms: string[]) {
  // Call Flask API endpoint
  // Example: fetch('/api/diagnose', ...)
  return { diagnosis: "Acne", confidence: 0.92, routine: ["Cleanser", "Sunscreen"] };
}
