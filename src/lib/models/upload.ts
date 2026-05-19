export type UploadDocument = {
  _id?: string;
  userId?: string;
  orderId?: string;
  secureUrl: string;
  publicId: string;
  originalFilename?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
};
