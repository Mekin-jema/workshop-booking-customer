"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/app/store";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const { token, user } = useSelector((state: RootState) => state.auth);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (!token || !user || user?.role !== "CUSTOMER") {
                router.push("/login");
            } else {
                setChecked(true);
            }
        };

        checkAuth();
    }, [token, user, router]);

    if (!checked) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader className="animate-spin" size={32} />
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
