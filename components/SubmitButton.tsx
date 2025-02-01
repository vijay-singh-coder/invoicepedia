"use client";



import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    text?: string;
    className?: string
}

export default function SubmitButton({ variant, text, className }: ButtonProps) {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending} variant={variant} type="submit" className={cn("font-semibold flex items-center justify-center", className)}>
            {pending ? <Loader2 className="animate-spin" /> : text}
        </Button>
    )
}
