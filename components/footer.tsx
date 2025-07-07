import Link from "next/link"
import { BookOpen, GraduationCap, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

const footerLinks = {
    workshops: [
        { name: "Upcoming Workshops", href: "/workshops" },
        { name: "Popular Topics", href: "/workshops?filter=popular" },
        { name: "Beginner Courses", href: "/workshops?filter=beginner" },
        { name: "Advanced Programs", href: "/workshops?filter=advanced" },
    ],
    company: [
        { name: "About Our Instructors", href: "/instructors" },
        { name: "Pricing Plans", href: "/pricing" },
        { name: "Contact Us", href: "/contact" },
        { name: "Teaching Opportunities", href: "/teach" },
    ],
    support: [
        { name: "My Bookings", href: "/dashboard" },
        { name: "FAQs", href: "/faq" },
        { name: "Cancellation Policy", href: "/cancellation" },
        { name: "Privacy Policy", href: "/privacy" },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="container px-4 py-12 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/logo.svg"
                                alt="SkillCraft Logo"
                                width={40}
                                height={40}
                            />
                            <span className="sr-only">SkillCraft Workshops</span>
                        </Link>
                        <p className="text-muted-foreground">
                            Transforming learning through interactive, expert-led workshops and hands-on experiences.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>learn@skillcraft.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>Innovation District, Addis Ababa</span>
                            </div>
                        </div>
                    </div>

                    {/* Workshops */}
                    <div>
                        <h3 className="font-semibold mb-4">Workshops</h3>
                        <ul className="space-y-2">
                            {footerLinks.workshops.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
                    <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} SkillCraft Workshops. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}