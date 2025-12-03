"use client";

import { MapPin } from "lucide-react";

export function MapSection() {
  // Google Maps embed URL for New Delhi, India
  // Replace with your actual location coordinates or use Google Maps Embed API
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.11264460283!2d77.2065305!3d28.6138952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin";

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
        {/* Map Frame */}
        <div className="relative w-full aspect-[4/3] bg-neutral-800">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Military Matters 24/7 Headquarters Location"
          />
        </div>

        {/* Overlay Info Card */}
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80">
          <div className="bg-neutral-900/95 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-sm mb-1">
                  Military Matters 24/7
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  New Delhi, India
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Defense Headquarters
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-neutral-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Getting Here
        </h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            <span>
              Easily accessible via public transport and major highways
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            <span>Parking available on-site</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-500 mt-1">•</span>
            <span>Wheelchair accessible entrance</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

