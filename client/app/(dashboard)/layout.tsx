import Box from "@/components/ui/Box";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <main>{children}</main>
    </Box>
  );
}
