import { useState } from 'react';

function BPMSelector({ bpm, onBpmChange }) {
    const [warning, setWarning] = useState("");

    const handleBpmInput = (e) => {
        const value = e.target.value;

        // Check if the input is numeric
        if (isNaN(value) || value.trim() === "") {
            setWarning("Please enter a valid number for BPM.");
            return;
        }

        const newBpm = parseFloat(value);
        if (newBpm <= 0) {
            setWarning("BPM must be greater than zero.");
            return;
        }

        // Clear any previous warning
        setWarning("");
        onBpmChange(newBpm);
    };

    return (
        <div id="BPMSelector">
            <div className="input-group border border-secondary rounded">
                <span className="input-group-text" id="bpm_label">BPM</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="0"
                    id="bpm_text_input"
                    aria-label="bpm"
                    aria-describedby="bpm_label"
                    onChange={handleBpmInput}
                />
            </div>

            {/* Warning message (only shows when set) */}
            {warning && (
                <div className="text-danger mt-1" style={{ fontSize: "0.9em" }}>
                    {warning}
                </div>
            )}
        </div>
    );
}

export default BPMSelector;
