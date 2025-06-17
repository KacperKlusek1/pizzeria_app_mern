import { useState } from 'react';

export const useActiveView = (initialView = 'orders') => {
    const [activeView, setActiveView] = useState(initialView);

    const switchView = (view) => {
        setActiveView(view);
    };

    return {
        activeView,
        setActiveView,
        switchView,
        isActive: (view) => activeView === view
    };
};