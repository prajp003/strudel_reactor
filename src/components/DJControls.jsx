import { useState } from 'react'
function DJControls({ volume, bpm, onVolumeChange , onBpmChange}) {
    const handleVolumeChange = (e) => {
        const newVol = parseFloat(e.target.value)
        onVolumeChange(newVol)
    };
    const handleBpmInput = (e) => {
        const newBpm = parseFloat(e.target.value) || 0;
        onBpmChange(newBpm);
    };
    return (
        <div id="djcontrols" className="container-fluid">

            <div className="row mb-3 align-items-center">

                <div className="col-md-3">
                    <div className="input-group border border-secondary rounded">
                        
                        <span className="input-group-text" id="bpm_label">BPM</span>
                        <input
                            type="text" className="form-control" placeholder="Enter BPM" id="bpm_text_input"
                            aria-label="bpm" aria-describedby="bpm_label" onChange={handleBpmInput}
                        />
                    </div>
                </div>


                <div className="col-md-9">
                    <div className="row align-items-center border border-secondary rounded " style={{ paddingTop: "4px", paddingBottom: "7px" }}>
                        <div className="col-auto">
                            <label htmlFor="volume_range" className="form-label mb-0 me-3 " >
                                Volume {parseInt(volume * 100)}%
                            </label>
                        </div>
                        <div className="col" >
                            <input
                                type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" style={{ verticalAlign: 'middle' }}
                                value={volume} onChange={handleVolumeChange} />
                        </div>
                    </div>
                    
                </div>
            </div>


            <div className="row mb-3">

                <div className="col-md-6">
                    <h6 className="section-label">Instruments</h6>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="arp1" />
                        <label className="form-check-label" htmlFor="arp1">
                            Main Arp
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="d1" />
                        <label className="form-check-label" htmlFor="d1">
                            Drum 1
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="d2" />
                        <label className="form-check-label" htmlFor="d2">
                            Drum 2
                        </label>
                    </div>
                </div>


                <div className="col-md-6">
                    <h6 className="section-label">Gain Patterns</h6>

                    <div className="form-check">
                        <input
                            className="form-check-input" type="radio" name="radioDefault" id="gainPattern1"
                        />
                        <label className="form-check-label" htmlFor="gainPattern1">
                            Gain Pattern 1
                        </label>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input" type="radio" name="radioDefault" id="gainPattern2"
                        />
                        <label className="form-check-label" htmlFor="gainPattern2">
                            Gain Pattern 2
                        </label>
                    </div>
                </div>
            </div>


            <div className="row mt-3">
                <div className="col text-center">
                    <input
                        type="checkbox" className="btn-check" id="showPreProcText" autoComplete="off"
                    />
                    <label className="btn btn-primary" htmlFor="showPreProcText">
                        Show Preprocess Text Area
                    </label>
                </div>
            </div>
        </div>

        

    );
}

export default DJControls;