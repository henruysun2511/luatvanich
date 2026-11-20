"use client";

import React from "react";
import { Render, type Data } from "@measured/puck";
import { puckConfig } from "../puck.config";

interface PageRendererProps {
  contentData: Data;
}

export function PageRenderer({ contentData }: PageRendererProps) {
  return <Render config={puckConfig} data={contentData} />;
}
