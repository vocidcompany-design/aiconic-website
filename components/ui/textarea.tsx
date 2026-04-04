import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full border border-[rgba(200,200,200,0.15)] bg-transparent px-3 py-2 text-sm text-[#F5F0E8] placeholder:text-[#3a3a3a] focus-visible:outline-none focus-visible:border-[rgba(200,200,200,0.4)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300 resize-none rounded-none ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
