"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import Image from "next/image";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Tracking", href: "/tracking" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image className="dark:bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                            src={"/logo.svg"}
                            alt="Booking App Logo"
                            width={40}
                            height={40}
                        />
                        {/* <span className="text-lg font-semibold">AmbaLay</span> */}
                    </Link>
                </div>

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

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors">
                            <Phone className="h-4 w-4" />
                            <span>+251 11 123 4567</span>
                        </div>
                        <Button
                            variant="outline"
                            asChild
                            className="border-primary text-primary hover:bg-primary/5"
                        >
                            <Link href="/contact">Get Quote</Link>
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
                                    {navigation.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`block text-base font-medium transition-colors ${isActive ? "text-primary" : "hover:text-primary"
                                                    }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                                {isActive && (
                                                    <span className="ml-2 inline-block h-1 w-1 rounded-full bg-primary" />
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className="pb-8 space-y-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <span>+251 11 123 4567</span>
                                    </div>
                                    <Button asChild className="w-full">
                                        <Link href="/contact" onClick={() => setIsOpen(false)}>
                                            Get Quote
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}