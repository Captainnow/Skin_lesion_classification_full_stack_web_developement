import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={twMerge(clsx(
                'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                {
                    'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
                    'bg-white text-slate-850 border border-slate-200 hover:bg-slate-50': variant === 'secondary',
                    'border border-primary-600 text-primary-600 hover:bg-primary-50': variant === 'outline',
                    'text-slate-600 hover:text-slate-900 hover:bg-slate-100': variant === 'ghost',
                    'px-3 py-1.5 text-sm': size === 'sm',
                    'px-4 py-2 text-base': size === 'md',
                    'px-6 py-3 text-lg': size === 'lg',
                },
                className
            ))}
            {...props}
        />
    );
});

Button.displayName = 'Button';
export default Button;
