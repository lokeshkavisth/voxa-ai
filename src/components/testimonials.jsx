import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    quote:
      "This platform revolutionized my job search. The AI-powered resume builder and interview prep were game-changers!",
    author: "Jane Doe",
    title: "Software Engineer",
    avatar: "/user.png",
  },
  {
    quote:
      "I never knew how much industry insights could help me. Now I feel confident knowing exactly what skills to focus on!",
    author: "John Smith",
    title: "Product Manager",
    avatar: "/user.png",
  },
  {
    quote:
      "The AI-driven tools helped me stand out in my job applications. I landed my dream role thanks to this platform!",
    author: "Emily Johnson",
    title: "Marketing Specialist",
    avatar: "/user.png",
  },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto py-24 md:py-32">
      <h2 className="text-center font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-16">
        What Others Say
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className=" rounded-lg p-6 backdrop-blur-sm">
            <blockquote className="mb-4">"{testimonial.quote}"</blockquote>
            <div className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>

              <div>
                <cite className="font-semibold">{testimonial.author}</cite>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
