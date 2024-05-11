import Link from "next/link";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import {ButtonProps} from "@/types/Buttons";

const buttonVariants = cva(
    "rounded-lg transition-colors duration-300 flex justify-center",
    {
        variants: {
            color: {
                main: "bg-indigo-500 text-white hover:bg-indigo-800",
                primary: "bg-black text-white hover:bg-gray-800",
                secondary: "bg-white text-black hover:bg-gray-300",
                danger: "bg-rose-500 text-white hover:bg-rose-600",
            },
            size: {
                default: "py-3 px-6",
                full: "py-3 w-full",
            },
        },
        defaultVariants: {
            color: "primary",
            size: "default",
        },
    }
);

const LinkButton = ({ href, placeholder, color = 'primary', size = 'default' }: ButtonProps) => {
    return (
        <Link href={href} className={clsx(buttonVariants({ color, size }))}>
            {placeholder}
        </Link>
    );
};

export default LinkButton;
