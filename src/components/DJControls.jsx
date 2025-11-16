import { useState } from 'react';

function DJControls({ gainPattern, onGainPatternChange, onInstrumentToggle, mode, onToggleMode }) {
    
    return (
        <div id="djcontrols" className="container-fluid">
            <div className="row mb-3" style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>

                <div className="col-md-5 border border-secondary rounded p-2">
                    <h6 className="section-label">Instruments</h6>
                    {[
                        { id: "bassline", label: "Bassline" },
                        { id: "main_arp", label: "Main Arp" },
                        { id: "drums", label: "Drum 1" },
                        { id: "drums2", label: "Drum 2" },
                    ].map(inst => (
                        <div className="form-check" key={inst.id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={inst.id}
                                defaultChecked
                                onChange={(e) => onInstrumentToggle(inst.id, e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor={inst.id}>
                                {inst.label}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="col-md-5 border border-secondary rounded p-2">
                    <h6 className="section-label">Gain Patterns</h6>

                    {[0, 1, 2].map((num) => (
                        <div className="form-check" key={num}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="radioDefault"
                                id={`gainPattern${num + 1}`}
                                onChange={() => onGainPatternChange(num)}
                                defaultChecked={num === 0}
                            />
                            <label className="form-check-label" htmlFor={`gainPattern${num + 1}`}>
                                Gain Pattern {num + 1}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row mt-3">
                <button onClick={() => onToggleMode(prev => prev === "gain" ? "room" : "gain")}>
                    {mode === "gain" ? "TOGGLE ROOM GRAPH" : "TOGGLE GAIN GRAPH"}
                </button>
                
            </div>
        </div>
    );
}

export default DJControls;
