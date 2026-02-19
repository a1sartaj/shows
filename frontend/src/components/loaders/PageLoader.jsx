


const PageLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
            <div className="flex flex-col items-center gap-4">

                {/* Spinner */}
                <div className="w-10 h-10 border-4 border-button-primary border-t-transparent rounded-full animate-spin" />

                <p className="text-text-muted">Loading...</p>
            </div>
        </div>
    );
};

export default PageLoader;
