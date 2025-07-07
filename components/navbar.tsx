"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Workshops", href: "/#featured" },
    { name: "How It Works", href: "/#how-it-works" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-md font-medium transition-colors relative group ${isActive
                                    ? "text-foreground"
                                    : "text-foreground/80 hover:text-foreground"
                                    }`}
                            >
                                {item.name}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                ></span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Side - Login/Signup */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px]">
                        <div className="flex flex-col h-full">
                            <div className="flex-1 pt-8 space-y-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block text-base font-medium hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="pb-8 space-y-4">
                                <Button asChild className="w-full">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        Login
                                    </Link>
                                </Button>
                                <Button asChild className="w-full" variant="outline">
                                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                                        Sign Up
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
