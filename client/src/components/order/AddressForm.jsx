import React from 'react';
import FormItem from "../contact/FormItem.jsx";

export default function AddressForm({
                                        street,
                                        setStreet,
                                        buildingNumber,
                                        setBuildingNumber,
                                        postalCode,
                                        handlePostalCodeChange,
                                        city,
                                        setCity,
                                        citySuggestions
                                    }) {
    return (
        <>
            <div className="row">
                <div className="col-md-8">
                    <FormItem
                        label="Ulica:"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-4">
                    <FormItem
                        label="Nr budynku / lokalu:"
                        type="text"
                        value={buildingNumber}
                        onChange={(e) => setBuildingNumber(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <FormItem
                        label="Kod pocztowy:"
                        type="text"
                        value={postalCode}
                        onChange={handlePostalCodeChange}
                        placeholder="00-000"
                        required
                    />
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label>Miejscowość:</label>
                        <select
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            disabled={citySuggestions.length === 0}
                        >
                            <option value="">-- wybierz miasto --</option>
                            {citySuggestions.map((suggestion, index) => (
                                <option key={index} value={suggestion}>
                                    {suggestion}
                                </option>
                            ))}
                        </select>
                        {citySuggestions.length === 0 && (
                            <small className="form-text text-muted">
                                Wprowadź poprawny kod pocztowy, aby wybrać miasto
                            </small>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}