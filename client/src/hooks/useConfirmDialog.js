import { useCallback } from 'react';

export const useConfirmDialog = () => {
    const confirm = useCallback(async (options = {}) => {
        const {
            title = 'Czy na pewno?',
            text = 'Ta operacja jest nieodwracalna!',
            confirmText = 'Tak',
            cancelText = 'Anuluj',
            onConfirm,
            onCancel
        } = options;

        if (window.Swal) {
            const result = await window.Swal.fire({
                title,
                text,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: confirmText,
                cancelButtonText: cancelText
            });

            if (result.isConfirmed) {
                onConfirm && await onConfirm();
                return true;
            } else {
                onCancel && onCancel();
                return false;
            }
        } else {
            const confirmed = window.confirm(`${title}\n${text}`);
            if (confirmed) {
                onConfirm && await onConfirm();
                return true;
            } else {
                onCancel && onCancel();
                return false;
            }
        }
    }, []);

    const showSuccess = useCallback((title, text) => {
        if (window.Swal) {
            window.Swal.fire(title, text, 'success');
        } else {
            alert(`${title}: ${text}`);
        }
    }, []);

    const showError = useCallback((title, text) => {
        if (window.Swal) {
            window.Swal.fire(title, text, 'error');
        } else {
            alert(`${title}: ${text}`);
        }
    }, []);

    return {
        confirm,
        showSuccess,
        showError
    };
};