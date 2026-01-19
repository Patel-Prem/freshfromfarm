function LayoutToggle({ isListView, setIsListView }) {
    return (
        <div className="space-x-2">
            <button onClick={() => setIsListView(false)} className={`btn ${!isListView && "active"}`}>
                Grid
            </button>
            <button onClick={() => setIsListView(true)} className={`btn ${isListView && "active"}`}>
                List
            </button>
        </div>
    );
}

export default LayoutToggle;
