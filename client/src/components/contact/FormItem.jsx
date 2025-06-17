import React from "react";

export default function FormItem({
                                     label,
                                     type = "text",
                                     value,
                                     onChange,
                                     placeholder,
                                     required = false,
                                     rows,
                                     accept,
                                     multiple
                                 }) {
    if (type === "textarea") {
        return (
            <div className="form-group mb-3">
                <label className="form-label">{label}</label>
                <textarea
                    className="form-control w-100"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    rows={rows}
                />
            </div>
        );
    }

    if (type === "file") {
        return (
            <div className="form-group mb-3">
                <label className="form-label">{label}</label>
                <input
                    className="form-control w-100"
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={onChange}
                    required={required}
                />
            </div>
        );
    }

    return (
        <div className="form-group mb-3">
            <label className="form-label">{label}</label>
            <input
                className="form-control w-100"
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
}
