import React from 'react';

const PasswordField = ({
                           isEditing,
                           onStartEdit,
                           onSave,
                           onCancel,
                           password,
                           confirmPassword,
                           onPasswordChange,
                           onConfirmPasswordChange
                       }) => {
    return (
        <div className="row align-items-center justify-content-center mb-3">
            <div className="col-md-5 text-center">
                <strong>Hasło: </strong> <span> ******</span>
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
            {isEditing && (
                <div className="col-md-4 text-center">
                    <input
                        type="password"
                        className="form-control form-control-sm mb-1"
                        value={password}
                        onChange={onPasswordChange}
                        placeholder="Podaj nowe hasło"
                        required
                    />
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChange}
                        placeholder="Potwierdź nowe hasło"
                        required
                    />
                </div>
            )}
        </div>
    );
};

export default PasswordField