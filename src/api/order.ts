// TODO: Add backend logic for order storage, status, and notifications
export async function createOrder(order: any) {
  // Call Firestore or backend API
  return { status: "pending", ...order };
}
