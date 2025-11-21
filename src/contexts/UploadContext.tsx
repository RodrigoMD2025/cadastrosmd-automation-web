import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UploadState {
    uploadId: string | null;
    fileName: string | null;
    startedAt: string | null;
    isProcessing: boolean;
}

interface UploadContextType {
    uploadState: UploadState;
    setActiveUpload: (uploadId: string, fileName: string) => void;
    clearUpload: () => void;
    hasActiveUpload: boolean;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

const STORAGE_KEY = 'cadastros_active_upload';
const MAX_AGE_HOURS = 24;

export const UploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [uploadState, setUploadState] = useState<UploadState>({
        uploadId: null,
        fileName: null,
        startedAt: null,
        isProcessing: false,
    });

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed: UploadState = JSON.parse(stored);

                // Check if upload is too old (>24h)
                if (parsed.startedAt) {
                    const startTime = new Date(parsed.startedAt).getTime();
                    const now = Date.now();
                    const ageHours = (now - startTime) / (1000 * 60 * 60);

                    if (ageHours > MAX_AGE_HOURS) {
                        // Clear old upload
                        localStorage.removeItem(STORAGE_KEY);
                        return;
                    }
                }

                setUploadState(parsed);
            }
        } catch (error) {
            console.error('Error loading upload state from localStorage:', error);
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const setActiveUpload = (uploadId: string, fileName: string) => {
        const newState: UploadState = {
            uploadId,
            fileName,
            startedAt: new Date().toISOString(),
            isProcessing: true,
        };

        setUploadState(newState);

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
        } catch (error) {
            console.error('Error saving upload state to localStorage:', error);
        }
    };

    const clearUpload = () => {
        const clearedState: UploadState = {
            uploadId: null,
            fileName: null,
            startedAt: null,
            isProcessing: false,
        };

        setUploadState(clearedState);

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error removing upload state from localStorage:', error);
        }
    };

    const hasActiveUpload = uploadState.isProcessing && uploadState.uploadId !== null;

    const value: UploadContextType = {
        uploadState,
        setActiveUpload,
        clearUpload,
        hasActiveUpload,
    };

    return (
        <UploadContext.Provider value={value}>
            {children}
        </UploadContext.Provider>
    );
};

export const useUploadContext = (): UploadContextType => {
    const context = useContext(UploadContext);
    if (context === undefined) {
        throw new Error('useUploadContext must be used within an UploadProvider');
    }
    return context;
};
