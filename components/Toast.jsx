"use client"
import toast, { Toaster } from 'react-hot-toast';

export const notify = (type, text) => {
    if (type === 'success') {
        toast.success(text);
    } else if (type === 'error') {
        toast.error(text);
    } else {
        toast(text); 
    }
};

export const Toast = () => {
    return (
        <div>
            <Toaster />
        </div>
    )
}
