"use client";

import { MapPin, Clock, Instagram, Navigation, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import TribalDoodles from "@/components/illustrations/tribal-doodles";
import { businessInfo } from "@/data/menu-data";

function getTodayDay(): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
}

export default function Location() {
  const today = getTodayDay();

  return (
    <section id="location" className="relative py-20 sm:py-28 bg-brew-warm-white">
      <TribalDoodles variant="location" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <BlurFade>
          <div className="text-center mb-12">
            <p className="font-accent text-lg text-brew-orange mb-2">
              we&apos;re right here
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brew-green-dark">
              Come Say Hi
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <BlurFade delay={0.2}>
            <div className="rounded-xl overflow-hidden border border-brew-border shadow-sm h-[300px] sm:h-[400px] lg:h-full min-h-[300px]">
              <iframe
                src={businessInfo.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nations Coffee location on Google Maps"
              />
            </div>
          </BlurFade>

          {/* Info card */}
          <BlurFade delay={0.4}>
            <Card className="border-brew-border bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Address — New Garden */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-brew-green/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-brew-green" />
                  </div>
                  <div>
                    <h3 className="font-subheading font-semibold text-brew-text mb-0.5">
                      New Garden (Primary)
                    </h3>
                    <p className="text-brew-text-muted text-sm">{businessInfo.address}</p>
                  </div>
                </div>

                {/* Address — Siromtoli */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-brew-green/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-brew-green" />
                  </div>
                  <div>
                    <h3 className="font-subheading font-semibold text-brew-text mb-0.5">
                      Siromtoli (Original)
                    </h3>
                    <p className="text-brew-text-muted text-sm">{businessInfo.secondaryAddress}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-brew-orange/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-brew-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-subheading font-semibold text-brew-text mb-2">
                      Hours
                    </h3>
                    <div className="space-y-1">
                      {businessInfo.weeklyHours.map(({ day, hours }) => (
                        <div
                          key={day}
                          className={`flex items-center justify-between text-sm py-0.5 px-2 rounded ${
                            day === today
                              ? "bg-brew-green/10 text-brew-green-dark font-semibold"
                              : "text-brew-text-muted"
                          }`}
                        >
                          <span>{day}</span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-brew-text-muted text-xs mt-2 italic">
                      {businessInfo.hoursNote}
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-subheading font-semibold text-brew-text mb-3">
                    Service Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {businessInfo.services.map((service) => (
                      <div key={service} className="flex items-center gap-2 text-sm text-brew-text-muted">
                        <Check className="h-3.5 w-3.5 text-brew-green shrink-0" />
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Good for */}
                <div>
                  <h3 className="font-subheading font-semibold text-brew-text mb-2">
                    Good For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {businessInfo.goodFor.map((item) => (
                      <Badge key={item} variant="outline" className="border-brew-border text-brew-text-muted">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={businessInfo.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-brew-green hover:bg-brew-green-dark text-white rounded-full">
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </a>
                  <a
                    href={businessInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-brew-green text-brew-green hover:bg-brew-green hover:text-white rounded-full"
                    >
                      <Instagram className="mr-2 h-4 w-4" />
                      {businessInfo.instagramHandle}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
