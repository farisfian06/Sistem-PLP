import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `block mb-2 text-sm font-medium text-gray-900 dark:text-white ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
