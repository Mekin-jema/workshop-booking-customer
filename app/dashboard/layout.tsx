import ProtectedRoute from "@/components/protectedRote";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <ProtectedRoute>

                {children}
            </ProtectedRoute>

        </div>
    );
}
