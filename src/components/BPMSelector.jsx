function BPMSelector({ bpm, onBpmChange}) {
    const handleBpmInput = (e) => {
        const newBpm = parseFloat(e.target.value) || 0;
        onBpmChange(newBpm);
    };
  return (
      <div id="BPMSelector">
          <div className="input-group border border-secondary rounded">

              <span className="input-group-text" id="bpm_label">BPM</span>
              <input
                  type="text" className="form-control" placeholder="Enter BPM" id="bpm_text_input"
                  aria-label="bpm" aria-describedby="bpm_label" onChange={handleBpmInput}
              />
          </div>
      </div>
  );
}

export default BPMSelector;