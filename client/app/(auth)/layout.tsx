import Box from "@/components/ui/Box";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="flex items-center justify-center min-h-screen">
      <main>{children}</main>
    </Box>
  );
}
