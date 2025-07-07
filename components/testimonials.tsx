import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Frontend Developer",
        content: "The JavaScript workshop completely transformed how I approach problems. The hands-on exercises were incredibly valuable!",
        avatar: "/avatars/sarah.jpg"
    },
    {
        name: "Michael Chen",
        role: "UX Designer",
        content: "I've attended three workshops so far and each one has delivered exceptional value. The instructors are top-notch.",
        avatar: "/avatars/michael.jpg"
    },
    {
        name: "Emma Rodriguez",
        role: "Product Manager",
        content: "The collaborative environment and practical focus made this the most effective learning experience I've had.",
        avatar: "/avatars/emma.jpg"
    }
];

export default function Testimonials() {
    return (
        <section className="py-16 container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our Learners Say</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Don't just take our word for it - hear from our community
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                                <Avatar className="mr-3">
                                    <AvatarImage src={testimonial.avatar} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-medium">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="italic">"{testimonial.content}"</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}