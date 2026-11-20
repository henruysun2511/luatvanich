import type { Data } from "@measured/puck";

export interface PageDocument {
  id: string;
  slug: string;
  titleVi: string;
  titleZh?: string;
  contentJson: Data;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
}
