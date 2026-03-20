"use client";

import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import Marquee from "@/components/magicui/marquee";
import TribalDoodles from "@/components/illustrations/tribal-doodles";
import { reviews, businessInfo } from "@/data/menu-data";

function ReviewCard({
  name,
  stars,
  quote,
  isLocalGuide,
}: {
  name: string;
  stars: number;
  quote: string;
  isLocalGuide?: boolean;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="w-[280px] sm:w-[320px] shrink-0 border-brew-border bg-white">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 bg-brew-green text-white">
            <AvatarFallback className="bg-brew-green text-white text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-brew-text text-sm">{name}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < stars ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
              {isLocalGuide && (
                <Badge variant="outline" className="ml-1 text-[9px] px-1 py-0 border-blue-200 text-blue-500">
                  Local Guide
                </Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-brew-text-muted text-sm leading-relaxed italic">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-center gap-1 mt-3">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="text-[10px] text-brew-text-muted">Google Review</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 bg-brew-cream overflow-hidden">
      <TribalDoodles variant="testimonials" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <BlurFade>
          <div className="text-center">
            <p className="font-accent text-lg text-brew-orange mb-2">
              don&apos;t just take our word for it
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brew-green-dark mb-6">
              Straight from Google
            </h2>

            {/* Overall rating */}
            <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-white rounded-full px-5 py-2.5 border border-brew-border shadow-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
                <Star className="h-4 w-4 fill-amber-400/50 text-amber-400" />
              </div>
              <span className="text-sm font-semibold text-brew-text">4.5★ on Google</span>
              <span className="text-sm text-brew-text-muted">• 163 reviews • Loved by Ranchi</span>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Review marquee */}
      <Marquee speed={40}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>

      {/* Google Maps link */}
      <BlurFade delay={0.3}>
        <div className="text-center mt-8">
          <a
            href={businessInfo.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brew-green hover:text-brew-green-dark transition-colors"
          >
            <MapPin className="h-4 w-4" />
            See all reviews on Google Maps
          </a>
        </div>
      </BlurFade>
    </section>
  );
}
