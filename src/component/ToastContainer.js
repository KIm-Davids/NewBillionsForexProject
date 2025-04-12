// ToastContainer.js
const ToastContainer = ({ toasts }) => {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div key={toast.id} className="toast">
                    <strong>{toast.title}</strong>
                    <p>{toast.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
