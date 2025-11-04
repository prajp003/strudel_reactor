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
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">BPM</span>
                <input type="text" className="form-control" placeholder="120" id="bpm_text_input" aria-label="bpm" aria-describedby="bpm_label" onChange={handleBpmInput} />
            </div>

            <label for="volume_range" className="form-label">Volume {parseInt(volume*100)}%</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" value={volume} onChange={handleVolumeChange} />

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="arp1"/>
                    <label className="form-check-label" for="arp1">
                        main arp
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1"/>
                    <label className="form-check-label" for="d1">
                        drum1
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2" />
                    <label className="form-check-label" for="d2">
                        drum2
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="radioDefault" id="gainPattern1" />
                <label className="form-check-label" for="gainPattern1">
                    gain pattern 1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="radioDefault" id="gainPattern2" />
                <label className="form-check-label" for="gainPattern2">
                    gain pattern 2
                </label>
            </div>
            <button type="button" class="btn btn-primary">All instruments</button>
        </>
    );
}

export default DJControls;