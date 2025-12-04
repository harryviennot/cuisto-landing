interface PhoneMockupProps {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export default function PhoneMockup({
  children,
  className = "",
  placeholder = "App Screenshot",
}: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone frame */}
      <div className="relative mx-auto w-[280px] h-[580px] bg-brown-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Inner bezel */}
        <div className="relative w-full h-full bg-brown-800 rounded-[2.5rem] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-brown-900 rounded-b-2xl z-10" />

          {/* Screen content */}
          <div className="w-full h-full bg-surface rounded-[2.5rem] overflow-hidden">
            {children || (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-forest-50 to-surface">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-text-muted text-sm">{placeholder}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
