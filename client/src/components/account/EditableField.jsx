import React from 'react';

const EditableField = ({
                           label,
                           value,
                           isEditing,
                           onStartEdit,
                           onSave,
                           onCancel,
                           onChange,
                           placeholder,
                           type = "text",
                           required = false
                       }) => {
    return (
        <div className="row align-items-center justify-content-center mb-3">
            <div className="col-md-5 text-center">
                <strong>{label}: </strong>
                {!isEditing ? (
                    <span>{value}</span>
                ) : (
                    <input
                        type={type}
                        className="form-control form-control-sm"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                    />
                )}
            </div>
            <div className="col-md-1 text-center">
                {!isEditing ? (
                    <button
                        onClick={onStartEdit}
                        className="btn btn-primary btn-sm"
                    >
                        Zmień
                    </button>
                ) : (
                    <>
                        <button
                            onClick={onSave}
                            className="btn btn-success btn-sm"
                        >
                            Zapisz
                        </button>
                        <button
                            onClick={onCancel}
                            className="btn btn-secondary btn-sm"
                        >
                            Anuluj
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditableField;