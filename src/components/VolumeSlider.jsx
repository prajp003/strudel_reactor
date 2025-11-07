
import { useEffect } from "react";
function VolumeSlider({ volume, onVolumeChange, gainPattern }) {
    const handleVolumeChange = (e) => {
        const newVol = parseFloat(e.target.value)
        onVolumeChange(newVol)
    };

    //patch for gain affecting volumeslider
    useEffect(() => {
        console.log("Gain pattern changed");
        onVolumeChange(volume);
    }, [gainPattern]);


    return (

      <div id="VolumeSlider">
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
  );
}

export default VolumeSlider;